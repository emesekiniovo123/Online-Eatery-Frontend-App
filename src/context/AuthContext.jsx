//import react hooks from react
import { createContext, useContext, useState, useEffect } from "react";
// Import authentication service for API requests
import authService from "../services/authService";
// Import localStorage key constants.
import { STORAGE_KEYS } from "../utils/constants";
// Create Authentication Context.
const AuthContext = createContext(null);


//Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {

  // User State :Stores the currently logged-in user
  const [user, setUser] = useState(null);

  //Loading State : Tracks whether authentication is still being checked
  const [loading, setLoading] = useState(true);

  //useEffect() : Runs once when the application starts.
  useEffect(() => {

    //Initializes authentication when the application loads
    const initAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authService.getMe();
        const currentUser = data.user || data;

        setUser(currentUser);
        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(currentUser)
        );
      } catch (error) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);

      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(data.user)
      );

      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);

      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(data.user)
      );

      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    const nextUser = { ...(user || {}), ...profileData };

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(nextUser)
    );

    setUser(nextUser);

    return nextUser;
  };

  const logout = () => {
    authService.logout();

    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;



// import { createContext, useContext, useState, useEffect } from "react";
// import authService from "../services/authService";
// import { STORAGE_KEYS } from "../utils/constants";


// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
//       const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
//       if (token) {
//         try {
//           const data = await authService.getMe();
//           const currentUser = data.user || data;
//           setUser(currentUser);
//           localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
//         } catch {
//           if (storedUser) {
//             setUser(JSON.parse(storedUser));
//           } else {
//             localStorage.removeItem(STORAGE_KEYS.TOKEN);
//             localStorage.removeItem(STORAGE_KEYS.USER);
//           }
//         }
//       } else if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//       setLoading(false);
//     };
//     initAuth();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const data = await authService.login(credentials);
//       localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
//       setUser(data.user);
//       return data;
//     } catch {
//       const match = mockUsers.find(
//         (userItem) =>
//           userItem.email === credentials.email &&
//           userItem.password === credentials.password,
//       );

//       if (!match) {
//         throw new Error("Invalid email or password");
//       }

//       const fallbackUser = { ...match };
//       delete fallbackUser.password;
//       localStorage.setItem(STORAGE_KEYS.TOKEN, "mock-token");
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(fallbackUser));
//       setUser(fallbackUser);
//       return { token: "mock-token", user: fallbackUser };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const data = await authService.register(userData);
//       localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
//       setUser(data.user);
//       return data;
//     } catch {
//       const fallbackUser = {
//         _id: `user-${Date.now()}`,
//         name: userData.name,
//         email: userData.email,
//         role: "customer",
//       };
//       localStorage.setItem(STORAGE_KEYS.TOKEN, "mock-token");
//       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(fallbackUser));
//       setUser(fallbackUser);
//       return { token: "mock-token", user: fallbackUser };
//     }
//   };

//   const updateProfile = async (profileData) => {
//     const nextUser = { ...(user || {}), ...profileData };
//     localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(nextUser));
//     setUser(nextUser);
//     return nextUser;
//   };

//   const logout = () => {
//     authService.logout();
//     localStorage.removeItem(STORAGE_KEYS.TOKEN);
//     localStorage.removeItem(STORAGE_KEYS.USER);
//     setUser(null);
//   };

//   const isAuthenticated = !!user;
//   const isAdmin = user?.role === "admin";

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         register,
//         updateProfile,
//         logout,
//         isAuthenticated,
//         isAdmin,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
