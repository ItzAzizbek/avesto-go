import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User data
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('avestoUser');
    return stored ? JSON.parse(stored) : null;
  });

  // Location data
  const [location, setLocation] = useState(null);
  const [isOutsideBuilding, setIsOutsideBuilding] = useState(null);
  
  // Dine-in data
  const [tableID, setTableID] = useState(() => {
    return localStorage.getItem('tableID') || null;
  });
  const [locationName, setLocationName] = useState(() => {
    return localStorage.getItem('locationName') || null;
  });
  const [isDineIn, setIsDineIn] = useState(() => {
    return localStorage.getItem('isDineIn') === 'true';
  });

  // Cart
  const [cart, setCart] = useState([]);

  // Order history
  const [orderHistory, setOrderHistory] = useState(() => {
    const stored = localStorage.getItem('avestoOrderHistory');
    return stored ? JSON.parse(stored) : [];
  });

  // Current view
  const [currentView, setCurrentView] = useState('onboarding');
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  // Save order to history
  const saveOrderToHistory = (order) => {
    const newOrder = {
      ...order,
      date: new Date().toISOString(),
    };
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('avestoOrderHistory', JSON.stringify(updatedHistory));
  };

  // Clear order history
  const clearOrderHistory = () => {
    setOrderHistory([]);
    localStorage.removeItem('avestoOrderHistory');
  };

  // Logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('avestoUser');
    clearDineInData();
    setCurrentView('onboarding');
  };

  // Save user data
  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem('avestoUser', JSON.stringify(userData));
  };
  
  // Save dine-in data
  const saveDineInData = (table, location) => {
    setTableID(table);
    setLocationName(location);
    setIsDineIn(true);
    localStorage.setItem('tableID', table);
    localStorage.setItem('locationName', location);
    localStorage.setItem('isDineIn', 'true');
  };
  
  // Clear dine-in data
  const clearDineInData = () => {
    setTableID(null);
    setLocationName(null);
    setIsDineIn(false);
    localStorage.removeItem('tableID');
    localStorage.removeItem('locationName');
    localStorage.removeItem('isDineIn');
  };

  // Cart functions
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Check if user is logged in on mount
  useEffect(() => {
    if (user) {
      setCurrentView('location');
    }
  }, []);

  const value = {
    user,
    saveUser,
    logoutUser,
    location,
    setLocation,
    isOutsideBuilding,
    setIsOutsideBuilding,
    tableID,
    locationName,
    isDineIn,
    saveDineInData,
    clearDineInData,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    orderHistory,
    saveOrderToHistory,
    clearOrderHistory,
    currentView,
    setCurrentView,
    isLoading,
    setIsLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
