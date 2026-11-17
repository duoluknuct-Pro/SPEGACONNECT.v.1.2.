/**
 * SPEGACONNECT - Konfigurasi Lingkungan Frontend
 * Nilai aman untuk publik (GitHub Pages) sesuai PRD Bab 10
 */
export const CONFIG = {
  APP_NAME: "SPEGACONNECT",
  APP_TAGLINE: "Jejaring Alumni, Kolaborasi Karir, & Beasiswa Almamater",
  APP_BASE_URL: window.location.origin + window.location.pathname.replace(/\/[^/]*$/, ''),
  GAS_WEB_APP_URL: "https://script.google.com/macros/s/AKfycbyFbZLxV0LcqIL5X5bP1ViKcI-E2hGoYxG9HIZNJF23eX8Y0b9rKX5WJ-ZG-GKMT6aC7w/exec",
  GOOGLE_CLIENT_ID: "720301497665-sel4kdmhod81bub966atk7f92isj6923.apps.googleusercontent.com",
  IMAGE_MAX_UPLOAD_KB: 1024, // 1 MB
  DOC_MAX_UPLOAD_KB: 2048,   // 2 MB
  SESSION_TTL_HOURS: 168,    // 7 hari
  POLL_NOTIFICATION_SECONDS: 60,
  BANK_NAME: "Bank Syariah Indonesia Rungkut 1",
  BANK_ACCOUNT_NUMBER: "4403344333",
  BANK_ACCOUNT_NAME: "IKASPEGABAYA"
};

// Akses global window untuk skrip non-module
if (typeof window !== 'undefined') {
  window.SPEGA_CONFIG = CONFIG;
}
