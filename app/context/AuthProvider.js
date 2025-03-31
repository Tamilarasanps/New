import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // const initialUserState =
  //   Cookies.get("jwt") || localStorage.getItem("ChatApp");

  // parse the user data and storing in state.
  const [authUser, setAuthUser] = useState(null
    // initialUserState ? JSON.parse(initialUserState) : undefined
  );

  useEffect(() => {
    const tokenCheck = async () => {
      let token = null;
  
      if (typeof window !== "undefined") {
        // Web environment
        token = localStorage.getItem("userToken");
      } else {
        // React Native environment
        token = await AsyncStorage.getItem("userToken");
      }
  
      setAuthUser(token);
    };
  
    tokenCheck();
  }, []);
  
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);