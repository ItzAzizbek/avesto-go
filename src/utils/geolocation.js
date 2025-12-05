// Building coordinates configuration
// IMPORTANT: Replace these coordinates with your actual building locations
// To get coordinates: Open Google Maps, right-click on your building location, click on coordinates to copy
export const BUILDINGS = [
  {
    id: 'cafe-1',
    name: 'Avesto Cafe Main',
    latitude: 39.652555, // Your actual location
    longitude: 66.918805, // Your actual location
    radius: 100 // 100 meters detection radius
  },
  {
    id: 'cafe-2',
    name: 'Avesto Cafe Branch',
    latitude: 39.652555, // Your actual location (same as cafe-1, remove if only one location)
    longitude: 66.918805, // Your actual location
    radius: 100 // 100 meters detection radius
  }
  // Add more buildings as needed
];

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in meters
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Get user's current position
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('User location detected:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        reject(error);
      },
      {
        enableHighAccuracy: true, // Request GPS-level accuracy
        timeout: 15000, // Increased timeout for better results
        maximumAge: 0 // Don't use cached positions
      }
    );
  });
}

/**
 * Check if user is inside any building
 * @param {number} userLat - User's latitude
 * @param {number} userLon - User's longitude
 * @returns {{isInside: boolean, building: object|null}}
 */
export function checkIfInsideBuilding(userLat, userLon) {
  console.log('🔍 Checking if user is inside any building...');
  console.log('User coordinates:', { lat: userLat, lon: userLon });
  
  for (const building of BUILDINGS) {
    const distance = calculateDistance(
      userLat,
      userLon,
      building.latitude,
      building.longitude
    );

    console.log(`📍 Distance to ${building.name}:`, {
      distance: Math.round(distance) + 'm',
      radius: building.radius + 'm',
      isInside: distance <= building.radius
    });

    if (distance <= building.radius) {
      console.log(`✅ User IS INSIDE ${building.name}`);
      return {
        isInside: true,
        building: building
      };
    }
  }

  console.log('❌ User is OUTSIDE all buildings');
  return {
    isInside: false,
    building: null
  };
}
