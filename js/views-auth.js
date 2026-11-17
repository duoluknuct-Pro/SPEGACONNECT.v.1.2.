/**
 * SPEGACONNECT - Auth Views (Task 1.4)
 * Halaman Masuk, Daftar, Verifikasi Email, & Lupa Kata Sandi
 */

import { MockDB } from './mock-data.js';
import { Toast, escapeHTML } from './components.js';

export const AuthViews = {
  // #/masuk
  renderLogin() {
    return `
      <div class="min-h-[80vh] flex items-center justify-center py-10 px-4">
        <div class="bg-white border border-slate-100 shadow-xl rounded-3xl max-w-md w-full p-8">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-[#163b8c] mb-4">
              <i data-lucide="graduation-cap" class="w-8 h-8"></i>
            </div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Masuk ke SPEGACONNECT</h2>
            <p class="text-sm text-slate-500 mt-1">Platform jejaring alumni, kolaborasi karir, & donasi almamater</p>
          </div>

          <!-- Tombol Google Sign-In -->
          <button id="btn-google-login" class="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors shadow-xs mb-5">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Masuk dengan Google</span>
          </button>

          <div class="relative flex items-center justify-center mb-6">
            <div class="border-t border-slate-200 w-full"></div>
            <span class="bg-white px-3 text-xs text-slate-400 uppercase font-medium tracking-wider">atau dengan email</span>
          </div>

          <!-- Formulir Email -->
          <form id="form-login" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Alamat Email</label>
              <div class="relative">
                <i data-lucide="mail" class="w-5 h-5 text-slate-400 absolute left-3.5 top-3"></i>
                <input type="email" id="login-email" required placeholder="nama@alumni.id" value="dimas.pratama@gmail.com" class="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Kata Sandi</label>
                <a href="#/lupa-password" class="text-xs text-[#163b8c] hover:underline font-medium">Lupa Kata Sandi?</a>
              </div>
              <div class="relative">
                <i data-lucide="lock" class="w-5 h-5 text-slate-400 absolute left-3.5 top-3"></i>
                <input type="password" id="login-password" required placeholder="••••••••" value="alumni123" class="w-full h-11 pl-11 pr-11 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
                <button type="button" id="toggle-password" class="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
                  <i data-lucide="eye" class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <button type="submit" class="w-full h-11 bg-[#163b8c] hover:bg-[#123072] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 mt-2">
              <span>Masuk ke Akun</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </form>

          <div class="mt-6 text-center text-xs text-slate-500">
            Belum punya akun? 
            <a href="#/daftar" class="text-[#163b8c] font-semibold hover:underline">Daftar sekarang</a>
          </div>

          <!-- Quick Test Accounts Helper -->
          <div class="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500">
            <span class="font-semibold block mb-2 text-slate-700">Akun Uji Coba Cepat:</span>
            <div class="flex flex-wrap gap-1.5">
              <button onclick="document.getElementById('login-email').value='dimas.pratama@gmail.com'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Alumni Terverifikasi</button>
              <button onclick="document.getElementById('login-email').value='rizky.firmansyah@pln.co.id'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Alumni Menunggu</button>
              <button onclick="document.getElementById('login-email').value='admin@spegaconnect.id'" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Admin Utama</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // #/daftar
  renderRegister() {
    return `
      <div class="min-h-[80vh] flex items-center justify-center py-10 px-4">
        <div class="bg-white border border-slate-100 shadow-xl rounded-3xl max-w-md w-full p-8">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-4">
              <i data-lucide="user-plus" class="w-8 h-8"></i>
            </div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Daftar Akun Alumni</h2>
            <p class="text-sm text-slate-500 mt-1">Bergabunglah dalam wadah resmi alumni SPEGACONNECT</p>
          </div>

          <button id="btn-google-register" class="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors shadow-xs mb-5">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Daftar Cepat dengan Google</span>
          </button>

          <div class="relative flex items-center justify-center mb-6">
            <div class="border-t border-slate-200 w-full"></div>
            <span class="bg-white px-3 text-xs text-slate-400 uppercase font-medium tracking-wider">atau isi formulir</span>
          </div>

          <form id="form-register" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
              <input type="text" id="reg-name" required placeholder="Contoh: Dimas Pratama" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Aktif</label>
              <input type="email" id="reg-email" required placeholder="nama@domain.com" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Kata Sandi</label>
              <input type="password" id="reg-password" required placeholder="Minimal 8 karakter (huruf & angka)" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
              <!-- Password Strength Bar -->
              <div class="mt-2 flex gap-1">
                <div id="pwd-bar-1" class="h-1 flex-1 rounded-full bg-slate-200 transition-colors"></div>
                <div id="pwd-bar-2" class="h-1 flex-1 rounded-full bg-slate-200 transition-colors"></div>
                <div id="pwd-bar-3" class="h-1 flex-1 rounded-full bg-slate-200 transition-colors"></div>
              </div>
              <p id="pwd-hint" class="text-xs text-slate-400 mt-1">Gunakan kombinasi minimal 8 karakter huruf dan angka</p>
            </div>

            <div class="flex items-start gap-2.5 pt-1">
              <input type="checkbox" id="reg-agree" required class="mt-1 rounded text-[#163b8c] focus:ring-blue-200 w-4 h-4 border-slate-300" />
              <label for="reg-agree" class="text-xs text-slate-600 leading-relaxed">
                Saya menyetujui ketentuan komunitas SPEGACONNECT dan berkomitmen memberikan data alumni yang sah.
              </label>
            </div>

            <button type="submit" class="w-full h-11 bg-[#163b8c] hover:bg-[#123072] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 mt-2">
              <span>Daftar Akun Sekarang</span>
              <i data-lucide="check" class="w-4 h-4"></i>
            </button>
          </form>

          <div class="mt-6 text-center text-xs text-slate-500">
            Sudah punya akun alumni? 
            <a href="#/masuk" class="text-[#163b8c] font-semibold hover:underline">Masuk di sini</a>
          </div>
        </div>
      </div>
    `;
  },

  // #/verifikasi-email
  renderVerifyEmail() {
    return `
      <div class="min-h-[75vh] flex items-center justify-center py-10 px-4">
        <div class="bg-white border border-slate-100 shadow-xl rounded-3xl max-w-md w-full p-8 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mb-5">
            <i data-lucide="mail-check" class="w-9 h-9"></i>
          </div>
          <h2 class="text-2xl font-bold font-heading text-slate-900 mb-2">Email Berhasil Diverifikasi!</h2>
          <p class="text-sm text-slate-600 leading-relaxed mb-6">
            Akun alumni Anda kini telah aktif. Silakan lengkapi profil dan unggah ijazah kelulusan Anda untuk mendapatkan lencana terverifikasi.
          </p>
          <div class="space-y-3">
            <a href="#/dashboard" class="w-full h-11 bg-[#163b8c] hover:bg-[#123072] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2">
              <span>Buka Dasbor Saya</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
            <a href="#/profil" class="w-full h-11 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center">
              Lengkapi Data Profil Sekarang
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // #/lupa-password
  renderForgotPassword() {
    return `
      <div class="min-h-[75vh] flex items-center justify-center py-10 px-4">
        <div class="bg-white border border-slate-100 shadow-xl rounded-3xl max-w-md w-full p-8">
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-4">
              <i data-lucide="key-round" class="w-8 h-8"></i>
            </div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Pemulihan Kata Sandi</h2>
            <p class="text-sm text-slate-500 mt-1">Masukkan alamat email Anda untuk menerima tautan pemulihan kata sandi (berlaku 60 menit).</p>
          </div>

          <form id="form-forgot" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Alamat Email Terdaftar</label>
              <input type="email" id="forgot-email" required placeholder="nama@alumni.id" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
            </div>

            <button type="submit" class="w-full h-11 bg-[#163b8c] hover:bg-[#123072] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2">
              <span>Kirim Tautan Pemulihan</span>
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </form>

          <div class="mt-6 text-center text-xs">
            <a href="#/masuk" class="text-slate-600 hover:text-[#163b8c] font-medium inline-flex items-center gap-1">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              <span>Kembali ke Halaman Masuk</span>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  initEvents() {
    // Handler toggle password visibility
    const toggleBtn = document.getElementById('toggle-password');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const input = document.getElementById('login-password');
        if (input.type === 'password') {
          input.type = 'text';
        } else {
          input.type = 'password';
        }
      });
    }

    // Handler login submit
    const loginForm = document.getElementById('form-login');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const db = MockDB.getData();
        const user = db.Users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (user) {
          MockDB.setCurrentUserId(user.id);
          Toast.show(`Selamat datang kembali, ${user.nama}!`, 'success');
          if (user.role === 'ADMIN') {
            window.location.hash = '#/admin/dashboard';
          } else {
            window.location.hash = '#/dashboard';
          }
        } else {
          Toast.show('Email atau kata sandi tidak ditemukan dalam data dummy.', 'error');
        }
      });
    }

    // Handler Google Login simulation
    const googleLoginBtn = document.getElementById('btn-google-login');
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener('click', () => {
        MockDB.setCurrentUserId('usr-alumni-01');
        Toast.show('Berhasil masuk dengan akun Google: Dimas Pratama', 'success');
        window.location.hash = '#/dashboard';
      });
    }

    // Handler Google Register simulation
    const googleRegBtn = document.getElementById('btn-google-register');
    if (googleRegBtn) {
      googleRegBtn.addEventListener('click', () => {
        MockDB.setCurrentUserId('usr-alumni-01');
        Toast.show('Pendaftaran Google berhasil disimulasikan.', 'success');
        window.location.hash = '#/profil';
      });
    }

    // Handler register password meter
    const regPassword = document.getElementById('reg-password');
    if (regPassword) {
      regPassword.addEventListener('input', (e) => {
        const val = e.target.value;
        const b1 = document.getElementById('pwd-bar-1');
        const b2 = document.getElementById('pwd-bar-2');
        const b3 = document.getElementById('pwd-bar-3');
        const hint = document.getElementById('pwd-hint');

        let strength = 0;
        if (val.length >= 6) strength++;
        if (val.length >= 8 && /[A-Za-z]/.test(val) && /[0-9]/.test(val)) strength++;
        if (val.length >= 10 && /[^A-Za-z0-9]/.test(val)) strength++;

        b1.className = 'h-1 flex-1 rounded-full ' + (strength >= 1 ? 'bg-amber-400' : 'bg-slate-200');
        b2.className = 'h-1 flex-1 rounded-full ' + (strength >= 2 ? 'bg-blue-500' : 'bg-slate-200');
        b3.className = 'h-1 flex-1 rounded-full ' + (strength >= 3 ? 'bg-emerald-500' : 'bg-slate-200');

        if (strength === 0) hint.textContent = 'Minimal 8 karakter huruf dan angka';
        else if (strength === 1) hint.textContent = 'Kata sandi cukup lemah';
        else if (strength === 2) hint.textContent = 'Kata sandi baik & memenuhi syarat';
        else hint.textContent = 'Kata sandi sangat kuat!';
      });
    }

    // Handler register submit
    const regForm = document.getElementById('form-register');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nama = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();

        Toast.show(`Tautan verifikasi email telah dikirim ke ${email}. Akun aktif disimulasikan.`, 'success', 4000);
        setTimeout(() => {
          window.location.hash = '#/verifikasi-email';
        }, 800);
      });
    }

    // Handler forgot password submit
    const forgotForm = document.getElementById('form-forgot');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value.trim();
        Toast.show(`Tautan instruksi reset kata sandi telah dikirim ke ${email}`, 'success', 4000);
        forgotForm.reset();
      });
    }
  }
};
