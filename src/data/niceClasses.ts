export interface NiceClassInfo {
  number: number;
  type: 'Barang' | 'Jasa';
  title: string;
  category: string;
  officialHeading: string;
  commonExamples: string[];
  exclusions: string[];
  filingTip: string;
}

export const NICE_CLASSES: NiceClassInfo[] = [
  // BARANG (Kelas 1 - 34)
  {
    number: 1,
    type: 'Barang',
    title: 'Bahan Kimia Industri & Pertanian',
    category: 'Industri & Sains',
    officialHeading: 'Bahan kimia yang digunakan dalam industri, ilmu pengetahuan, fotografi, pertanian, hortikultura, dan kehutanan; damar sintetis yang belum diolah, bahan plastik yang belum diolah; pupuk kompos, pupuk buatan.',
    commonExamples: ['Pupuk pertanian & tanaman', 'Perekat industri', 'Resin sintetis mentah', 'Reagen kimia laboratorium'],
    exclusions: ['Damar alami mentah (Kelas 2)', 'Produk kimia untuk medis (Kelas 5)'],
    filingTip: 'Tentukan secara spesifik apakah bahan kimia untuk keperluan industri/ilmiah agar tidak ditolak tumpang tindih dengan Kelas 5 farmasi.'
  },
  {
    number: 2,
    type: 'Barang',
    title: 'Cat, Pernis & Pewarna',
    category: 'Industri & Dekoratif',
    officialHeading: 'Cat, pernis, lak; bahan pelindung terhadap karat dan pembusukan kayu; bahan pewarna; damar alami mentah; logam dalam bentuk foil dan bubuk untuk pelukis, dekorator, pencetak, dan seniman.',
    commonExamples: ['Cat tembok interior & eksterior', 'Pelapis anti-karat', 'Tinta cetak industri', 'Pernis kayu'],
    exclusions: ['Resin sintetis olahan (Kelas 1)', 'Pewarna kosmetik (Kelas 3)', 'Cat air untuk pelukis (Kelas 16)'],
    filingTip: 'Bedakan antara pewarna teknis pelindung permukaan dengan pewarna kosmetik personal.'
  },
  {
    number: 3,
    type: 'Barang',
    title: 'Kosmetik, Sabun & Wewangian',
    category: 'Perawatan Tubuh & Kecantikan',
    officialHeading: 'Kosmetik non-medis dan sediaan perawatan tubuh; pasta gigi non-medis; wewangian, minyak atsiri; sediaan pemutih dan bahan lain untuk mencuci pakaian; sediaan pembersih, pengilap, dan pengikis.',
    commonExamples: ['Krim pelembap wajah', 'Sabun pembersih muka & tubuh', 'Parfum & minyak wangi', 'Sampo rambut', 'Deterjen cucian'],
    exclusions: ['Salep kulit berobat/medis (Kelas 5)', 'Kosmetik dengan klaim terapi pengobatan (Kelas 5)'],
    filingTip: 'Salah satu kelas paling padat di DJKI Indonesia. Wajib cantumkan klaim "non-medis" untuk menghindari surat usulan penolakan dari pemeriksa.'
  },
  {
    number: 4,
    type: 'Barang',
    title: 'Minyak Industri, Pelumas & Bahan Bakar',
    category: 'Energi & Pelumas',
    officialHeading: 'Minyak dan lemak industri, lilin; pelumas; komposisi penyerap, pembasah, dan pengikat debu; bahan bakar dan bahan penyala api; lilin dan sumbu untuk penerangan.',
    commonExamples: ['Minyak pelumas mesin (oli)', 'Bahan bakar bensin & biofuel', 'Lilin aroma terapi dekoratif', 'Minyak gemuk industri'],
    exclusions: ['Minyak atsiri wewangian (Kelas 3)'],
    filingTip: 'Lilin aromaterapi sering kali didaftarkan bersamaan (cross-class) dengan pengharum ruangan di Kelas 3.'
  },
  {
    number: 5,
    type: 'Barang',
    title: 'Farmasi, Suplemen & Obat-obatan',
    category: 'Kesehatan & Medis',
    officialHeading: 'Sediaan farmasi, medis, dan kedokteran hewan; sediaan higienis untuk keperluan medis; makanan dan zat diet disesuaikan untuk medis; suplemen diet untuk manusia dan hewan; plester, bahan pembalut; disinfektan.',
    commonExamples: ['Obat resep dokter', 'Suplemen vitamin & mineral', 'Disinfektan antiseptik medis', 'Gel antibakteri pembersih tangan'],
    exclusions: ['Lotion kosmetik biasa (Kelas 3)', 'Makanan biasa tanpa klaim medis (Kelas 29, 30, 32)'],
    filingTip: 'Kelas dengan pengawasan ketat di BPOM dan DJKI. Deskripsi suplemen tidak boleh mengklaim menyembuhkan penyakit berat secara langsung.'
  },
  {
    number: 6,
    type: 'Barang',
    title: 'Logam & Perangkat Keras',
    category: 'Konstruksi & Perangkat Keras',
    officialHeading: 'Logam biasa dan paduannya, bijih logam; bahan bangunan dan konstruksi dari logam; bangunan dapat dipindahkan dari logam; kabel dan kawat bukan listrik dari logam; perkakas kecil dari logam; wadah logam untuk penyimpanan.',
    commonExamples: ['Baja dan profil konstruksi', 'Kunci pintu & gembok logam', 'Baut, mur, dan paku logam', 'Wadah kontainer penyimpanan dari logam'],
    exclusions: ['Logam mulia seperti emas & perak (Kelas 14)', 'Kabel listrik (Kelas 9)'],
    filingTip: 'Klasifikasikan berdasarkan bahan dasar logam, bukan fungsi elektronik pintarnya.'
  },
  {
    number: 7,
    type: 'Barang',
    title: 'Mesin & Alat Perkakas Mekanik',
    category: 'Teknik & Mesin',
    officialHeading: 'Mesin, perkakas mesin, alat bertenaga listrik; motor dan mesin (kecuali untuk kendaraan darat); kopling mesin dan komponen transmisi; alat pertanian selain yang dioperasikan dengan tangan; inkubator telur.',
    commonExamples: ['Robot perakitan industri', 'Bor listrik tangan bertenaga baterai', 'Genset pembangkit listrik', 'Mesin pengemas otomatis'],
    exclusions: ['Perkakas tangan manual (Kelas 8)', 'Mesin penggerak kendaraan darat (Kelas 12)'],
    filingTip: 'Mesin untuk kendaraan darat harus masuk ke Kelas 12, bukan Kelas 7.'
  },
  {
    number: 8,
    type: 'Barang',
    title: 'Perkakas Tangan Manual & Pisau',
    category: 'Alat Tangan & Dapur',
    officialHeading: 'Perkakas dan instrumen tangan yang digerakkan secara manual; sendok garpu pisau; senjata genggam selain senjata api; alat cukur.',
    commonExamples: ['Pisau dapur manual', 'Obeng dan palu tangan', 'Pisau cukur manual', 'Gunting dahan manual'],
    exclusions: ['Mesin potong listrik bertenaga motor (Kelas 7)', 'Pisau bedah medis (Kelas 10)', 'Pisau pemotong kertas kantor (Kelas 16)'],
    filingTip: 'Tekankan sifat manual (tanpa daya motor listrik).'
  },
  {
    number: 9,
    type: 'Barang',
    title: 'Elektronik, Aplikasi Mobile & Perangkat Lunak',
    category: 'Teknologi, AI & Perangkat Keras',
    officialHeading: 'Aparatus dan instrumen ilmiah, penelitian, navigasi, fotografi, sinematografi, audiovisual, optik; aparatus dan instrumen untuk merekam, mentransmisikan, mereproduksi suara atau data; perangkat lunak; komputer; aplikasi seluler yang dapat diunduh.',
    commonExamples: ['Aplikasi mobile yang dapat diunduh (Android/iOS)', 'Platform perangkat lunak kecerdasan buatan (AI)', 'Smartphone & jam tangan pintar (smartwatch)', 'Headphone & audio earphone', 'Kacamata virtual reality (VR)'],
    exclusions: ['Layanan cloud hosted SaaS / software web (Kelas 42)', 'Alat diagnostik medis fisik (Kelas 10)'],
    filingTip: 'Kelas paling strategis dan sering disengketakan. Aplikasi yang diunduh = Kelas 9; Layanan cloud/SaaS berbasis web tanpa unduhan = Kelas 42.'
  },
  {
    number: 10,
    type: 'Barang',
    title: 'Alat Kesehatan & Medis',
    category: 'Kesehatan & Biomedis',
    officialHeading: 'Aparatus dan instrumen bedah, medis, gigi, dan kedokteran hewan; anggota badan palsu, mata dan gigi palsu; artikel ortopedi; bahan jahit operasi; alat terapeutik dan bantu untuk penyandang disabilitas; alat pijat.',
    commonExamples: ['Monitor denyut jantung medis', 'Alat bedah diagnostik', 'Penyangga ortopedi sendi', 'Alat USG medis'],
    exclusions: ['Jam tangan olahraga pelacak kebugaran gaya hidup konsumen biasa (Kelas 9)'],
    filingTip: 'Klarifikasi apakah produk ditujukan untuk diagnostik klinis dokter atau kebugaran konsumen umum.'
  },
  {
    number: 11,
    type: 'Barang',
    title: 'Alat Penerangan, Pemanas & Sanitasi',
    category: 'Peralatan Rumah Tangga & Lampu',
    officialHeading: 'Aparatus dan instalasi untuk penerangan, pemanasan, pendinginan, penghasil uap, memasak, pengeringan, ventilasi, penyediaan air dan keperluan sanitasi.',
    commonExamples: ['Lampu LED pintar', 'Air purifier pembersih udara', 'Mesin pembuat kopi elektrik', 'Kulkas & pendingin ruangan AC'],
    exclusions: ['Peralatan pemanas laboratorium ilmiah (Kelas 9)'],
    filingTip: 'Lampu hias, lampu jalan, dan peralatan dapur listrik pembuat panas/dingin dikelompokkan di sini.'
  },
  {
    number: 12,
    type: 'Barang',
    title: 'Kendaraan & Transportasi',
    category: 'Otomotif & Transportasi',
    officialHeading: 'Kendaraan; aparatus untuk lokomosi di darat, udara, atau air.',
    commonExamples: ['Mobil penumpang listrik', 'Sepeda & sepeda listrik (e-bike)', 'Drone kamera udara nirawak', 'Sasis & velg roda otomotif'],
    exclusions: ['Mainan mobil-mobilan anak (Kelas 28)', 'Traktor pemanen tanaman (Kelas 7 untuk pemanen, Kelas 12 untuk traktor darat)'],
    filingTip: 'Drone kamera sering kali didaftarkan bersamaan di Kelas 9 (kamera/sensor) dan Kelas 12 (wahana udara).'
  },
  {
    number: 13,
    type: 'Barang',
    title: 'Senjata Api & Kembang Api',
    category: 'Pertahanan & Piroteknik',
    officialHeading: 'Senjata api; amunisi dan proyektil; bahan peledak; kembang api.',
    commonExamples: ['Senapan olahraga', 'Peluru dan amunisi', 'Kembang api pesta'],
    exclusions: ['Pisau berburu genggam (Kelas 8)', 'Pistol mainan plastik (Kelas 28)'],
    filingTip: 'Kelas dengan regulasi ketat perizinan keamanan negara.'
  },
  {
    number: 14,
    type: 'Barang',
    title: 'Perhiasan & Jam Tangan',
    category: 'Kemewahan & Aksesori',
    officialHeading: 'Logam mulia dan paduannya; perhiasan, batu mulia dan semi-mulia; instrumen horologis dan kronometris (jam tangan).',
    commonExamples: ['Cincin berlian & emas', 'Jam tangan mekanik/analog', 'Kalung liontin logam mulia', 'Kotak perhiasan'],
    exclusions: ['Smartwatch digital pintar yang memproses notifikasi telepon (Kelas 9)', 'Perhiasan imitasi non-logam mulia (tetap di Kelas 14)'],
    filingTip: 'Smartwatch hibrida disarankan mendaftar di Kelas 9 (elektronik) dan Kelas 14 (casing jam tangan).'
  },
  {
    number: 15,
    type: 'Barang',
    title: 'Alat Musik',
    category: 'Musik & Kesenian',
    officialHeading: 'Alat musik; standar musik dan penyangga alat musik; tongkat dirigen.',
    commonExamples: ['Gitar akustik & listrik', 'Piano digital & synthesizer', 'Set drum', 'Busur biola'],
    exclusions: ['Speaker audio dan amplifier suara (Kelas 9)', 'Software perekaman musik DAW (Kelas 9)'],
    filingTip: 'Alat musik fisiknya masuk Kelas 15; software musik dan speaker masuk Kelas 9.'
  },
  {
    number: 16,
    type: 'Barang',
    title: 'Kertas, Alat Tulis & Percetakan',
    category: 'Kantor & Penerbitan',
    officialHeading: 'Kertas dan kardus; barang cetakan; bahan penjilidan buku; foto; alat tulis dan keperluan kantor; perekat untuk keperluan alat tulis atau rumah tangga; bahan gambar dan bahan untuk seniman.',
    commonExamples: ['Buku & majalah cetak', 'Buku catatan agenda kertas', 'Kardus kemasan cetak', 'Pulpen, spidol & pensil tulis'],
    exclusions: ['Buku elektronik / e-book yang dapat diunduh (Kelas 9)', 'Cat lukis seniman (Kelas 2)'],
    filingTip: 'Wajib sebutkan bentuk "cetak" fisik untuk membedakannya dari media digital di Kelas 9.'
  },
  {
    number: 17,
    type: 'Barang',
    title: 'Karet, Plastik Mentah & Insulasi',
    category: 'Material Industri',
    officialHeading: 'Karet olahan, gutta-percha, getah, mika; plastik dan resin dalam bentuk diekstrusi untuk digunakan dalam manufaktur; bahan pengepakan, pengisi dan penyekat (insulasi).',
    commonExamples: ['Bahan peredam suara gedung', 'Selang karet industri', 'Film plastik lembaran untuk manufaktur'],
    exclusions: ['Resin mentah sintetis (Kelas 1)', 'Wadah kotak plastik rumah tangga jadi (Kelas 21)'],
    filingTip: 'Mengelompokkan bahan isolasi dan karet olahan, bukan produk jadi konsumen.'
  },
  {
    number: 18,
    type: 'Barang',
    title: 'Barang Kulit, Tas & Koper',
    category: 'Mode & Aksesori Perjalanan',
    officialHeading: 'Kulit dan kulit imitasi; kulit binatang; koper dan tas jinjing; payung dan payung matahari; tongkat jalan; cambuk, pelana, dan tali kekang; kalung dan tali kekang untuk hewan peliharaan.',
    commonExamples: ['Tas tangan ransel kulit', 'Koper pakaian perjalanan', 'Dompet uang & tempat kartu', 'Tali kekang anjing/kucing'],
    exclusions: ['Jaket pakaian dari bahan kulit (Kelas 25)', 'Sepatu kulit (Kelas 25)'],
    filingTip: 'Merek fashion sering kali bersinggungan di tas (Kelas 18) dan busana (Kelas 25).'
  },
  {
    number: 19,
    type: 'Barang',
    title: 'Bahan Bangunan Non-Logam',
    category: 'Konstruksi & Arsitektur',
    officialHeading: 'Bahan bangunan bukan dari logam; pipa kaku bukan dari logam untuk bangunan; aspal, ter, dan bitumen; bangunan dapat dipindahkan bukan dari logam; monumen bukan dari logam.',
    commonExamples: ['Keramik ubin lantai', 'Bata beton cor', 'Kayu olahan papan bangunan', 'Campuran aspal jalan'],
    exclusions: ['Balok besi struktur baja (Kelas 6)'],
    filingTip: 'Fokus pada material konstruksi non-logam seperti keramik, semen, dan kayu olahan.'
  },
  {
    number: 20,
    type: 'Barang',
    title: 'Mebel, Furnitur & Cermin',
    category: 'Interior & Rumah Tangga',
    officialHeading: 'Mebel, cermin, bingkai gambar; wadah bukan dari logam untuk penyimpanan atau transportasi; tulang, tanduk, atau kulit kerang yang belum atau sudah dikerjakan.',
    commonExamples: ['Meja kerja & kursi ergonomis', 'Rangka ranjang tidur & kasur matras', 'Bingkai foto kayu', 'Rak display kayu bukan logam'],
    exclusions: ['Wadah kontainer logam (Kelas 6)', 'Sprei kain dan selimut kasur (Kelas 24)'],
    filingTip: 'Kasur dan rangka ranjang ada di Kelas 20; sprei dan selimutnya ada di Kelas 24.'
  },
  {
    number: 21,
    type: 'Barang',
    title: 'Perkakas Dapur, Gelas & Wadah Minum',
    category: 'Dapur & Kebutuhan Rumah Tangga',
    officialHeading: 'Perkakas dan wadah rumah tangga atau dapur; peralatan masak dan peralatan makan, kecuali garpu, pisau dan sendok; sisir dan spons; sikat; bahan pembersih; kaca yang belum atau sudah dikerjakan.',
    commonExamples: ['Tumbler botol minum termos tahan panas', 'Cangkir mug keramik kopi', 'Panci & wajan masak antilengket', 'Sikat gigi & spons pencuci piring'],
    exclusions: ['Blender dan peralatan dapur bertenaga listrik (Kelas 7)', 'Sendok, garpu makan dari logam (Kelas 8)'],
    filingTip: 'Tumbler dan botol minum berinsulasi adalah salah satu sumber sengketa merek terpopuler saat ini.'
  },
  {
    number: 22,
    type: 'Barang',
    title: 'Tali, Tenda & Terpal',
    category: 'Luar Ruangan & Pengepakan',
    officialHeading: 'Tali dan benang kasar; jaring; tenda dan terpal; kanopi kain atau bahan sintetis; layar perahu; karung untuk transportasi dan penyimpanan barang curah; bahan bantalan.',
    commonExamples: ['Tenda kemah berkemah', 'Tali panjat tebing', 'Terpal plastik antiair', 'Karung goni kemasan'],
    exclusions: ['Senar alat musik (Kelas 15)'],
    filingTip: 'Perlengkapan berkemah outdoor sering mendaftarkan Kelas 22 (tenda) bersamaan dengan Kelas 20 (kursi lipat).'
  },
  {
    number: 23,
    type: 'Barang',
    title: 'Benang untuk Tekstil',
    category: 'Industri Tekstil',
    officialHeading: 'Benang untuk penggunaan tekstil.',
    commonExamples: ['Benang sulam katun', 'Benang rajut wol', 'Benang jahit sintetis'],
    exclusions: ['Kain tenun potongan (Kelas 24)'],
    filingTip: 'Bahan baku benang untuk pabrik/garmen; kain lembarannya masuk Kelas 24.'
  },
  {
    number: 24,
    type: 'Barang',
    title: 'Kain, Tekstil & Sprei',
    category: 'Perlengkapan Tidur & Tekstil Rumah',
    officialHeading: 'Tekstil dan pengganti tekstil; linen rumah tangga; tirai dari bahan tekstil atau plastik.',
    commonExamples: ['Sprei tempat tidur & sarung bantal katun', 'Handuk mandi', 'Gorden tirai jendela', 'Kain sofa pelapis mebel'],
    exclusions: ['Pakaian baju jadi yang dipakai badan (Kelas 25)'],
    filingTip: 'Handuk dan sprei adalah Kelas 24; jubah mandi pakaian adalah Kelas 25.'
  },
  {
    number: 25,
    type: 'Barang',
    title: 'Pakaian, Alas Kaki & Tutup Kepala',
    category: 'Mode, Pakaian & Sepatu',
    officialHeading: 'Pakaian, alas kaki, tutup kepala.',
    commonExamples: ['Kaos t-shirt, kemeja, hoodie & jaket', 'Sepatu sneakers olahraga & sepatu formal', 'Topi baseball & kupluk beanie', 'Celana panjang & rok busana'],
    exclusions: ['Pakaian pelindung kecelakaan industri keselamatan (Kelas 9)', 'Sepatu ortopedi medis (Kelas 10)'],
    filingTip: 'Kelas nomor 1 terpadat di Indonesia dan dunia. Potensi perselisihan persamaan pada pokoknya sangat tinggi.'
  },
  {
    number: 26,
    type: 'Barang',
    title: 'Renda, Kancing & Aksesori Rambut',
    category: 'Aksesori Pakaian & Rambut',
    officialHeading: 'Renda, kepang, dan bordir; kancing, kait, dan mata kancing, jarum; bunga buatan; hiasan rambut; rambut palsu.',
    commonExamples: ['Ritsleting jaket & kancing baju', 'Jepit rambut & ikat rambut elastis', 'Bunga hiasan tiruan', 'Bordir emblem tempel pakaian'],
    exclusions: ['Benang jahit (Kelas 23)', 'Jepit rambut dari logam mulia berharga (Kelas 14)'],
    filingTip: 'Aksesori ornamen busana dan perlengkapan rambut berkumpul di sini.'
  },
  {
    number: 27,
    type: 'Barang',
    title: 'Karpet, Tikar & Matras Olahraga',
    category: 'Interior & Lantai',
    officialHeading: 'Karpet, permadani, tikar, linoleum dan bahan lain untuk menutupi lantai yang ada; gantungan dinding bukan dari bahan tekstil.',
    commonExamples: ['Permadani karpet lantai', 'Matras yoga & matras senam kebugaran', 'Pelapis lantai vinil', 'Wallpaper dinding dekoratif'],
    exclusions: ['Ubin lantai keramik (Kelas 19)', 'Kain hiasan dinding tekstil (Kelas 24)'],
    filingTip: 'Perhatian: Matras yoga senam kebugaran tergolong dalam Kelas 27.'
  },
  {
    number: 28,
    type: 'Barang',
    title: 'Mainan, Game & Alat Olahraga',
    category: 'Olahraga & Hiburan',
    officialHeading: 'Game, mainan, dan benda untuk bermain; aparatus video game fisik; artikel senam dan olahraga; dekorasi untuk pohon Natal.',
    commonExamples: ['Permainan papan board game', 'Boneka & action figure mainan', 'Konsol video game fisik', 'Dumbbell angkat beban & alat gym senam', 'Bola sepak & stik golf'],
    exclusions: ['Software video game yang dapat diunduh (Kelas 9)', 'Pakaian olahraga dan sepatu lari (Kelas 25)'],
    filingTip: 'Perangkat fisik konsol/alat gym ada di Kelas 28; software kode gamenya ada di Kelas 9.'
  },
  {
    number: 29,
    type: 'Barang',
    title: 'Makanan Olahan, Daging, Susu & Keju',
    category: 'Bahan Pangan & Makanan Olahan',
    officialHeading: 'Daging, ikan, unggas dan hewan buruan; ekstrak daging; buah dan sayuran yang diawetkan, dibekukan, dikeringkan dan dimasak; jeli, selai, kolak; telur; susu, keju, mentega, yogurt dan produk susu lainnya; minyak dan lemak untuk makanan.',
    commonExamples: ['Daging olahan & sosis', 'Susu hewani & keju artisan', 'Keripik buah & sayuran beku', 'Minyak kelapa & minyak zaitun makan', 'Selai kacang olesan'],
    exclusions: ['Sayuran dan buah-buahan segar alami belum diolah (Kelas 31)', 'Hewan hidup (Kelas 31)'],
    filingTip: 'Makanan olahan/beku masuk Kelas 29; hasil panen segar masuk Kelas 31; roti/kopi masuk Kelas 30.'
  },
  {
    number: 30,
    type: 'Barang',
    title: 'Kopi, Teh, Roti & Makanan Ringan',
    category: 'Makanan Pokok, Kopi & Camilan',
    officialHeading: 'Kopi, teh, kakao dan penggantinya; beras, pasta, dan mi; tapioka dan sagu; tepung dan sediaan dari sereal; roti, kue kering, dan kembang gula; cokelat; es krim; gula, madu; ragi; garam, bumbu dapur, rempah-rempah; cuka, saus.',
    commonExamples: ['Biji kopi sangrai & kopi bubuk', 'Cokelat batangan kembang gula', 'Roti bakery dan kue kering', 'Mi instan dan pasta sereal', 'Saus sambal kemasan & bumbu rempah masakan'],
    exclusions: ['Teh obat kesehatan (Kelas 5)', 'Biji-bijian tanaman pertanian mentah (Kelas 31)'],
    filingTip: 'Salah satu kelas bisnis F&B paling laris di Indonesia. Kopi kemasan = Kelas 30; Kedai kafe penyaji kopi = Kelas 43.'
  },
  {
    number: 31,
    type: 'Barang',
    title: 'Hasil Pertanian Segar & Makanan Hewan',
    category: 'Pertanian & Hewan Peliharaan',
    officialHeading: 'Produk pertanian, akuakultur, hortikultura dan kehutanan mentah dan belum diolah; biji-bijian mentah; buah dan sayuran segar; tanaman dan bunga alami; bibit untuk ditanam; hewan hidup; makanan dan minuman untuk hewan.',
    commonExamples: ['Makanan anjing & kucing (pet food)', 'Buah apel & sayur segar belum dimasak', 'Tanaman hias hidup', 'Benih bibit tanaman pertanian'],
    exclusions: ['Sayuran kaleng olahan diawetkan (Kelas 29)'],
    filingTip: 'Makanan dan camilan hewan peliharaan (pet food) masuk Kelas 31.'
  },
  {
    number: 32,
    type: 'Barang',
    title: 'Minuman Non-Alkohol, Air Mineral & Bir',
    category: 'Minuman Ringan & Bir',
    officialHeading: 'Bir; minuman non-alkohol; air mineral dan air aerasi; minuman sari buah dan jus buah; sirup dan sediaan lain untuk membuat minuman non-alkohol.',
    commonExamples: ['Minuman berenergi elektrolit', 'Air mineral kemasan botol', 'Jus buah alami & sari buah', 'Minuman soda berperisa', 'Bir beralkohol rendah'],
    exclusions: ['Anggur wine dan minuman keras beralkohol tinggi (Kelas 33)', 'Minuman siap saji kopi dan teh (Kelas 30)'],
    filingTip: 'Bir dikelompokkan di sini bersama minuman non-alkohol; wine dan minuman keras masuk Kelas 33.'
  },
  {
    number: 33,
    type: 'Barang',
    title: 'Minuman Keras & Anggur (Wine)',
    category: 'Minuman Beralkohol Tinggi',
    officialHeading: 'Minuman beralkohol, kecuali bir; sediaan beralkohol untuk membuat minuman.',
    commonExamples: ['Anggur merah & anggur putih (wine)', 'Wiski single malt', 'Vodka & gin', 'Arak & minuman spirit keras'],
    exclusions: ['Bir (Kelas 32)', 'Wine non-alkohol tanpa alkohol (Kelas 32)'],
    filingTip: 'Pemisahan tegas dari bir (Kelas 32). Sering kali terjadi oposisi lintas kelas bila kemiripan nama tinggi.'
  },
  {
    number: 34,
    type: 'Barang',
    title: 'Tembakau, Rokok & Rokok Elektrik (Vape)',
    category: 'Tembakau & Vape',
    officialHeading: 'Tembakau dan pengganti tembakau; rokok dan cerutu; rokok elektronik (vape) dan alat penguap oral untuk perokok; perlengkapan perokok; korek api.',
    commonExamples: ['Rokok kretek & putih', 'Perangkat rokok elektrik / vape pod', 'Cairan e-liquid isi ulang vape', 'Korek api gas & asbak rokok'],
    exclusions: ['Obat permen karet penghenti rokok (Kelas 5)'],
    filingTip: 'Perangkat vape dan cairan liquid aroma vape diatur di Kelas 34 dalam klasifikasi Nice terkini.'
  },

  // JASA (Kelas 35 - 45)
  {
    number: 35,
    type: 'Jasa',
    title: 'Periklanan, Manajemen Bisnis & Toko Retail',
    category: 'Perniagaan, Retail & Pemasaran',
    officialHeading: 'Periklanan; manajemen, organisasi, dan administrasi bisnis; fungsi kantor; jasa toko retail dan toko retail online.',
    commonExamples: ['Jasa toko retail online e-commerce menjual pakaian atau elektronik', 'Pemasaran digital & periklanan online', 'Konsultasi manajemen bisnis perusahaan', 'Jasa penyaluran tenaga kerja dan rekrutmen'],
    exclusions: ['Pemrosesan transaksi perbankan keuangan (Kelas 36)', 'Perancangan arsitektur software IT (Kelas 42)'],
    filingTip: 'Kelas jasa paling banyak didaftarkan di DJKI. Wajib merinci barang apa yang dijual di toko retail (contoh: "jasa toko retail online yang menampilkan pakaian").'
  },
  {
    number: 36,
    type: 'Jasa',
    title: 'Layanan Keuangan, Perbankan & Properti',
    category: 'Keuangan, Fintech & Real Estat',
    officialHeading: 'Layanan keuangan, moneter dan perbankan; layanan asuransi; urusan real estat.',
    commonExamples: ['Jasa pemrosesan transaksi pembayaran fintech & e-wallet', 'Manajemen investasi modal ventura', 'Penyaluran kredit pinjaman perbankan', 'Jasa agen perantara jual-beli properti real estat'],
    exclusions: ['Pembangunan fisik konstruksi gedung (Kelas 37)', 'Software aplikasi dompet digital (Kelas 9 untuk kode, Kelas 42 untuk web platform)'],
    filingTip: 'Fintech wajib membedakan antara jasa transaksional keuangannya (Kelas 36) dan aplikasi software IT pendukungnya (Kelas 42).'
  },
  {
    number: 37,
    type: 'Jasa',
    title: 'Konstruksi Bangunan, Instalasi & Perbaikan',
    category: 'Konstruksi & Perawatan Mesin',
    officialHeading: 'Jasa konstruksi; jasa instalasi dan perbaikan; penambangan ekstraksi, pengeboran minyak dan gas.',
    commonExamples: ['Konstruksi bangunan gedung dan perumahan', 'Bengkel servis perbaikan mesin mobil & motor', 'Jasa instalasi pendingin AC dan kelistrikan', 'Perbaikan perangkat keras elektronik'],
    exclusions: ['Perbaikan dan debugging software komputer (Kelas 42)', 'Jasa gambar arsitektur (Kelas 42)'],
    filingTip: 'Fokus pada pekerjaan fisik mekanis di lapangan, bukan pemeliharaan perangkat lunak digital.'
  },
  {
    number: 38,
    type: 'Jasa',
    title: 'Telekomunikasi, Siaran & Komunikasi Data',
    category: 'Telekomunikasi & Jaringan',
    officialHeading: 'Layanan telekomunikasi; penyiaran; transmisi file digital; konferensi audio dan video.',
    commonExamples: ['Jasa jaringan operator seluler dan internet broadband', 'Transmisi panggilan video call dan VoIP', 'Streaming siaran media audio-visual melalui internet', 'Layanan pengiriman pesan elektronik'],
    exclusions: ['Produksi materi konten podcast atau video film (Kelas 41)', 'Pengembangan software aplikasi chat (Kelas 42)'],
    filingTip: 'Kelas 38 mencakup saluran transmisi gelombang/data fisiknya; isi materi kontennya masuk Kelas 41.'
  },
  {
    number: 39,
    type: 'Jasa',
    title: 'Transportasi, Logistik & Pengiriman Barang',
    category: 'Logistik, Ekspedisi & Perjalanan',
    officialHeading: 'Transportasi; pengemasan dan penyimpanan barang; pengaturan perjalanan.',
    commonExamples: ['Jasa kurir pengiriman paket kilat', 'Ekspedisi kargo kontainer logistik', 'Penyewaan gudang penyimpanan fisik barang', 'Transportasi penumpang taksi online / travel'],
    exclusions: ['Asuransi perjalanan pengiriman (Kelas 36)'],
    filingTip: 'Perusahaan ekspedisi dan ride-hailing mendaftarkan jasa pengantaran di Kelas 39 bersamaan dengan aplikasi booking di Kelas 9.'
  },
  {
    number: 40,
    type: 'Jasa',
    title: 'Pengolahan Bahan & Manufaktur Kustom',
    category: 'Fabrikasi & Daur Ulang',
    officialHeading: 'Pengolahan bahan; daur ulang limbah dan sampah; pemurnian udara dan pengolahan air; jasa percetakan; pengawetan makanan dan minuman.',
    commonExamples: ['Jasa pencetakan 3D custom berdasarkan pesanan', 'Pewarnaan kain tekstil maklon', 'Daur ulang sampah plastik dan elektronik', 'Fabrikasi logam presisi pesanan khusus'],
    exclusions: ['Manufaktur massal untuk dijual sendiri (tergolong penjualan barang di toko/retail)'],
    filingTip: 'Berlaku untuk jasa pengerjaan/maklon atas pesanan pihak ketiga.'
  },
  {
    number: 41,
    type: 'Jasa',
    title: 'Pendidikan, Hiburan & Pelatihan Olahraga',
    category: 'Pelatihan, Media & Olahraga',
    officialHeading: 'Pendidikan; penyediaan pelatihan; hiburan; kegiatan olahraga dan budaya; produksi podcast, video dan acara panggung.',
    commonExamples: ['Penyelenggaraan kursus edukasi online non-downloadable', 'Produksi konten podcast hiburan dan video kreatif', 'Jasa pelatihan instruktur gym kebugaran fisik', 'Penyelenggaraan festival musik dan kompetisi olahraga'],
    exclusions: ['Peralatan alat gym fisik (Kelas 28)', 'Aplikasi edukasi yang diunduh (Kelas 9)'],
    filingTip: 'Kelas utama bagi kreator konten, kursus online, pelatihan olahraga gym, dan penyelenggara event.'
  },
  {
    number: 42,
    type: 'Jasa',
    title: 'Teknologi Informasi, SaaS & Riset Ilmiah',
    category: 'Software, Cloud & Rekayasa IT',
    officialHeading: 'Layanan ilmiah dan teknologi serta penelitian dan desain yang berkaitan dengannya; analisis dan penelitian industri; desain dan pengembangan perangkat keras dan perangkat lunak komputer; cloud computing dan SaaS.',
    commonExamples: ['Software as a Service (SaaS) berbasis cloud AI', 'Platform as a Service (PaaS)', 'Jasa keamanan siber cybersecurity', 'Jasa desain dan pemrograman website / aplikasi kustom', 'Layanan riset teknik rekayasa'],
    exclusions: ['File software yang dapat diunduh (Kelas 9)', 'Konsultasi manajemen bisnis (Kelas 35)'],
    filingTip: 'Rumah utama bagi seluruh perusahaan SaaS, platform web startup teknologi, dan pengembang cloud.'
  },
  {
    number: 43,
    type: 'Jasa',
    title: 'Penyediaan Makanan Minuman, Restoran & Hotel',
    category: 'Kuliner, Kafe & Perhotelan',
    officialHeading: 'Layanan penyediaan makanan dan minuman; akomodasi sementara.',
    commonExamples: ['Restoran makan di tempat & kedai makan', 'Kafe kopi kekinian & coffee shop', 'Hotel butik dan penginapan resort', 'Jasa katering pesta dan prasmanan'],
    exclusions: ['Penyewaan apartemen hunian jangka panjang (Kelas 36)', 'Makanan kemasan bermerek yang dijual di supermarket (Kelas 29, 30)'],
    filingTip: 'Kedai kafe kopi = Kelas 43; Biji kopi kemasannya yang dijual ritel = Kelas 30. Sering kali wajib daftar keduanya!'
  },
  {
    number: 44,
    type: 'Jasa',
    title: 'Layanan Medis, Klinik, Kecantikan & Perawatan Hewan',
    category: 'Kesehatan, Klinik & Estetika',
    officialHeading: 'Layanan medis; layanan kedokteran hewan; perawatan higienis dan kecantikan untuk manusia atau hewan; layanan pertanian, akuakultur, hortikultura dan kehutanan.',
    commonExamples: ['Klinik dokter umum dan layanan telemedisin', 'Klinik estetika kecantikan dan salon spa', 'Rumah sakit hewan & dokter hewan', 'Jasa penataan taman lanskap'],
    exclusions: ['Alat medis diagnostik (Kelas 10)', 'Krim kosmetik yang digunakan di klinik (Kelas 3)'],
    filingTip: 'Jasa perawatan wajah salon ada di Kelas 44; produk krim perawatannya ada di Kelas 3.'
  },
  {
    number: 45,
    type: 'Jasa',
    title: 'Layanan Hukum, Keamanan Fisik & Jejaring Sosial',
    category: 'Hukum, Keamanan & Sosial',
    officialHeading: 'Layanan hukum; layanan keamanan untuk perlindungan fisik harta benda dan individu; layanan kencan; layanan jejaring sosial online.',
    commonExamples: ['Konsultan hukum kekayaan intelektual (pendaftaran merek & paten)', 'Jasa petugas satpam penjaga keamanan fisik gedung', 'Layanan platform biro jodoh dan kencan online', 'Layanan jejaring sosial online'],
    exclusions: ['Keamanan siber digital komputer (Kelas 42)', 'Investigasi keuangan forensik (Kelas 36)'],
    filingTip: 'Platform kencan dan jejaring sosial personal ada di Kelas 45; infrastruktur hosting cloud teknisnya ada di Kelas 42.'
  },
];
