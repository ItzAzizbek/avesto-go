import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppProvider, useApp } from './contexts/AppContext';
import Onboarding from './components/Onboarding';
import LocationDetector from './components/LocationDetector';
import QRScanner from './components/QRScanner';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import LoadingSpinner from './components/LoadingSpinner';
import { createOrder, createDineInOrder, formatOrderElements } from './services/orderService';
import './i18n';
import './App.css';

function AppContent() {
  const { t } = useTranslation();
  const {
    user,
    currentView,
    setCurrentView,
    cart,
    getCartTotal,
    clearCart,
    isDineIn,
    tableID,
    locationName,
    location,
    saveOrderToHistory
  } = useApp();

  const [showCart, setShowCart] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsPlacingOrder(true);
    setShowCart(false);

    // Save cart items before clearing
    const orderItems = cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    const orderTotal = getCartTotal();

    try {
      const orderElements = formatOrderElements(cart);
      const totalPrice = getCartTotal();
      
      let newOrderId;
      
      // Check if this is a dine-in order
      if (isDineIn && tableID && locationName) {
        // Create dine-in order in location-specific collection
        const dineInOrderData = {
          customerPhone: user.phone,
          customerName: user.name,
          orderElements,
          totalPrice,
          tableID,
          locationName
        };
        newOrderId = await createDineInOrder(dineInOrderData);
      } else {
        // Create regular takeout order with user location
        const takeoutOrderData = {
          customerPhone: user.phone,
          customerName: user.name,
          orderElements,
          totalPrice,
          location: location ? {
            latitude: location.latitude,
            longitude: location.longitude,
            googleMapsUrl: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
          } : null
        };
        newOrderId = await createOrder(takeoutOrderData);
      }
      
      // Save order to history
      saveOrderToHistory({
        id: newOrderId,
        items: orderItems,
        total: orderTotal,
        isDineIn,
        tableID,
        locationName,
        location: location ? {
          latitude: location.latitude,
          longitude: location.longitude
        } : null
      });
      
      setOrderId(newOrderId);
      clearCart();
      setCurrentView('confirmation');
    } catch (error) {
      console.error('Order failed:', error);
      alert(t('error_firebase'));
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleNewOrder = () => {
    setCurrentView('menu');
    setOrderId('');
  };

  if (isPlacingOrder) {
    return (
      <div className="loading-container">
        <LoadingSpinner text={t('placing_order')} />
      </div>
    );
  }

  return (
    <div className="app">
      {currentView === 'onboarding' && <Onboarding />}
      {currentView === 'location' && <LocationDetector />}
      {currentView === 'qr-scanner' && <QRScanner />}
      {currentView === 'menu' && (
        <>
          <Menu onCartClick={() => setShowCart(true)} />
          {showCart && (
            <Cart
              onClose={() => setShowCart(false)}
              onCheckout={handleCheckout}
            />
          )}
        </>
      )}
      {currentView === 'confirmation' && (
        <OrderConfirmation orderId={orderId} onNewOrder={handleNewOrder} />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

