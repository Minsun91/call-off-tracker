🚚 Call Off Tracker
Warehouse Order Tracking Dashboard

🧭 Overview

Call Off Tracker는 실시간으로 출하 요청(Call Off), 재고 상태,
픽업 진행 상황을 한 화면에서 관리할 수 있는 창고 관리 대시보드입니다.

Firebase + React 기반으로 만들어져,
데이터 업데이트가 즉시 반영되고, 직관적인 UI로 작업 효율을 높입니다.

⚙️ Tech Stack
영역	기술
Frontend	React (CRA), TailwindCSS
Backend	Firebase Firestore, Firebase Hosting
Auth	Firebase Authentication
Build/Deploy	GitHub → Firebase Hosting (자동 빌드)

🚀 Features

📦 Order Management – 주문 등록, 수정, 삭제

🧾 Packing List & Invoice Tracking – 각 출하 건별 문서 관리

🔄 Real-time Sync – Firestore 기반 실시간 반영

🧍 User Auth – 토큰 인증 기반 접근 제어

📊 Dashboard View – 진행 상태를 한눈에 표시

🌐 Live Demo
🔗 https://call-off-tracker-96704.web.app

🧩 Directory Structure
call-off-tracker/
├─ src/
│  ├─ components/     # UI components
│  ├─ pages/          # Page-level views
│  ├─ firebaseConfig.js
│  ├─ App.js
│  └─ index.js
├─ public/
│  ├─ index.html
│  └─ manifest.json
├─ firebase.json
└─ package.json

💡 Roadmap

 Admin Role 분리

 Export as Excel/PDF

Email 알림 자동화

 Multi-Warehouse 지원


🪪 License
© 2025 Minsun Kim. All rights reserved.
