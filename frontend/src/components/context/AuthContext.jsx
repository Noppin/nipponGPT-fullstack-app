import React, { useContext, useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../firebase";
import { toast } from "react-toastify";
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    removeAccessToken();
    setCurrentUser(null);
    auth.signOut();
    toast.info("User Logged out!");
  };

  const storeAccessToken = (user) => {
    localStorage.setItem("current-user", JSON.stringify(user));
  };

  const removeAccessToken = () => {
    localStorage.removeItem("current-user");
  };
  function getCurrentUser() {
    let user;

    if (localStorage.getItem("current-user")) {
      user = JSON.parse(localStorage.getItem("current-user"));
    } else {
      user = null;
    }

    return user;
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        storeAccessToken(user.uid);
      }
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signup,
    signin,
    signout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
