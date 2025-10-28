import React, { useState, useEffect } from 'react';
import { 
  signInAnonymously, 
  onAuthStateChanged,
  signInWithCustomToken
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

// ----------------------------------------------------
// ✅ 전역 상수 및 헬퍼
// ----------------------------------------------------

// 고객사/앱별 데이터 분리를 위한 appId
const APP_ID = 'default-app-id';

// Firestore 컬렉션 경로 헬퍼
const getOrdersCollectionPath = () => {
  return `artifacts/${APP_ID}/public/data/warehouse_orders`;
};

// 로그인 토큰 (커스텀 인증 쓰지 않는 경우 null)
const initialAuthToken = null;

// ----------------------------------------------------
// ✅ 신규 오더 생성 폼
// ----------------------------------------------------
function CreateOrderForm({ userId }) {
  const [customer, setCustomer] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [palletQuantity, setPalletQuantity] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [isDocSent, setIsDocSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer || !deliveryDate || !palletQuantity || !deliveryLocation) {
      setError('Customer, delivery date, pallet quantity, and location are required.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const ordersColPath = getOrdersCollectionPath();
      await addDoc(collection(db, ordersColPath), {
        customer,
        deliveryDate,
        palletQuantity,
        deliveryLocation,
        status: 'New',
        isDocSent,
        warehouseNotes: '',
        podUrl: '',
        createdAt: new Date().toISOString(),
        createdBy: userId,
      });

      // 폼 리셋
      setCustomer('');
      setDeliveryDate('');
      setPalletQuantity('');
      setDeliveryLocation('');
      setIsDocSent(false);
    } catch (err) {
      console.error("Error creating order:", err);
      setError(`Error creating order: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Call Off </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            placeholder="Delivery Date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Pallet Quantity"
            value={palletQuantity}
            onChange={(e) => setPalletQuantity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Delivery Location (or 'Pickup')"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            id="docSentCheckbox"
            type="checkbox"
            checked={isDocSent}
            onChange={(e) => setIsDocSent(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="docSentCheckbox" className="ml-2 text-sm text-gray-700">
            Invoice + Packing List sent to warehouse via email
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Create Call Off'}
        </button>
      </form>
    </div>
  );
}

// ----------------------------------------------------
// ✅ 개별 오더 카드
// ----------------------------------------------------
function OrderCard({ order }) {
  const [notes, setNotes] = useState(order.warehouseNotes || '');
  const [podUrl, setPodUrl] = useState(order.podUrl || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const orderRef = doc(db, getOrdersCollectionPath(), order.id);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateDoc(orderRef, { status: newStatus });
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDetailsUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateDoc(orderRef, {
        warehouseNotes: notes,
        podUrl,
      });
    } catch (err) {
      console.error("Details update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(orderRef);
    } catch (err) {
      console.error("Order delete error:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Shipped': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col">
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">{order.customer}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <p className="text-sm text-gray-600">Requested Delivery Date: {order.deliveryDate}</p>
        <p className={`text-sm font-semibold ${order.isDocSent ? 'text-green-600' : 'text-red-600'}`}>
          Invoice/PL Sent: {order.isDocSent ? 'Yes' : 'No'}
        </p>
      </div>

      <div className="p-4 flex-grow">
        <h4 className="font-semibold mb-2 text-gray-700">Order Details</h4>
        <p><strong>{order.palletQuantity}</strong> Pallets</p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Location:</strong> {order.deliveryLocation}
        </p>
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <form onSubmit={handleDetailsUpdate} className="space-y-3">
          <input
            type="text"
            placeholder="Price/ETA notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Please send us POD when you receive it."
            value={podUrl}
            onChange={(e) => setPodUrl(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm"
          />
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {isUpdating ? 'Saving...' : 'Save Notes/POD'}
          </button>
        </form>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t">
        <button onClick={() => handleStatusChange('Confirmed')} className="px-3 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600">Confirm</button>
        <button onClick={() => handleStatusChange('Scheduled')} className="px-3 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600">Schedule</button>
        <button onClick={() => handleStatusChange('Shipped')} className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">Ship</button>
        <button onClick={handleDelete} className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ✅ 메인 앱
// ----------------------------------------------------
export default function App() {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Firebase 인증
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
          } else {
            await signInAnonymously(auth);
          }
        } catch (err) {
          console.error("Auth error:", err);
          setError("Authentication failed. Please refresh the app.");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore 구독
  useEffect(() => {
    if (!userId) return;
    const ordersColPath = getOrdersCollectionPath();
    const q = collection(db, ordersColPath);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(ordersData);
      setIsLoading(false);
    }, (err) => {
      console.error("Firestore error:", err);
      setError("Error loading data.");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Call-off Dashboard</h1>
          <p className="text-gray-600">Real-time call off Tracking & Status Management</p>
          {userId && (
            <p className="text-xs text-gray-500 mt-2 bg-white px-3 py-1 inline-block rounded-full shadow-sm">
              My ID: {userId}
            </p>
          )}
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {userId && <CreateOrderForm userId={userId} />}

        <div className="border-t border-gray-300 pt-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Real-time Order List</h2>
          {isLoading && <div className="text-center text-gray-600">Loading data...</div>}
          {!isLoading && orders.length === 0 && (
            <div className="text-center text-gray-500 bg-white p-10 rounded-xl shadow">
              No orders have been created yet.
            </div>
          )}
          {!isLoading && orders.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
