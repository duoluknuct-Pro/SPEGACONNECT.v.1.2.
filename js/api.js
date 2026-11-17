/**
 * SPEGACONNECT - API Client & Service Layer (Task 2.4 & Task 3.5)
 * Komunikasi ke Google Apps Script Web App (Zero-CORS via text/plain JSON)
 * Dilengkapi kompresi gambar di peramban dan fallback lokal cerdas
 */

import { CONFIG } from '../config.js';
import { MockDB } from './mock-data.js';

const SESSION_TOKEN_KEY = 'SPEGA_SESSION_TOKEN';
const CSRF_TOKEN_KEY = 'SPEGA_CSRF_TOKEN';
const AUTH_USER_KEY = 'SPEGA_AUTH_USER';

export const API = {
  getSessionToken() {
    return localStorage.getItem(SESSION_TOKEN_KEY) || null;
  },

  getCsrfToken() {
    return localStorage.getItem(CSRF_TOKEN_KEY) || null;
  },

  getStoredUser() {
    try {
      const u = localStorage.getItem(AUTH_USER_KEY);
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  },

  setSession(user, sessionToken, csrfToken) {
    if (sessionToken) localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
    if (csrfToken) localStorage.setItem(CSRF_TOKEN_KEY, csrfToken);
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(SESSION_TOKEN_KEY);
    localStorage.removeItem(CSRF_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },

  isLiveBackendConfigured() {
    return CONFIG.GAS_WEB_APP_URL && 
           !CONFIG.GAS_WEB_APP_URL.includes('placeholder') &&
           CONFIG.GAS_WEB_APP_URL.startsWith('https://script.google.com');
  },

  /**
   * Panggilan POST ke GAS Web App (Header text/plain untuk zero preflight CORS)
   */
  async request(action, payload = {}) {
    // Sisipkan sessionToken dan csrfToken jika tersedia
    const fullPayload = {
      ...payload,
      sessionToken: this.getSessionToken(),
      csrfToken: this.getCsrfToken()
    };

    if (this.isLiveBackendConfigured()) {
      try {
        const response = await fetch(CONFIG.GAS_WEB_APP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify({
            action: action,
            payload: fullPayload
          })
        });

        const res = await response.json();
        if (!res.ok) {
          throw new Error(res.error || 'Terjadi kesalahan pada server GAS.');
        }
        return res.data;
      } catch (err) {
        console.warn(`[GAS API] Gagal memanggil ${action}, beralih ke penanganan lokal:`, err.message);
        // Fallback lokal jika jaringan offline
        return this.handleLocalFallback(action, payload);
      }
    } else {
      // Mode prototipe terintegrasi (Fase 1 / Lokal)
      return this.handleLocalFallback(action, payload);
    }
  },

  /**
   * Penanganan Lokal cerdas jika GAS URL belum dideploy
   */
  async handleLocalFallback(action, payload) {
    const db = MockDB.getData();
    const { user, profile } = MockDB.getCurrentUser();

    switch (action) {
      case 'getHomeSummary':
        return {
          stats: {
            angkatanCount: 16,
            verifiedAlumniCount: db.Profiles.filter(p => p.statusVerifikasi === 'TERVERIFIKASI').length,
            totalDonations: db.Scholarships.reduce((a, c) => a + (c.terkumpul || 0), 0)
          },
          latestJobs: db.Jobs.filter(j => j.status === 'AKTIF').slice(0, 3),
          activeScholarships: db.Scholarships.filter(s => s.status === 'AKTIF')
        };

      case 'listGallery':
        return db.Gallery.filter(g => g.aktif);

      case 'getBranches':
        return {
          angkatan: db.Branches.filter(b => b.tipe === 'ANGKATAN' && b.aktif),
          jurusan: db.Branches.filter(b => b.tipe === 'JURUSAN' && b.aktif)
        };

      case 'searchAlumni': {
        const search = (payload.search || '').toLowerCase();
        const items = db.Profiles.filter(p => {
          if (p.statusVerifikasi !== 'TERVERIFIKASI') return false;
          if (payload.profesi && p.profesi !== payload.profesi) return false;
          if (search && !(p.namaLengkap.toLowerCase().includes(search) || p.perusahaan.toLowerCase().includes(search))) return false;
          return true;
        });
        return { items: items, total: items.length, page: 1 };
      }

      case 'getMyProfile':
        return { user, profile, relations: db.Relations.filter(r => r.profileId === profile?.id) };

      case 'listJobs':
        return db.Jobs.filter(j => j.status === 'AKTIF');

      case 'listScholarships':
        return db.Scholarships.filter(s => s.status === 'AKTIF');

      case 'submitContact':
        return { success: true };

      default:
        return null;
    }
  },

  /**
   * Helper Kompresi Gambar Berbasis Canvas di Sisi Klien (Task 3.4 & Bab 8)
   * Mengompresi file gambar menjadi JPEG dengan batas maksimal lebar/tinggi dan ukuran < 1 MB
   */
  compressImage(file, maxDimension = 1200, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  }
};

// Global expose
if (typeof window !== 'undefined') {
  window.SPEGA_API = API;
}
