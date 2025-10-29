// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// 환경변수에서 가져오되, 없으면 기본값 사용
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || `${process.env.REACT_APP_FIREBASE_PROJECT_ID || 'call-off-tracker-96704'}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'call-off-tracker-96704',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'call-off-tracker-96704.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '540983408275',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:540983408275:web:086c6df14d11d093e97f66'
};

// 간단한 역할 설정 (개발/테스트용)
// 실제 운영에서는 custom claims 또는 users 컬렉션으로 관리하세요.
export const USER_ROLE = process.env.REACT_APP_USER_ROLE || 'SCM'; // 'SCM' or 'Warehouse'

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Firestore 디버그 로그 (선택사항)
setLogLevel('debug');

export { app, auth, db };
