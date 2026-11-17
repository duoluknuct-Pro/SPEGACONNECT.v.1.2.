/**
 * SPEGACONNECT - Hash Router & View Controller (Task 1.2)
 * Menangani SPA navigation (#/...) untuk area Alumni, Admin, dan Autentikasi
 */

import { MockDB } from './mock-data.js';
import { AuthViews } from './views-auth.js';
import { AlumniViews } from './views-alumni.js';
import { AdminViews } from './views-admin.js';
import { Toast, renderEmptyState } from './components.js';

export const Router = {
  routes: {
    // Auth Routes
    '#/masuk': () => AuthViews.renderLogin(),
    '#/daftar': () => AuthViews.renderRegister(),
    '#/verifikasi-email': () => AuthViews.renderVerifyEmail(),
    '#/lupa-password': () => AuthViews.renderForgotPassword(),

    // Alumni Routes
    '#/dashboard': () => AlumniViews.renderDashboard(),
    '#/alumni': () => AlumniViews.renderAlumniList(),
    '#/alumni/:id': (id) => AlumniViews.renderAlumniDetail(id),
    '#/profil': () => AlumniViews.renderProfileEdit(),
    '#/pengaturan': () => AlumniViews.renderSettings(),
    '#/lowongan': () => AlumniViews.renderJobsList(),
    '#/lowongan/:id': (id) => AlumniViews.renderJobDetail(id),
    '#/lowongan/baru': () => AlumniViews.renderJobCreate(),
    '#/lowongan/saya': () => AlumniViews.renderMyJobs(),
    '#/donasi': () => AlumniViews.renderDonationForm(),
    '#/donasi/:id': (id) => AlumniViews.renderDonationDetail(id),
    '#/donasi/riwayat': () => AlumniViews.renderDonationHistory(),
    '#/notifikasi': () => AlumniViews.renderNotifications(),

    // Admin Routes
    '#/admin/dashboard': () => AdminViews.renderDashboard(),
    '#/admin/alumni': () => AdminViews.renderAlumniVerification(),
    '#/admin/lowongan': () => AdminViews.renderJobModeration(),
    '#/admin/angkatan-jurusan': () => AdminViews.renderBranchesManagement(),
    '#/admin/donasi': () => AdminViews.renderDonationAndScholarship(),
    '#/admin/galeri': () => AdminViews.renderGalleryManagement(),
    '#/admin/pengguna': () => AdminViews.renderUsersManagement()
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    // Initial route handling
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/dashboard';
    } else {
      this.handleRoute();
    }
  },

  handleRoute() {
    const rawHash = window.location.hash || '#/dashboard';
    const cleanHash = rawHash.split('?')[0];
    const container = document.getElementById('app-main-content');
    const pageTitleElem = document.getElementById('app-page-title');

    if (!container) return;

    // Check auth/role permission
    const { user } = MockDB.getCurrentUser();
    if (cleanHash.startsWith('#/admin') && user.role !== 'ADMIN') {
      Toast.show('Halaman ini khusus untuk Pengelola Alumni / Admin.', 'warning');
      window.location.hash = '#/dashboard';
      return;
    }

    // Match Route & Params
    let matchedHandler = null;
    let param = null;

    for (const [routePattern, handler] of Object.entries(this.routes)) {
      if (routePattern.includes(':id')) {
        const base = routePattern.replace(':id', '');
        if (cleanHash.startsWith(base)) {
          matchedHandler = handler;
          param = cleanHash.substring(base.length);
          break;
        }
      } else if (routePattern === cleanHash) {
        matchedHandler = handler;
        break;
      }
    }

    // Update active navigation state
    this.updateActiveNav(cleanHash);

    // Update Page Header Title
    if (pageTitleElem) {
      pageTitleElem.textContent = this.getPageTitle(cleanHash);
    }

    // Render View
    if (matchedHandler) {
      container.innerHTML = `
        <div class="animate-fade-in">
          ${matchedHandler(param)}
        </div>
      `;

      // Init component event handlers
      AuthViews.initEvents();
      AlumniViews.initEvents();
      AdminViews.initEvents();
    } else {
      container.innerHTML = `
        <div class="py-16 text-center">
          ${renderEmptyState('alert-circle', 'Halaman Tidak Ditemukan', 'Halaman yang Anda tuju belum terdaftar atau tautan telah kadaluwarsa.')}
          <div class="mt-4">
            <a href="#/dashboard" class="px-5 py-2.5 rounded-xl bg-[#163b8c] text-white text-xs font-semibold hover:bg-[#123072] transition-colors">
              Kembali ke Dasbor
            </a>
          </div>
        </div>
      `;
    }

    // Re-init Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  getPageTitle(hash) {
    const titles = {
      '#/dashboard': 'Dasbor Alumni',
      '#/alumni': 'Direktori Alumni',
      '#/profil': 'Profil Saya',
      '#/pengaturan': 'Pengaturan Akun',
      '#/lowongan': 'Bursa Lowongan Kerja',
      '#/lowongan/baru': 'Ajukan Lowongan Baru',
      '#/lowongan/saya': 'Lowongan Saya',
      '#/donasi': 'Donasi Beasiswa',
      '#/donasi/riwayat': 'Riwayat Donasi',
      '#/notifikasi': 'Pemberitahuan',
      '#/masuk': 'Masuk Akun',
      '#/daftar': 'Daftar Akun',
      '#/admin/dashboard': 'Dasbor Pengelola',
      '#/admin/alumni': 'Verifikasi Ijazah',
      '#/admin/lowongan': 'Moderasi Bursa Karir',
      '#/admin/angkatan-jurusan': 'Master Angkatan & Jurusan',
      '#/admin/donasi': 'Donasi & Beasiswa',
      '#/admin/galeri': 'Kelola Galeri',
      '#/admin/pengguna': 'Kelola Pengguna'
    };
    return titles[hash] || 'SPEGACONNECT';
  },

  updateActiveNav(activeHash) {
    document.querySelectorAll('[data-route]').forEach(el => {
      const targetRoute = el.getAttribute('data-route');
      const isMatch = activeHash === targetRoute || (targetRoute !== '#/dashboard' && activeHash.startsWith(targetRoute));

      if (isMatch) {
        el.classList.add('bg-blue-50', 'text-[#163b8c]', 'font-bold');
        el.classList.remove('text-slate-600', 'hover:bg-slate-50');
      } else {
        el.classList.remove('bg-blue-50', 'text-[#163b8c]', 'font-bold');
        el.classList.add('text-slate-600', 'hover:bg-slate-50');
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.SPEGA_ROUTER = Router;
}
