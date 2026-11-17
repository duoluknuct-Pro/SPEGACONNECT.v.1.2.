/**
 * SPEGACONNECT - Data Dummy & Skema Bab 10 (Fase 1)
 * Patuh skema kolom Bab 10 dan data dummy kontekstual Bahasa Indonesia Bab 9
 * Persisten di localStorage untuk mendukung pengujian interaktif menyeluruh
 */

const STORAGE_KEY = 'SPEGA_MOCK_DATABASE_V1';
const CURRENT_USER_KEY = 'SPEGA_CURRENT_USER_ID';

const INITIAL_DATA = {
  Users: [
    {
      id: 'usr-admin-01',
      email: 'admin@spegaconnect.id',
      nama: 'Bambang Triyono, S.Kom.',
      authProvider: 'EMAIL',
      googleSub: null,
      passwordHash: 'hash_admin_123',
      passwordSalt: 'salt_001',
      role: 'ADMIN',
      status: 'AKTIF',
      emailVerified: true,
      verifyTokenHash: null,
      verifyTokenExpiry: null,
      resetTokenHash: null,
      resetTokenExpiry: null,
      sessionTokenHash: 'sess_admin_token',
      sessionExpiry: '2026-12-31T23:59:59Z',
      csrfToken: 'csrf_admin_abc123',
      failedLoginCount: 0,
      lockedUntil: null,
      createdAt: '2025-01-10T08:00:00Z',
      lastLoginAt: '2026-10-28T09:30:00Z'
    },
    {
      id: 'usr-alumni-01',
      email: 'dimas.pratama@gmail.com',
      nama: 'Dimas Pratama',
      authProvider: 'GOOGLE',
      googleSub: 'goog_sub_109283948',
      passwordHash: null,
      passwordSalt: null,
      role: 'ALUMNI',
      status: 'AKTIF',
      emailVerified: true,
      verifyTokenHash: null,
      verifyTokenExpiry: null,
      resetTokenHash: null,
      resetTokenExpiry: null,
      sessionTokenHash: 'sess_dimas_token',
      sessionExpiry: '2026-12-31T23:59:59Z',
      csrfToken: 'csrf_dimas_xyz789',
      failedLoginCount: 0,
      lockedUntil: null,
      createdAt: '2025-01-15T10:15:00Z',
      lastLoginAt: '2026-10-28T10:00:00Z'
    },
    {
      id: 'usr-alumni-02',
      email: 'sinta.maharani@kapwijaya.co.id',
      nama: 'Sinta Maharani',
      authProvider: 'EMAIL',
      googleSub: null,
      passwordHash: 'hash_sinta_123',
      passwordSalt: 'salt_002',
      role: 'ALUMNI',
      status: 'AKTIF',
      emailVerified: true,
      verifyTokenHash: null,
      verifyTokenExpiry: null,
      resetTokenHash: null,
      resetTokenExpiry: null,
      sessionTokenHash: null,
      sessionExpiry: null,
      csrfToken: null,
      failedLoginCount: 0,
      lockedUntil: null,
      createdAt: '2025-02-01T11:20:00Z',
      lastLoginAt: '2026-10-25T14:22:00Z'
    },
    {
      id: 'usr-alumni-03',
      email: 'rizky.firmansyah@pln.co.id',
      nama: 'Rizky Firmansyah',
      authProvider: 'EMAIL',
      googleSub: null,
      passwordHash: 'hash_rizky_123',
      passwordSalt: 'salt_003',
      role: 'ALUMNI',
      status: 'AKTIF',
      emailVerified: true,
      verifyTokenHash: null,
      verifyTokenExpiry: null,
      resetTokenHash: null,
      resetTokenExpiry: null,
      sessionTokenHash: null,
      sessionExpiry: null,
      csrfToken: null,
      failedLoginCount: 0,
      lockedUntil: null,
      createdAt: '2025-03-10T14:00:00Z',
      lastLoginAt: '2026-10-27T16:45:00Z'
    },
    {
      id: 'usr-alumni-04',
      email: 'putri.anindita@dapuranindita.com',
      nama: 'Putri Anindita',
      authProvider: 'GOOGLE',
      googleSub: 'goog_sub_984729182',
      passwordHash: null,
      passwordSalt: null,
      role: 'ALUMNI',
      status: 'AKTIF',
      emailVerified: true,
      verifyTokenHash: null,
      verifyTokenExpiry: null,
      resetTokenHash: null,
      resetTokenExpiry: null,
      sessionTokenHash: null,
      sessionExpiry: null,
      csrfToken: null,
      failedLoginCount: 0,
      lockedUntil: null,
      createdAt: '2025-04-05T09:00:00Z',
      lastLoginAt: '2026-10-26T11:10:00Z'
    }
  ],

  Profiles: [
    {
      id: 'prof-01',
      userId: 'usr-alumni-01',
      namaLengkap: 'Dimas Pratama',
      fotoFileId: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      profesi: 'TEKNOLOGI',
      perusahaan: 'PT Nusantara Digital Inovasi',
      kotaDomisili: 'Kota Bandung',
      bio: 'Software Engineer berpengalaman 8 tahun dalam arsitektur cloud, mikroservis, dan pengembangan ekosistem open-source. Senang berbagi ilmu dengan adik-adik kelas almamater.',
      linkedinUrl: 'https://linkedin.com/in/dimaspratama',
      teleponPublik: '081234567890',
      emailPublik: 'dimas.pratama@gmail.com',
      tampilkanKontak: true,
      ijazahFileId: 'drive_privat_ijazah_dimas.pdf',
      statusVerifikasi: 'TERVERIFIKASI',
      catatanAdmin: 'Dokumen ijazah asli terverifikasi cocok dengan data buku induk kelulusan tahun 2012.',
      verifiedBy: 'usr-admin-01',
      verifiedAt: '2025-01-16T10:00:00Z',
      createdAt: '2025-01-15T10:20:00Z',
      updatedAt: '2026-10-20T11:00:00Z'
    },
    {
      id: 'prof-02',
      userId: 'usr-alumni-02',
      namaLengkap: 'Sinta Maharani, S.Ak., CA.',
      fotoFileId: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      profesi: 'KEUANGAN',
      perusahaan: 'KAP Wijaya & Rekan',
      kotaDomisili: 'Kota Surabaya',
      bio: 'Auditor Senior dengan sertifikasi Chartered Accountant. Terbuka untuk konsultasi karir bidang audit dan perpajakan korporasi.',
      linkedinUrl: 'https://linkedin.com/in/sintamaharani',
      teleponPublik: '082198765432',
      emailPublik: 'sinta.maharani@kapwijaya.co.id',
      tampilkanKontak: true,
      ijazahFileId: 'drive_privat_ijazah_sinta.pdf',
      statusVerifikasi: 'TERVERIFIKASI',
      catatanAdmin: 'Verifikasi ijazah Akuntansi 2016 terkonfirmasi sah.',
      verifiedBy: 'usr-admin-01',
      verifiedAt: '2025-02-03T09:15:00Z',
      createdAt: '2025-02-01T11:30:00Z',
      updatedAt: '2026-09-12T14:30:00Z'
    },
    {
      id: 'prof-03',
      userId: 'usr-alumni-03',
      namaLengkap: 'Rizky Firmansyah',
      fotoFileId: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      profesi: 'TEKNOLOGI',
      perusahaan: 'PLN Unit Pelaksana Bekasi',
      kotaDomisili: 'Kota Bekasi',
      bio: 'Teknisi Jaringan & Distribusi Daya Listrik. Aktif dalam riset otomatisasi gardu induk digital.',
      linkedinUrl: 'https://linkedin.com/in/rizkyfirmansyah',
      teleponPublik: '085711223344',
      emailPublik: 'rizky.firmansyah@pln.co.id',
      tampilkanKontak: false,
      ijazahFileId: 'drive_privat_ijazah_rizky.pdf',
      statusVerifikasi: 'MENUNGGU',
      catatanAdmin: null,
      verifiedBy: null,
      verifiedAt: null,
      createdAt: '2025-03-10T14:15:00Z',
      updatedAt: '2026-10-27T16:50:00Z'
    },
    {
      id: 'prof-04',
      userId: 'usr-alumni-04',
      namaLengkap: 'Putri Anindita',
      fotoFileId: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      profesi: 'WIRAUSAHA',
      perusahaan: 'Dapur Anindita Nusantara',
      kotaDomisili: 'Kota Yogyakarta',
      bio: 'Pendiri dan CEO Dapur Anindita. Membina puluhan UMKM pangan lokal dan katering industri di D.I. Yogyakarta.',
      linkedinUrl: 'https://linkedin.com/in/putrianindita',
      teleponPublik: '087833445566',
      emailPublik: 'putri.anindita@dapuranindita.com',
      tampilkanKontak: true,
      ijazahFileId: 'drive_privat_ijazah_putri.pdf',
      statusVerifikasi: 'TERVERIFIKASI',
      catatanAdmin: 'Lulusan Administrasi Bisnis 2008 terverifikasi.',
      verifiedBy: 'usr-admin-01',
      verifiedAt: '2025-04-06T11:00:00Z',
      createdAt: '2025-04-05T09:20:00Z',
      updatedAt: '2026-08-14T10:00:00Z'
    }
  ],

  Relations: [
    {
      id: 'rel-01',
      profileId: 'prof-01',
      branchJurusanId: 'br-jur-01', // Rekayasa Perangkat Lunak
      branchAngkatanId: 'br-ang-02', // Angkatan 2012
      gelar: 'S1',
      tahunMasuk: 2008,
      tahunLulus: 2012,
      createdAt: '2025-01-15T10:25:00Z'
    },
    {
      id: 'rel-02',
      profileId: 'prof-02',
      branchJurusanId: 'br-jur-02', // Akuntansi
      branchAngkatanId: 'br-ang-03', // Angkatan 2016
      gelar: 'S1',
      tahunMasuk: 2012,
      tahunLulus: 2016,
      createdAt: '2025-02-01T11:35:00Z'
    },
    {
      id: 'rel-03',
      profileId: 'prof-03',
      branchJurusanId: 'br-jur-03', // Teknik Elektro
      branchAngkatanId: 'br-ang-04', // Angkatan 2020
      gelar: 'D3',
      tahunMasuk: 2017,
      tahunLulus: 2020,
      createdAt: '2025-03-10T14:20:00Z'
    },
    {
      id: 'rel-04',
      profileId: 'prof-04',
      branchJurusanId: 'br-jur-04', // Administrasi Bisnis
      branchAngkatanId: 'br-ang-01', // Angkatan 2008
      gelar: 'S1',
      tahunMasuk: 2004,
      tahunLulus: 2008,
      createdAt: '2025-04-05T09:25:00Z'
    }
  ],

  Branches: [
    {
      id: 'br-ang-01',
      tipe: 'ANGKATAN',
      nama: 'Angkatan 2008',
      kode: 'ANG08',
      tahun: 2008,
      aktif: true,
      urutan: 1,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'br-ang-02',
      tipe: 'ANGKATAN',
      nama: 'Angkatan 2012',
      kode: 'ANG12',
      tahun: 2012,
      aktif: true,
      urutan: 2,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'br-ang-03',
      tipe: 'ANGKATAN',
      nama: 'Angkatan 2016',
      kode: 'ANG16',
      tahun: 2016,
      aktif: true,
      urutan: 3,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'br-ang-04',
      tipe: 'ANGKATAN',
      nama: 'Angkatan 2020',
      kode: 'ANG20',
      tahun: 2020,
      aktif: true,
      urutan: 4,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'br-jur-01',
      tipe: 'JURUSAN',
      nama: 'Rekayasa Perangkat Lunak',
      kode: 'RPL',
      tahun: null,
      aktif: true,
      urutan: 1,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'br-jur-02',
      tipe: 'JURUSAN',
      nama: 'Akuntansi',
      kode: 'AKT',
      tahun: null,
      aktif: true,
      urutan: 2,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'br-jur-03',
      tipe: 'JURUSAN',
      nama: 'Teknik Elektro',
      kode: 'TEL',
      tahun: null,
      aktif: true,
      urutan: 3,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'br-jur-04',
      tipe: 'JURUSAN',
      nama: 'Administrasi Bisnis',
      kode: 'ADB',
      tahun: null,
      aktif: true,
      urutan: 4,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    }
  ],

  Jobs: [
    {
      id: 'job-01',
      postedByUserId: 'usr-alumni-01',
      judul: 'Frontend Web Developer (Magang)',
      perusahaan: 'PT Nusantara Digital Inovasi',
      lokasi: 'Bandung / Hybrid',
      tipe: 'MAGANG',
      deskripsi: 'Kesempatan magang selama 6 bulan untuk adik kelas almamater yang tertarik memperdalam HTML5, Tailwind CSS, dan modern JavaScript. Terlibat langsung dalam proyek aplikasi enterprise berskala nasional dengan bimbingan senior engineer.',
      linkLamaran: 'https://karir.nusantaradigital.id/magang-fe',
      status: 'AKTIF',
      alasanTolak: null,
      tanggalTayangSampai: '2026-12-15T23:59:59Z',
      moderatedBy: 'usr-admin-01',
      moderatedAt: '2026-10-15T10:00:00Z',
      createdAt: '2026-10-14T09:00:00Z',
      updatedAt: '2026-10-15T10:00:00Z'
    },
    {
      id: 'job-02',
      postedByUserId: 'usr-alumni-02',
      judul: 'Staf Administrasi & Junior Auditor',
      perusahaan: 'KAP Wijaya & Rekan',
      lokasi: 'Surabaya Pusat',
      tipe: 'PENUH_WAKTU',
      deskripsi: 'Dibutuhkan segera staf administrasi keuangan dan junior auditor fresh graduate jurusan Akuntansi atau Administrasi Bisnis. Mampu mengoperasikan spreadsheet dan memiliki ketelitian tinggi dalam memeriksa berkas pembukuan.',
      linkLamaran: 'recruitment@kapwijaya.co.id',
      status: 'AKTIF',
      alasanTolak: null,
      tanggalTayangSampai: '2026-11-30T23:59:59Z',
      moderatedBy: 'usr-admin-01',
      moderatedAt: '2026-10-20T14:00:00Z',
      createdAt: '2026-10-19T11:00:00Z',
      updatedAt: '2026-10-20T14:00:00Z'
    },
    {
      id: 'job-03',
      postedByUserId: 'usr-alumni-04',
      judul: 'Manajer Operasional Gerai Kuliner',
      perusahaan: 'Dapur Anindita Nusantara',
      lokasi: 'Kota Yogyakarta',
      tipe: 'PENUH_WAKTU',
      deskripsi: 'Memimpin operasional harian 3 cabang gerai kuliner, memastikan standar kebersihan, efisiensi rantai pasok bahan baku, dan kepuasan pelanggan. Terbuka bagi alumni dengan jiwa kepemimpinan.',
      linkLamaran: 'https://dapuranindita.com/karir/manajer-operasional',
      status: 'AKTIF',
      alasanTolak: null,
      tanggalTayangSampai: '2026-12-01T23:59:59Z',
      moderatedBy: 'usr-admin-01',
      moderatedAt: '2026-10-22T09:30:00Z',
      createdAt: '2026-10-21T15:00:00Z',
      updatedAt: '2026-10-22T09:30:00Z'
    },
    {
      id: 'job-04',
      postedByUserId: 'usr-alumni-03',
      judul: 'Teknisi Instalasi Jaringan & IoT',
      perusahaan: 'CV Mitra Solusi Elektrika',
      lokasi: 'Bekasi / Jakarta Timur',
      tipe: 'KONTRAK',
      deskripsi: 'Pekerjaan proyek instalasi panel kendali kelistrikan cerdas dan perangkat sensor IoT di lingkungan pabrik manufaktur. Diutamakan lulusan Teknik Elektro.',
      linkLamaran: 'hrd@mitraelektrika.co.id',
      status: 'MENUNGGU_MODERASI',
      alasanTolak: null,
      tanggalTayangSampai: null,
      moderatedBy: null,
      moderatedAt: null,
      createdAt: '2026-10-27T17:00:00Z',
      updatedAt: '2026-10-27T17:00:00Z'
    }
  ],

  Scholarships: [
    {
      id: 'sch-01',
      judul: 'Beasiswa SPP & Perlengkapan Adik Kelas 2026',
      deskripsi: 'Penggalangan dana donasi alumni untuk mendukung SPP, buku pegangan, dan seragam sekolah adik-adik kelas yang berprestasi namun menghadapi kendala ekonomi keluarga. Target penerima 25 siswa.',
      fotoFileId: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      targetDana: 50000000,
      terkumpul: 18750000,
      deadline: '2026-12-31T23:59:59Z',
      status: 'AKTIF',
      createdBy: 'usr-admin-01',
      createdAt: '2026-08-01T08:00:00Z',
      updatedAt: '2026-10-25T10:00:00Z'
    },
    {
      id: 'sch-02',
      judul: 'Dana Pengadaan Alat Praktik Lab RPL & Elektro',
      deskripsi: 'Program revitalisasi fasilitas laboratorium almamater meliputi kit mikrokontroler, modul jaringan komputer, dan komponen elektronika agar adik kelas siap bersaing di industri teknologi modern.',
      fotoFileId: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=80',
      targetDana: 25000000,
      terkumpul: 9400000,
      deadline: '2026-11-30T23:59:59Z',
      status: 'AKTIF',
      createdBy: 'usr-admin-01',
      createdAt: '2026-09-01T08:00:00Z',
      updatedAt: '2026-10-26T14:00:00Z'
    }
  ],

  Donations: [
    {
      id: 'don-01',
      userId: 'usr-alumni-01',
      scholarshipId: 'sch-01',
      nominal: 150000,
      kodeUnik: 124,
      totalTransfer: 150124,
      anonim: false,
      status: 'DITERIMA',
      buktiFileId: 'drive_privat_bukti_don01.jpg',
      alasanTolak: null,
      verifiedBy: 'usr-admin-01',
      verifiedAt: '2026-10-10T11:00:00Z',
      expiredAt: '2026-10-11T09:00:00Z',
      createdAt: '2026-10-10T09:00:00Z',
      updatedAt: '2026-10-10T11:00:00Z'
    },
    {
      id: 'don-02',
      userId: 'usr-alumni-02',
      scholarshipId: 'sch-01',
      nominal: 500000,
      kodeUnik: 312,
      totalTransfer: 500312,
      anonim: true,
      status: 'DITERIMA',
      buktiFileId: 'drive_privat_bukti_don02.jpg',
      alasanTolak: null,
      verifiedBy: 'usr-admin-01',
      verifiedAt: '2026-10-15T15:20:00Z',
      expiredAt: '2026-10-16T14:00:00Z',
      createdAt: '2026-10-15T14:00:00Z',
      updatedAt: '2026-10-15T15:20:00Z'
    },
    {
      id: 'don-03',
      userId: 'usr-alumni-04',
      scholarshipId: 'sch-02',
      nominal: 250000,
      kodeUnik: 588,
      totalTransfer: 250588,
      anonim: false,
      status: 'MENUNGGU_VERIFIKASI',
      buktiFileId: 'drive_privat_bukti_don03.jpg',
      alasanTolak: null,
      verifiedBy: null,
      verifiedAt: null,
      expiredAt: '2026-10-29T10:00:00Z',
      createdAt: '2026-10-28T10:00:00Z',
      updatedAt: '2026-10-28T10:30:00Z'
    }
  ],

  Notifications: [
    {
      id: 'notif-01',
      userId: 'usr-alumni-01',
      judul: 'Profil Terverifikasi',
      pesan: 'Selamat! Pengajuan verifikasi ijazah dan profil Anda telah disetujui oleh admin almamater.',
      tipe: 'PROFIL',
      link: '#/profil',
      dibaca: true,
      createdAt: '2026-10-15T10:05:00Z'
    },
    {
      id: 'notif-02',
      userId: 'usr-alumni-01',
      judul: 'Lowongan Kerja Disetujui',
      pesan: 'Lowongan "Frontend Web Developer (Magang)" yang Anda ajukan kini telah aktif dan tayang di bursa internal.',
      tipe: 'LOWONGAN',
      link: '#/lowongan/saya',
      dibaca: false,
      createdAt: '2026-10-15T10:01:00Z'
    },
    {
      id: 'notif-03',
      userId: 'usr-alumni-01',
      judul: 'Donasi Berhasil Diverifikasi',
      pesan: 'Terima kasih! Bukti transfer donasi Beasiswa SPP sebesar Rp 150.124 telah diverifikasi.',
      tipe: 'DONASI',
      link: '#/donasi/riwayat',
      dibaca: false,
      createdAt: '2026-10-10T11:05:00Z'
    },
    {
      id: 'notif-04',
      userId: 'usr-alumni-03',
      judul: 'Verifikasi Profil Sedang Diproses',
      pesan: 'Dokumen ijazah Anda telah masuk antrean moderasi admin almamater.',
      tipe: 'PROFIL',
      link: '#/profil',
      dibaca: false,
      createdAt: '2026-10-27T17:05:00Z'
    }
  ],

  Gallery: [
    {
      id: 'gal-01',
      judul: 'Reuni Akbar Satu Dekade Angkatan 2012 di Aula Almamater',
      kategori: 'REUNI',
      tahun: 2024,
      fotoFileId: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      urutan: 1,
      aktif: true,
      createdAt: '2025-01-10T00:00:00Z'
    },
    {
      id: 'gal-02',
      judul: 'Penyaluran Paket Sembako & Edukasi Alumni Peduli Lingkungan',
      kategori: 'BAKTI_SOSIAL',
      tahun: 2025,
      fotoFileId: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
      urutan: 2,
      aktif: true,
      createdAt: '2025-02-15T00:00:00Z'
    },
    {
      id: 'gal-03',
      judul: 'Sidang Wisuda & Pelepasan Alumni Angkatan 2020',
      kategori: 'WISUDA',
      tahun: 2023,
      fotoFileId: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      urutan: 3,
      aktif: true,
      createdAt: '2025-03-01T00:00:00Z'
    },
    {
      id: 'gal-04',
      judul: 'Workshop Kesiapan Karir & Mentoring CV oleh Alumni IT',
      kategori: 'LAINNYA',
      tahun: 2026,
      fotoFileId: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      urutan: 4,
      aktif: true,
      createdAt: '2026-05-10T00:00:00Z'
    }
  ],

  AuditLog: [
    {
      id: 'aud-01',
      adminUserId: 'usr-admin-01',
      aksi: 'VERIFIKASI_SETUJUI',
      targetTabel: 'Profiles',
      targetId: 'prof-01',
      keterangan: 'Menyetujui verifikasi ijazah Dimas Pratama (RPL 2012)',
      createdAt: '2025-01-16T10:00:00Z'
    },
    {
      id: 'aud-02',
      adminUserId: 'usr-admin-01',
      aksi: 'LOWONGAN_SETUJUI',
      targetTabel: 'Jobs',
      targetId: 'job-01',
      keterangan: 'Menyetujui lowongan Frontend Web Developer PT Nusantara Digital',
      createdAt: '2026-10-15T10:00:00Z'
    },
    {
      id: 'aud-03',
      adminUserId: 'usr-admin-01',
      aksi: 'DONASI_SETUJUI',
      targetTabel: 'Donations',
      targetId: 'don-01',
      keterangan: 'Memverifikasi mutasi rekening donasi Rp 150.124 dari Dimas Pratama',
      createdAt: '2026-10-10T11:00:00Z'
    }
  ]
};

// Database Manager Helper
export const MockDB = {
  getData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Gagal membaca localStorage, memuat data awal', e);
    }
    this.resetData();
    return INITIAL_DATA;
  },

  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage', e);
    }
  },

  resetData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    // Default current user = Dimas Pratama (Alumni terverifikasi)
    if (!localStorage.getItem(CURRENT_USER_KEY)) {
      localStorage.setItem(CURRENT_USER_KEY, 'usr-alumni-01');
    }
    return INITIAL_DATA;
  },

  getCurrentUserId() {
    return localStorage.getItem(CURRENT_USER_KEY) || 'usr-alumni-01';
  },

  setCurrentUserId(userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  },

  getCurrentUser() {
    const db = this.getData();
    const userId = this.getCurrentUserId();
    const user = db.Users.find(u => u.id === userId) || db.Users[1];
    const profile = db.Profiles.find(p => p.userId === user.id) || null;
    let relations = [];
    if (profile) {
      relations = db.Relations.filter(r => r.profileId === profile.id);
    }
    return { user, profile, relations };
  },

  switchRole(role) {
    const db = this.getData();
    if (role === 'ADMIN') {
      const admin = db.Users.find(u => u.role === 'ADMIN') || db.Users[0];
      this.setCurrentUserId(admin.id);
    } else {
      const alumni = db.Users.find(u => u.role === 'ALUMNI') || db.Users[1];
      this.setCurrentUserId(alumni.id);
    }
  }
};

// Pastikan inisialisasi awal berjalan
if (typeof window !== 'undefined') {
  window.SPEGA_DB = MockDB;
  if (!localStorage.getItem(STORAGE_KEY)) {
    MockDB.resetData();
  }
}
