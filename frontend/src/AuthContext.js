// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load token from local storage on initial render
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const saveToken = (newToken) => {
    // Save token to local storage and update state
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email') || null);

  const saveUserId = (newUserId) => {
    localStorage.setItem('user_id', newUserId);
    setUserId(newUserId);
  };

  const saveUserEmail = (newUserEmail) => {
    localStorage.setItem('email', newUserEmail);
    setUserEmail(newUserEmail);
  };


  const signOut = () => {
    // Clear the token and user information from local storage and state
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);

    // Optional: Add additional logic, such as redirecting to the login page
    // history.push('/login');
  };

  const fetchUserDetails = async () => {
    try {
      if (!token) {
        // If there's no token, clear the user state
        setUser(null);
        return;
      }

      // Make a request to the server to get user details
      const response = await fetch('/api/api/user-details', {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(`jwt auth code packed with:`, JSON.stringify(userData, null, 2));
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
    <AuthContext.Provider value={{ token, saveToken, userId, saveUserId, userEmail, saveUserEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
