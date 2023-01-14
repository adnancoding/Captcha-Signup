import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCCegBRIR-dMyFxl8TzjUEzRL7ojn_znJU",
  authDomain: "captcha-task.firebaseapp.com",
  projectId: "captcha-task",
  storageBucket: "captcha-task.appspot.com",
  messagingSenderId: "1045160469297",
  appId: "1:1045160469297:web:677ffadcc6f76168810610"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);