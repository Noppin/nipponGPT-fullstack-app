import React from "react";
import ReactDOM from "react-dom/client";
// import "mini.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import "./index.css";
import { AuthProvider } from "./components/context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
