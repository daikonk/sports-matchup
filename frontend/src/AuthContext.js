// AuthContext.js (Frontend)

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const saveToken = (newToken) => {
    console.log(`Auth context token: ${newToken}`);
    setToken(newToken);
  };

  const fetchUserDetails = async () => {
    try {
      if (!token) {
        // If there's no token, clear the user state
        setUser(null);
        return;
      }

      // Make a request to the server to get user details
      const response = await fetch('http://localhost:8000/api/user-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(`jwt auth code packed with:`, JSON.stringify(userData, null, 2))
        setUser(userData);
      } else {
        // If the server responds with an error, clear the user state
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    // Fetch user details when the component mounts or when the access token changes
    fetchUserDetails();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, saveToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};