/**
 * SPEGACONNECT - Alumni & Member Views (Tasks 1.5, 1.6, 1.7, 1.8)
 * Seluruh komponen & tampilan area Alumni terintegrasi data dummy Bab 10
 */

import { MockDB } from './mock-data.js';
import { 
  escapeHTML, 
  formatRupiah, 
  formatTanggal, 
  renderAvatar, 
  renderBadge, 
  renderEmptyState, 
  Toast, 
  Modal 
} from './components.js';

export const AlumniViews = {
  // === TASK 1.5: DASHBOARD ===
  renderDashboard() {
    const { user, profile } = MockDB.getCurrentUser();
    const db = MockDB.getData();

    const activeJobs = db.Jobs.filter(j => j.status === 'AKTIF').slice(0, 3);
    const myDonations = db.Donations.filter(d => d.userId === user.id);
    const unreadNotifs = db.Notifications.filter(n => n.userId === user.id && !n.dibaca);
    const verifiedCount = db.Profiles.filter(p => p.statusVerifikasi === 'TERVERIFIKASI').length;

    const isVerified = profile?.statusVerifikasi === 'TERVERIFIKASI';
    const isWaiting = profile?.statusVerifikasi === 'MENUNGGU';

    return `
      <div class="space-y-6">
        <!-- Banner Status Verifikasi -->
        ${isVerified ? `
          <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                <i data-lucide="shield-check" class="w-8 h-8 text-[#f8af26]"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-bold font-heading">Akun Terverifikasi Resmi</h2>
                  <span class="px-2 py-0.5 rounded-full bg-[#f8af26] text-slate-900 text-xs font-bold tracking-wide">ALUMNI SAH</span>
                </div>
                <p class="text-sm text-emerald-100 mt-0.5">Identitas almamater Anda telah diverifikasi oleh pengelola. Profil Anda tampil di direktori alumni.</p>
              </div>
            </div>
            <a href="#/alumni" class="px-4 py-2.5 rounded-xl bg-white text-emerald-800 text-sm font-semibold hover:bg-emerald-50 transition-colors shrink-0 shadow-xs flex items-center gap-2">
              <i data-lucide="users" class="w-4 h-4"></i>
              <span>Jelajahi Direktori</span>
            </a>
          </div>
        ` : isWaiting ? `
          <div class="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                <i data-lucide="clock" class="w-6 h-6"></i>
              </div>
              <div>
                <h2 class="text-base font-bold font-heading">Pengajuan Verifikasi Sedang Ditinjau</h2>
                <p class="text-xs text-amber-800 mt-0.5">Dokumen ijazah Anda telah masuk dalam antrean verifikasi admin. Perkiraan waktu 1-2 hari kerja.</p>
              </div>
            </div>
            <a href="#/profil" class="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shrink-0">
              Lihat Berkas Saya
            </a>
          </div>
        ` : `
          <div class="bg-blue-50 border border-blue-200 rounded-3xl p-6 text-blue-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-[#163b8c]">
                <i data-lucide="alert-circle" class="w-6 h-6"></i>
              </div>
              <div>
                <h2 class="text-base font-bold font-heading">Lengkapi Profil & Unggah Ijazah</h2>
                <p class="text-xs text-blue-800 mt-0.5">Dapatkan lencana emas almamater dan akses penuh ke pencarian sesama alumni dengan mengajukan verifikasi.</p>
              </div>
            </div>
            <a href="#/profil" class="px-4 py-2.5 rounded-xl bg-[#163b8c] text-white text-xs font-semibold hover:bg-[#123072] transition-colors shrink-0 flex items-center gap-2">
              <i data-lucide="upload" class="w-4 h-4"></i>
              <span>Ajukan Verifikasi</span>
            </a>
          </div>
        `}

        <!-- Statistik Ringkas Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alumni Terverifikasi</span>
              <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#163b8c] flex items-center justify-center">
                <i data-lucide="users" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading text-slate-900">${verifiedCount}</div>
            <div class="text-xs text-slate-400 mt-1">Terdaftar dalam direktori</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lowongan Aktif</span>
              <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <i data-lucide="briefcase" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading text-slate-900">${activeJobs.length}</div>
            <div class="text-xs text-slate-400 mt-1">Bursa kerja internal</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Donasi Saya</span>
              <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <i data-lucide="heart-handshake" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading text-slate-900">${myDonations.length}</div>
            <div class="text-xs text-slate-400 mt-1">Transaksi partisipasi</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pesan Baru</span>
              <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <i data-lucide="bell" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading text-slate-900">${unreadNotifs.length}</div>
            <div class="text-xs text-slate-400 mt-1">Notifikasi belum dibaca</div>
          </div>
        </div>

        <!-- Kolom Dua Sisi: Lowongan Terbaru & Donasi Terakhir -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Lowongan Kerja Terbaru (2 Kolom) -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold font-heading text-slate-900">Lowongan Kerja Terkini</h3>
                <p class="text-xs text-slate-500">Peluang karir internal dari sesama rekan alumni</p>
              </div>
              <a href="#/lowongan" class="text-xs font-semibold text-[#163b8c] hover:underline flex items-center gap-1">
                <span>Lihat Semua</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>

            <div class="space-y-3">
              ${activeJobs.length === 0 ? renderEmptyState('briefcase', 'Belum ada lowongan', 'Saat ini belum ada lowongan aktif yang tayang.') : ''}
              ${activeJobs.map(job => `
                <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="space-y-1.5">
                    <div class="flex items-center gap-2">
                      <h4 class="font-bold text-slate-900 hover:text-[#163b8c] transition-colors">
                        <a href="#/lowongan/${job.id}">${escapeHTML(job.judul)}</a>
                      </h4>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#163b8c] border border-blue-100">${escapeHTML(job.tipe)}</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500">
                      <span class="flex items-center gap-1 font-medium text-slate-700">
                        <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400"></i>
                        ${escapeHTML(job.perusahaan)}
                      </span>
                      <span class="flex items-center gap-1">
                        <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
                        ${escapeHTML(job.lokasi)}
                      </span>
                    </div>
                  </div>
                  <a href="#/lowongan/${job.id}" class="px-4 py-2 rounded-xl bg-slate-50 hover:bg-[#163b8c] hover:text-white text-slate-700 text-xs font-semibold transition-colors shrink-0 text-center border border-slate-200">
                    Lihat Rincian
                  </a>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Aksi Cepat & Riwayat Donasi (1 Kolom) -->
          <div class="space-y-6">
            <!-- Shortcut Cepat -->
            <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <h3 class="text-sm font-bold font-heading text-slate-900 mb-3 uppercase tracking-wider">Aksi Cepat</h3>
              <div class="grid grid-cols-2 gap-2.5">
                <a href="#/lowongan/baru" class="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 text-slate-700 hover:text-[#163b8c] text-xs font-semibold flex flex-col items-center justify-center gap-2 text-center transition-colors">
                  <i data-lucide="plus-circle" class="w-5 h-5 text-[#163b8c]"></i>
                  <span>Pasang Lowongan</span>
                </a>
                <a href="#/donasi" class="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-100 text-slate-700 hover:text-amber-700 text-xs font-semibold flex flex-col items-center justify-center gap-2 text-center transition-colors">
                  <i data-lucide="gift" class="w-5 h-5 text-amber-600"></i>
                  <span>Salurkan Donasi</span>
                </a>
                <a href="#/alumni" class="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 text-slate-700 hover:text-emerald-700 text-xs font-semibold flex flex-col items-center justify-center gap-2 text-center transition-colors">
                  <i data-lucide="search" class="w-5 h-5 text-emerald-600"></i>
                  <span>Cari Teman</span>
                </a>
                <a href="#/profil" class="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-100 text-slate-700 hover:text-purple-700 text-xs font-semibold flex flex-col items-center justify-center gap-2 text-center transition-colors">
                  <i data-lucide="user" class="w-5 h-5 text-purple-600"></i>
                  <span>Perbarui Profil</span>
                </a>
              </div>
            </div>

            <!-- Riwayat Partisipasi Donasi Terakhir -->
            <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-bold font-heading text-slate-900 uppercase tracking-wider">Donasi Terakhir</h3>
                <a href="#/donasi/riwayat" class="text-xs text-[#163b8c] font-semibold hover:underline">Semua</a>
              </div>
              <div class="space-y-3">
                ${myDonations.length === 0 ? `
                  <p class="text-xs text-slate-400 text-center py-4">Belum ada catatan donasi.</p>
                ` : myDonations.slice(0, 2).map(d => {
                  const sch = db.Scholarships.find(s => s.id === d.scholarshipId);
                  return `
                    <div class="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-slate-800">${formatRupiah(d.totalTransfer)}</span>
                        ${renderBadge(d.status)}
                      </div>
                      <p class="text-xs text-slate-600 line-clamp-1">${escapeHTML(sch?.judul || 'Program Beasiswa')}</p>
                      <div class="text-[11px] text-slate-400">${formatTanggal(d.createdAt)}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.5: PENCARIAN ALUMNI ===
  renderAlumniList() {
    const db = MockDB.getData();
    const angkatanList = db.Branches.filter(b => b.tipe === 'ANGKATAN' && b.aktif);
    const jurusanList = db.Branches.filter(b => b.tipe === 'JURUSAN' && b.aktif);
    
    // Hanya profil terverifikasi yang tampil sesuai Bab 6 & 10
    const verifiedProfiles = db.Profiles.filter(p => p.statusVerifikasi === 'TERVERIFIKASI');

    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Direktori Alumni</h2>
          <p class="text-sm text-slate-500 mt-1">Temukan rekan satu almamater, seangkatan, maupun lintas profesi di seluruh Indonesia.</p>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <!-- Pencarian Teks -->
            <div class="md:col-span-2 relative">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
              <input type="text" id="filter-search" placeholder="Cari nama, perusahaan, atau keahlian..." class="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
            </div>

            <!-- Filter Angkatan -->
            <div>
              <select id="filter-angkatan" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100 bg-white">
                <option value="">Semua Angkatan</option>
                ${angkatanList.map(a => `<option value="${a.id}">${escapeHTML(a.nama)}</option>`).join('')}
              </select>
            </div>

            <!-- Filter Jurusan -->
            <div>
              <select id="filter-jurusan" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100 bg-white">
                <option value="">Semua Jurusan</option>
                ${jurusanList.map(j => `<option value="${j.id}">${escapeHTML(j.nama)} (${escapeHTML(j.kode)})</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Secondary Filters Row -->
          <div class="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
            <span class="font-semibold text-slate-500">Filter Bidang:</span>
            <button class="filter-prof-btn px-3 py-1.5 rounded-xl bg-[#163b8c] text-white font-medium" data-prof="">Semua</button>
            <button class="filter-prof-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium" data-prof="TEKNOLOGI">Teknologi</button>
            <button class="filter-prof-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium" data-prof="KEUANGAN">Keuangan</button>
            <button class="filter-prof-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium" data-prof="WIRAUSAHA">Wirausaha</button>
            <button class="filter-prof-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium" data-prof="PENDIDIKAN">Pendidikan</button>
            <button class="filter-prof-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium" data-prof="KESEHATAN">Kesehatan</button>
          </div>
        </div>

        <!-- Grid Kartu Alumni -->
        <div id="alumni-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- Diisi via initEvents() -->
        </div>

        <!-- Tombol Muat Lebih Banyak / Status -->
        <div id="alumni-pagination" class="text-center pt-4">
          <button id="btn-load-more" class="px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 shadow-xs transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    `;
  },

  // === TASK 1.5: DETAIL ALUMNI ===
  renderAlumniDetail(profileId) {
    const db = MockDB.getData();
    const profile = db.Profiles.find(p => p.id === profileId) || db.Profiles[0];
    const user = db.Users.find(u => u.id === profile.userId);
    const relations = db.Relations.filter(r => r.profileId === profile.id);

    return `
      <div class="max-w-4xl mx-auto space-y-6">
        <a href="#/alumni" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#163b8c] font-medium">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Kembali ke Direktori Alumni</span>
        </a>

        <!-- Header Card Profil -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div class="h-36 bg-gradient-to-r from-[#163b8c] via-blue-800 to-[#123072] relative"></div>
          <div class="px-6 pb-6 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 -mt-16">
            <div class="flex flex-col md:flex-row items-start md:items-end gap-4">
              <div class="p-1 rounded-full bg-white shadow-md">
                ${renderAvatar(profile.namaLengkap, profile.fotoFileId, '2xl')}
              </div>
              <div class="mb-2">
                <div class="flex items-center gap-2">
                  <h2 class="text-2xl font-bold font-heading text-slate-900">${escapeHTML(profile.namaLengkap)}</h2>
                  <span title="Alumni Terverifikasi" class="text-[#f8af26]">
                    <i data-lucide="check-circle-2" class="w-6 h-6 fill-[#f8af26] text-white"></i>
                  </span>
                </div>
                <p class="text-sm font-medium text-slate-700">${escapeHTML(profile.perusahaan || '-')}</p>
                <div class="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span class="flex items-center gap-1">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
                    ${escapeHTML(profile.kotaDomisili || '-')}
                  </span>
                  <span class="px-2 py-0.5 rounded-full bg-blue-50 text-[#163b8c] font-semibold">${escapeHTML(profile.profesi)}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 mb-2 w-full md:w-auto">
              ${profile.linkedinUrl ? `
                <a href="${escapeHTML(profile.linkedinUrl)}" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors">
                  <i data-lucide="external-link" class="w-4 h-4 text-blue-600"></i>
                  <span>LinkedIn</span>
                </a>
              ` : ''}
              <button id="btn-report-alumni" class="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors">
                <i data-lucide="flag" class="w-4 h-4"></i>
                <span>Lapor Data</span>
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Bio & Kontak (2 Kolom) -->
          <div class="md:col-span-2 space-y-6">
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h3 class="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                <i data-lucide="file-text" class="w-5 h-5 text-[#163b8c]"></i>
                <span>Tentang Alumni</span>
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">${escapeHTML(profile.bio || 'Belum ada biodata singkat yang dicantumkan.')}</p>
            </div>

            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h3 class="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                <i data-lucide="graduation-cap" class="w-5 h-5 text-[#163b8c]"></i>
                <span>Riwayat Almamater</span>
              </h3>
              <div class="space-y-4">
                ${relations.map(rel => {
                  const jur = db.Branches.find(b => b.id === rel.branchJurusanId);
                  const ang = db.Branches.find(b => b.id === rel.branchAngkatanId);
                  return `
                    <div class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div class="w-10 h-10 rounded-xl bg-blue-100 text-[#163b8c] flex items-center justify-center shrink-0">
                        <i data-lucide="award" class="w-5 h-5"></i>
                      </div>
                      <div>
                        <h4 class="text-sm font-bold text-slate-900">${escapeHTML(jur?.nama || 'Jurusan Almamater')} (${escapeHTML(jur?.kode || '-')})</h4>
                        <p class="text-xs text-slate-600 mt-0.5">${escapeHTML(ang?.nama || 'Angkatan')} • Jenjang ${escapeHTML(rel.gelar || 'S1')}</p>
                        <p class="text-xs text-slate-400 mt-1">Tahun Masuk: ${rel.tahunMasuk} • Kelulusan: ${rel.tahunLulus || 'Aktif'}</p>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Info Kontak Publik (1 Kolom) -->
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h3 class="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
                <i data-lucide="contact" class="w-5 h-5 text-[#163b8c]"></i>
                <span>Kontak Terhubung</span>
              </h3>
              ${profile.tampilkanKontak ? `
                <div class="space-y-3 text-xs">
                  <div>
                    <span class="text-slate-400 block mb-1">Email Resmi:</span>
                    <a href="mailto:${escapeHTML(profile.emailPublik || user?.email)}" class="font-medium text-[#163b8c] hover:underline">${escapeHTML(profile.emailPublik || user?.email)}</a>
                  </div>
                  <div>
                    <span class="text-slate-400 block mb-1">Nomor Telepon / WA:</span>
                    <span class="font-medium text-slate-800">${escapeHTML(profile.teleponPublik || '-')}</span>
                  </div>
                </div>
              ` : `
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <i data-lucide="eye-off" class="w-6 h-6 text-slate-400 mx-auto mb-2"></i>
                  <p class="text-xs text-slate-500">Alumni memilih untuk merahasiakan rincian kontak langsung.</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.6: PROFIL SAYA & VERIFIKASI ===
  renderProfileEdit() {
    const { user, profile, relations } = MockDB.getCurrentUser();
    const db = MockDB.getData();
    const angkatanList = db.Branches.filter(b => b.tipe === 'ANGKATAN' && b.aktif);
    const jurusanList = db.Branches.filter(b => b.tipe === 'JURUSAN' && b.aktif);

    const rel = relations[0] || {};

    return `
      <div class="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Kelola Profil Alumni</h2>
          <p class="text-sm text-slate-500 mt-1">Lengkapi data diri dan riwayat almamater Anda untuk keperluan buku induk dan verifikasi alumni.</p>
        </div>

        <form id="form-profile" class="space-y-6">
          <!-- Foto Profil & Nama -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
            <h3 class="text-base font-bold font-heading text-slate-900">Foto & Identitas Dasar</h3>
            
            <div class="flex items-center gap-5">
              <div id="avatar-preview-container" class="shrink-0">
                ${renderAvatar(profile?.namaLengkap || user.nama, profile?.fotoFileId, 'xl')}
              </div>
              <div class="space-y-1.5 flex-1">
                <label class="block text-xs font-semibold text-slate-700">Ganti Foto Profil</label>
                <input type="file" id="input-foto-profil" accept="image/jpeg,image/png,image/webp" class="text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#163b8c] hover:file:bg-blue-100" />
                <p class="text-[11px] text-slate-400">Format JPG, PNG, atau WEBP. Maksimal 1 MB (dikompresi otomatis).</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Nama Lengkap (Sesuai Ijazah)</label>
                <input type="text" id="prof-nama" required minlength="3" maxlength="80" value="${escapeHTML(profile?.namaLengkap || user.nama)}" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Kategori Profesi</label>
                <select id="prof-kategori" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="TEKNOLOGI" ${profile?.profesi === 'TEKNOLOGI' ? 'selected' : ''}>Teknologi & IT</option>
                  <option value="KEUANGAN" ${profile?.profesi === 'KEUANGAN' ? 'selected' : ''}>Keuangan & Perbankan</option>
                  <option value="PENDIDIKAN" ${profile?.profesi === 'PENDIDIKAN' ? 'selected' : ''}>Pendidikan & Akademik</option>
                  <option value="KESEHATAN" ${profile?.profesi === 'KESEHATAN' ? 'selected' : ''}>Kesehatan & Medis</option>
                  <option value="WIRAUSAHA" ${profile?.profesi === 'WIRAUSAHA' ? 'selected' : ''}>Wirausaha & Bisnis Mandiri</option>
                  <option value="PEMERINTAHAN" ${profile?.profesi === 'PEMERINTAHAN' ? 'selected' : ''}>Pemerintahan & BUMN</option>
                  <option value="LAINNYA" ${profile?.profesi === 'LAINNYA' ? 'selected' : ''}>Lainnya</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Perusahaan / Instansi / Tempat Usaha</label>
                <input type="text" id="prof-perusahaan" maxlength="100" value="${escapeHTML(profile?.perusahaan || '')}" placeholder="Contoh: PT Nusantara Digital" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Kota Domisili Saat Ini</label>
                <input type="text" id="prof-kota" maxlength="60" value="${escapeHTML(profile?.kotaDomisili || '')}" placeholder="Contoh: Kota Bandung" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-semibold text-slate-700">Bio Singkat</label>
                <span id="bio-counter" class="text-xs text-slate-400">0 / 300</span>
              </div>
              <textarea id="prof-bio" maxlength="300" rows="3" placeholder="Ceritakan sekilas keahlian atau minat Anda..." class="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100">${escapeHTML(profile?.bio || '')}</textarea>
            </div>
          </div>

          <!-- Riwayat Almamater -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 class="text-base font-bold font-heading text-slate-900">Riwayat Pendidikan Almamater</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Jurusan</label>
                <select id="prof-jurusan" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100 bg-white">
                  ${jurusanList.map(j => `<option value="${j.id}" ${rel.branchJurusanId === j.id ? 'selected' : ''}>${escapeHTML(j.nama)}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tahun Angkatan</label>
                <select id="prof-angkatan" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100 bg-white">
                  ${angkatanList.map(a => `<option value="${a.id}" ${rel.branchAngkatanId === a.id ? 'selected' : ''}>${escapeHTML(a.nama)}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Jenjang / Gelar</label>
                <select id="prof-gelar" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100 bg-white">
                  <option value="D3" ${rel.gelar === 'D3' ? 'selected' : ''}>Diploma (D3)</option>
                  <option value="S1" ${rel.gelar === 'S1' ? 'selected' : ''}>Sarjana (S1)</option>
                  <option value="S2" ${rel.gelar === 'S2' ? 'selected' : ''}>Magister (S2)</option>
                  <option value="LAINNYA" ${rel.gelar === 'LAINNYA' ? 'selected' : ''}>Lainnya</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tahun Kelulusan</label>
                <input type="number" id="prof-tahun-lulus" value="${rel.tahunLulus || 2012}" min="1970" max="2030" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>
          </div>

          <!-- Verifikasi Ijazah Dokumen Privat -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold font-heading text-slate-900">Dokumen Ijazah (Privat)</h3>
                <p class="text-xs text-slate-500">Ijazah hanya dapat dilihat oleh admin almamater untuk keperluan validasi.</p>
              </div>
              ${renderBadge(profile?.statusVerifikasi || 'BELUM_DIAJUKAN')}
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <input type="file" id="input-dokumen-ijazah" accept=".pdf,image/jpeg,image/png" class="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#163b8c] file:text-white hover:file:bg-[#123072]" />
              <p class="text-[11px] text-slate-500">Maksimal 2 MB format PDF atau JPG/PNG. Dokumen yang telah diunggah: <strong class="text-slate-700">${escapeHTML(profile?.ijazahFileId || 'ijazah_alumni_terverifikasi.pdf')}</strong></p>
            </div>
          </div>

          <!-- Tombol Aksi Simpan & Ajukan -->
          <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button type="submit" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2">
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>Simpan Perubahan Profil</span>
            </button>
            <button type="button" id="btn-ajukan-verifikasi" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#f8af26] hover:bg-amber-500 text-slate-900 text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4"></i>
              <span>Ajukan Verifikasi Resmi</span>
            </button>
          </div>
        </form>
      </div>
    `;
  },

  // === TASK 1.6: PENGATURAN AKUN ===
  renderSettings() {
    const { user, profile } = MockDB.getCurrentUser();

    return `
      <div class="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Pengaturan Akun & Privasi</h2>
          <p class="text-sm text-slate-500 mt-1">Kelola keamanan sandi, privasi kontak publik, dan integrasi login.</p>
        </div>

        <!-- Privasi Kontak Publik -->
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 class="text-base font-bold font-heading text-slate-900">Visibilitas Kontak</h3>
          <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span class="text-sm font-semibold text-slate-800 block">Tampilkan Kontak di Direktori</span>
              <p class="text-xs text-slate-500 mt-0.5">Izinkan alumni lain melihat email dan nomor telepon pada profil publik Anda.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="toggle-kontak-publik" ${profile?.tampilkanKontak ? 'checked' : ''} class="sr-only peer">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#163b8c]"></div>
            </label>
          </div>
        </div>

        <!-- Ubah Kata Sandi -->
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 class="text-base font-bold font-heading text-slate-900">Ubah Kata Sandi</h3>
          <form id="form-change-pwd" class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi Saat Ini</label>
              <input type="password" required placeholder="••••••••" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi Baru (Min. 8 karakter)</label>
              <input type="password" required placeholder="••••••••" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Konfirmasi Kata Sandi Baru</label>
              <input type="password" required placeholder="••••••••" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
            </div>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors">
              Perbarui Kata Sandi
            </button>
          </form>
        </div>

        <!-- Zona Bahaya: Hapus Akun -->
        <div class="bg-rose-50/60 border border-rose-200 p-6 rounded-3xl space-y-3">
          <h3 class="text-base font-bold font-heading text-rose-900">Zona Bahaya</h3>
          <p class="text-xs text-rose-700 leading-relaxed">Menghapus akun akan menganonimkan data keikutsertaan Anda dan menghapus akses permanen ke SPEGACONNECT.</p>
          <button id="btn-hapus-akun" class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors">
            Hapus Akun Saya
          </button>
        </div>
      </div>
    `;
  },

  // === TASK 1.7: LOWONGAN KERJA INTERNAL ===
  renderJobsList() {
    const db = MockDB.getData();
    const activeJobs = db.Jobs.filter(j => j.status === 'AKTIF');

    return `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Bursa Lowongan Kerja Internal</h2>
            <p class="text-sm text-slate-500 mt-1">Peluang karir terkurasi yang dibagikan khusus oleh jaringan alumni almamater.</p>
          </div>
          <div class="flex items-center gap-2">
            <a href="#/lowongan/saya" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-xs">
              Lowongan Saya
            </a>
            <a href="#/lowongan/baru" class="px-4 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-2">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Pasang Lowongan</span>
            </a>
          </div>
        </div>

        <!-- Banner Peringatan Keamanan Lowongan -->
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
          <i data-lucide="shield-alert" class="w-5 h-5 text-amber-700 shrink-0 mt-0.5"></i>
          <div>
            <span class="font-bold block mb-0.5">Peringatan Rekrutmen Bersih:</span>
            SPEGACONNECT tidak memungut biaya apapun dalam proses rekrutmen. Segera laporkan jika ada indikasi pungutan biaya tiket, akomodasi, atau tes berbayar dari pemasang lowongan.
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-3">
          <div class="flex-1 relative">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
            <input type="text" id="job-search-input" placeholder="Cari posisi pekerjaan atau nama perusahaan..." class="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
          </div>
          <div class="flex gap-2">
            <select id="job-type-select" class="h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] bg-white">
              <option value="">Semua Tipe Kerja</option>
              <option value="PENUH_WAKTU">Penuh Waktu</option>
              <option value="PARUH_WAKTU">Paruh Waktu</option>
              <option value="KONTRAK">Kontrak</option>
              <option value="MAGANG">Magang</option>
              <option value="FREELANCE">Freelance</option>
            </select>
          </div>
        </div>

        <!-- Daftar Kartu Lowongan -->
        <div id="jobs-container" class="space-y-4">
          ${activeJobs.length === 0 ? renderEmptyState('briefcase', 'Belum ada lowongan aktif', 'Saat ini belum ada lowongan kerja yang tayang.') : ''}
          ${activeJobs.map(job => `
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div class="space-y-2 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-lg font-bold font-heading text-slate-900 hover:text-[#163b8c] transition-colors">
                    <a href="#/lowongan/${job.id}">${escapeHTML(job.judul)}</a>
                  </h3>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#163b8c] border border-blue-100">
                    ${escapeHTML(job.tipe.replace('_', ' '))}
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                  <span class="flex items-center gap-1 font-semibold text-slate-800">
                    <i data-lucide="building-2" class="w-4 h-4 text-slate-400"></i>
                    ${escapeHTML(job.perusahaan)}
                  </span>
                  <span class="flex items-center gap-1">
                    <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i>
                    ${escapeHTML(job.lokasi)}
                  </span>
                  <span class="flex items-center gap-1 text-slate-400">
                    <i data-lucide="calendar" class="w-4 h-4"></i>
                    Tayang s/d ${formatTanggal(job.tanggalTayangSampai)}
                  </span>
                </div>
                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">${escapeHTML(job.deskripsi)}</p>
              </div>

              <div class="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <a href="#/lowongan/${job.id}" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold transition-colors shadow-xs text-center flex items-center justify-center gap-2">
                  <span>Rincian & Lamar</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // === TASK 1.7: DETAIL LOWONGAN ===
  renderJobDetail(jobId) {
    const db = MockDB.getData();
    const job = db.Jobs.find(j => j.id === jobId) || db.Jobs[0];
    const poster = db.Users.find(u => u.id === job.postedByUserId);

    return `
      <div class="max-w-3xl mx-auto space-y-6">
        <a href="#/lowongan" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#163b8c] font-medium">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Kembali ke Bursa Lowongan</span>
        </a>

        <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div class="space-y-3 border-b border-slate-100 pb-6">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#163b8c] border border-blue-100">
                ${escapeHTML(job.tipe.replace('_', ' '))}
              </span>
              ${renderBadge(job.status)}
            </div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">${escapeHTML(job.judul)}</h2>
            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span class="font-bold text-slate-800">${escapeHTML(job.perusahaan)}</span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i>
                ${escapeHTML(job.lokasi)}
              </span>
              <span>•</span>
              <span class="text-xs text-slate-400">Batas Tayang: ${formatTanggal(job.tanggalTayangSampai)}</span>
            </div>
          </div>

          <!-- Deskripsi Pekerjaan -->
          <div class="space-y-3">
            <h3 class="text-base font-bold font-heading text-slate-900">Deskripsi & Kualifikasi</h3>
            <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">${escapeHTML(job.deskripsi)}</p>
          </div>

          <!-- Informasi Pengaju / Alumni -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-blue-100 text-[#163b8c] flex items-center justify-center font-bold">
                <i data-lucide="user" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="text-xs text-slate-400 block">Dipasang oleh Alumni:</span>
                <span class="text-xs font-bold text-slate-800">${escapeHTML(poster?.nama || 'Rekan Alumni')}</span>
              </div>
            </div>
            <span class="text-[11px] text-slate-400">Dipublikasikan ${formatTanggal(job.createdAt)}</span>
          </div>

          <!-- Tombol Aksi Lamaran -->
          <div class="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
            ${job.linkLamaran.startsWith('http') ? `
              <a href="${escapeHTML(job.linkLamaran)}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto flex-1 h-12 bg-[#163b8c] hover:bg-[#123072] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2">
                <span>Kirim Lamaran (Buka Tautan Karir)</span>
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            ` : `
              <a href="mailto:${escapeHTML(job.linkLamaran)}?subject=Lamaran%20Posisi%20${encodeURIComponent(job.judul)}" class="w-full sm:w-auto flex-1 h-12 bg-[#163b8c] hover:bg-[#123072] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2">
                <i data-lucide="mail" class="w-4 h-4"></i>
                <span>Kirim Lamaran via Email (${escapeHTML(job.linkLamaran)})</span>
              </a>
            `}
            <button onclick="navigator.clipboard.writeText(window.location.href); window.SPEGA_COMPONENTS.Toast.show('Tautan lowongan berhasil disalin!', 'success');" class="w-full sm:w-auto px-5 h-12 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
              <i data-lucide="share-2" class="w-4 h-4"></i>
              <span>Bagikan</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.7: AJUKAN LOWONGAN BARU ===
  renderJobCreate() {
    return `
      <div class="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Ajukan Lowongan Kerja Internal</h2>
          <p class="text-sm text-slate-500 mt-1">Buka kesempatan karir atau magang bagi adik-adik kelas dan sesama alumni. Lowongan akan dimoderasi sebelum tayang.</p>
        </div>

        <form id="form-create-job" class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Judul Posisi Pekerjaan</label>
            <input type="text" id="job-title" required minlength="10" maxlength="120" placeholder="Contoh: Junior Cloud DevOps Engineer" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Perusahaan / Organisasi</label>
              <input type="text" id="job-company" required minlength="2" maxlength="100" placeholder="Contoh: PT Cipta Solusi" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Lokasi Kerja</label>
              <input type="text" id="job-location" required maxlength="100" placeholder="Contoh: Jakarta Selatan / Hybrid" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tipe Pekerjaan</label>
            <select id="job-type" class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] bg-white">
              <option value="PENUH_WAKTU">Penuh Waktu (Full-time)</option>
              <option value="PARUH_WAKTU">Paruh Waktu (Part-time)</option>
              <option value="KONTRAK">Kontrak Proyek</option>
              <option value="MAGANG">Magang / Internship</option>
              <option value="FREELANCE">Freelance / Lepas</option>
            </select>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Deskripsi & Syarat Kualifikasi</label>
              <span id="job-desc-counter" class="text-xs text-slate-400">0 / 3000 (Min. 50 karakter)</span>
            </div>
            <textarea id="job-desc" required minlength="50" maxlength="3000" rows="5" placeholder="Tuliskan tanggung jawab utama, keterampilan yang dibutuhkan, dan benefit yang ditawarkan..." class="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]"></textarea>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tautan Lamaran / Email HRD</label>
            <input type="text" id="job-link" required placeholder="https://perusahaan.com/karir atau email: hrd@perusahaan.com" class="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c]" />
            <p class="text-[11px] text-slate-400 mt-1">Harus diawali https:// atau berupa alamat email yang sah.</p>
          </div>

          <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <a href="#/lowongan" class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              Batal
            </a>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-sm font-semibold shadow-xs transition-colors flex items-center gap-2">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>Kirim untuk Dimoderasi</span>
            </button>
          </div>
        </form>
      </div>
    `;
  },

  // === TASK 1.7: LOWONGAN SAYA ===
  renderMyJobs() {
    const { user } = MockDB.getCurrentUser();
    const db = MockDB.getData();
    const myJobs = db.Jobs.filter(j => j.postedByUserId === user.id);

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Lowongan yang Saya Pasang</h2>
            <p class="text-sm text-slate-500 mt-1">Pantau status moderasi dan kelola lowongan aktif yang Anda ajukan.</p>
          </div>
          <a href="#/lowongan/baru" class="px-4 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Pasang Baru</span>
          </a>
        </div>

        <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          ${myJobs.length === 0 ? renderEmptyState('briefcase', 'Belum Ada Lowongan', 'Anda belum pernah mengajukan lowongan pekerjaan.') : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-100">
                  <tr>
                    <th class="py-3.5 px-6">Posisi & Perusahaan</th>
                    <th class="py-3.5 px-6">Tipe</th>
                    <th class="py-3.5 px-6">Tanggal Pasang</th>
                    <th class="py-3.5 px-6">Status Moderasi</th>
                    <th class="py-3.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  ${myJobs.map(job => `
                    <tr>
                      <td class="py-4 px-6">
                        <span class="font-bold text-slate-900 block">${escapeHTML(job.judul)}</span>
                        <span class="text-xs text-slate-500">${escapeHTML(job.perusahaan)} • ${escapeHTML(job.lokasi)}</span>
                      </td>
                      <td class="py-4 px-6 text-xs">${escapeHTML(job.tipe)}</td>
                      <td class="py-4 px-6 text-xs text-slate-500">${formatTanggal(job.createdAt)}</td>
                      <td class="py-4 px-6">
                        ${renderBadge(job.status)}
                        ${job.status === 'DITOLAK' && job.alasanTolak ? `
                          <p class="text-[11px] text-rose-600 mt-1">Alasan: ${escapeHTML(job.alasanTolak)}</p>
                        ` : ''}
                      </td>
                      <td class="py-4 px-6 text-right space-x-2">
                        <a href="#/lowongan/${job.id}" class="text-xs text-[#163b8c] hover:underline font-semibold">Lihat</a>
                        ${job.status === 'AKTIF' ? `
                          <button onclick="window.SPEGA_ALUMNI_CONTROLLER.closeMyJob('${job.id}')" class="text-xs text-slate-500 hover:text-rose-600 font-medium">Tutup</button>
                        ` : ''}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  },

  // === TASK 1.8: FORMULIR DONASI BEASISWA ===
  renderDonationForm() {
    const db = MockDB.getData();
    const campaigns = db.Scholarships.filter(s => s.status === 'AKTIF');

    return `
      <div class="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Salurkan Donasi Beasiswa</h2>
          <p class="text-sm text-slate-500 mt-1">Bantu masa depan adik-adik kelas almamater melalui program beasiswa terpercaya.</p>
        </div>

        <form id="form-donate" class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
          <!-- Pilih Kampanye -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Pilih Program Beasiswa</label>
            <select id="donate-campaign" class="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#163b8c] bg-white">
              ${campaigns.map(c => `<option value="${c.id}">${escapeHTML(c.judul)} (Terkumpul ${formatRupiah(c.terkumpul)})</option>`).join('')}
            </select>
          </div>

          <!-- Pilihan Nominal Preset -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Pilihan Nominal Cepat</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button type="button" class="preset-btn px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#163b8c] hover:bg-blue-50 transition-all text-center" data-val="50000">Rp 50.000</button>
              <button type="button" class="preset-btn px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#163b8c] hover:bg-blue-50 transition-all text-center" data-val="100000">Rp 100.000</button>
              <button type="button" class="preset-btn px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#163b8c] hover:bg-blue-50 transition-all text-center" data-val="250000">Rp 250.000</button>
              <button type="button" class="preset-btn px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#163b8c] hover:bg-blue-50 transition-all text-center" data-val="500000">Rp 500.000</button>
              <button type="button" class="preset-btn px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#163b8c] hover:bg-blue-50 transition-all text-center" data-val="1000000">Rp 1.000.000</button>
              <button type="button" class="preset-btn px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#163b8c] hover:bg-blue-50 transition-all text-center" data-val="2500000">Rp 2.500.000</button>
            </div>
          </div>

          <!-- Nominal Custom -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Nominal Donasi Lainnya (Rp)</label>
            <div class="relative">
              <span class="absolute left-4 top-3.5 text-sm font-bold text-slate-400">Rp</span>
              <input type="number" id="donate-nominal" required min="10000" max="50000000" value="100000" step="1000" class="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 text-sm font-bold focus:outline-none focus:border-[#163b8c]" />
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Minimal Rp 10.000, maksimal Rp 50.000.000 per transaksi.</p>
          </div>

          <!-- Toggle Anonim -->
          <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span class="text-sm font-semibold text-slate-800 block">Donasi sebagai Hamba Allah (Anonim)</span>
              <p class="text-xs text-slate-500 mt-0.5">Nama Anda tidak akan ditampilkan di daftar donatur publik.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="donate-anonim" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#163b8c]"></div>
            </label>
          </div>

          <!-- Tombol Lanjut -->
          <button type="submit" class="w-full h-12 bg-[#163b8c] hover:bg-[#123072] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2">
            <span>Lanjut ke Instruksi Pembayaran</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </form>
      </div>
    `;
  },

  // === TASK 1.8: DETAIL INSTRUKSI DONASI & UPLOAD BUKTI ===
  renderDonationDetail(donationId) {
    const db = MockDB.getData();
    const donation = db.Donations.find(d => d.id === donationId) || db.Donations[0];
    const scholarship = db.Scholarships.find(s => s.id === donation.scholarshipId);

    const isPendingTransfer = donation.status === 'MENUNGGU_PEMBAYARAN';
    const isPendingVerify = donation.status === 'MENUNGGU_VERIFIKASI';
    const isAccepted = donation.status === 'DITERIMA';

    return `
      <div class="max-w-2xl mx-auto space-y-6">
        <a href="#/donasi/riwayat" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#163b8c] font-medium">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Kembali ke Riwayat Donasi</span>
        </a>

        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span class="text-xs text-slate-400 block">ID Transaksi Donasi</span>
              <span class="font-mono text-sm font-bold text-slate-800">${escapeHTML(donation.id)}</span>
            </div>
            ${renderBadge(donation.status)}
          </div>

          <!-- Total Transfer dengan Kode Unik -->
          <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 rounded-3xl p-6 text-center space-y-2">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Transfer Wajib Sama Persis</span>
            <div class="text-3xl sm:text-4xl font-extrabold font-heading text-[#163b8c] flex items-center justify-center gap-2">
              <span>${formatRupiah(donation.totalTransfer)}</span>
              <button onclick="navigator.clipboard.writeText('${donation.totalTransfer}'); window.SPEGA_COMPONENTS.Toast.show('Jumlah transfer berhasil disalin!', 'success');" class="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
                <i data-lucide="copy" class="w-5 h-5"></i>
              </button>
            </div>
            <p class="text-xs text-slate-500">Termasuk 3 digit kode unik acak: <strong class="text-indigo-700">${donation.kodeUnik}</strong> (untuk verifikasi otomatis admin)</p>
          </div>

          <!-- Info Rekening Bank Almamater -->
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Rekening Bank Tujuan</h4>
            <div class="flex items-center justify-between">
              <div>
                <span class="font-bold text-slate-900 block text-base">${escapeHTML(window.SPEGA_CONFIG?.BANK_NAME || 'Bank Nusantara')}</span>
                <span class="font-mono text-lg font-bold text-slate-800 tracking-wider">${escapeHTML(window.SPEGA_CONFIG?.BANK_ACCOUNT_NUMBER || '0123456789')}</span>
                <span class="text-xs text-slate-500 block">a.n. ${escapeHTML(window.SPEGA_CONFIG?.BANK_ACCOUNT_NAME || 'Yayasan Alumni SPEGACONNECT')}</span>
              </div>
              <button onclick="navigator.clipboard.writeText('${window.SPEGA_CONFIG?.BANK_ACCOUNT_NUMBER || '0123456789'}'); window.SPEGA_COMPONENTS.Toast.show('Nomor rekening berhasil disalin!', 'success');" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-xs flex items-center gap-1.5">
                <i data-lucide="copy" class="w-4 h-4"></i>
                <span>Salin Rekening</span>
              </button>
            </div>
          </div>

          <!-- Unggah Bukti Transfer -->
          ${isPendingTransfer ? `
            <form id="form-upload-proof" class="space-y-4 pt-2 border-t border-slate-100">
              <h4 class="text-sm font-bold text-slate-900">Unggah Bukti Transfer Pembayaran</h4>
              <p class="text-xs text-slate-500">Setelah melakukan transfer lewat ATM atau Mobile Banking, unggah struk atau tangkapan layar pembayaran di bawah ini.</p>
              
              <div class="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <input type="file" id="input-proof-file" required accept="image/jpeg,image/png,application/pdf" class="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#163b8c] file:text-white hover:file:bg-[#123072]" />
                <p class="text-[11px] text-slate-500">Maksimal 2 MB (JPG, PNG, atau PDF).</p>
              </div>

              <button type="submit" class="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2">
                <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                <span>Kirim Bukti Pembayaran</span>
              </button>
            </form>
          ` : isPendingVerify ? `
            <div class="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
              <div class="flex items-center gap-2 font-bold text-sm">
                <i data-lucide="clock" class="w-5 h-5 text-amber-600"></i>
                <span>Bukti Transfer Telah Diterima & Sedang Diverifikasi</span>
              </div>
              <p class="text-xs text-amber-800 leading-relaxed">Admin pengelola beasiswa sedang mencocokkan mutasi rekening. Anda akan menerima notifikasi in-app setelah donasi disetujui.</p>
            </div>
          ` : isAccepted ? `
            <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <div class="flex items-center gap-2 font-bold text-sm">
                <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>
                <span>Donasi Telah Diterima Sah</span>
              </div>
              <p class="text-xs text-emerald-800 leading-relaxed">Terima kasih atas kebaikan Anda! Dana telah masuk ke kas program "${escapeHTML(scholarship?.judul || 'Beasiswa')}".</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  // === TASK 1.8: RIWAYAT DONASI SAYA ===
  renderDonationHistory() {
    const { user } = MockDB.getCurrentUser();
    const db = MockDB.getData();
    const myDonations = db.Donations.filter(d => d.userId === user.id);

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Riwayat Donasi Beasiswa</h2>
            <p class="text-sm text-slate-500 mt-1">Daftar seluruh kontribusi sosial dan beasiswa almamater yang pernah Anda salurkan.</p>
          </div>
          <a href="#/donasi" class="px-4 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-2">
            <i data-lucide="heart" class="w-4 h-4"></i>
            <span>Donasi Baru</span>
          </a>
        </div>

        <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          ${myDonations.length === 0 ? renderEmptyState('heart-handshake', 'Belum Ada Riwayat Donasi', 'Anda belum pernah melakukan transaksi donasi beasiswa.') : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-100">
                  <tr>
                    <th class="py-3.5 px-6">ID & Program</th>
                    <th class="py-3.5 px-6">Tanggal</th>
                    <th class="py-3.5 px-6">Nominal Pokok</th>
                    <th class="py-3.5 px-6">Total Transfer</th>
                    <th class="py-3.5 px-6">Status</th>
                    <th class="py-3.5 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  ${myDonations.map(d => {
                    const sch = db.Scholarships.find(s => s.id === d.scholarshipId);
                    return `
                      <tr>
                        <td class="py-4 px-6">
                          <span class="font-bold text-slate-900 block">${escapeHTML(sch?.judul || 'Program Beasiswa')}</span>
                          <span class="font-mono text-xs text-slate-400">${escapeHTML(d.id)}</span>
                        </td>
                        <td class="py-4 px-6 text-xs text-slate-500">${formatTanggal(d.createdAt)}</td>
                        <td class="py-4 px-6 text-xs font-medium">${formatRupiah(d.nominal)}</td>
                        <td class="py-4 px-6 text-sm font-bold text-[#163b8c]">${formatRupiah(d.totalTransfer)}</td>
                        <td class="py-4 px-6">${renderBadge(d.status)}</td>
                        <td class="py-4 px-6 text-right">
                          <a href="#/donasi/${d.id}" class="text-xs text-[#163b8c] hover:underline font-semibold">Instruksi / Bukti</a>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  },

  // === TASK 1.8: NOTIFIKASI IN-APP ===
  renderNotifications() {
    const { user } = MockDB.getCurrentUser();
    const db = MockDB.getData();
    const notifs = db.Notifications.filter(n => n.userId === user.id);

    return `
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Pemberitahuan Akun</h2>
            <p class="text-sm text-slate-500 mt-1">Notifikasi hasil verifikasi profil, moderasi lowongan, dan status donasi.</p>
          </div>
          <button id="btn-mark-all-read" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-xs">
            Tandai Semua Dibaca
          </button>
        </div>

        <div class="space-y-3">
          ${notifs.length === 0 ? renderEmptyState('bell', 'Tidak ada notifikasi', 'Semua informasi akun Anda telah terbaca.') : ''}
          ${notifs.map(n => {
            const icons = {
              PROFIL: 'shield-check',
              LOWONGAN: 'briefcase',
              DONASI: 'heart-handshake',
              PENGUMUMAN: 'info'
            };
            return `
              <div class="p-5 rounded-2xl border transition-all ${n.dibaca ? 'bg-white border-slate-100' : 'bg-blue-50/40 border-blue-200 shadow-xs'} flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl ${n.dibaca ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-[#163b8c]'} flex items-center justify-center shrink-0">
                  <i data-lucide="${icons[n.tipe] || 'bell'}" class="w-5 h-5"></i>
                </div>
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-bold text-slate-900">${escapeHTML(n.judul)}</h4>
                    <span class="text-[11px] text-slate-400">${formatTanggal(n.createdAt, true)}</span>
                  </div>
                  <p class="text-xs text-slate-600 leading-relaxed">${escapeHTML(n.pesan)}</p>
                  ${n.link ? `
                    <div class="pt-1">
                      <a href="${escapeHTML(n.link)}" class="text-xs font-semibold text-[#163b8c] hover:underline inline-flex items-center gap-1">
                        <span>Buka Rincian</span>
                        <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                      </a>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // === EVENT BINDINGS FOR ALUMNI VIEWS ===
  initEvents() {
    // 1. Alumni Search & Filter Live Logic
    const alumniGrid = document.getElementById('alumni-grid');
    if (alumniGrid) {
      let activeFilterProf = '';
      const renderCards = () => {
        const db = MockDB.getData();
        const searchVal = (document.getElementById('filter-search')?.value || '').toLowerCase().trim();
        const angkatanVal = document.getElementById('filter-angkatan')?.value || '';
        const jurusanVal = document.getElementById('filter-jurusan')?.value || '';

        // Hanya profil terverifikasi
        const filtered = db.Profiles.filter(p => {
          if (p.statusVerifikasi !== 'TERVERIFIKASI') return false;
          if (activeFilterProf && p.profesi !== activeFilterProf) return false;

          const matchText = (p.namaLengkap || '').toLowerCase().includes(searchVal) ||
                            (p.perusahaan || '').toLowerCase().includes(searchVal) ||
                            (p.kotaDomisili || '').toLowerCase().includes(searchVal);
          if (!matchText) return false;

          const rels = db.Relations.filter(r => r.profileId === p.id);
          if (angkatanVal && !rels.some(r => r.branchAngkatanId === angkatanVal)) return false;
          if (jurusanVal && !rels.some(r => r.branchJurusanId === jurusanVal)) return false;

          return true;
        });

        if (filtered.length === 0) {
          alumniGrid.innerHTML = `
            <div class="col-span-full">
              ${renderEmptyState('users', 'Tidak Ditemukan Alumni', 'Tidak ada data alumni terverifikasi yang cocok dengan filter pencarian Anda.')}
            </div>
          `;
        } else {
          alumniGrid.innerHTML = filtered.map(p => {
            const rels = db.Relations.filter(r => r.profileId === p.id);
            const firstRel = rels[0] || {};
            const ang = db.Branches.find(b => b.id === firstRel.branchAngkatanId);
            const jur = db.Branches.find(b => b.id === firstRel.branchJurusanId);

            return `
              <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div class="space-y-4">
                  <div class="flex items-center gap-3.5">
                    ${renderAvatar(p.namaLengkap, p.fotoFileId, 'lg')}
                    <div class="overflow-hidden">
                      <div class="flex items-center gap-1.5">
                        <h4 class="font-bold text-slate-900 truncate font-heading">${escapeHTML(p.namaLengkap)}</h4>
                        <span class="text-[#f8af26] shrink-0" title="Terverifikasi">
                          <i data-lucide="check-circle-2" class="w-4 h-4 fill-[#f8af26] text-white"></i>
                        </span>
                      </div>
                      <p class="text-xs text-slate-500 truncate">${escapeHTML(p.perusahaan || '-')}</p>
                    </div>
                  </div>

                  <div class="space-y-1.5 text-xs text-slate-600 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">Almamater:</span>
                      <span class="font-semibold text-slate-800">${escapeHTML(ang?.nama || 'Alumni')}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">Jurusan:</span>
                      <span class="font-semibold text-slate-800">${escapeHTML(jur?.kode || 'RPL')}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-slate-400">Domisili:</span>
                      <span class="font-semibold text-slate-800">${escapeHTML(p.kotaDomisili || '-')}</span>
                    </div>
                  </div>
                </div>

                <div class="pt-4 mt-4 border-t border-slate-100">
                  <a href="#/alumni/${p.id}" class="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-[#163b8c] hover:text-white text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200">
                    <span>Lihat Profil Lengkap</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </a>
                </div>
              </div>
            `;
          }).join('');
        }

        if (window.lucide) window.lucide.createIcons();
      };

      document.getElementById('filter-search')?.addEventListener('input', renderCards);
      document.getElementById('filter-angkatan')?.addEventListener('change', renderCards);
      document.getElementById('filter-jurusan')?.addEventListener('change', renderCards);

      document.querySelectorAll('.filter-prof-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-prof-btn').forEach(b => {
            b.className = 'filter-prof-btn px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium';
          });
          btn.className = 'filter-prof-btn px-3 py-1.5 rounded-xl bg-[#163b8c] text-white font-medium';
          activeFilterProf = btn.dataset.prof;
          renderCards();
        });
      });

      renderCards();
    }

    // 2. Report Alumni Modal Handler
    document.getElementById('btn-report-alumni')?.addEventListener('click', () => {
      Modal.open(
        'Laporkan Data Alumni',
        `
          <p class="text-xs text-slate-600 mb-3">Jika Anda menemukan indikasi data yang tidak sesuai, gelar fiktif, atau penyalahgunaan identitas, berikan rincian laporan di bawah ini:</p>
          <textarea id="report-reason" rows="3" required placeholder="Jelaskan alasan pelaporan secara objektif..." class="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"></textarea>
        `,
        () => {
          const val = document.getElementById('report-reason')?.value.trim();
          if (!val) {
            Toast.show('Mohon tuliskan keterangan laporan Anda.', 'warning');
            return false;
          }
          Toast.show('Terima kasih. Laporan Anda telah dicatat untuk ditinjau oleh admin almamater.', 'success');
          return true;
        },
        'Kirim Laporan',
        'danger'
      );
    });

    // 3. Edit Profile Submit
    const formProfile = document.getElementById('form-profile');
    if (formProfile) {
      const bioInput = document.getElementById('prof-bio');
      const bioCounter = document.getElementById('bio-counter');
      if (bioInput && bioCounter) {
        bioCounter.textContent = `${bioInput.value.length} / 300`;
        bioInput.addEventListener('input', () => {
          bioCounter.textContent = `${bioInput.value.length} / 300`;
        });
      }

      formProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        const db = MockDB.getData();
        const { profile } = MockDB.getCurrentUser();
        if (profile) {
          const target = db.Profiles.find(p => p.id === profile.id);
          if (target) {
            target.namaLengkap = document.getElementById('prof-nama').value.trim();
            target.profesi = document.getElementById('prof-kategori').value;
            target.perusahaan = document.getElementById('prof-perusahaan').value.trim();
            target.kotaDomisili = document.getElementById('prof-kota').value.trim();
            target.bio = document.getElementById('prof-bio').value.trim();
            target.updatedAt = new Date().toISOString();
            MockDB.saveData(db);
            Toast.show('Profil alumni berhasil disimpan!', 'success');
          }
        }
      });

      // Ajukan Verifikasi
      document.getElementById('btn-ajukan-verifikasi')?.addEventListener('click', () => {
        Modal.open(
          'Konfirmasi Pengajuan Verifikasi',
          `
            <div class="space-y-3 text-xs text-slate-600">
              <p>Apakah Anda yakin berkas dan data almamater yang dimasukkan sudah sesuai dengan ijazah asli kelulusan?</p>
              <div class="p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                Setelah diajukan, status profil Anda akan berubah menjadi <strong>Menunggu Verifikasi</strong> dan diproses dalam 1-2 hari kerja.
              </div>
            </div>
          `,
          () => {
            const db = MockDB.getData();
            const { profile, user } = MockDB.getCurrentUser();
            const target = db.Profiles.find(p => p.id === profile.id);
            if (target) {
              target.statusVerifikasi = 'MENUNGGU';
              // Buat notifikasi
              db.Notifications.unshift({
                id: 'notif-' + Date.now(),
                userId: user.id,
                judul: 'Verifikasi Profil Diajukan',
                pesan: 'Pengajuan verifikasi profil Anda telah diterima oleh sistem dan sedang masuk antrean admin.',
                tipe: 'PROFIL',
                link: '#/profil',
                dibaca: false,
                createdAt: new Date().toISOString()
              });
              MockDB.saveData(db);
              Toast.show('Pengajuan verifikasi berhasil dikirim ke antrean admin!', 'success');
              window.location.reload();
            }
          },
          'Ajukan Sekarang',
          'primary'
        );
      });
    }

    // 4. Create Job Handler
    const formCreateJob = document.getElementById('form-create-job');
    if (formCreateJob) {
      const descInput = document.getElementById('job-desc');
      const descCounter = document.getElementById('job-desc-counter');
      if (descInput && descCounter) {
        descInput.addEventListener('input', () => {
          descCounter.textContent = `${descInput.value.length} / 3000 (Min. 50 karakter)`;
        });
      }

      formCreateJob.addEventListener('submit', (e) => {
        e.preventDefault();
        const db = MockDB.getData();
        const { user } = MockDB.getCurrentUser();

        const newJob = {
          id: 'job-' + Date.now(),
          postedByUserId: user.id,
          judul: document.getElementById('job-title').value.trim(),
          perusahaan: document.getElementById('job-company').value.trim(),
          lokasi: document.getElementById('job-location').value.trim(),
          tipe: document.getElementById('job-type').value,
          deskripsi: document.getElementById('job-desc').value.trim(),
          linkLamaran: document.getElementById('job-link').value.trim(),
          status: 'MENUNGGU_MODERASI',
          alasanTolak: null,
          tanggalTayangSampai: null,
          moderatedBy: null,
          moderatedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.Jobs.unshift(newJob);
        // Notifikasi ke user
        db.Notifications.unshift({
          id: 'notif-' + Date.now(),
          userId: user.id,
          judul: 'Lowongan Sedang Dimoderasi',
          pesan: `Lowongan "${newJob.judul}" telah diajukan dan sedang menunggu persetujuan admin.`,
          tipe: 'LOWONGAN',
          link: '#/lowongan/saya',
          dibaca: false,
          createdAt: new Date().toISOString()
        });

        MockDB.saveData(db);
        Toast.show('Lowongan berhasil diajukan! Masuk antrean moderasi admin.', 'success');
        setTimeout(() => {
          window.location.hash = '#/lowongan/saya';
        }, 600);
      });
    }

    // 5. Donate Form Handler
    const formDonate = document.getElementById('form-donate');
    if (formDonate) {
      document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.getElementById('donate-nominal').value = btn.dataset.val;
        });
      });

      formDonate.addEventListener('submit', (e) => {
        e.preventDefault();
        const db = MockDB.getData();
        const { user } = MockDB.getCurrentUser();
        const nominal = parseInt(document.getElementById('donate-nominal').value, 10);
        const campaignId = document.getElementById('donate-campaign').value;
        const anonim = document.getElementById('donate-anonim').checked;

        // Kode unik acak 3 digit 101 - 999
        const kodeUnik = Math.floor(Math.random() * 899) + 101;
        const totalTransfer = nominal + kodeUnik;

        const newDonation = {
          id: 'don-' + Date.now(),
          userId: user.id,
          scholarshipId: campaignId,
          nominal: nominal,
          kodeUnik: kodeUnik,
          totalTransfer: totalTransfer,
          anonim: anonim,
          status: 'MENUNGGU_PEMBAYARAN',
          buktiFileId: null,
          alasanTolak: null,
          verifiedBy: null,
          verifiedAt: null,
          expiredAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.Donations.unshift(newDonation);
        MockDB.saveData(db);

        Toast.show('Instruksi pembayaran berhasil dibuat.', 'success');
        window.location.hash = `#/donasi/${newDonation.id}`;
      });
    }

    // 6. Upload Proof Submit
    const formUploadProof = document.getElementById('form-upload-proof');
    if (formUploadProof) {
      formUploadProof.addEventListener('submit', (e) => {
        e.preventDefault();
        const hash = window.location.hash;
        const donationId = hash.split('/')[2];
        const db = MockDB.getData();
        const don = db.Donations.find(d => d.id === donationId);

        if (don) {
          don.status = 'MENUNGGU_VERIFIKASI';
          don.buktiFileId = 'bukti_transfer_dummy_' + Date.now() + '.jpg';
          don.updatedAt = new Date().toISOString();

          // Kirim notifikasi
          db.Notifications.unshift({
            id: 'notif-' + Date.now(),
            userId: don.userId,
            judul: 'Bukti Pembayaran Diterima',
            pesan: `Bukti transfer untuk donasi sebesar ${formatRupiah(don.totalTransfer)} telah masuk antrean verifikasi admin.`,
            tipe: 'DONASI',
            link: `#/donasi/${don.id}`,
            dibaca: false,
            createdAt: new Date().toISOString()
          });

          MockDB.saveData(db);
          Toast.show('Bukti transfer berhasil diunggah! Status berubah menjadi Menunggu Verifikasi.', 'success');
          window.location.reload();
        }
      });
    }

    // 7. Mark All Notifications as Read
    document.getElementById('btn-mark-all-read')?.addEventListener('click', () => {
      const db = MockDB.getData();
      const { user } = MockDB.getCurrentUser();
      db.Notifications.filter(n => n.userId === user.id).forEach(n => n.dibaca = true);
      MockDB.saveData(db);
      Toast.show('Semua notifikasi telah ditandai dibaca.', 'success');
      window.location.reload();
    });
  }
};

// Global helper for actions inside HTML strings
if (typeof window !== 'undefined') {
  window.SPEGA_ALUMNI_CONTROLLER = {
    closeMyJob(jobId) {
      Modal.open(
        'Tutup Lowongan Pekerjaan',
        '<p class="text-xs text-slate-600">Apakah Anda yakin ingin menutup lowongan ini? Setelah ditutup, lowongan tidak lagi tampil di daftar bursa pencarian alumni.</p>',
        () => {
          const db = MockDB.getData();
          const job = db.Jobs.find(j => j.id === jobId);
          if (job) {
            job.status = 'DITUTUP';
            MockDB.saveData(db);
            Toast.show('Lowongan berhasil ditutup.', 'info');
            window.location.reload();
          }
        },
        'Tutup Lowongan',
        'danger'
      );
    }
  };
}
