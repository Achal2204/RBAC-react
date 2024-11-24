// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import bcrypt from "bcryptjs";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/users?email=${email}`
//       );
//       const foundUser = response.data[0];
//       if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
//         setUser(foundUser);
//         return { success: true, role: foundUser.role };
//       }
//       return { success: false, message: "Invalid credentials" };
//     } catch (err) {
//       console.error(err);
//       return { success: false, message: "Error logging in" };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
