import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create a new delivery order in Firestore
 * @param {Object} orderData - Order details
 * @param {string} orderData.customerPhone - Customer phone number
 * @param {string} orderData.customerName - Customer full name
 * @param {Array} orderData.orderElements - Array of order items
 * @param {number} orderData.totalPrice - Total order price
 * @param {Object} orderData.location - GPS location for delivery
 * @returns {Promise<string>} Order ID
 */
export async function createOrder(orderData) {
  try {
    const orderId = uuidv4();
    
    const order = {
      orderId,
      timestamp: serverTimestamp(),
      customerPhone: orderData.customerPhone,
      customerName: orderData.customerName,
      orderElements: orderData.orderElements,
      totalPrice: orderData.totalPrice,
      location: orderData.location || null, // GPS coordinates for delivery
      status: 'pending' // pending, preparing, ready, completed
    };

    const docRef = await addDoc(collection(db, 'delivery-orders'), order);
    
    console.log('Delivery order created with ID:', orderId);
    return orderId;
  } catch (error) {
    console.error('Error creating delivery order:', error);
    throw new Error('Failed to create delivery order');
  }
}

/**
 * Create a physical (dine-in) order in Firestore
 * @param {Object} orderData - Order details
 * @param {string} orderData.customerPhone - Customer phone number
 * @param {string} orderData.customerName - Customer full name
 * @param {Array} orderData.orderElements - Array of order items
 * @param {number} orderData.totalPrice - Total order price
 * @param {string} orderData.tableID - Table identifier
 * @param {string} orderData.locationName - Location name
 * @returns {Promise<string>} Order ID
 */
export async function createDineInOrder(orderData) {
  try {
    const orderId = uuidv4();
    
    const order = {
      orderId,
      timestamp: serverTimestamp(),
      customerPhone: orderData.customerPhone,
      customerName: orderData.customerName,
      tableID: orderData.tableID,
      locationName: orderData.locationName,
      orderElements: orderData.orderElements,
      totalPrice: orderData.totalPrice,
      status: 'pending'
    };

    // Physical orders go to location-specific collections
    const collectionName = `physical-orders-${orderData.locationName}`;
    const docRef = await addDoc(collection(db, collectionName), order);
    
    console.log(`Physical order created in ${collectionName} with ID: ${orderId} (Table: ${orderData.tableID})`);
    return orderId;
  } catch (error) {
    console.error('Error creating physical order:', error);
    throw new Error('Failed to create physical order');
  }
}

/**
 * Format order elements for storage
 * @param {Array} cartItems - Cart items array
 * @returns {Array} Formatted order elements
 */
export function formatOrderElements(cartItems) {
  return cartItems.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity
  }));
}
