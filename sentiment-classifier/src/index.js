import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDc3VXSkDHt0Ih1Z269TnGkZd7QQr3yGkE",
  authDomain: "universal-sidhu-authentication.firebaseapp.com",
  projectId: "universal-sidhu-authentication",
  storageBucket: "universal-sidhu-authentication.appspot.com",
  messagingSenderId: "265527047568",
  appId: "1:265527047568:web:3fbd18782c260a1940ef15",
  measurementId: "G-WBQTKXCMVY",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
