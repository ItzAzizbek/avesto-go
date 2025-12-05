import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      // Onboarding
      "welcome": "Добро пожаловать в Avesto Go",
      "welcome_subtitle": "Ваша еда в один клик",
      "phone_label": "Номер телефона",
      "phone_placeholder": "+998 (__) ___-__-___",
      "name_label": "Полное имя",
      "name_placeholder": "Введите ваше имя",
      "continue": "Продолжить",
      "phone_required": "Требуется номер телефона",
      "phone_invalid": "Неверный формат номера",
      "name_required": "Требуется имя",
      
      // Location
      "detecting_location": "Определение вашего местоположения...",
      "location_required": "Для продолжения необходимо разрешить доступ к геолокации",
      "location_denied": "Доступ к местоположению отклонен. Пожалуйста, разрешите доступ в настройках браузера.",
      "retry": "Повторить",
      
      // Menu
      "menu_title": "Меню",
      "categories": "Категории",
      "all": "Все",
      "salads": "Салаты",
      "hot_dishes": "Горячие блюда",
      "desserts": "Десерты",
      "beverages": "Напитки",
      "add_to_cart": "В корзину",
      "price": "Цена",
      "sum": "сум",
      
      // Cart
      "cart": "Корзина",
      "your_cart": "Ваша корзина",
      "cart_empty": "Корзина пуста",
      "cart_empty_desc": "Добавьте блюда из меню",
      "total": "Итого",
      "place_order": "Оформить заказ",
      "remove": "Удалить",
      "back_to_menu": "Вернуться в меню",
      
      // Order
      "order_success": "Заказ оформлен!",
      "order_id": "Номер заказа",
      "thank_you": "Спасибо за ваш заказ!",
      "order_processing": "Ваш заказ принят и готовится",
      "new_order": "Новый заказ",
      "placing_order": "Оформление заказа...",
      
      // QR Scanner
      "scan_qr": "Сканировать QR-код",
      "scan_table_qr": "Отсканируйте QR-код на столе",
      "scanning": "Сканирование...",
      "point_camera": "Наведите камеру на QR-код",
      "qr_detected": "QR-код обнаружен",
      "invalid_qr": "Неверный QR-код",
      "manual_entry": "Ввести вручную",
      "table_id": "Номер стола",
      "table_id_placeholder": "Например: CAF-1",
      "location_name": "Локация",
      "location_placeholder": "Например: cafe-main",
      "submit": "Подтвердить",
      "camera_permission_denied": "Доступ к камере отклонен",
      "enable_camera": "Разрешите доступ к камере в настройках",
      
      // Language
      "language": "Язык",
      "russian": "Русский",
      "english": "English",
      
      // Errors
      "error": "Ошибка",
      "error_general": "Что-то пошло не так. Попробуйте еще раз.",
      "error_firebase": "Ошибка подключения к серверу",
      
      // Profile
      "profile": "Профиль",
      "my_info": "Мои данные",
      "order_history": "История заказов",
      "total_orders": "Всего заказов",
      "logout": "Выйти",
      "no_orders": "Нет заказов",
      "no_orders_desc": "Вы еще не сделали ни одного заказа",
      "clear_history": "Очистить историю",
      "confirm_clear_history": "Вы уверены, что хотите очистить историю заказов?",
      "map": "Карта",
      "view_location": "Посмотреть на карте",
    }
  },
  en: {
    translation: {
      // Onboarding
      "welcome": "Welcome to Avesto Go",
      "welcome_subtitle": "Your food in one click",
      "phone_label": "Phone Number",
      "phone_placeholder": "+998 (__) ___-__-___",
      "name_label": "Full Name",
      "name_placeholder": "Enter your name",
      "continue": "Continue",
      "phone_required": "Phone number is required",
      "phone_invalid": "Invalid phone format",
      "name_required": "Name is required",
      
      // Location
      "detecting_location": "Detecting your location...",
      "location_required": "Location access is required to continue",
      "location_denied": "Location access denied. Please enable it in your browser settings.",
      "retry": "Retry",
      
      // Menu
      "menu_title": "Menu",
      "categories": "Categories",
      "all": "All",
      "salads": "Salads",
      "hot_dishes": "Hot Dishes",
      "desserts": "Desserts",
      "beverages": "Beverages",
      "add_to_cart": "Add to Cart",
      "price": "Price",
      "sum": "sum",
      
      // Cart
      "cart": "Cart",
      "your_cart": "Your Cart",
      "cart_empty": "Cart is empty",
      "cart_empty_desc": "Add items from menu",
      "total": "Total",
      "place_order": "Place Order",
      "remove": "Remove",
      "back_to_menu": "Back to Menu",
      
      // Order
      "order_success": "Order Placed!",
      "order_id": "Order ID",
      "thank_you": "Thank you for your order!",
      "order_processing": "Your order has been received and is being prepared",
      "new_order": "New Order",
      "placing_order": "Placing order...",
      
      // QR Scanner
      "scan_qr": "Scan QR Code",
      "scan_table_qr": "Scan the QR code on your table",
      "scanning": "Scanning...",
      "point_camera": "Point your camera at the QR code",
      "qr_detected": "QR code detected",
      "invalid_qr": "Invalid QR code",
      "manual_entry": "Enter Manually",
      "table_id": "Table ID",
      "table_id_placeholder": "e.g., CAF-1",
      "location_name": "Location",
      "location_placeholder": "e.g., cafe-main",
      "submit": "Submit",
      "camera_permission_denied": "Camera access denied",
      "enable_camera": "Please enable camera access in settings",
      
      // Language
      "language": "Language",
      "russian": "Русский",
      "english": "English",
      
      // Errors
      "error": "Error",
      "error_general": "Something went wrong. Please try again.",
      "error_firebase": "Server connection error",
      
      // Profile
      "profile": "Profile",
      "my_info": "My Info",
      "order_history": "Order History",
      "total_orders": "Total Orders",
      "logout": "Logout",
      "no_orders": "No Orders",
      "no_orders_desc": "You haven't placed any orders yet",
      "clear_history": "Clear History",
      "confirm_clear_history": "Are you sure you want to clear order history?",
      "map": "Map",
      "view_location": "View on map",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // Default language
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
