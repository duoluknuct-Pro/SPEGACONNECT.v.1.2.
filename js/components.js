/**
 * SPEGACONNECT - UI Components & Helpers (Fase 1)
 * Patuh Design System Bab 4 & Keamanan XSS Bab 8
 */

// Helper sanitasi teks untuk mencegah XSS
export function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Format mata uang Rupiah
export function formatRupiah(nominal) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(nominal || 0);
}

// Format tanggal lokal Indonesia
export function formatTanggal(dateString, includeTime = false) {
  if (!dateString) return '-';
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Generate warna avatar berbasis hash nama
export function getNameColor(name) {
  const colors = [
    '#163b8c', '#0f766e', '#1e40af', '#6b21a8', 
    '#9d174d', '#c2410c', '#b45309', '#374151'
  ];
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Komponen Avatar
export function renderAvatar(name, imageUrl, size = 'md') {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
    '2xl': 'w-28 h-28 text-3xl font-bold'
  };

  const safeSize = sizeClasses[size] || sizeClasses.md;
  const initial = (name || 'U').charAt(0).toUpperCase();

  if (imageUrl) {
    return `
      <div class="${safeSize} rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-xs bg-slate-100 flex items-center justify-center">
        <img src="${escapeHTML(imageUrl)}" alt="${escapeHTML(name)}" class="w-full h-full object-cover" loading="lazy" decoding="async" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'font-semibold text-white\\'>${initial}</span>'; this.parentElement.style.backgroundColor='${getNameColor(name)}';" />
      </div>
    `;
  }

  const bgColor = getNameColor(name);
  return `
    <div class="${safeSize} rounded-full flex items-center justify-center text-white font-semibold shrink-0 shadow-xs border border-white/20 select-none" style="background-color: ${bgColor}">
      <span>${initial}</span>
    </div>
  `;
}

// Komponen Badge Status
export function renderBadge(status) {
  const s = String(status || '').toUpperCase();
  const config = {
    // Profil & Umum
    TERVERIFIKASI: { text: 'Terverifikasi', bg: 'bg-emerald-50', textCol: 'text-emerald-700', border: 'border-emerald-200', icon: 'check-circle-2' },
    MENUNGGU: { text: 'Menunggu Verifikasi', bg: 'bg-amber-50', textCol: 'text-amber-700', border: 'border-amber-200', icon: 'clock' },
    BELUM_DIAJUKAN: { text: 'Belum Diajukan', bg: 'bg-slate-50', textCol: 'text-slate-600', border: 'border-slate-200', icon: 'alert-circle' },
    DITOLAK: { text: 'Ditolak', bg: 'bg-rose-50', textCol: 'text-rose-700', border: 'border-rose-200', icon: 'x-circle' },
    
    // Lowongan & Donasi
    AKTIF: { text: 'Aktif', bg: 'bg-emerald-50', textCol: 'text-emerald-700', border: 'border-emerald-200', icon: 'check' },
    MENUNGGU_MODERASI: { text: 'Menunggu Moderasi', bg: 'bg-amber-50', textCol: 'text-amber-700', border: 'border-amber-200', icon: 'clock' },
    MENUNGGU_PEMBAYARAN: { text: 'Menunggu Transfer', bg: 'bg-amber-50', textCol: 'text-amber-700', border: 'border-amber-200', icon: 'credit-card' },
    MENUNGGU_VERIFIKASI: { text: 'Menunggu Verifikasi', bg: 'bg-amber-50', textCol: 'text-amber-700', border: 'border-amber-200', icon: 'clock' },
    DITERIMA: { text: 'Diterima', bg: 'bg-emerald-50', textCol: 'text-emerald-700', border: 'border-emerald-200', icon: 'check-circle' },
    DITUTUP: { text: 'Ditutup', bg: 'bg-slate-100', textCol: 'text-slate-600', border: 'border-slate-200', icon: 'lock' },
    KEDALUWARSA: { text: 'Kedaluwarsa', bg: 'bg-slate-100', textCol: 'text-slate-500', border: 'border-slate-200', icon: 'calendar-x' },
    DITANGGUHKAN: { text: 'Ditangguhkan', bg: 'bg-rose-50', textCol: 'text-rose-700', border: 'border-rose-200', icon: 'shield-alert' },
    SELESAI: { text: 'Selesai', bg: 'bg-blue-50', textCol: 'text-blue-700', border: 'border-blue-200', icon: 'award' }
  };

  const item = config[s] || { text: s || 'Status', bg: 'bg-slate-50', textCol: 'text-slate-600', border: 'border-slate-200', icon: 'info' };

  return `
    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.bg} ${item.textCol} ${item.border}">
      <i data-lucide="${item.icon}" class="w-3.5 h-3.5 shrink-0"></i>
      <span>${escapeHTML(item.text)}</span>
    </span>
  `;
}

// Toast Notification System
export const Toast = {
  container: null,
  init() {
    if (this.container) return;
    this.container = document.createElement('div');
    this.container.id = 'spega-toast-container';
    this.container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
    document.body.appendChild(this.container);
  },
  show(message, type = 'info', duration = 3500) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm font-medium animate-fade-in transition-all duration-300`;

    const styles = {
      success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      error: 'bg-rose-50 text-rose-900 border-rose-200',
      warning: 'bg-amber-50 text-amber-900 border-amber-200',
      info: 'bg-blue-50 text-blue-900 border-blue-200'
    };

    const icons = {
      success: 'check-circle-2',
      error: 'alert-triangle',
      warning: 'alert-circle',
      info: 'info'
    };

    toast.className += ` ${styles[type] || styles.info}`;
    toast.innerHTML = `
      <i data-lucide="${icons[type] || icons.info}" class="w-5 h-5 shrink-0 mt-0.5"></i>
      <div class="flex-1">${escapeHTML(message)}</div>
      <button class="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;

    this.container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// Modal Helper
export const Modal = {
  open(title, contentHtml, onConfirm = null, confirmText = 'Simpan', confirmVariant = 'primary') {
    const existing = document.getElementById('spega-global-modal');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'spega-global-modal';
    backdrop.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in';

    const btnStyles = {
      primary: 'bg-[#163b8c] hover:bg-[#123072] text-white',
      danger: 'bg-rose-600 hover:bg-rose-700 text-white',
      success: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    };

    backdrop.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-lg font-bold font-heading text-slate-900">${escapeHTML(title)}</h3>
          <button id="modal-close-btn" class="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 text-slate-700">
          ${contentHtml}
        </div>
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button id="modal-cancel-btn" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-sm font-semibold transition-colors">
            Batal
          </button>
          ${onConfirm ? `
            <button id="modal-confirm-btn" class="px-4 py-2.5 rounded-xl ${btnStyles[confirmVariant] || btnStyles.primary} text-sm font-semibold shadow-xs transition-colors flex items-center gap-2">
              <span>${escapeHTML(confirmText)}</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    if (window.lucide) window.lucide.createIcons();

    const closeModal = () => backdrop.remove();
    document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn')?.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    if (onConfirm) {
      document.getElementById('modal-confirm-btn')?.addEventListener('click', async () => {
        const result = await onConfirm();
        if (result !== false) closeModal();
      });
    }
  }
};

// Empty State Component
export function renderEmptyState(icon, title, subtitle, actionBtn = null) {
  return `
    <div class="py-12 px-6 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-xs">
      <div class="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <i data-lucide="${escapeHTML(icon || 'inbox')}" class="w-8 h-8"></i>
      </div>
      <h4 class="text-base font-bold text-slate-800 font-heading mb-1">${escapeHTML(title)}</h4>
      <p class="text-sm text-slate-500 max-w-sm mb-5">${escapeHTML(subtitle)}</p>
      ${actionBtn ? actionBtn : ''}
    </div>
  `;
}

// Skeleton Loader Generator
export function renderSkeletonCards(count = 3) {
  let cards = '';
  for (let i = 0; i < count; i++) {
    cards += `
      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full skeleton-shimmer shrink-0"></div>
          <div class="flex-1 flex flex-col gap-2">
            <div class="h-4 w-3/4 rounded-md skeleton-shimmer"></div>
            <div class="h-3 w-1/2 rounded-md skeleton-shimmer"></div>
          </div>
        </div>
        <div class="h-3 w-full rounded-md skeleton-shimmer mt-2"></div>
        <div class="h-3 w-4/5 rounded-md skeleton-shimmer"></div>
        <div class="h-9 w-full rounded-xl skeleton-shimmer mt-3"></div>
      </div>
    `;
  }
  return cards;
}

// Global expose
if (typeof window !== 'undefined') {
  window.SPEGA_COMPONENTS = {
    escapeHTML,
    formatRupiah,
    formatTanggal,
    getNameColor,
    renderAvatar,
    renderBadge,
    Toast,
    Modal,
    renderEmptyState,
    renderSkeletonCards
  };
}
