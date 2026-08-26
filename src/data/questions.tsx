export type Question = {
  id: number;
  question: string;
  choices: Record<string, string>;
  correct: string;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Berikut ini merupakan fungsi bahasa Indonesia dalam kedudukannya sebagai bahasa negara, kecuali ….",
    choices: {
      a: "bahasa resmi kenegaraan",
      b: "bahasa pengantar pendidikan",
      c: "bahasa komunikasi tingkat nasional",
      d: "bahasa pemersatu masyarakat Indonesia yang berbeda suku",
    },
    correct: "d",
  },
  {
    id: 2,
    question: "Manakah penggunaan huruf kapital yang tepat?",
    choices: {
      a: "Tahun depan kami akan pergi ke eropa Barat",
      b: "Kami akan berangkat ke Bandung hari Minggu.",
      c: "Pamanku seorang pensiunan Direktur Jenderal.",
      d: "Mereka berasal dari Suku Jawa yang tinggal di pulau Bali.",
    },
    correct: "b",
  },
  {
    id: 3,
    question: "Manakah penggunaan huruf miring yang tidak tepat?",
    choices: {
      a: "Saya sudah membaca novel <i>Laskar Pelangi</i> karya Andrea Hirata.",
      b: "Nama ilmiah dari buah nangka adalah <i>Artocarpus heterophyllus</i>.",
      c: "Filma <i>Habibie dan Ainun</i> ditayangkan ulang di televisi nasional.",
      d: "<i>World Health Organization</i> menetapkan COVID-19 sebagai pandemi global.",
    },
    correct: "d",
  },
  {
    id: 4,
    question: "Penulisan kata yang tepat adalah ….",
    choices: {
      a: "berterimakasih",
      b: "penanda tangan",
      c: "pertanggungan jawab",
      d: "beritahukan",
    },
    correct: "b",
  },
  {
    id: 5,
    question: "Penulisan bilangan yang tidak tepat adalah ….",
    choices: {
      a: "abad XI",
      b: "abad ke-XXI",
      c: "abad ke-21",
      d: "abad kedua puluh satu",
    },
    correct: "b",
  },
  {
    id: 6,
    question: "Penulisan lampiran surat yang tepat adalah ….",
    choices: {
      a: "Lampiran: 1 berkas",
      b: "Lampiran: 1 (satu) berkas",
      c: "Lampiran: satu berkas",
      d: "Lampiran: Satu berkas",
    },
    correct: "d",
  },
  {
    id: 7,
    question: "Manakah penggunaan tanda baca yang tidak tepat?",
    choices: {
      a: "Irwan Hermawan, S.H., M.H.",
      b: "Agenda rapat ini meliputi <ol><li>pemilihan pengurus.</li><li>penyusunan AD/ART.</li><li>pendataan anggota baru.</li></ol>",
      c: "Mereka memerlukan bahan pokok: beras, sayur-sayuran, dan telur.",
      d: "Pelatihan akan diselenggarakan tanggal 4—10 Agustus 2025.",
    },
    correct: "d",
  },
  {
    id: 8,
    question: "Kalimat manakah yang mengandung pilihan kata yang tepat?",
    choices: {
      a: "Kami ingin mendapatkan masukan dari <i>masing-masing</i> unit eselon I.",
      b: "Upacara akan dimulai <i>jam</i> 07.00 WIT.",
      c: "Cuaca minggu ini lebih dingin <i>dari</i> cuaca minggu lalu.",
      d: "Juna mengeluarkan <i>sesuatu</i> dari tasnya.",
    },
    correct: "d",
  },
  {
    id: 9,
    question: "Penulisan hal yang tepat adalah ….",
    choices: {
      a: "Hal	: Penyampaian hasil analisis kebutuhan pembelajaran tahun 2026",
      b: "Hal	: Penyampaian Hasil Analisis Kebutuhan Pembelajaran Tahun 2026",
      c: "Hal	: Penyampaian hasil Analisis Kebutuhan Pembelajaran tahun 2026",
      d: "Hal	: penyampaian hasil analisis kebutuhan pembelajaran tahun 2026",
    },
    correct: "b",
  },
  {
    id: 10,
    question: "Penulisan tujuan surat berikut ini tepat, kecuali ….",
    choices: {
      a: "Yth. Sekretaris Direktorat Jenderal",
      b: "Yth. Ibu Prof. Dr. Siti Chamamah",
      c: "Yth. Bapak Firdaus Junaedi",
      d: "Yth. Sdr. Abdul Aziz",
    },
    correct: "b",
  },
  // tambahkan soal lain sesuai kebutuhan
];

export const MODUL1_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Undang-undang apa yang menjadi dasar pengelolaan keuangan negara modern di Indonesia, menggantikan ICW warisan Belanda?",
    choices: {
      a: "UU No. 17 Tahun 2003 tentang Keuangan Negara",
      b: "UU No. 1 Tahun 2004 tentang Perbendaharaan Negara",
      c: "UU No. 15 Tahun 2004 tentang Pemeriksaan Pengelolaan Keuangan Negara",
      d: "UU No. 17 Tahun 2003 tentang APBN",
    },
    correct: "b",
  },
  {
    id: 2,
    question:
      "Berdasarkan Pasal 3 UU No. 1 Tahun 2004, dasar bagi Pemerintah Pusat untuk melakukan penerimaan dan pengeluaran negara adalah...",
    choices: {
      a: "Peraturan Presiden",
      b: "Keputusan Menteri Keuangan",
      c: "Undang-undang tentang APBN",
      d: "Peraturan Pemerintah",
    },
    correct: "c",
  },
  {
    id: 3,
    question:
      "Apa konsekuensi jika pejabat melakukan pengeluaran padahal anggarannya tidak tersedia?",
    choices: {
      a: "Boleh asal mendapat persetujuan atasan",
      b: "Harus mencari sumber dana lain",
      c: "Dilarang keras menurut UU",
      d: "Bisa dilakukan dengan catatan",
    },
    correct: "c",
  },
  {
    id: 4,
    question:
      "Semua pengeluaran negara, termasuk subsidi dan bantuan lainnya, harus dibiayai melalui...",
    choices: {
      a: "APBN",
      b: "Dana Cadangan Pemerintah",
      c: "Pinjaman Luar Negeri",
      d: "Bantuan Luar Negeri",
    },
    correct: "a",
  },
  {
    id: 5,
    question:
      "Siapa yang berwenang membuat komitmen/perjanjian dengan pihak lain dalam pelaksanaan belanja negara?",
    choices: {
      a: "Bendahara Umum Negara",
      b: "Pejabat Pembuat Komitmen (PPK)",
      c: "Pengguna Anggaran/Kuasa Pengguna Anggaran",
      d: "Pejabat Penandatangan SPM",
    },
    correct: "c",
  },
  {
    id: 6,
    question:
      "Dokumen pelaksanaan anggaran yang menjadi dasar pengeluaran negara setelah disahkan Menteri Keuangan disebut...",
    choices: {
      a: "SPM (Surat Perintah Membayar)",
      b: "DIPA (Daftar Isian Pelaksanaan Anggaran)",
      c: "POK (Petunjuk Operasional Kegiatan)",
      d: "Kontrak Pengadaan",
    },
    correct: "b",
  },
  {
    id: 7,
    question: "Anggaran yang dialokasikan dalam DIPA merupakan...",
    choices: {
      a: "Perkiraan pengeluaran yang bisa berubah",
      b: "Batas pengeluaran tertinggi yang tidak boleh dilampaui",
      c: "Anggaran minimal yang harus digunakan",
      d: "Anggaran fleksibel yang bisa disesuaikan",
    },
    correct: "b",
  },
  {
    id: 8,
    question:
      "Jenis belanja apa yang diperbolehkan melampaui alokasi anggaran dalam DIPA?",
    choices: {
      a: "Belanja modal untuk proyek strategis",
      b: "Belanja barang habis pakai",
      c: "Gaji dan tunjangan yang melekat pada gaji",
      d: "Belanja perjalanan dinas",
    },
    correct: "c",
  },
  {
    id: 9,
    question:
      "Pemisahan kewenangan antara yang merencanakan/memerintahkan dengan yang membayar bertujuan untuk...",
    choices: {
      a: "Mempercepat proses pembayaran",
      b: "Meningkatkan akuntabilitas dan check balance",
      c: "Mengurangi beban kerja bendahara",
      d: "Mempermudah koordinasi antar pejabat",
    },
    correct: "b",
  },
  {
    id: 10,
    question: "Pembayaran gaji yang melebihi pagu DIPA dapat dilakukan...",
    choices: {
      a: "Setelah revisi anggaran disetujui",
      b: "Mendahului revisi anggaran",
      c: "Hanya dengan persetujuan DPR",
      d: "Pada tahun anggaran berikutnya",
    },
    correct: "b",
  },
];

export const MODUL2_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Pengelompokkan belanja berdasarkan tujuan pembangunan nasional seperti fungsi pendidikan, kesehatan, dan pertahanan termasuk dalam klasifikasi menurut...",
    choices: {
      a: "Organisasi",
      b: "Jenis Belanja",
      c: "Fungsi",
      d: "Program",
    },
    correct: "c",
  },
  {
    id: 2,
    question: "Komponen mana yang TIDAK termasuk dalam Belanja Pegawai (51)?",
    choices: {
      a: "Gaji pokok PNS",
      b: "Tunjangan struktural",
      c: "Pembelian seragam pegawai",
      d: "Kontribusi BPJS",
    },
    correct: "c",
  },
  {
    id: 3,
    question:
      "Pembelian komputer yang manfaatnya lebih dari satu tahun dan melebihi batas kapitalisasi termasuk dalam...",
    choices: {
      a: "Belanja Barang (52)",
      b: "Belanja Modal (53)",
      c: "Belanja Pegawai (51)",
      d: "Belanja Lain-lain (58)",
    },
    correct: "b",
  },
  {
    id: 4,
    question: "Belanja subsidi diberikan terutama untuk...",
    choices: {
      a: "Membayar gaji pegawai honorer",
      b: "Membantu masyarakat membeli barang/jasa pokok dengan harga terjangkau",
      c: "Membangun infrastruktur publik",
      d: "Memberi bantuan kepada pemerintah asing",
    },
    correct: "b",
  },
  {
    id: 5,
    question:
      "Bantuan yang diberikan kepada masyarakat miskin untuk melindungi dari risiko sosial termasuk dalam...",
    choices: {
      a: "Belanja Hibah (56)",
      b: "Bantuan Sosial (57)",
      c: "Belanja Subsidi (55)",
      d: "Belanja Lain-lain (58)",
    },
    correct: "b",
  },
  {
    id: 6,
    question:
      "Dana yang merupakan bagian daerah dari hasil sumber daya alam yang dihasilkan di daerah tersebut disebut...",
    choices: {
      a: "Dana Alokasi Umum (DAU)",
      b: "Dana Alokasi Khusus (DAK)",
      c: "Dana Bagi Hasil (DBH)",
      d: "Dana Otonomi Khusus",
    },
    correct: "c",
  },
  {
    id: 7,
    question:
      "Belanja Lain-lain (58) biasanya digunakan untuk kegiatan yang...",
    choices: {
      a: "Rutin dan berulang setiap tahun",
      b: "Mendesak, tidak terduga, dan diharapkan tidak berulang",
      c: "Hanya untuk belanja pegawai",
      d: "Hanya untuk pembangunan infrastruktur",
    },
    correct: "b",
  },
  {
    id: 8,
    question:
      "Belanja untuk pembayaran bunga atas pinjaman pemerintah, baik dalam negeri maupun luar negeri, termasuk dalam...",
    choices: {
      a: "Belanja Barang (52)",
      b: "Belanja Modal (53)",
      c: "Bunga Utang (54)",
      d: "Belanja Lain-lain (58)",
    },
    correct: "c",
  },
  {
    id: 9,
    question:
      "Dana yang bersumber dari APBN dan dialokasikan langsung ke desa untuk membiayai pemerintahan dan pemberdayaan masyarakat disebut...",
    choices: {
      a: "Dana Alokasi Umum",
      b: "Dana Bagi Hasil",
      c: "Dana Desa",
      d: "Dana Otonomi Khusus",
    },
    correct: "c",
  },
  {
    id: 10,
    question:
      "Pembangunan rumah sakit baru oleh Kementerian Kesehatan dapat diklasifikasikan sebagai...",
    choices: {
      a: "Fungsi kesehatan, Organisasi Kemenkes, Jenis Belanja Modal",
      b: "Fungsi pendidikan, Organisasi Kemenkes, Jenis Belanja Barang",
      c: "Fungsi kesehatan, Organisasi Kemendikbud, Jenis Belanja Pegawai",
      d: "Fungsi pelayanan umum, Organisasi Kemenkes, Jenis Belanja Subsidi",
    },
    correct: "a",
  },
];

export const MODUL3_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Dokumen pelaksanaan anggaran yang digunakan sebagai acuan pengguna anggaran dalam melaksanakan kegiatan pemerintahan disebut...",
    choices: {
      a: "SPM (Surat Perintah Membayar)",
      b: "DIPA (Daftar Isian Pelaksanaan Anggaran)",
      c: "POK (Petunjuk Operasional Kegiatan)",
      d: "Kontrak Pengadaan Barang/Jasa",
    },
    correct: "b",
  },
  {
    id: 2,
    question:
      "Pejabat yang berwenang melakukan tindakan yang mengakibatkan pengeluaran atas beban anggaran negara, seperti membuat perjanjian dengan penyedia barang/jasa, adalah...",
    choices: {
      a: "Pengguna Anggaran (PA)",
      b: "Kuasa Pengguna Anggaran (KPA)",
      c: "Pejabat Pembuat Komitmen (PPK)",
      d: "Pejabat Penandatangan SPM (PPSPM)",
    },
    correct: "c",
  },
  {
    id: 3,
    question:
      "Urutan yang benar dalam proses pembayaran belanja negara adalah...",
    choices: {
      a: "SPP → SPM → SP2D",
      b: "SPM → SPP → SP2D",
      c: "SP2D → SPM → SPP",
      d: "SPP → SP2D → SPM",
    },
    correct: "a",
  },
  {
    id: 4,
    question:
      "Prinsip yang melarang seorang PPK merangkap sebagai PPSPM bertujuan untuk...",
    choices: {
      a: "Mempercepat proses pembayaran",
      b: "Mengurangi jumlah pejabat",
      c: "Menciptakan mekanisme check and balance",
      d: "Mempermudah koordinasi",
    },
    correct: "c",
  },
  {
    id: 5,
    question:
      "Yang berkedudukan sebagai Bendahara Umum Negara menurut UU Perbendaharaan Negara adalah...",
    choices: {
      a: "Presiden Republik Indonesia",
      b: "Menteri Keuangan",
      c: "Dirjen Perbendaharaan",
      d: "Kepala Kantor Pelayanan Perbendaharaan Negara",
    },
    correct: "b",
  },
  {
    id: 6,
    question:
      "Diantara kewenangan berikut, manakah yang TIDAK termasuk tugas PPSPM?",
    choices: {
      a: "Menguji SPP dan dokumen pendukung",
      b: "Menerbitkan SPM",
      c: "Membuat kontrak dengan penyedia barang/jasa",
      d: "Menolak SPP yang tidak memenuhi syarat",
    },
    correct: "c",
  },
  {
    id: 7,
    question:
      "Dokumen yang memuat uraian rencana kerja dan biaya yang diperlukan untuk pelaksanaan kegiatan sebagai penjabaran lebih lanjut dari DIPA disebut...",
    choices: {
      a: "SPP (Surat Permintaan Pembayaran)",
      b: "POK (Petunjuk Operasional Kegiatan)",
      c: "Kontrak Pengadaan",
      d: "SPM (Surat Perintah Membayar)",
    },
    correct: "b",
  },
  {
    id: 8,
    question: "Sifat ex-officio dalam penunjukan KPA berarti...",
    choices: {
      a: "Harus melalui tes kompetensi terlebih dahulu",
      b: "Melekat pada jabatan tertentu",
      c: "Hanya untuk periode tahun anggaran berjalan",
      d: "Dapat dirangkap dengan jabatan bendahara",
    },
    correct: "b",
  },
  {
    id: 9,
    question:
      "Tanggung jawab material dalam pelaksanaan anggaran berkaitan dengan...",
    choices: {
      a: "Kebenaran administratif dokumen",
      b: "Penggunaan anggaran dan hasil yang dicapai",
      c: "Kepatuhan terhadap prosedur",
      d: "Keabsahan formal perjanjian",
    },
    correct: "b",
  },
  {
    id: 10,
    question:
      "Dokumen yang menandai telah selesainya pembayaran dan menjadi bukti penyelesaian tagihan adalah...",
    choices: {
      a: "SPP (Surat Permintaan Pembayaran)",
      b: "SPM (Surat Perintah Membayar)",
      c: "SP2D (Surat Penyelesaian Pembayaran)",
      d: "Berita Acara Serah Terima",
    },
    correct: "c",
  },
];

export const MODUL4_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Pemisahan kewenangan antara yang merencanakan/memerintahkan (ordonnateur) dengan yang membayar/mengawasi (comptable) bertujuan utama untuk...",
    choices: {
      a: "Mempercepat proses pengadaan barang/jasa",
      b: "Meningkatkan efisiensi penggunaan anggaran",
      c: "Menciptakan mekanisme check and balance",
      d: "Mengurangi jumlah pejabat yang terlibat",
    },
    correct: "c",
  },
  {
    id: 2,
    question:
      "Sebagai Bendahara Umum Negara, Menteri Keuangan berfungsi sekaligus sebagai...",
    choices: {
      a: "Perencana, pelaksana, dan pengawas",
      b: "Pengguna anggaran, kuasa pengguna anggaran, dan bendahara",
      c: "Kasir, pengawas keuangan, dan manajer keuangan",
      d: "Pembuat kebijakan, pelaksana, dan evaluator",
    },
    correct: "c",
  },
  {
    id: 3,
    question:
      "Diantara kewenangan berikut, manakah yang BUKAN termasuk kewenangan Pengguna Anggaran (PA)?",
    choices: {
      a: "Melaksanakan kegiatan sesuai DIPA",
      b: "Membuat ikatan/perjanjian dengan pihak lain",
      c: "Melakukan pembayaran langsung kepada penyedia barang/jasa",
      d: "Menguji dan memerintahkan pembayaran tagihan",
    },
    correct: "c",
  },
  {
    id: 4,
    question:
      "Sifat ex-officio dalam penunjukan Kuasa Pengguna Anggaran (KPA) berarti...",
    choices: {
      a: "Harus melalui proses seleksi kompetitif",
      b: "Dapat dirangkap dengan jabatan bendahara",
      c: "Hanya berlaku untuk satu tahun anggaran",
      d: "Melekat secara otomatis pada jabatan tertentu",
    },
    correct: "d",
  },
  {
    id: 5,
    question:
      "Diantara rangkap jabatan berikut, manakah yang DILARANG menurut peraturan perbendaharaan?",
    choices: {
      a: "KPA merangkap sebagai PPK",
      b: "PPK merangkap sebagai PPSPM",
      c: "KPA merangkap sebagai PPSPM dalam kondisi tertentu",
      d: "Kepala Satker merangkap sebagai KPA",
    },
    correct: "b",
  },
  {
    id: 6,
    question: "Pejabat Pembuat Komitmen (PPK) berwenang untuk...",
    choices: {
      a: "Menerbitkan Surat Perintah Membayar (SPM)",
      b: "Melakukan tindakan yang mengakibatkan pengeluaran anggaran",
      c: "Menolak Surat Permintaan Pembayaran (SPP) yang tidak memenuhi syarat",
      d: "Menyimpan dan membayarkan uang belanja negara",
    },
    correct: "b",
  },
  {
    id: 7,
    question:
      "Diantara tugas berikut, manakah yang termasuk kewenangan Pejabat Penandatangan SPM (PPSPM)?",
    choices: {
      a: "Membuat perjanjian dengan penyedia barang/jasa",
      b: "Melakukan pengujian fisik atas barang yang diterima",
      c: "Menguji SPP dan dokumen pendukung",
      d: "Menyelesaikan pembayaran kepada penyedia barang/jasa",
    },
    correct: "c",
  },
  {
    id: 8,
    question: "Bendahara Pengeluaran bertanggung jawab secara pribadi atas...",
    choices: {
      a: "Kebenaran material atas pekerjaan yang dilakukan penyedia",
      b: "Ketersediaan anggaran dalam DIPA",
      c: "Uang yang berada dalam pengelolaannya",
      d: "Kualitas barang/jasa yang diterima",
    },
    correct: "c",
  },
  {
    id: 9,
    question:
      "Dalam proses pembayaran, SPM yang diterbitkan oleh PPSPM masih harus diuji lagi oleh...",
    choices: {
      a: "PPK yang membuat komitmen",
      b: "KPA yang menunjuk PPSPM",
      c: "Kuasa Bendahara Umum Negara",
      d: "Bendahara Pengeluaran",
    },
    correct: "c",
  },
  {
    id: 10,
    question:
      "Tanggung jawab materiil dalam pelaksanaan anggaran berkaitan dengan...",
    choices: {
      a: "Kepatuhan terhadap prosedur administrasi",
      b: "Kebenaran formal dokumen pendukung",
      c: "Penggunaan anggaran dan hasil yang dicapai",
      d: "Pelaksanaan kewenangan sesuai peraturan",
    },
    correct: "c",
  },
];

export const MODUL5_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Siklus pelaksanaan belanja negara dapat diartikan sebagai...",
    choices: {
      a: "Proses pembuatan UU APBN saja",
      b: "Rangkaian tahapan yang sistematis dari perencanaan sampai pertanggungjawaban",
      c: "Kegiatan pengadaan barang dan jasa oleh pemerintah",
      d: "Mekanisme pembayaran tagihan oleh bendahara",
    },
    correct: "b",
  },
  {
    id: 2,
    question: "Tahap pertama dalam siklus pelaksanaan belanja negara adalah...",
    choices: {
      a: "Penyusunan DIPA",
      b: "Penetapan UU APBN",
      c: "Pembuatan kontrak dengan penyedia",
      d: "Pengujian tagihan",
    },
    correct: "b",
  },
  {
    id: 3,
    question:
      "Konsep internasional 'Apportionment' dalam sistem Indonesia diimplementasikan sebagai...",
    choices: {
      a: "Penyusunan DIPA",
      b: "Pembuatan komitmen oleh PPK",
      c: "Rincian APBN per kementerian/lembaga",
      d: "Pengujian tagihan oleh PPSPM",
    },
    correct: "c",
  },
  {
    id: 4,
    question: "Dokumen utama yang dihasilkan pada tahap allotment adalah...",
    choices: {
      a: "Surat Perintah Membayar (SPM)",
      b: "Daftar Isian Pelaksanaan Anggaran (DIPA)",
      c: "Kontrak Pengadaan Barang/Jasa",
      d: "Surat Permintaan Pembayaran (SPP)",
    },
    correct: "b",
  },
  {
    id: 5,
    question: "Pada tahap commitment, yang terjadi adalah...",
    choices: {
      a: "Pencairan dana kepada penerima",
      b: "Pembuatan perikatan/kontrak dengan pihak lain",
      c: "Pengesahan UU APBN oleh Presiden",
      d: "Verifikasi fisik barang oleh PPK",
    },
    correct: "b",
  },
  {
    id: 6,
    question: "Proses verification dalam siklus belanja melibatkan...",
    choices: {
      a: "Hanya pemeriksaan administrasi oleh PPSPM",
      b: "Hanya pemeriksaan fisik oleh PPK",
      c: "Pemeriksaan administrasi dan fisik secara berlapis",
      d: "Hanya pemeriksaan oleh Kuasa BUN",
    },
    correct: "c",
  },
  {
    id: 7,
    question: "Tahap payment dalam siklus belanja diakhiri dengan...",
    choices: {
      a: "Penerbitan SPP oleh PPK",
      b: "Penerbitan SPM oleh PPSPM",
      c: "Penerbitan SP2D oleh Kuasa BUN",
      d: "Penandatanganan kontrak oleh PPK",
    },
    correct: "c",
  },
  {
    id: 8,
    question: "Urutan tahapan siklus belanja yang benar adalah...",
    choices: {
      a: "Appropriation → Allotment → Apportionment → Commitment → Verification → Payment",
      b: "Appropriation → Apportionment → Allotment → Commitment → Verification → Payment",
      c: "Apportionment → Appropriation → Commitment → Allotment → Payment → Verification",
      d: "Commitment → Appropriation → Apportionment → Allotment → Verification → Payment",
    },
    correct: "b",
  },
  {
    id: 9,
    question:
      "Prinsip bahwa tahapan siklus harus dilalui secara berurutan tanpa bisa dilompati disebut prinsip...",
    choices: {
      a: "Akuntabilitas",
      b: "Transparansi",
      c: "Berurutan (sequential)",
      d: "Efisiensi",
    },
    correct: "c",
  },
  {
    id: 10,
    question:
      "Siklus belanja negara terintegrasi dengan sistem pengadaan barang/jasa terutama pada tahap...",
    choices: {
      a: "Appropriation",
      b: "Apportionment",
      c: "Commitment",
      d: "Payment",
    },
    correct: "c",
  },
];

export const MODUL6_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Pengujian yang memeriksa aspek fisik dan substansi dari suatu pekerjaan atau barang yang dibeli disebut pengujian...",
    choices: {
      a: "Formal",
      b: "Materiil",
      c: "Administratif",
      d: "Legalitas",
    },
    correct: "b",
  },
  {
    id: 2,
    question:
      "Pengujian yang memfokuskan pada kesesuaian dengan peraturan perundang-undangan dan ketersediaan anggaran disebut...",
    choices: {
      a: "Rechtmatigheid",
      b: "Doelmatigheid",
      c: "Wetmatigheid",
      d: "Formaliteit",
    },
    correct: "c",
  },
  {
    id: 3,
    question:
      "Jenis pengujian yang menjadi fokus utama Pejabat Pembuat Komitmen (PPK) adalah...",
    choices: {
      a: "Wetmatigheid",
      b: "Rechtmatigheid",
      c: "Doelmatigheid",
      d: "Semua sama",
    },
    correct: "c",
  },
  {
    id: 4,
    question:
      "Diantara kegiatan berikut, manakah yang merupakan contoh pengujian Rechtmatigheid?",
    choices: {
      a: "Memeriksa ketersediaan anggaran di DIPA",
      b: "Memeriksa spesifikasi teknis barang yang diterima",
      c: "Memeriksa keabsahan tanda tangan pada kontrak",
      d: "Memeriksa apakah barang benar-benar digunakan",
    },
    correct: "c",
  },
  {
    id: 5,
    question:
      "Sebuah tagihan ditolak karena barang yang diterima tidak sesuai dengan spesifikasi dalam kontrak. Jenis pengujian yang gagal adalah...",
    choices: {
      a: "Wetmatigheid",
      b: "Rechtmatigheid",
      c: "Doelmatigheid",
      d: "Administratief",
    },
    correct: "c",
  },
  {
    id: 6,
    question:
      "Urutan pengujian yang umum dalam proses belanja negara adalah...",
    choices: {
      a: "Wetmatigheid → Rechtmatigheid → Doelmatigheid",
      b: "Doelmatigheid → Wetmatigheid → Rechtmatigheid",
      c: "Doelmatigheid → Rechtmatigheid → Wetmatigheid",
      d: "Rechtmatigheid → Doelmatigheid → Wetmatigheid",
    },
    correct: "c",
  },
  {
    id: 7,
    question:
      "Pejabat Penandatangan SPM (PPSPM) terutama melakukan pengujian...",
    choices: {
      a: "Doelmatigheid dan Wetmatigheid",
      b: "Wetmatigheid dan Rechtmatigheid",
      c: "Rechtmatigheid dan Doelmatigheid",
      d: "Hanya Wetmatigheid",
    },
    correct: "b",
  },
  {
    id: 8,
    question:
      "Memeriksa apakah perjalanan dinas benar-benar diperlukan dan tidak ada alternatif yang lebih efisien termasuk dalam pengujian...",
    choices: {
      a: "Wetmatigheid",
      b: "Rechtmatigheid",
      c: "Doelmatigheid",
      d: "Formal",
    },
    correct: "c",
  },
  {
    id: 9,
    question:
      "Pemisahan peran dalam pengujian (PPK, PPSPM, Kuasa BUN) bertujuan untuk...",
    choices: {
      a: "Memperlambat proses pembayaran",
      b: "Menciptakan sistem check and balance",
      c: "Mengurangi beban kerja PPK",
      d: "Mempermudah koordinasi",
    },
    correct: "b",
  },
  {
    id: 10,
    question:
      "Pengujian Doelmatigheid sangat terkait dengan prinsip value for money karena...",
    choices: {
      a: "Hanya memastikan sesuai peraturan",
      b: "Memastikan uang memberikan manfaat dan tidak mubadzir",
      c: "Hanya memeriksa kelengkapan dokumen",
      d: "Hanya memastikan kewenangan formal",
    },
    correct: "b",
  },
];
