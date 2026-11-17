/**
 * SPEGACONNECT - Admin Views (Task 1.9)
 * Panel Admin komprehensif: Verifikasi Profil, Moderasi Lowongan,
 * Angkatan & Jurusan, Verifikasi Donasi & Beasiswa, Galeri, serta Pengguna & Audit Log
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

export const AdminViews = {
  // === TASK 1.9: DASBOR ADMIN ===
  renderDashboard() {
    const db = MockDB.getData();

    const pendingVerif = db.Profiles.filter(p => p.statusVerifikasi === 'MENUNGGU').length;
    const pendingJobs = db.Jobs.filter(j => j.status === 'MENUNGGU_MODERASI').length;
    const pendingDonations = db.Donations.filter(d => d.status === 'MENUNGGU_VERIFIKASI').length;
    const totalAlumni = db.Profiles.filter(p => p.statusVerifikasi === 'TERVERIFIKASI').length;
    const totalDana = db.Scholarships.reduce((acc, curr) => acc + (curr.terkumpul || 0), 0);
    const auditLogs = db.AuditLog.slice(0, 5);

    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Panel Pengelola Alumni & Admin</h2>
          <p class="text-sm text-slate-500 mt-1">Pusat kendali verifikasi keabsahan data, moderasi bursa karir, dan transparansi donasi.</p>
        </div>

        <!-- 4 Antrean & Metrik Utama -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Antrean Verifikasi</span>
              <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <i data-lucide="shield-alert" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading ${pendingVerif > 0 ? 'text-amber-600' : 'text-slate-900'}">${pendingVerif} Berkas</div>
            <a href="#/admin/alumni" class="text-xs text-[#163b8c] font-semibold hover:underline mt-2 inline-block">Buka Antrean &rarr;</a>
          </div>

          <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Moderasi Lowongan</span>
              <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#163b8c] flex items-center justify-center">
                <i data-lucide="briefcase" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading ${pendingJobs > 0 ? 'text-blue-600' : 'text-slate-900'}">${pendingJobs} Pengajuan</div>
            <a href="#/admin/lowongan" class="text-xs text-[#163b8c] font-semibold hover:underline mt-2 inline-block">Buka Moderasi &rarr;</a>
          </div>

          <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verifikasi Donasi</span>
              <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <i data-lucide="credit-card" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading ${pendingDonations > 0 ? 'text-purple-600' : 'text-slate-900'}">${pendingDonations} Bukti</div>
            <a href="#/admin/donasi" class="text-xs text-[#163b8c] font-semibold hover:underline mt-2 inline-block">Cek Mutasi &rarr;</a>
          </div>

          <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Alumni Terverifikasi</span>
              <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <i data-lucide="award" class="w-5 h-5"></i>
              </div>
            </div>
            <div class="text-2xl font-bold font-heading text-slate-900">${totalAlumni} Orang</div>
            <span class="text-xs text-slate-400 mt-2 block">Dana: ${formatRupiah(totalDana)}</span>
          </div>
        </div>

        <!-- Dua Kolom: Antrean Cepat & Log Aktivitas Terbaru -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Antrean Verifikasi Alumni Cepat -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold font-heading text-slate-900">Pengajuan Ijazah Menunggu</h3>
              <a href="#/admin/alumni" class="text-xs text-[#163b8c] font-semibold hover:underline">Semua Berkas</a>
            </div>

            <div class="space-y-3">
              ${pendingVerif === 0 ? `
                <div class="text-center py-8 text-xs text-slate-400">
                  <i data-lucide="check-circle" class="w-8 h-8 text-emerald-500 mx-auto mb-2"></i>
                  Semua pengajuan verifikasi alumni telah selesai diproses!
                </div>
              ` : db.Profiles.filter(p => p.statusVerifikasi === 'MENUNGGU').slice(0, 3).map(p => `
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    ${renderAvatar(p.namaLengkap, p.fotoFileId, 'md')}
                    <div>
                      <h4 class="text-sm font-bold text-slate-900">${escapeHTML(p.namaLengkap)}</h4>
                      <p class="text-xs text-slate-500">${escapeHTML(p.profesi)} • ${escapeHTML(p.kotaDomisili || '-')}</p>
                    </div>
                  </div>
                  <button onclick="window.SPEGA_ADMIN_CONTROLLER.openVerificationModal('${p.id}')" class="px-3.5 py-2 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold shadow-xs transition-colors shrink-0">
                    Tinjau Dokumen
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Log Aktivitas Admin (Audit Log) -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold font-heading text-slate-900">Catatan Audit Log Terkini</h3>
              <a href="#/admin/pengguna" class="text-xs text-[#163b8c] font-semibold hover:underline">Kelola Akses</a>
            </div>

            <div class="space-y-3">
              ${auditLogs.map(log => `
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-800">${escapeHTML(log.aksi)}</span>
                    <span class="text-[11px] text-slate-400">${formatTanggal(log.createdAt, true)}</span>
                  </div>
                  <p class="text-xs text-slate-600">${escapeHTML(log.keterangan)}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.9: VERIFIKASI DATA ALUMNI ===
  renderAlumniVerification() {
    const db = MockDB.getData();

    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Verifikasi Dokumen Ijazah & Data Alumni</h2>
          <p class="text-sm text-slate-500 mt-1">Periksa kesesuaian dokumen ijazah resmi dengan buku induk kelulusan almamater.</p>
        </div>

        <!-- Filter Tab Status -->
        <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-1.5 text-xs font-semibold">
            <button class="verif-tab-btn px-4 py-2 rounded-xl bg-[#163b8c] text-white" data-status="">Semua Profil</button>
            <button class="verif-tab-btn px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700" data-status="MENUNGGU">Menunggu (${db.Profiles.filter(p => p.statusVerifikasi === 'MENUNGGU').length})</button>
            <button class="verif-tab-btn px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700" data-status="TERVERIFIKASI">Terverifikasi</button>
            <button class="verif-tab-btn px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700" data-status="DITOLAK">Ditolak</button>
          </div>
          <div class="w-full sm:w-64 relative">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3"></i>
            <input type="text" id="verif-search-input" placeholder="Cari nama alumni..." class="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#163b8c]" />
          </div>
        </div>

        <!-- Tabel Verifikasi -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3.5 px-6">Identitas Alumni</th>
                  <th class="py-3.5 px-6">Angkatan & Jurusan</th>
                  <th class="py-3.5 px-6">Dokumen Ijazah</th>
                  <th class="py-3.5 px-6">Status</th>
                  <th class="py-3.5 px-6 text-right">Aksi Keputusan</th>
                </tr>
              </thead>
              <tbody id="verif-table-body" class="divide-y divide-slate-100 text-slate-700">
                <!-- Diisi via initEvents() -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.9: MODERASI LOWONGAN KERJA ===
  renderJobModeration() {
    const db = MockDB.getData();
    const jobs = db.Jobs;

    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Moderasi Lowongan Kerja Internal</h2>
          <p class="text-sm text-slate-500 mt-1">Tinjau dan setujui lowongan karir yang diajukan oleh alumni sebelum dipublikasikan ke seluruh jejaring.</p>
        </div>

        <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3.5 px-6">Posisi & Perusahaan</th>
                  <th class="py-3.5 px-6">Pengaju Alumni</th>
                  <th class="py-3.5 px-6">Tipe & Lokasi</th>
                  <th class="py-3.5 px-6">Status</th>
                  <th class="py-3.5 px-6 text-right">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${jobs.map(job => {
                  const poster = db.Users.find(u => u.id === job.postedByUserId);
                  return `
                    <tr>
                      <td class="py-4 px-6">
                        <span class="font-bold text-slate-900 block">${escapeHTML(job.judul)}</span>
                        <span class="text-xs text-slate-500">${escapeHTML(job.perusahaan)}</span>
                      </td>
                      <td class="py-4 px-6 text-xs font-medium text-slate-800">${escapeHTML(poster?.nama || 'Alumni')}</td>
                      <td class="py-4 px-6 text-xs text-slate-600">${escapeHTML(job.tipe)} • ${escapeHTML(job.lokasi)}</td>
                      <td class="py-4 px-6">
                        ${renderBadge(job.status)}
                        ${job.status === 'DITOLAK' && job.alasanTolak ? `
                          <p class="text-[11px] text-rose-600 mt-1">Alasan: ${escapeHTML(job.alasanTolak)}</p>
                        ` : ''}
                      </td>
                      <td class="py-4 px-6 text-right space-x-2">
                        ${job.status === 'MENUNGGU_MODERASI' ? `
                          <button onclick="window.SPEGA_ADMIN_CONTROLLER.approveJob('${job.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs">
                            Setujui (Tayang 60 Hari)
                          </button>
                          <button onclick="window.SPEGA_ADMIN_CONTROLLER.rejectJob('${job.id}')" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold">
                            Tolak
                          </button>
                        ` : job.status === 'AKTIF' ? `
                          <button onclick="window.SPEGA_ADMIN_CONTROLLER.closeJob('${job.id}')" class="text-xs text-slate-500 hover:text-rose-600 font-semibold">Tutup</button>
                        ` : `
                          <span class="text-xs text-slate-400">Selesai</span>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.9: MANAJEMEN ANGKATAN & JURUSAN ===
  renderBranchesManagement() {
    const db = MockDB.getData();
    const angkatanList = db.Branches.filter(b => b.tipe === 'ANGKATAN');
    const jurusanList = db.Branches.filter(b => b.tipe === 'JURUSAN');

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Master Data Angkatan & Jurusan</h2>
            <p class="text-sm text-slate-500 mt-1">Kelola daftar tahun kelulusan dan program studi resmi yang muncul pada pilihan alumni.</p>
          </div>
          <button onclick="window.SPEGA_ADMIN_CONTROLLER.openBranchModal()" class="px-4 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold shadow-xs flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Tambah Data Baru</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Tabel Angkatan -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold font-heading text-slate-900">Daftar Angkatan Almamater</h3>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-[#163b8c] font-semibold">${angkatanList.length} Angkatan</span>
            </div>
            <div class="space-y-2">
              ${angkatanList.map(a => `
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-slate-800 text-sm block">${escapeHTML(a.nama)}</span>
                    <span class="text-xs text-slate-400">Tahun: ${a.tahun || '-'} • Urutan: ${a.urutan}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${a.aktif ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${a.aktif ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <button onclick="window.SPEGA_ADMIN_CONTROLLER.toggleBranchActive('${a.id}')" class="text-xs text-slate-500 hover:text-[#163b8c]">Toggle</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tabel Jurusan -->
          <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold font-heading text-slate-900">Program Studi / Jurusan</h3>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-[#163b8c] font-semibold">${jurusanList.length} Jurusan</span>
            </div>
            <div class="space-y-2">
              ${jurusanList.map(j => `
                <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-slate-800 text-sm block">${escapeHTML(j.nama)} (${escapeHTML(j.kode)})</span>
                    <span class="text-xs text-slate-400">Urutan: ${j.urutan}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${j.aktif ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${j.aktif ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <button onclick="window.SPEGA_ADMIN_CONTROLLER.toggleBranchActive('${j.id}')" class="text-xs text-slate-500 hover:text-[#163b8c]">Toggle</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.9: VERIFIKASI DONASI & KELOLA BEASISWA ===
  renderDonationAndScholarship() {
    const db = MockDB.getData();
    const donations = db.Donations;
    const scholarships = db.Scholarships;

    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Kelola Donasi & Program Beasiswa</h2>
          <p class="text-sm text-slate-500 mt-1">Verifikasi bukti transfer alumni dan buat kampanye beasiswa almamater baru.</p>
        </div>

        <!-- Tab Navigasi -->
        <div class="border-b border-slate-200 flex gap-4 text-sm font-semibold">
          <button id="tab-donasi-verif" class="pb-3 border-b-2 border-[#163b8c] text-[#163b8c]">Verifikasi Bukti Transfer (${donations.filter(d => d.status === 'MENUNGGU_VERIFIKASI').length})</button>
          <button id="tab-beasiswa-list" class="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700">Daftar Kampanye Beasiswa (${scholarships.length})</button>
        </div>

        <!-- Section 1: Verifikasi Donasi -->
        <div id="section-donasi" class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3.5 px-6">Donatur</th>
                  <th class="py-3.5 px-6">Program Beasiswa</th>
                  <th class="py-3.5 px-6">Total Transfer</th>
                  <th class="py-3.5 px-6">Status & Bukti</th>
                  <th class="py-3.5 px-6 text-right">Keputusan Mutasi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${donations.map(d => {
                  const donorUser = db.Users.find(u => u.id === d.userId);
                  const sch = scholarships.find(s => s.id === d.scholarshipId);
                  return `
                    <tr>
                      <td class="py-4 px-6">
                        <span class="font-bold text-slate-900 block">${d.anonim ? 'Hamba Allah (Anonim)' : escapeHTML(donorUser?.nama || 'Alumni')}</span>
                        <span class="text-xs text-slate-400 font-mono">${escapeHTML(d.id)}</span>
                      </td>
                      <td class="py-4 px-6 text-xs text-slate-700">${escapeHTML(sch?.judul || '-')}</td>
                      <td class="py-4 px-6 text-sm font-bold text-[#163b8c]">${formatRupiah(d.totalTransfer)}</td>
                      <td class="py-4 px-6">
                        ${renderBadge(d.status)}
                        ${d.buktiFileId ? `
                          <span class="text-[11px] text-blue-600 block mt-1 underline cursor-pointer" onclick="window.SPEGA_COMPONENTS.Toast.show('Pratinjau berkas: ${d.buktiFileId}', 'info')">Lihat Bukti Bayar</span>
                        ` : ''}
                      </td>
                      <td class="py-4 px-6 text-right space-x-2">
                        ${d.status === 'MENUNGGU_VERIFIKASI' ? `
                          <button onclick="window.SPEGA_ADMIN_CONTROLLER.approveDonation('${d.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs">
                            Setujui Sah
                          </button>
                          <button onclick="window.SPEGA_ADMIN_CONTROLLER.rejectDonation('${d.id}')" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold">
                            Tolak
                          </button>
                        ` : `
                          <span class="text-xs text-slate-400">Selesai</span>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Kelola Beasiswa (Hidden by default, switched via tab) -->
        <div id="section-beasiswa" class="hidden space-y-4">
          <div class="flex justify-end">
            <button onclick="window.SPEGA_ADMIN_CONTROLLER.openScholarshipModal()" class="px-4 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold shadow-xs flex items-center gap-2">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Buat Program Beasiswa Baru</span>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${scholarships.map(s => `
              <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#163b8c]">${escapeHTML(s.status)}</span>
                  <span class="text-xs text-slate-400">Deadline: ${formatTanggal(s.deadline)}</span>
                </div>
                <h3 class="text-base font-bold font-heading text-slate-900">${escapeHTML(s.judul)}</h3>
                <p class="text-xs text-slate-500 line-clamp-2">${escapeHTML(s.deskripsi)}</p>
                <div class="space-y-1.5">
                  <div class="flex justify-between text-xs font-semibold">
                    <span class="text-slate-700">Terkumpul: ${formatRupiah(s.terkumpul)}</span>
                    <span class="text-slate-400">Target: ${formatRupiah(s.targetDana)}</span>
                  </div>
                  <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-full rounded-full" style="width: ${Math.min(100, Math.round((s.terkumpul / s.targetDana) * 100))}%"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // === TASK 1.9: KELOLA GALERI KEGIATAN ===
  renderGalleryManagement() {
    const db = MockDB.getData();
    const gallery = db.Gallery;

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold font-heading text-slate-900">Kelola Galeri Kegiatan Alumni</h2>
            <p class="text-sm text-slate-500 mt-1">Publikasikan dokumentasi kegiatan reuni, bakti sosial, dan pengabdian almamater.</p>
          </div>
          <button onclick="window.SPEGA_ADMIN_CONTROLLER.openGalleryModal()" class="px-4 py-2.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold shadow-xs flex items-center gap-2">
            <i data-lucide="upload" class="w-4 h-4"></i>
            <span>Unggah Foto Kegiatan</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${gallery.map(g => `
            <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between">
              <div class="h-48 overflow-hidden bg-slate-100 relative">
                <img src="${escapeHTML(g.fotoFileId)}" alt="${escapeHTML(g.judul)}" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs">
                  ${escapeHTML(g.kategori)} • ${g.tahun}
                </span>
              </div>
              <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <h4 class="text-sm font-bold text-slate-900 leading-snug line-clamp-2">${escapeHTML(g.judul)}</h4>
                <div class="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span class="text-slate-400">Urutan: ${g.urutan}</span>
                  <button onclick="window.SPEGA_ADMIN_CONTROLLER.deleteGallery('${g.id}')" class="text-rose-600 hover:text-rose-700 font-semibold">Hapus</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // === TASK 1.9: KELOLA PENGGUNA & AUDIT LOG ===
  renderUsersManagement() {
    const db = MockDB.getData();
    const users = db.Users;
    const auditLogs = db.AuditLog;

    return `
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold font-heading text-slate-900">Manajemen Pengguna & Log Sistem</h2>
          <p class="text-sm text-slate-500 mt-1">Atur hak akses peran admin, status penangguhan akun, dan tinjau seluruh riwayat audit log.</p>
        </div>

        <!-- Tabel Pengguna -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="text-base font-bold font-heading text-slate-900">Daftar Akun Terdaftar</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3.5 px-6">Nama Pengguna & Email</th>
                  <th class="py-3.5 px-6">Metode Masuk</th>
                  <th class="py-3.5 px-6">Peran (Role)</th>
                  <th class="py-3.5 px-6">Status Akun</th>
                  <th class="py-3.5 px-6 text-right">Aksi Hak Akses</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${users.map(u => `
                  <tr>
                    <td class="py-4 px-6">
                      <span class="font-bold text-slate-900 block">${escapeHTML(u.nama)}</span>
                      <span class="text-xs text-slate-500">${escapeHTML(u.email)}</span>
                    </td>
                    <td class="py-4 px-6 text-xs">${escapeHTML(u.authProvider)}</td>
                    <td class="py-4 px-6">
                      <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-50 text-[#163b8c]'}">
                        ${escapeHTML(u.role)}
                      </span>
                    </td>
                    <td class="py-4 px-6">
                      <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${u.status === 'AKTIF' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}">
                        ${escapeHTML(u.status)}
                      </span>
                    </td>
                    <td class="py-4 px-6 text-right space-x-2">
                      <button onclick="window.SPEGA_ADMIN_CONTROLLER.toggleUserRole('${u.id}')" class="text-xs text-[#163b8c] hover:underline font-semibold">Ganti Peran</button>
                      <button onclick="window.SPEGA_ADMIN_CONTROLLER.toggleUserStatus('${u.id}')" class="text-xs text-slate-500 hover:text-rose-600 font-semibold">Toggle Tangguhkan</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tabel Lengkap Audit Log -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="text-base font-bold font-heading text-slate-900">Riwayat Audit Log Aksi Pengelola (Read-Only)</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-100">
                <tr>
                  <th class="py-3.5 px-6">Waktu Kejadian</th>
                  <th class="py-3.5 px-6">Aksi & Modul</th>
                  <th class="py-3.5 px-6">Target Record ID</th>
                  <th class="py-3.5 px-6">Keterangan Aktivitas</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700 font-mono text-xs">
                ${auditLogs.map(l => `
                  <tr>
                    <td class="py-3.5 px-6 text-slate-500 font-sans">${formatTanggal(l.createdAt, true)}</td>
                    <td class="py-3.5 px-6 font-bold text-slate-800">${escapeHTML(l.aksi)} (${escapeHTML(l.targetTabel)})</td>
                    <td class="py-3.5 px-6 text-slate-500">${escapeHTML(l.targetId)}</td>
                    <td class="py-3.5 px-6 font-sans text-slate-600">${escapeHTML(l.keterangan)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  initEvents() {
    // 1. Filter Alumni Verification Table
    const tableBody = document.getElementById('verif-table-body');
    if (tableBody) {
      let activeStatus = '';
      const renderRows = () => {
        const db = MockDB.getData();
        const search = (document.getElementById('verif-search-input')?.value || '').toLowerCase().trim();

        const filtered = db.Profiles.filter(p => {
          if (activeStatus && p.statusVerifikasi !== activeStatus) return false;
          if (search && !p.namaLengkap.toLowerCase().includes(search)) return false;
          return true;
        });

        if (filtered.length === 0) {
          tableBody.innerHTML = `
            <tr>
              <td colspan="5" class="py-8 text-center text-xs text-slate-400">Tidak ada pengajuan verifikasi yang cocok.</td>
            </tr>
          `;
        } else {
          tableBody.innerHTML = filtered.map(p => {
            const rels = db.Relations.filter(r => r.profileId === p.id);
            const firstRel = rels[0] || {};
            const ang = db.Branches.find(b => b.id === firstRel.branchAngkatanId);
            const jur = db.Branches.find(b => b.id === firstRel.branchJurusanId);

            return `
              <tr>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    ${renderAvatar(p.namaLengkap, p.fotoFileId, 'md')}
                    <div>
                      <span class="font-bold text-slate-900 block">${escapeHTML(p.namaLengkap)}</span>
                      <span class="text-xs text-slate-400">${escapeHTML(p.perusahaan || '-')}</span>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6 text-xs">
                  <span class="font-semibold text-slate-800 block">${escapeHTML(ang?.nama || '-')}</span>
                  <span class="text-slate-500">${escapeHTML(jur?.nama || '-')}</span>
                </td>
                <td class="py-4 px-6 text-xs">
                  <span class="font-mono text-slate-600 block">${escapeHTML(p.ijazahFileId || 'ijazah_alumni.pdf')}</span>
                  <span class="text-[11px] text-blue-600 cursor-pointer underline" onclick="window.SPEGA_ADMIN_CONTROLLER.openVerificationModal('${p.id}')">Pratinjau Dokumen</span>
                </td>
                <td class="py-4 px-6">${renderBadge(p.statusVerifikasi)}</td>
                <td class="py-4 px-6 text-right space-x-2">
                  <button onclick="window.SPEGA_ADMIN_CONTROLLER.openVerificationModal('${p.id}')" class="px-3.5 py-1.5 rounded-xl bg-[#163b8c] hover:bg-[#123072] text-white text-xs font-semibold shadow-xs">
                    Tinjau Berkas
                  </button>
                </td>
              </tr>
            `;
          }).join('');
        }
      };

      document.querySelectorAll('.verif-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.verif-tab-btn').forEach(b => {
            b.className = 'verif-tab-btn px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700';
          });
          btn.className = 'verif-tab-btn px-4 py-2 rounded-xl bg-[#163b8c] text-white';
          activeStatus = btn.dataset.status;
          renderRows();
        });
      });

      document.getElementById('verif-search-input')?.addEventListener('input', renderRows);
      renderRows();
    }

    // 2. Donation & Scholarship Tabs
    const tabDonasi = document.getElementById('tab-donasi-verif');
    const tabBeasiswa = document.getElementById('tab-beasiswa-list');
    const secDonasi = document.getElementById('section-donasi');
    const secBeasiswa = document.getElementById('section-beasiswa');

    if (tabDonasi && tabBeasiswa) {
      tabDonasi.addEventListener('click', () => {
        tabDonasi.className = 'pb-3 border-b-2 border-[#163b8c] text-[#163b8c]';
        tabBeasiswa.className = 'pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700';
        secDonasi.classList.remove('hidden');
        secBeasiswa.classList.add('hidden');
      });

      tabBeasiswa.addEventListener('click', () => {
        tabBeasiswa.className = 'pb-3 border-b-2 border-[#163b8c] text-[#163b8c]';
        tabDonasi.className = 'pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700';
        secBeasiswa.classList.remove('hidden');
        secDonasi.classList.add('hidden');
      });
    }
  }
};

// Global Controller for Admin Actions
if (typeof window !== 'undefined') {
  window.SPEGA_ADMIN_CONTROLLER = {
    // Modal Tinjau Verifikasi Alumni
    openVerificationModal(profileId) {
      const db = MockDB.getData();
      const profile = db.Profiles.find(p => p.id === profileId);
      if (!profile) return;

      const rels = db.Relations.filter(r => r.profileId === profile.id);
      const firstRel = rels[0] || {};
      const ang = db.Branches.find(b => b.id === firstRel.branchAngkatanId);
      const jur = db.Branches.find(b => b.id === firstRel.branchJurusanId);

      Modal.open(
        `Verifikasi Alumni: ${profile.namaLengkap}`,
        `
          <div class="space-y-4 text-xs text-slate-700">
            <!-- Komparasi Profil -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 class="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Data Isian Alumni:</h4>
              <div class="grid grid-cols-2 gap-2">
                <div><span class="text-slate-400">Nama:</span> <strong class="text-slate-800">${escapeHTML(profile.namaLengkap)}</strong></div>
                <div><span class="text-slate-400">Profesi:</span> <strong class="text-slate-800">${escapeHTML(profile.profesi)}</strong></div>
                <div><span class="text-slate-400">Angkatan:</span> <strong class="text-slate-800">${escapeHTML(ang?.nama || '-')}</strong></div>
                <div><span class="text-slate-400">Jurusan:</span> <strong class="text-slate-800">${escapeHTML(jur?.nama || '-')}</strong></div>
                <div><span class="text-slate-400">Kelulusan:</span> <strong class="text-slate-800">${firstRel.tahunLulus || '-'}</strong></div>
                <div><span class="text-slate-400">Status Saat Ini:</span> ${renderBadge(profile.statusVerifikasi)}</div>
              </div>
            </div>

            <!-- Pratinjau Dokumen Ijazah Simulasi -->
            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2 text-center">
              <div class="w-12 h-12 rounded-xl bg-blue-100 text-[#163b8c] flex items-center justify-center mx-auto">
                <i data-lucide="file-check" class="w-6 h-6"></i>
              </div>
              <span class="font-bold text-slate-800 block text-xs">${escapeHTML(profile.ijazahFileId || 'ijazah_alumni_privat.pdf')}</span>
              <p class="text-[11px] text-slate-500">Berkas privat tersimpan aman di Google Drive Folder Privat.</p>
            </div>

            <!-- Form Alasan jika Tolak -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Catatan / Alasan (Wajib jika menolak, min. 10 karakter):</label>
              <textarea id="admin-verif-reason" rows="2" placeholder="Tuliskan catatan verifikasi..." class="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#163b8c]"></textarea>
            </div>

            <div class="flex gap-2 pt-2">
              <button id="btn-admin-approve" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs">
                Setujui Verifikasi
              </button>
              <button id="btn-admin-reject" class="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs">
                Tolak Pengajuan
              </button>
            </div>
          </div>
        `
      );

      // Event listener button di dalam modal
      setTimeout(() => {
        document.getElementById('btn-admin-approve')?.addEventListener('click', () => {
          profile.statusVerifikasi = 'TERVERIFIKASI';
          profile.catatanAdmin = document.getElementById('admin-verif-reason')?.value || 'Disetujui sah.';
          profile.verifiedAt = new Date().toISOString();

          // Kirim notifikasi ke user
          db.Notifications.unshift({
            id: 'notif-' + Date.now(),
            userId: profile.userId,
            judul: 'Profil Resmi Terverifikasi!',
            pesan: 'Selamat! Dokumen ijazah dan profil Anda telah disetujui oleh pengelola almamater.',
            tipe: 'PROFIL',
            link: '#/profil',
            dibaca: false,
            createdAt: new Date().toISOString()
          });

          // Catat di Audit Log
          db.AuditLog.unshift({
            id: 'aud-' + Date.now(),
            adminUserId: 'usr-admin-01',
            aksi: 'VERIFIKASI_SETUJUI',
            targetTabel: 'Profiles',
            targetId: profile.id,
            keterangan: `Menyetujui verifikasi ijazah ${profile.namaLengkap}`,
            createdAt: new Date().toISOString()
          });

          MockDB.saveData(db);
          Toast.show(`Alumni ${profile.namaLengkap} berhasil diverifikasi!`, 'success');
          document.getElementById('modal-close-btn')?.click();
          window.location.reload();
        });

        document.getElementById('btn-admin-reject')?.addEventListener('click', () => {
          const reason = (document.getElementById('admin-verif-reason')?.value || '').trim();
          if (reason.length < 10) {
            Toast.show('Alasan penolakan wajib diisi minimal 10 karakter.', 'warning');
            return;
          }

          profile.statusVerifikasi = 'DITOLAK';
          profile.catatanAdmin = reason;

          // Kirim notifikasi ke user
          db.Notifications.unshift({
            id: 'notif-' + Date.now(),
            userId: profile.userId,
            judul: 'Pengajuan Verifikasi Memerlukan Perbaikan',
            pesan: `Pengajuan ijazah Anda belum disetujui: "${reason}". Silakan perbarui dokumen Anda.`,
            tipe: 'PROFIL',
            link: '#/profil',
            dibaca: false,
            createdAt: new Date().toISOString()
          });

          db.AuditLog.unshift({
            id: 'aud-' + Date.now(),
            adminUserId: 'usr-admin-01',
            aksi: 'VERIFIKASI_TOLAK',
            targetTabel: 'Profiles',
            targetId: profile.id,
            keterangan: `Menolak verifikasi ijazah ${profile.namaLengkap}: ${reason}`,
            createdAt: new Date().toISOString()
          });

          MockDB.saveData(db);
          Toast.show('Pengajuan verifikasi telah ditolak dengan catatan.', 'info');
          document.getElementById('modal-close-btn')?.click();
          window.location.reload();
        });
      }, 100);
    },

    // Moderasi Lowongan
    approveJob(jobId) {
      const db = MockDB.getData();
      const job = db.Jobs.find(j => j.id === jobId);
      if (job) {
        job.status = 'AKTIF';
        // Set masa tayang 60 hari
        job.tanggalTayangSampai = new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();
        job.moderatedAt = new Date().toISOString();

        db.Notifications.unshift({
          id: 'notif-' + Date.now(),
          userId: job.postedByUserId,
          judul: 'Lowongan Kerja Telah Disetujui',
          pesan: `Lowongan "${job.judul}" yang Anda pasang telah aktif dan tayang di bursa internal.`,
          tipe: 'LOWONGAN',
          link: '#/lowongan/saya',
          dibaca: false,
          createdAt: new Date().toISOString()
        });

        db.AuditLog.unshift({
          id: 'aud-' + Date.now(),
          adminUserId: 'usr-admin-01',
          aksi: 'LOWONGAN_SETUJUI',
          targetTabel: 'Jobs',
          targetId: job.id,
          keterangan: `Menyetujui lowongan ${job.judul}`,
          createdAt: new Date().toISOString()
        });

        MockDB.saveData(db);
        Toast.show('Lowongan kerja berhasil disetujui & aktif selama 60 hari!', 'success');
        window.location.reload();
      }
    },

    rejectJob(jobId) {
      Modal.open(
        'Tolak Pengajuan Lowongan',
        `
          <p class="text-xs text-slate-600 mb-2">Tuliskan alasan penolakan (wajib minimal 10 karakter):</p>
          <textarea id="job-reject-reason" rows="3" class="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-500"></textarea>
        `,
        () => {
          const reason = (document.getElementById('job-reject-reason')?.value || '').trim();
          if (reason.length < 10) {
            Toast.show('Alasan penolakan minimal 10 karakter.', 'warning');
            return false;
          }

          const db = MockDB.getData();
          const job = db.Jobs.find(j => j.id === jobId);
          if (job) {
            job.status = 'DITOLAK';
            job.alasanTolak = reason;

            db.Notifications.unshift({
              id: 'notif-' + Date.now(),
              userId: job.postedByUserId,
              judul: 'Lowongan Belum Dapat Ditayangkan',
              pesan: `Lowongan "${job.judul}" ditolak admin dengan alasan: "${reason}".`,
              tipe: 'LOWONGAN',
              link: '#/lowongan/saya',
              dibaca: false,
              createdAt: new Date().toISOString()
            });

            db.AuditLog.unshift({
              id: 'aud-' + Date.now(),
              adminUserId: 'usr-admin-01',
              aksi: 'LOWONGAN_TOLAK',
              targetTabel: 'Jobs',
              targetId: job.id,
              keterangan: `Menolak lowongan ${job.judul}: ${reason}`,
              createdAt: new Date().toISOString()
            });

            MockDB.saveData(db);
            Toast.show('Lowongan ditolak.', 'info');
            window.location.reload();
          }
          return true;
        },
        'Tolak Lowongan',
        'danger'
      );
    },

    closeJob(jobId) {
      const db = MockDB.getData();
      const job = db.Jobs.find(j => j.id === jobId);
      if (job) {
        job.status = 'DITUTUP';
        MockDB.saveData(db);
        Toast.show('Lowongan berhasil ditutup.', 'info');
        window.location.reload();
      }
    },

    // Donasi Approval
    approveDonation(donationId) {
      const db = MockDB.getData();
      const donation = db.Donations.find(d => d.id === donationId);
      if (donation) {
        donation.status = 'DITERIMA';
        donation.verifiedAt = new Date().toISOString();

        // Tambah dana terkumpul pada beasiswa
        const sch = db.Scholarships.find(s => s.id === donation.scholarshipId);
        if (sch) {
          sch.terkumpul = (sch.terkumpul || 0) + donation.totalTransfer;
        }

        db.Notifications.unshift({
          id: 'notif-' + Date.now(),
          userId: donation.userId,
          judul: 'Donasi Beasiswa Berhasil Diterima',
          pesan: `Terima kasih! Donasi sebesar ${formatRupiah(donation.totalTransfer)} telah sah diverifikasi.`,
          tipe: 'DONASI',
          link: '#/donasi/riwayat',
          dibaca: false,
          createdAt: new Date().toISOString()
        });

        db.AuditLog.unshift({
          id: 'aud-' + Date.now(),
          adminUserId: 'usr-admin-01',
          aksi: 'DONASI_SETUJUI',
          targetTabel: 'Donations',
          targetId: donation.id,
          keterangan: `Memverifikasi donasi ${formatRupiah(donation.totalTransfer)}`,
          createdAt: new Date().toISOString()
        });

        MockDB.saveData(db);
        Toast.show('Donasi disetujui & saldo beasiswa diperbarui!', 'success');
        window.location.reload();
      }
    },

    rejectDonation(donationId) {
      const db = MockDB.getData();
      const donation = db.Donations.find(d => d.id === donationId);
      if (donation) {
        donation.status = 'DITOLAK';
        donation.alasanTolak = 'Bukti transfer tidak valid atau mutasi tidak ditemukan.';

        MockDB.saveData(db);
        Toast.show('Donasi ditolak.', 'info');
        window.location.reload();
      }
    },

    // Master Branches
    toggleBranchActive(branchId) {
      const db = MockDB.getData();
      const branch = db.Branches.find(b => b.id === branchId);
      if (branch) {
        branch.aktif = !branch.aktif;
        MockDB.saveData(db);
        Toast.show(`Status ${branch.nama} diperbarui.`, 'success');
        window.location.reload();
      }
    },

    openBranchModal() {
      Modal.open(
        'Tambah Data Angkatan / Jurusan',
        `
          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-semibold mb-1">Tipe Data</label>
              <select id="new-branch-type" class="w-full h-10 px-3 rounded-xl border border-slate-200">
                <option value="ANGKATAN">Angkatan</option>
                <option value="JURUSAN">Jurusan / Program Studi</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-1">Nama Lengkap</label>
              <input type="text" id="new-branch-name" placeholder="Contoh: Angkatan 2024 atau Teknik Mesin" class="w-full h-10 px-3 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Kode Singkat</label>
              <input type="text" id="new-branch-code" placeholder="Contoh: ANG24 atau TKM" class="w-full h-10 px-3 rounded-xl border border-slate-200" />
            </div>
          </div>
        `,
        () => {
          const type = document.getElementById('new-branch-type').value;
          const name = document.getElementById('new-branch-name').value.trim();
          const code = document.getElementById('new-branch-code').value.trim();

          if (!name || !code) {
            Toast.show('Nama dan kode wajib diisi.', 'warning');
            return false;
          }

          const db = MockDB.getData();
          db.Branches.push({
            id: 'br-' + Date.now(),
            tipe: type,
            nama: name,
            kode: code,
            tahun: type === 'ANGKATAN' ? parseInt(code.replace(/\D/g, ''), 10) || null : null,
            aktif: true,
            urutan: db.Branches.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });

          MockDB.saveData(db);
          Toast.show('Data berhasil ditambahkan!', 'success');
          window.location.reload();
          return true;
        }
      );
    },

    // User Roles & Status
    toggleUserRole(userId) {
      const db = MockDB.getData();
      const user = db.Users.find(u => u.id === userId);
      if (user) {
        if (user.id === MockDB.getCurrentUserId()) {
          Toast.show('Anda tidak dapat menurunkan peran admin Anda sendiri.', 'warning');
          return;
        }
        user.role = user.role === 'ADMIN' ? 'ALUMNI' : 'ADMIN';
        MockDB.saveData(db);
        Toast.show(`Peran ${user.nama} diubah menjadi ${user.role}.`, 'success');
        window.location.reload();
      }
    },

    toggleUserStatus(userId) {
      const db = MockDB.getData();
      const user = db.Users.find(u => u.id === userId);
      if (user) {
        user.status = user.status === 'AKTIF' ? 'DITANGGUHKAN' : 'AKTIF';
        MockDB.saveData(db);
        Toast.show(`Status ${user.nama} sekarang ${user.status}.`, 'info');
        window.location.reload();
      }
    },

    // Gallery deletion
    deleteGallery(id) {
      Modal.open(
        'Hapus Foto Galeri',
        '<p class="text-xs text-slate-600">Apakah Anda yakin ingin menghapus foto kegiatan ini dari galeri publik?</p>',
        () => {
          const db = MockDB.getData();
          db.Gallery = db.Gallery.filter(g => g.id !== id);
          MockDB.saveData(db);
          Toast.show('Foto kegiatan berhasil dihapus.', 'info');
          window.location.reload();
        },
        'Hapus Foto',
        'danger'
      );
    }
  };
}
