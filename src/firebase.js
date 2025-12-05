import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB9T61vU4YTsk43Gm0SQpID6ZnAQUtDbpw",
  authDomain: "avesto-sweets.firebaseapp.com",
  projectId: "avesto-sweets",
  storageBucket: "avesto-sweets.firebasestorage.app",
  messagingSenderId: "180598412522",
  appId: "1:180598412522:web:43967fdf7964f7d47d3393",
  measurementId: "G-JFBD9DQD7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
