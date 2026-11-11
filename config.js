/**
 * SPEGACONNECT - Konfigurasi Lingkungan Frontend
 * Nilai aman untuk publik (GitHub Pages) sesuai PRD Bab 10
 */
export const CONFIG = {
  APP_NAME: "SPEGACONNECT",
  APP_TAGLINE: "Jejaring Alumni, Kolaborasi Karir, & Beasiswa Almamater",
  APP_BASE_URL: window.location.origin + window.location.pathname.replace(/\/[^/]*$/, ''),
  GAS_WEB_APP_URL: "https://script.google.com/macros/s/AKfycbyFbZLxV0LcqIL5X5bP1ViKcI-E2hGoYxG9HIZNJF23eX8Y0b9rKX5WJ-ZG-GKMT6aC7w/exec",
  GOOGLE_CLIENT_ID: "1234567890-placeholder.apps.googleusercontent.com",
  IMAGE_MAX_UPLOAD_KB: 1024, // 1 MB
  DOC_MAX_UPLOAD_KB: 2048,   // 2 MB
  SESSION_TTL_HOURS: 168,    // 7 hari
  POLL_NOTIFICATION_SECONDS: 60,
  BANK_NAME: "Bank Nusantara",
  BANK_ACCOUNT_NUMBER: "0123456789",
  BANK_ACCOUNT_NAME: "Yayasan Alumni SPEGACONNECT"
};

// Akses global window untuk skrip non-module
if (typeof window !== 'undefined') {
  window.SPEGA_CONFIG = CONFIG;
}
