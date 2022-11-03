import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", inputs,{
      withCredentials:true,
    })
    setCurrentUser(res.data)
    // setCurrentUser({
    //   id: 1,
    //   name: "Saharil",
    //   profile:
    //     "https://images.pexels.com/photos/6151655/pexels-photo-6151655.jpeg?auto=compress&cs=tinysrgb&w=600",
    // });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
