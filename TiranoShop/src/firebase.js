import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmUVcSS-O2-0Qy9jySIHvWMPTb80Sz3OU",
  authDomain: "hamburger-408f0.firebaseapp.com",
  projectId: "hamburger-408f0",
  storageBucket: "hamburger-408f0.firebasestorage.app",
  messagingSenderId: "869510418021",
  appId: "1:869510418021:web:35ef661b93368cd608c08c",
  measurementId: "G-V729PEYRHE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);