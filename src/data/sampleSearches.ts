export interface TrademarkAnalysisResult {
  trademarkName: string;
  jurisdiction: string;
  executiveSummary: string;
  overallRiskScore: number;
  riskLevel: 'Risiko Rendah' | 'Risiko Sedang' | 'Risiko Tinggi' | 'Konflik Kritis';
  distinctiveness: {
    classification: 'Fantasi (Fanciful)' | 'Arbitrer (Arbitrary)' | 'Sugestif (Suggestive)' | 'Deskriptif (Descriptive)' | 'Generik (Generic)';
    score: number;
    explanation: string;
  };
  likelihoodOfConfusion: {
    phonetic: { score: number; analysis: string };
    visual: { score: number; analysis: string };
    commercialImpression: { score: number; analysis: string };
    tradeChannels: { score: number; analysis: string };
  };
  registeredGoodsServices: Array<{
    id: string;
    name: string;
    type: 'Barang' | 'Jasa';
    niceClass: number;
    className: string;
    conflictingMark: string;
    registrationNumber: string;
    status: string;
    owner: string;
    risk: 'Tinggi' | 'Sedang' | 'Rendah';
    conflictReason: string;
    coexistenceFeasibility: string;
  }>;
  notRegisteredGoodsServices: Array<{
    id: string;
    name: string;
    type: 'Barang' | 'Jasa';
    niceClass: number;
    className: string;
    status: 'Tersedia / Aman' | 'Risiko Rendah' | 'Peluang Terbuka';
    clearanceRationale: string;
    recommendedFilingSpec: string;
  }>;
  niceClassSummary: Array<{
    classNumber: number;
    type: 'Barang' | 'Jasa';
    className: string;
    status: 'Diblokir / Konflik Kritis' | 'Konflik Tinggi' | 'Konflik Parsial' | 'Aman / Terbuka';
    details: string;
  }>;
  actionPlan: string[];
  disclaimerAdvice: string;
}

export interface PresetSearch {
  id: string;
  trademarkName: string;
  query: string;
  jurisdiction: string;
  targetClasses: number[];
  tag: string;
  description: string;
  presetData: TrademarkAnalysisResult;
}

export const PRESET_SEARCHES: PresetSearch[] = [
  {
    id: 'solaria',
    trademarkName: 'SOLARIA',
    query: 'Lampu taman tenaga surya pintar, aplikasi manajemen energi rumah, dan jasa instalasi panel surya perumahan',
    jurisdiction: 'DJKI (Indonesia) & WIPO',
    targetClasses: [9, 11, 37, 42],
    tag: 'Energi Bersih & Smart Home',
    description: 'Konflik tinggi pada modul fotovoltaik surya fisik vs ruang terbuka pada instalasi perumahan & SaaS monitoring.',
    presetData: {
      trademarkName: 'SOLARIA',
      jurisdiction: 'DJKI (Indonesia) & WIPO',
      executiveSummary: 'Merek SOLARIA menghadapi konflik terdaftar yang signifikan pada kategori modul sel surya fotovoltaik (Kelas 9) dan perlengkapan pencahayaan luar ruang (Kelas 11) yang sudah dimiliki pihak korporasi energi terdaftar. Namun, jasa kontraktor pemasangan surya atap perumahan (Kelas 37) dan software cloud pemantauan efisiensi baterai (Kelas 42) memiliki ruang pendaftaran yang aman dan dapat didaftarkan dengan spesifikasi pembatasan barang yang tepat.',
      overallRiskScore: 68,
      riskLevel: 'Risiko Sedang',
      distinctiveness: {
        classification: 'Sugestif (Suggestive)',
        score: 65,
        explanation: 'Berasal dari kata Latin "sol" (matahari), mengisyaratkan radiasi energi surya tanpa secara langsung mendeskripsikan spesifikasi teknis barang.'
      },
      likelihoodOfConfusion: {
        phonetic: { score: 95, analysis: 'Pelafalan fonetik identik dengan pendaftaran merek aktif sebelumnya (SOLARIA untuk modul surya).' },
        visual: { score: 88, analysis: 'Kemiripan visual yang kuat dalam format kata standar huruf kapital.' },
        commercialImpression: { score: 78, analysis: 'Keduanya menargetkan segmen konsumen yang peduli pada efisiensi listrik dan keberlanjutan energi.' },
        tradeChannels: { score: 62, analysis: 'Terdapat perbedaan parsial antara manufaktur industri B2B modul panel surya dengan penyedia jasa instalasi rumahan.' }
      },
      registeredGoodsServices: [
        {
          id: 'reg-sol-1',
          name: 'Modul surya fotovoltaik dan kaca arsitektur fotovoltaik untuk pembangkit listrik',
          type: 'Barang',
          niceClass: 9,
          className: 'Kelas 9: Aparatus Elektronik & Ilmiah',
          conflictingMark: 'SOLARIA',
          registrationNumber: 'IDM000412988',
          status: 'Terdaftar / Aktif (DJKI Kemenkumham)',
          owner: 'Solaria Energy Corporation',
          risk: 'Tinggi',
          conflictReason: 'Kesamaan identitas nama merek secara menyeluruh pada aparatus pembangkit energi listrik; potensi penolakan Pasal 21 ayat (1) huruf a UU Merek No. 20/2016 sangat tinggi.',
          coexistenceFeasibility: 'Sangat Rendah tanpa adanya surat perjanjian persetujuan (consent agreement).'
        },
        {
          id: 'reg-sol-2',
          name: 'Armatur lampu penerangan jalan tenaga surya dan instalasi lampu sorot outdoor',
          type: 'Barang',
          niceClass: 11,
          className: 'Kelas 11: Aparatus Penerangan & Sanitasi',
          conflictingMark: 'SOLARIA LIGHTING',
          registrationNumber: 'IDM000584120',
          status: 'Terdaftar / Aktif',
          owner: 'PT Luminasi Surya Cemerlang',
          risk: 'Tinggi',
          conflictReason: 'Kesan komersial yang serupa pada produk perlengkapan penerangan luar ruangan tenaga surya.',
          coexistenceFeasibility: 'Rendah. Berisiko memicu surat usulan penolakan dari Pemeriksa Merek DJKI.'
        },
        {
          id: 'reg-sol-3',
          name: 'Film plastik insulasi termal penahan panas sinar matahari untuk jendela gedung',
          type: 'Barang',
          niceClass: 17,
          className: 'Kelas 17: Karet & Plastik',
          conflictingMark: 'SOLARIA FILM',
          registrationNumber: 'IDM000390144',
          status: 'Terdaftar / Aktif',
          owner: 'Architectural Polymer Group Ltd',
          risk: 'Sedang',
          conflictReason: 'Segmen pasar yang berdekatan pada material pelindung gedung.',
          coexistenceFeasibility: 'Sedang. Dapat dibedakan dengan klausul pembatasan negatif dalam uraian barang.'
        }
      ],
      notRegisteredGoodsServices: [
        {
          id: 'avail-sol-1',
          name: 'Perangkat lunak sebagai layanan (SaaS) untuk pemantauan waktu nyata dan analisis prediktif konsumsi baterai listrik perumahan',
          type: 'Jasa',
          niceClass: 42,
          className: 'Kelas 42: Layanan SaaS & Teknologi IT',
          status: 'Tersedia / Aman',
          clearanceRationale: 'Tidak ditemukan pendaftaran merek aktif "SOLARIA" di Kelas 42 yang didedikasikan untuk aplikasi cloud manajemen energi konsumen.',
          recommendedFilingSpec: 'Layanan software as a service (SaaS) yang menampilkan perangkat lunak untuk pemantauan dan pengoptimalan penggunaan daya baterai listrik perumahan; tidak ada dari yang disebutkan sebelumnya yang berkaitan dengan produksi fisik panel fotovoltaik.'
        },
        {
          id: 'avail-sol-2',
          name: 'Jasa pemasangan, pemeliharaan rutin, dan perbaikan teknis sistem panel surya atap rumah tangga',
          type: 'Jasa',
          niceClass: 37,
          className: 'Kelas 37: Jasa Konstruksi, Instalasi & Perbaikan',
          status: 'Peluang Terbuka',
          clearanceRationale: 'Klasifikasi jasa menyediakan saluran perniagaan yang berbeda dari manufaktur barang pabrikan. Pemilik Kelas 9 tidak memiliki hak atas jasa instalasi Kelas 37.',
          recommendedFilingSpec: 'Jasa instalasi, pemeliharaan, dan perbaikan sistem listrik tenaga surya atap perumahan; jasa kontraktor listrik spesialis instalasi panel surya.'
        },
        {
          id: 'avail-sol-3',
          name: 'Jasa audit efisiensi energi dan konsultasi informasi penghematan listrik perumahan',
          type: 'Jasa',
          niceClass: 35,
          className: 'Kelas 35: Manajemen & Informasi Bisnis',
          status: 'Tersedia / Aman',
          clearanceRationale: 'Bersih dan belum terdaftar pada koridor jasa informasi efisiensi energi komersial.',
          recommendedFilingSpec: 'Jasa audit efisiensi energi untuk bangunan perumahan; penyediaan informasi bisnis kepada konsumen mengenai penghematan energi listrik.'
        }
      ],
      niceClassSummary: [
        { classNumber: 9, type: 'Barang', className: 'Perangkat Keras Panel Surya', status: 'Diblokir / Konflik Kritis', details: 'Dihalangi oleh merek terdaftar SOLARIA IDM000412988.' },
        { classNumber: 11, type: 'Barang', className: 'Lampu Penerangan Surya', status: 'Konflik Tinggi', details: 'Terhalang oleh SOLARIA LIGHTING IDM000584120.' },
        { classNumber: 37, type: 'Jasa', className: 'Instalasi & Servis Panel Surya', status: 'Konflik Parsial', details: 'Aman diajukan dengan spesifikasi khusus jasa pemasangan.' },
        { classNumber: 42, type: 'Jasa', className: 'Platform SaaS Monitoring Energi', status: 'Aman / Terbuka', details: 'Peluang emas pendaftaran. Register bersih untuk aplikasi cloud monitoring.' }
      ],
      actionPlan: [
        'Batalkan pendaftaran pada Kelas 9 (modul sel surya) dan Kelas 11 (lampu taman) untuk menghindari penolakan Pasal 21 ayat 1 UU Merek.',
        'Ajukan permohonan pendaftaran multi-kelas pada Kelas 37 (Jasa instalasi kontraktor) dan Kelas 42 (Software monitoring cloud).',
        'Sertakan klausul pembatasan negatif: "tidak termasuk perancangan atau pembuatan fisik sel fotovoltaik surya".',
        'Tambahkan elemen logo grafis atau kata pelengkap yang distingtif (misalnya "SOLARIA HOME INTELLIGENCE") untuk memperkuat daya pembeda.'
      ],
      disclaimerAdvice: 'Tidak diperlukan pelepasan hak (disclaimer) atas kata SOLARIA karena memiliki daya pembeda sugestif; jangan gunakan kata generik "SURYA" berdiri sendiri.'
    }
  },
  {
    id: 'zenpulse',
    trademarkName: 'ZENPULSE',
    query: 'Gelang pintar pelacak relaksasi, sensor denyut biofeedback, aplikasi mobile panduan meditasi dan podcast kesehatan mental',
    jurisdiction: 'DJKI (Indonesia) & USPTO',
    targetClasses: [9, 10, 41, 44],
    tag: 'HealthTech & Kebugaran',
    description: 'Konflik tinggi pada instrumen diagnostik medis rumah sakit vs peluang terbuka pada aplikasi gaya hidup meditasi.',
    presetData: {
      trademarkName: 'ZENPULSE',
      jurisdiction: 'DJKI (Indonesia) & USPTO',
      executiveSummary: 'ZENPULSE memiliki daya pembeda sugestif yang kuat. Namun penelusuran pangkalan data menunjukkan adanya merek terdaftar "ZEN PULSE" pada Kelas 10 untuk alat medis pemantau denyut jantung klinis rumah sakit. Peluang pendaftaran sangat aman dan terbuka di Kelas 41 (pelatihan meditasi) dan Kelas 9 (aplikasi kesehatan gaya hidup), asalkan klaim diagnostik medis ditegaskan tidak termasuk.',
      overallRiskScore: 42,
      riskLevel: 'Risiko Sedang',
      distinctiveness: {
        classification: 'Sugestif (Suggestive)',
        score: 74,
        explanation: 'Menggabungkan konsep "Zen" (ketenangan batin) dengan "Pulse" (ritme detak jantung), memerlukan imajinasi kognitif konsumen.'
      },
      likelihoodOfConfusion: {
        phonetic: { score: 98, analysis: 'Pelafalan fonetik identik dengan merek terdahulu "ZEN PULSE".' },
        visual: { score: 90, analysis: 'Penulisan satu kata bersambung vs dua kata terpisah tidak menghilangkan kemiripan pada pokoknya.' },
        commercialImpression: { score: 55, analysis: 'Perangkat medis klinis rumah sakit vs aplikasi gaya hidup ketenangan pikiran konsumen.' },
        tradeChannels: { score: 40, analysis: 'Saluran distribusi berbeda: rumah sakit/apotek medis vs toko aplikasi digital Google Play / App Store.' }
      },
      registeredGoodsServices: [
        {
          id: 'reg-zen-1',
          name: 'Aparatus dan instrumen medis untuk memantau tanda vital, monitor denyut nadi jantung untuk diagnosis klinis',
          type: 'Barang',
          niceClass: 10,
          className: 'Kelas 10: Alat Medis & Diagnostik',
          conflictingMark: 'ZEN PULSE THERAPY',
          registrationNumber: 'IDM000611249',
          status: 'Terdaftar / Aktif',
          owner: 'PT CardioCalm Alkes Medika',
          risk: 'Tinggi',
          conflictReason: 'Persamaan pada pokoknya pada kategori alat pemantau denyut nadi biologis medis.',
          coexistenceFeasibility: 'Nol untuk Kelas 10 perangkat keras medis. Wajib menghindari pengajuan di Kelas 10.'
        },
        {
          id: 'reg-zen-2',
          name: 'Suplemen herbal makanan dan minuman kesehatan penenang relaksasi tidur',
          type: 'Barang',
          niceClass: 5,
          className: 'Kelas 5: Farmasi & Suplemen',
          conflictingMark: 'ZEN-PULSE BOTANICALS',
          registrationNumber: 'IDM000542081',
          status: 'Terdaftar / Aktif',
          owner: 'Nirwana Sehat Alami Farma',
          risk: 'Sedang',
          conflictReason: 'Kategori industri kesehatan yang berdekatan untuk mengurangi stres.',
          coexistenceFeasibility: 'Tinggi karena pemohon tidak memproduksi obat herbal yang diminum.'
        }
      ],
      notRegisteredGoodsServices: [
        {
          id: 'avail-zen-1',
          name: 'Aplikasi perangkat lunak seluler (mobile app) yang dapat diunduh untuk latihan pernapasan, meditasi terpandu, dan pelacakan stres harian',
          type: 'Barang',
          niceClass: 9,
          className: 'Kelas 9: Aplikasi Mobile & Software',
          status: 'Tersedia / Aman',
          clearanceRationale: 'Register bersih dari merek terdahulu ZENPULSE pada sub-kategori aplikasi seluler meditasi konsumen.',
          recommendedFilingSpec: 'Aplikasi seluler yang dapat diunduh untuk instruksi latihan meditasi, panduan kesadaran penuh (mindfulness), dan pelacakan gaya hidup; bukan untuk keperluan diagnostik atau pengobatan medis.'
        },
        {
          id: 'avail-zen-2',
          name: 'Penyediaan rekaman audio podcast dan video pelatihan digital non-unduhan di bidang manajemen stres dan ketenangan pikiran',
          type: 'Jasa',
          niceClass: 41,
          className: 'Kelas 41: Pendidikan, Media & Hiburan',
          status: 'Tersedia / Aman',
          clearanceRationale: 'Sama sekali tidak ada halangan terdaftar pada Kelas 41 jasa pelatihan dan produksi konten kesehatan mental.',
          recommendedFilingSpec: 'Penyediaan rekaman audio dan media visual non-unduhan di bidang pelatihan kesadaran penuh, meditasi, dan bimbingan relaksasi.'
        },
        {
          id: 'avail-zen-3',
          name: 'Gelang pintar pelacak aktivitas kebugaran gaya hidup konsumen (smart wristbands)',
          type: 'Barang',
          niceClass: 9,
          className: 'Kelas 9: Elektronik Konsumen Pintar',
          status: 'Peluang Terbuka',
          clearanceRationale: 'Aman bila secara tegas dikecualikan dari fungsi alat diagnosis klinis medis.',
          recommendedFilingSpec: 'Gelang pelacak aktivitas fisik kebugaran personal; tidak termasuk aparatus diagnostik medis klinis.'
        }
      ],
      niceClassSummary: [
        { classNumber: 10, type: 'Barang', className: 'Monitor Denyut Medis', status: 'Diblokir / Konflik Kritis', details: 'Terblokir penuh oleh CardioCalm IDM000611249.' },
        { classNumber: 5, type: 'Barang', className: 'Suplemen Herbal Stres', status: 'Konflik Parsial', details: 'Merek terdahulu pada obat oral; saluran produk terpisah.' },
        { classNumber: 9, type: 'Barang', className: 'Aplikasi Meditasi & Gelang Pintar', status: 'Aman / Terbuka', details: 'Sangat aman dengan pembatasan non-medis.' },
        { classNumber: 41, type: 'Jasa', className: 'Pelatihan Meditasi & Konten Podcast', status: 'Aman / Terbuka', details: '100% terbuka dan memiliki daya perlindungan maksimal.' }
      ],
      actionPlan: [
        'JANGAN mengajukan pendaftaran di Kelas 10 (Alat Medis) guna menghindari penolakan langsung.',
        'Fokuskan pendaftaran pada Kelas 9 (Aplikasi seluler gaya hidup) dan Kelas 41 (Layanan pelatihan meditasi).',
        'Wajib mencantumkan klausul: "bukan untuk keperluan medis, diagnosis, atau pengobatan penyakit".',
        'Lakukan pendaftaran segera di portal DJKI e-Status Merek untuk mengunci hak prioritas permohonan.'
      ],
      disclaimerAdvice: 'Pemeriksa merek mungkin meminta pelepasan hak (disclaimer) atas kata "PULSE" bila diajukan untuk perangkat pengukur detak jantung fisik; tidak ada disclaimer untuk aplikasi bimbingan meditasi.'
    }
  },
  {
    id: 'kopinusa',
    trademarkName: 'KOPINUSA',
    query: 'Biji kopi sangrai kemasan retail, minuman kopi dingin cold brew dalam kaleng, dan kedai kafe tempat ngopi',
    jurisdiction: 'DJKI (Indonesia)',
    targetClasses: [30, 32, 43],
    tag: 'Kuliner & F&B Lokal',
    description: 'Konflik parsial pada merek bumbu kemasan vs register bersih pada kedai kafe tempat minum kopi dan minuman siap saji.',
    presetData: {
      trademarkName: 'KOPINUSA',
      jurisdiction: 'DJKI (Indonesia)',
      executiveSummary: 'Kata "KOPINUSA" menggabungkan istilah generik "KOPI" dengan elemen geografis sugestif "NUSA". Penelusuran pangkalan data DJKI menunjukkan register bersih pada Kelas 43 (kafe dan kedai kopi) serta Kelas 32 (minuman dingin kaleng). Di Kelas 30 terdapat pendaftaran varian bumbu rempah namun belum ada yang memonopoli biji kopi artisan sangrai.',
      overallRiskScore: 28,
      riskLevel: 'Risiko Rendah',
      distinctiveness: {
        classification: 'Sugestif (Suggestive)',
        score: 68,
        explanation: 'Merujuk pada cita rasa kopi Nusantara Indonesia. Kata "KOPI" wajib didisclaimer karena merupakan nama barang generik.'
      },
      likelihoodOfConfusion: {
        phonetic: { score: 45, analysis: 'Terdapat beberapa merek berawalan NUSA, namun kombinasi KOPINUSA memiliki keunikan tersendiri.' },
        visual: { score: 40, analysis: 'Format visual logo grafis lokal dapat membedakan secara tegas.' },
        commercialImpression: { score: 35, analysis: 'Memberikan kesan kedai kopi lokal Nusantara yang otentik.' },
        tradeChannels: { score: 30, analysis: 'Kedai kafe dine-in dan penjualan biji kopi sangrai langsung ke konsumen.' }
      },
      registeredGoodsServices: [
        {
          id: 'reg-kopi-1',
          name: 'Bumbu penyedap masakan dan rempah-rempah giling bubuk kemasan',
          type: 'Barang',
          niceClass: 30,
          className: 'Kelas 30: Rempah & Makanan Pokok',
          conflictingMark: 'NUSA BUMBU',
          registrationNumber: 'IDM000298174',
          status: 'Terdaftar / Aktif',
          owner: 'PT Pangan Nusantara Raya',
          risk: 'Rendah',
          conflictReason: 'Sama-sama di Kelas 30 namun barang berbeda secara substansi (bumbu masakan vs biji kopi).',
          coexistenceFeasibility: 'Sangat Tinggi untuk hidup berdampingan secara damai.'
        }
      ],
      notRegisteredGoodsServices: [
        {
          id: 'avail-kopi-1',
          name: 'Biji kopi sangrai, kopi bubuk giling, ekstrak konsentrat kopi kemasan ritel',
          type: 'Barang',
          niceClass: 30,
          className: 'Kelas 30: Kopi, Teh & Olahan',
          status: 'Tersedia / Aman',
          clearanceRationale: 'Belum ada pendaftaran merek identik KOPINUSA untuk komoditas biji kopi sangrai.',
          recommendedFilingSpec: 'Kopi, biji kopi sangrai, kopi bubuk, minuman berbahan dasar kopi.'
        },
        {
          id: 'avail-kopi-2',
          name: 'Minuman kopi seduh dingin (cold brew) kemasan kaleng dan minuman sari kopi non-alkohol',
          type: 'Barang',
          niceClass: 32,
          className: 'Kelas 32: Minuman Siap Minum Non-Alkohol',
          status: 'Tersedia / Aman',
          clearanceRationale: 'Register bersih dari pendaftaran identik pada minuman dingin kemasan.',
          recommendedFilingSpec: 'Minuman non-alkohol, yaitu minuman kopi seduh dingin bersoda dan air berperisa kopi.'
        },
        {
          id: 'avail-kopi-3',
          name: 'Jasa kedai kopi, kafe kopi, kedai minuman kekinian, dan jasa penyediaan makanan dan minuman',
          type: 'Jasa',
          niceClass: 43,
          className: 'Kelas 43: Restoran, Kafe & Kuliner',
          status: 'Peluang Terbuka',
          clearanceRationale: 'Register Kelas 43 di DJKI sangat bersih untuk nama kedai KOPINUSA.',
          recommendedFilingSpec: 'Layanan penyediaan makanan dan minuman; jasa kedai kopi (coffee shop); jasa kafe; bar makanan ringan.'
        }
      ],
      niceClassSummary: [
        { classNumber: 30, type: 'Barang', className: 'Biji Kopi Sangrai', status: 'Aman / Terbuka', details: 'Aman diajukan dengan pelepasan hak atas kata KOPI.' },
        { classNumber: 32, type: 'Barang', className: 'Minuman Kopi Kaleng Cold Brew', status: 'Aman / Terbuka', details: 'Register bersih tanpa sengketa merek terdahulu.' },
        { classNumber: 43, type: 'Jasa', className: 'Kedai Kafe Coffee Shop', status: 'Aman / Terbuka', details: 'Peluang emas untuk jaringan kedai kopi kekinian.' }
      ],
      actionPlan: [
        'Daftarkan langsung pada Kelas 30 (Biji kopi kemasan) dan Kelas 43 (Jasa kafe kopi tempat nongkrong).',
        'Cantumkan catatan disclaimer di formulir DJKI: "Pemohon tidak mengklaim hak eksklusif atas kata generik KOPI".',
        'Daftarkan bersama logo grafis (etiket merek) berciri khas ornamen kopi untuk menambah bobot distingtif.',
        'Lakukan permohonan melalui akun konsultan KI terdaftar atau permohonan mandiri di merek.dgip.go.id.'
      ],
      disclaimerAdvice: 'Pemeriksa merek DJKI dipastikan akan mensyaratkan pelepasan hak (disclaimer) atas kata "KOPI" karena merupakan nama barang yang dimohonkan.'
    }
  },
  {
    id: 'velox',
    trademarkName: 'VELOX',
    query: 'Sepeda balap serat karbon performa tinggi, pakaian jersey bersepeda, dan software komputer pelacak rute GPS',
    jurisdiction: 'DJKI (Indonesia) & WIPO',
    targetClasses: [9, 12, 25],
    tag: 'Olahraga & Mobilitas',
    description: 'Terblokir pada komponen fisik sepeda oleh pemegang hak paten/merek legendaris, namun terbuka pada perangkat lunak simulasi virtual & event olahraga.',
    presetData: {
      trademarkName: 'VELOX',
      jurisdiction: 'DJKI (Indonesia) & WIPO',
      executiveSummary: 'VELOX (berasal dari bahasa Latin yang bermakna cepat/laju) merupakan merek legendaris di industri sepeda dunia. Merek ini telah terdaftar aktif dan tidak dapat diganggu gugat pada Kelas 12 mencakup ban sepeda, pelek, dan suku cadang sepeda. Pengajuan langsung untuk rangka sepeda fisik dipastikan 90% akan ditolak. Namun koridor software telemetri olahraga (Kelas 9) dan event balap sepeda (Kelas 41) masih sangat terbuka.',
      overallRiskScore: 78,
      riskLevel: 'Risiko Tinggi',
      distinctiveness: {
        classification: 'Sugestif (Suggestive)',
        score: 60,
        explanation: 'Mengisyaratkan kecepatan (velocity) untuk produk transportasi dan olahraga.'
      },
      likelihoodOfConfusion: {
        phonetic: { score: 100, analysis: 'Pelafalan persis sama tanpa perbedaan bunyi vokal/konsonan.' },
        visual: { score: 98, analysis: 'Format teks 5 huruf yang identik.' },
        commercialImpression: { score: 85, analysis: 'Kesan komersial yang identik pada dunia olahraga balap dan sepeda.' },
        tradeChannels: { score: 90, analysis: 'Toko sepeda fisik, platform e-commerce suku cadang olahraga, dan komunitas pehobi.' }
      },
      registeredGoodsServices: [
        {
          id: 'reg-vel-1',
          name: 'Sepeda, suku cadang struktural sepeda, pita pelek ban, ban dalam, dan perlengkapan reparasi sepeda',
          type: 'Barang',
          niceClass: 12,
          className: 'Kelas 12: Kendaraan & Suku Cadang',
          conflictingMark: 'VELOX',
          registrationNumber: 'IDM000120944',
          status: 'Terdaftar / Aktif (Status Terkenal Dunia)',
          owner: 'Etablissements Velox S.A.S.',
          risk: 'Tinggi',
          conflictReason: 'Konflik fatal: Merek identik terdaftar untuk produk suku cadang sepeda fisik dengan perlindungan merek terkenal.',
          coexistenceFeasibility: 'Mendekati nol tanpa adanya perjanjian pengalihan merek (assignment) resmi.'
        },
        {
          id: 'reg-vel-2',
          name: 'Sepatu olahraga atletik dan sepatu khusus bersepeda',
          type: 'Barang',
          niceClass: 25,
          className: 'Kelas 25: Pakaian & Sepatu',
          conflictingMark: 'VELOX SPEED',
          registrationNumber: 'IDM000561290',
          status: 'Terdaftar / Aktif',
          owner: 'AeroTech Apparel Co',
          risk: 'Tinggi',
          conflictReason: 'Persamaan pada pokoknya pada alas kaki khusus atletik bersepeda.',
          coexistenceFeasibility: 'Sangat Rendah untuk kategori alas kaki.'
        }
      ],
      notRegisteredGoodsServices: [
        {
          id: 'avail-vel-1',
          name: 'Aplikasi software simulasi balap sepeda virtual indoor dan analitik telemetri denyut atlet',
          type: 'Barang',
          niceClass: 9,
          className: 'Kelas 9: Software Olahraga Virtual',
          status: 'Peluang Terbuka',
          clearanceRationale: 'Pendaftaran terdahulu Velox terbatas pada ban mekanis kuno; belum merambah ke software aplikasi digital.',
          recommendedFilingSpec: 'Perangkat lunak komputer yang dapat diunduh untuk simulasi balap sepeda virtual, pelacakan olahraga bersepeda dalam ruangan, dan analisis data atletik.'
        },
        {
          id: 'avail-vel-2',
          name: 'Penyelenggaraan kompetisi balap sepeda virtual online dan jasa pelatihan atlet ketahanan',
          type: 'Jasa',
          niceClass: 41,
          className: 'Kelas 41: Pelatihan & Event Olahraga',
          status: 'Tersedia / Aman',
          clearanceRationale: 'Bersih tanpa halangan pada jasa penyelenggaraan event kompetisi dan konten pelatihan.',
          recommendedFilingSpec: 'Penyelenggaraan acara perlombaan sepeda; jasa bimbingan pelatihan atletik di bidang bersepeda jarak jauh.'
        }
      ],
      niceClassSummary: [
        { classNumber: 12, type: 'Barang', className: 'Sepeda & Suku Cadang Fisik', status: 'Diblokir / Konflik Kritis', details: 'Terblokir permanen oleh Velox SAS IDM000120944.' },
        { classNumber: 25, type: 'Barang', className: 'Sepatu Balap Sepeda', status: 'Konflik Tinggi', details: 'Terhalang oleh Velox Speed IDM000561290.' },
        { classNumber: 9, type: 'Barang', className: 'Software Telemetri Bersepeda', status: 'Konflik Parsial', details: 'Aman jika dibatasi tegas pada kode software digital.' },
        { classNumber: 41, type: 'Jasa', className: 'Balapan Virtual & Pelatihan Atlet', status: 'Aman / Terbuka', details: 'Ruang pendaftaran terbuka lebar untuk platform e-sports sepeda.' }
      ],
      actionPlan: [
        'SANGAT DISARANKAN MENGGANTI NAMA MEREK (REBRANDING) untuk produk fisik rangka sepeda, pelek, dan sepatu olahraga.',
        'Bila klien bersikeras memakai nama VELOX, batasi ruang lingkup perniagaan HANYA pada Kelas 41 (Layanan balap virtual/esports) atau Kelas 42 (Cloud platform).',
        'Pertimbangkan negosiasi perolehan lisensi wilayah dari Etablissements Velox S.A.S.'
      ],
      disclaimerAdvice: 'VELOX bersifat sugestif; tidak ada pelepasan hak yang dapat menyembuhkan persamaan nama identik pada Kelas 12.'
    }
  }
];
