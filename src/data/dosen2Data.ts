import type { Dosen2DataBundle } from '../types/anatomy';

export const DOSEN2_DATA: Dosen2DataBundle = {
  kardiovaskuler: {
    title: 'Anatomi & Fisiologi Kardiovaskular',
    subtitle:
      'Letak jantung di mediastinum, lapisan dinding, empat ruang & katup, sirkulasi koroner, sistem konduksi listrik, EKG, siklus jantung, suara S1/S2, dan curah jantung.',
    sources: [
      'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx (Agustina Dwi Prastanti)',
      'Sistem Peredaran Darah.pptx (Blood Circulation System)',
      'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 17–19',
    ],
    overviewFacts: [
      {
        label: 'Posisi & Rongga',
        value: 'Mediastinum Tengah (Rongga Toraks)',
        detail:
          'Berada di antara kedua paru-paru, di atas diafragma, dan di belakang sternum (substernum agak ke kiri garis tengah).',
      },
      {
        label: 'Apeks & Basis Jantung',
        value: 'Apex: Sela Iga ke-5 (T8) | Basis: Superior',
        detail:
          'Apex cordis mengarah ke bawah, depan, dan kiri (ICS V kiri, setinggi vertebra T8); basis cordis berada di bagian atas tempat masuk-keluarnya pembuluh besar.',
      },
      {
        label: 'Ukuran & Volume',
        value: '250–300 gram | 225–250 cm³',
        detail:
          'Berukuran sekitar satu kepalan tangan dengan bentuk kerucut tumpul.',
      },
      {
        label: 'Batas-Batas Jantung',
        value: 'Depan: Sternum (Costae 1–3) | Bawah: Diafragma',
        detail:
          'Belakang: mediastinum posterior, esofagus, aorta desendens, vertebra torakalis; Samping: paru-paru; Atas: C2–T4, pembuluh besar & bronkus.',
      },
    ],
    wallLayers: [
      {
        order: 1,
        name: 'Perikardium (Kantung Penyelubung)',
        description:
          'Kantung pelindung terluar jantung. Terdiri atas perikardium fibrosa serta perikardium serosa lamina parietalis dan viseralis; di antara keduanya terdapat cavum pericardii berisi cairan pelumas agar jantung bergerak bebas tanpa gesekan.',
      },
      {
        order: 2,
        name: 'Epikardium',
        description:
          'Lapisan terluar dinding jantung (identik dengan lapisan viseral perikardium serosa) yang menutupi miokardium dari luar dan banyak mengandung jaringan lemak serta pembuluh koroner.',
      },
      {
        order: 3,
        name: 'Miokardium',
        description:
          'Lapisan otot jantung yang paling tebal dan berkontraksi untuk memompa darah. Membentuk berkas otot atrium, ventrikel, serta cincin pemisah atrioventrikular; dinding ventrikel kiri paling tebal karena memompa ke seluruh tubuh.',
      },
      {
        order: 4,
        name: 'Endokardium',
        description:
          'Lapisan terdalam dan paling tipis yang melapisi permukaan dalam seluruh ruang jantung serta katup agar aliran darah tetap licin dan tidak terhambat.',
      },
    ],
    chambers: [
      {
        name: 'Atrium Kanan (Right Atrium)',
        side: 'Kanan',
        role: 'Menerima darah miskin oksigen dari seluruh tubuh melalui Vena Cava Superior, Vena Cava Inferior, dan Sinus Koronarius.',
        bloodType: 'Kaya CO₂ (Deoksigenasi)',
      },
      {
        name: 'Ventrikel Kanan (Right Ventricle)',
        side: 'Kanan',
        role: 'Memompa darah melewati katup semilunar pulmonalis menuju arteri pulmonalis dan paru-paru (sirkulasi pulmonal). Dinding lebih tipis dibanding ventrikel kiri.',
        bloodType: 'Kaya CO₂ (Deoksigenasi)',
      },
      {
        name: 'Atrium Kiri (Left Atrium)',
        side: 'Kiri',
        role: 'Menerima darah kaya oksigen dari paru-paru melalui empat vena pulmonalis kanan dan kiri.',
        bloodType: 'Kaya O₂ (Teroksigenasi)',
      },
      {
        name: 'Ventrikel Kiri (Left Ventricle)',
        side: 'Kiri',
        role: 'Memompa darah melewati katup semilunar aorta menuju aorta ke seluruh tubuh (sirkulasi sistemik). Memiliki dinding miokardium paling tebal.',
        bloodType: 'Kaya O₂ (Teroksigenasi)',
      },
    ],
    valves: [
      {
        name: 'Katup Trikuspidalis (Katup AV Kanan)',
        alias: 'Tricuspid valve (3 daun katup)',
        location: 'Antara Atrium Kanan dan Ventrikel Kanan',
        function:
          'Membuka saat pengisian ventrikel kanan dan menutup rapat saat sistol untuk mencegah aliran balik darah ke atrium kanan.',
      },
      {
        name: 'Katup Mitral / Bikuspidalis (Katup AV Kiri)',
        alias: 'Bicuspid / Mitral valve (2 daun katup)',
        location: 'Antara Atrium Kiri dan Ventrikel Kiri',
        function:
          'Mencegah darah dari ventrikel kiri kembali ke atrium kiri saat kontraksi ventrikel; ditahan oleh chordae tendineae yang terhubung ke papillary muscles.',
      },
      {
        name: 'Katup Semilunaris Pulmonalis',
        alias: 'Pulmonary valve',
        location: 'Jalan keluar Ventrikel Kanan menuju Trunkus/Arteri Pulmonalis',
        function:
          'Membuka saat ventrikel kanan berkontraksi dan menutup saat diastol agar darah dari arteri pulmonalis tidak kembali ke ventrikel kanan.',
      },
      {
        name: 'Katup Semilunaris Aorta',
        alias: 'Aortic valve',
        location: 'Jalan keluar Ventrikel Kiri menuju Aorta Asendens',
        function:
          'Membuka saat sistol ventrikel kiri untuk mengalirkan darah ke aorta dan menutup saat diastol untuk mencegah regurgitasi dari aorta ke ventrikel kiri.',
      },
    ],
    coronaryArteries: [
      {
        mainBranch: 'Right Coronary Artery (RCA)',
        subBranches: [
          'Conus Branch',
          'Acute Marginal Branch (AM / Right Marginal Artery)',
          'AV Node Branch',
          'Posterior Descending Artery (PDA / Posterior Interventricular Artery)',
        ],
        territory:
          'Bercabang dari pangkal aorta asendens tepat di atas katup aorta; menyuplai atrium kanan, sebagian besar ventrikel kanan, nodus SA/AV, serta dinding inferior jantung.',
      },
      {
        mainBranch: 'Left Main Coronary Artery (LCA) → LAD',
        subBranches: [
          'Left Anterior Descending (LAD / Anterior Interventricular Artery)',
          'Diagonal Branches (D1, D2)',
          'Septal Branches',
        ],
        territory:
          'Berjalan di sulkus interventrikularis anterior; menyuplai dinding anterior ventrikel kiri, apeks jantung, dan bagian anterior septum interventrikulare.',
      },
      {
        mainBranch: 'Left Main Coronary Artery (LCA) → LCx',
        subBranches: [
          'Left Circumflex Artery (LCx)',
          'Marginal Branches (M1, M2)',
        ],
        territory:
          'Melengkung ke sisi kiri dalam sulkus koronarius; menyuplai atrium kiri serta dinding lateral dan posterior ventrikel kiri.',
      },
      {
        mainBranch: 'Drainase Vena Jantung (Sinus Koronarius)',
        subBranches: [
          'Great Cardiac Vein',
          'Middle Cardiac Vein',
          'Small Cardiac Vein',
          'Anterior Cardiac Veins (langsung ke atrium kanan)',
        ],
        territory:
          'Mengembalikan darah vena dari miokardium ke Coronary Sinus di aspek posterior jantung sebelum bermuara langsung ke Atrium Kanan.',
      },
    ],
    conductionSystem: [
      {
        step: 1,
        name: 'Nodus Sinoatrial (SA Node — Pacemaker)',
        role: 'Terletak di dinding atrium kanan dekat muara VCS; bertindak sebagai pemicu alami impuls listrik jantung dan menyebarkan gelombang kontraksi ke kedua atrium.',
      },
      {
        step: 2,
        name: 'Nodus Atrioventrikular (AV Node)',
        role: 'Terletak di dasar atrium kanan dekat septum; menahan impuls sejenak agar atrium selesai memompa darah masuk ke ventrikel sebelum ventrikel berkontraksi.',
      },
      {
        step: 3,
        name: 'Berkas His (Atrioventricular Bundle)',
        role: 'Satu-satunya jembatan konduksi listrik yang menembus sekat fibrosa antara atrium dan ventrikel menuju septum interventrikulare.',
      },
      {
        step: 4,
        name: 'Cabang Berkas Kanan & Kiri (Bundle Branches)',
        role: 'Menghantarkan impuls secara cepat menuruni sisi kanan dan kiri septum interventrikulare menuju apeks jantung.',
      },
      {
        step: 5,
        name: 'Serabut Purkinje (Purkinje Fibers)',
        role: 'Menyebarkan impuls dari apeks ke seluruh dinding miokardium ventrikel kanan dan kiri sehingga ventrikel berkontraksi kuat dan terkoordinasi.',
      },
    ],
    autonomicNerves: [
      {
        name: 'Saraf Simpatis',
        role: 'Kardio-akselerator',
        effect:
          'Meningkatkan frekuensi denyut jantung (kronotropik positif) dan memperkuat daya kontraksi miokardium.',
      },
      {
        name: 'Saraf Parasimpatis (melalui N. X / Vagus)',
        role: 'Kardio-inhibitor',
        effect:
          'Menurunkan frekuensi denyut jantung dan aktivitas kardiovaskular saat kondisi istirahat.',
      },
    ],
    ekgWaves: [
      {
        wave: 'Gelombang P',
        meaning:
          'Depolarisasi atrium (aktivitas listrik saat impuls dari SA Node menyebar ke otot atrium sebelum kontraksi atrium).',
      },
      {
        wave: 'Kompleks QRS',
        meaning:
          'Depolarisasi ventrikel (penyebaran impuls cepat melalui Berkas His, cabang berkas, dan serabut Purkinje untuk kontraksi ventrikel).',
      },
      {
        wave: 'Gelombang T',
        meaning:
          'Repolarisasi ventrikel (pemulihan potensial listrik otot ventrikel saat memasuki fase relaksasi/diastol).',
      },
    ],
    cardiacCycle: [
      {
        phase: 'Sistol Ventrikel',
        state: 'Otot jantung berkontraksi — tekanan ruang tinggi',
        heartSound: 'Suara S1 ("lub")',
        detail:
          'Kontraksi atrium mendahului kontraksi ventrikel. Saat sistol ventrikel dimulai, katup atrioventrikular (Trikuspid dan Mitral) menutup menghasilkan suara S1 ("lub"), lalu darah didorong keluar melalui katup semilunar ke arteri pulmonalis dan aorta.',
      },
      {
        phase: 'Diastol Ventrikel',
        state: 'Otot jantung relaksasi — ruang jantung terisi kembali',
        heartSound: 'Suara S2 ("dup")',
        detail:
          'Saat awal diastol ventrikel, tekanan ventrikel turun sehingga katup semilunar (Pulmonal dan Aorta) menutup menghasilkan suara S2 ("dup"); kemudian katup AV membuka dan ruang ventrikel kembali terisi darah.',
      },
    ],
    cardiacOutputFormula: {
      formula: 'Curah Jantung (CO) = Isi Sekuncup (SV) × Frekuensi Denyut (HR)',
      example:
        '70 mL/denyut × 70 denyut/menit = 4.900 mL/menit ≈ 4,9 L/menit (Latihan slide 16: 60 mL × 80/menit = 4.800 mL/menit = 4,8 L/menit).',
      variables: [
        {
          label: 'CO (Cardiac Output / Curah Jantung)',
          value: 'mL/menit atau L/menit',
          detail: 'Total volume darah yang dipompa oleh setiap ventrikel dalam satu menit.',
        },
        {
          label: 'SV (Stroke Volume / Isi Sekuncup)',
          value: '± 60–70 mL/denyut',
          detail: 'Volume darah yang dipompa keluar dari ventrikel pada setiap satu kali denyut.',
        },
        {
          label: 'HR (Heart Rate / Frekuensi Denyut)',
          value: '± 70–80 denyut/menit',
          detail: 'Jumlah kontraksi/detak jantung dalam satu menit.',
        },
      ],
    },
    images: [
      {
        title: 'Proyeksi Letak Jantung & Area Auskultasi Katup',
        imageUrl: '/assets/materi/thorax-heart.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 18',
        caption:
          'Apex jantung berada di sela iga ke-5 kiri setinggi T8 beserta proyeksi katup Aorta (A), Pulmonal (P), Trikuspid (T), dan Mitral (M).',
      },
      {
        title: 'Perikardium & Tiga Lapisan Jantung (Potongan Sagital & Transversal)',
        imageUrl: '/assets/materi/thorax-pericardium.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 19',
        caption:
          'Hubungan perikardium fibrosa, serosa parietalis, cavum pericardii, dan epikardium/miokardium/endokardium.',
      },
      {
        title: 'Skema Lapisan Dinding Jantung',
        imageUrl: '/assets/materi/kardio-lapisan.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 4',
        caption:
          'Urutan lapisan dinding jantung dari luar ke dalam: Epikardium, Miokardium (otot merah tebal), dan Endokardium.',
      },
      {
        title: 'Empat Ruang, Katup & Pembuluh Besar Jantung',
        imageUrl: '/assets/materi/kardio-empat-ruang.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 5',
        caption:
          'Penampang koronal jantung menampilkan Atrium/Ventrikel Kanan-Kiri, 4 katup, septum interventrikulare, VCS/VCI, pulmonary trunk, dan aorta.',
      },
      {
        title: 'Tampak Superior Keempat Katup Jantung',
        imageUrl: '/assets/materi/kardio-katup.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 7',
        caption:
          'Posisi katup Trikuspid (kanan posterior), Mitral/Bikuspid (kiri posterior), Aorta (tengah), dan Pulmonal (anterior).',
      },
      {
        title: 'Evaluasi Radiologi 4 Arteri Koroner Utama (RCA, LCA, LAD, LCx)',
        imageUrl: '/assets/materi/darah-koroner-2.webp',
        source: 'Sistem Peredaran Darah.pptx slide 48',
        caption:
          'Percabangan rinci RCA (Conus, AM, AV node, PDA) dan Left Main/LCA menjadi LAD (D1, D2, Septal) serta LCx (M1, M2).',
      },
      {
        title: 'Sistem Konduksi Listrik Jantung & Hubungan EKG',
        imageUrl: '/assets/materi/darah-konduksi.webp',
        source: 'Sistem Peredaran Darah.pptx slide 39',
        caption:
          'Urutan penjalaran sinyal dari SA node -> AV node -> Bundle branches -> Purkinje fibers yang terekam pada kurva EKG.',
      },
      {
        title: 'Gelombang P, Kompleks QRS, dan Gelombang T pada EKG',
        imageUrl: '/assets/materi/kardio-ekg.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 13',
        caption:
          'Gelombang P (depolarisasi atrium), Kompleks QRS (depolarisasi ventrikel), dan Gelombang T (repolarisasi ventrikel).',
      },
    ],
  },

  sistemik: {
    title: 'Sirkulasi Pulmonal, Sistemik, Aorta & Vena Porta',
    subtitle:
      'Aliran darah lengkap 15 tahap, perbedaan pembuluh darah, cabang Arcus Aorta dan Aorta Abdominalis (T12–L4), Circulus Willisi, sirkulasi regional, serta sistem Vena Porta Hepatika.',
    sources: [
      'Sistem Peredaran Darah.pptx slide 2–59',
      'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 8–10',
      'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 67–75',
    ],
    pulmonalVsSistemik: [
      {
        name: 'Peredaran Darah Kecil (Sirkulasi Pulmonal)',
        route:
          'Ventrikel Kanan → Katup Pulmonal → Arteri Pulmonalis → Kapiler Paru → Vena Pulmonalis → Atrium Kiri',
        purpose:
          'Membawa darah kaya CO₂ ke alveolus paru untuk melepaskan CO₂ dan mengikat O₂, lalu mengembalikan darah kaya O₂ ke sisi kiri jantung.',
      },
      {
        name: 'Peredaran Darah Besar (Sirkulasi Sistemik)',
        route:
          'Ventrikel Kiri → Katup Aorta → Aorta & Cabangnya → Kapiler Seluruh Tubuh → Vena Cava Superior/Inferior → Atrium Kanan',
        purpose:
          'Mendistribusikan darah kaya O₂ dan nutrien ke jaringan seluruh tubuh sekaligus mengangkut CO₂ serta sisa metabolisme kembali ke jantung.',
      },
    ],
    vesselTypes: [
      {
        type: 'Arteri (Pembuluh Nadi)',
        direction: 'Meninggalkan jantung (tidak selalu kaya O₂; A. pulmonalis membawa darah kaya CO₂)',
        wallFeature: 'Dinding otot paling tebal, kuat, dan elastis; tekanan darah tinggi',
        note: 'Terbagi menjadi arteri konduktor/elastis (aorta, a. pulmonalis, a. carotis), arteri distributif/muskuler (a. brachialis, a. femoralis, a. lienalis), dan arteriol.',
      },
      {
        type: 'Vena (Pembuluh Balik)',
        direction: 'Menuju/kembali ke jantung (V. pulmonalis membawa darah kaya O₂)',
        wallFeature:
          'Dinding lebih tipis dan kurang elastis, tekanan lebih lemah, sering berada lebih superfisial, memiliki katup (valvula semilunaris) untuk aliran satu arah',
        note: 'Catatan khusus: Vena otak di intrakranial tidak memiliki katup dan bermuara ke sinus venosus duramater.',
      },
      {
        type: 'Kapiler Darah',
        direction: 'Menghubungkan arteriol dengan venula di dalam jaringan',
        wallFeature: 'Saluran darah terkecil dengan dinding setebal hanya satu lapis sel endotel',
        note: 'Memungkinkan pertukaran gas (O₂/CO₂), nutrien, dan zat sisa antara darah dan cairan interstitial secara cepat.',
      },
    ],
    flowSequence: [
      {
        id: 'flow-01',
        order: 1,
        name: 'Kapiler Jaringan Tubuh',
        latinName: 'Capillaria systemica',
        oxygenState: 'mixed',
        region: 'Seluruh Tubuh',
        description:
          'O₂ dan nutrien diserahkan ke sel jaringan sementara CO₂ dan limbah metabolisme masuk ke aliran vena.',
      },
      {
        id: 'flow-02',
        order: 2,
        name: 'Vena Cava Superior & Inferior',
        latinName: 'Vena cava superior & inferior',
        oxygenState: 'deoxygenated',
        region: 'Kepala/Lengan (VCS) & Abdomen/Tungkai (VCI)',
        description:
          'Mengumpulkan darah miskin O₂ dari bagian atas tubuh (VCS) dan bagian bawah tubuh (VCI) menuju jantung kanan.',
      },
      {
        id: 'flow-03',
        order: 3,
        name: 'Atrium Kanan',
        latinName: 'Atrium dextrum',
        oxygenState: 'deoxygenated',
        region: 'Jantung Kanan',
        description: 'Menerima darah vena sistemik dari VCS, VCI, serta sinus koronarius.',
      },
      {
        id: 'flow-04',
        order: 4,
        name: 'Katup Trikuspidalis (AV Kanan)',
        latinName: 'Valva tricuspidalis',
        oxygenState: 'deoxygenated',
        region: 'Jantung Kanan',
        description: 'Membuka untuk mengalirkan darah satu arah dari atrium kanan ke ventrikel kanan.',
      },
      {
        id: 'flow-05',
        order: 5,
        name: 'Ventrikel Kanan',
        latinName: 'Ventriculus dexter',
        oxygenState: 'deoxygenated',
        region: 'Jantung Kanan',
        description: 'Memompa darah bertekanan rendah menuju sirkulasi paru.',
      },
      {
        id: 'flow-06',
        order: 6,
        name: 'Katup Semilunaris Pulmonalis',
        latinName: 'Valva trunci pulmonalis',
        oxygenState: 'deoxygenated',
        region: 'Jalan Keluar Ventrikel Kanan',
        description: 'Terbuka saat sistol ventrikel kanan menuju trunkus pulmonalis.',
      },
      {
        id: 'flow-07',
        order: 7,
        name: 'Trunkus & Arteri Pulmonalis',
        latinName: 'Truncus & Aa. pulmonales dextra/sinistra',
        oxygenState: 'deoxygenated',
        region: 'Toraks / Hilum Paru',
        description:
          'Satu-satunya arteri pasca-lahir yang mengangkut darah kaya CO₂ meninggalkan jantung menuju paru-paru.',
      },
      {
        id: 'flow-08',
        order: 8,
        name: 'Kapiler Alveolus Paru-Paru',
        latinName: 'Capillaria pulmonalia',
        oxygenState: 'mixed',
        region: 'Paru-Paru',
        description:
          'Respirasi eksternal: melepaskan CO₂ ke alveolus dan mengikat O₂ sehingga darah menjadi kaya oksigen.',
      },
      {
        id: 'flow-09',
        order: 9,
        name: 'Vena Pulmonalis (4 buah)',
        latinName: 'Vv. pulmonales',
        oxygenState: 'oxygenated',
        region: 'Paru ke Jantung Kiri',
        description:
          'Satu-satunya vena pasca-lahir yang membawa darah kaya O₂ kembali masuk ke jantung.',
      },
      {
        id: 'flow-10',
        order: 10,
        name: 'Atrium Kiri',
        latinName: 'Atrium sinistrum',
        oxygenState: 'oxygenated',
        region: 'Jantung Kiri',
        description: 'Menerima darah kaya oksigen dari keempat vena pulmonalis.',
      },
      {
        id: 'flow-11',
        order: 11,
        name: 'Katup Mitral / Bikuspidalis (AV Kiri)',
        latinName: 'Valva mitralis / bicuspidalis',
        oxygenState: 'oxygenated',
        region: 'Jantung Kiri',
        description: 'Mengalirkan darah dari atrium kiri ke ventrikel kiri dan mencegah refluks saat sistol.',
      },
      {
        id: 'flow-12',
        order: 12,
        name: 'Ventrikel Kiri',
        latinName: 'Ventriculus sinister',
        oxygenState: 'oxygenated',
        region: 'Jantung Kiri',
        description: 'Bilik berdinding paling tebal; memompa darah bertekanan tinggi ke seluruh tubuh.',
      },
      {
        id: 'flow-13',
        order: 13,
        name: 'Katup Semilunaris Aorta',
        latinName: 'Valva aortae',
        oxygenState: 'oxygenated',
        region: 'Pangkal Aorta',
        description: 'Membuka saat sistol ventrikel kiri agar darah masuk ke aorta asendens.',
      },
      {
        id: 'flow-14',
        order: 14,
        name: 'Aorta (Asendens, Arcus, Torakalis, Abdominalis)',
        latinName: 'Aorta',
        oxygenState: 'oxygenated',
        region: 'Toraks & Abdomen',
        description:
          'Arteri elastis terbesar yang bercabang ke koroner, kepala-leher, ekstremitas atas, organ toraks, organ abdomen, dan ekstremitas bawah.',
      },
      {
        id: 'flow-15',
        order: 15,
        name: 'Distribusi Sistemik Kembali ke Atrium Kanan',
        latinName: 'Circulatio systemica',
        oxygenState: 'deoxygenated',
        region: 'Kepala, Toraks, Abdomen, Ekstremitas',
        description:
          'Setelah melewati kapiler sistemik dan vena regional (termasuk jalur porta hepatika pada saluran cerna), darah kembali ke VCS/VCI menuju atrium kanan.',
      },
    ],
    aortaBranches: [
      {
        segment: '1. Aorta Asendens (Ascending Aorta)',
        branches: ['Right Coronary Artery (RCA)', 'Left Main Coronary Artery (LCA)'],
        territory: 'Cabang pertama tepat di atas katup semilunar aorta untuk menyuplai miokardium.',
      },
      {
        segment: '2. Arcus Aorta (Lengkung Aorta — Setinggi T4)',
        branches: [
          '1) Truncus Brachiocephalicus (A. anonyma/innominata) → A. carotis communis dextra & A. subclavia dextra',
          '2) A. Carotis Communis Sinistra',
          '3) A. Subclavia Sinistra',
        ],
        territory:
          'Menyuplai kepala, leher, dan kedua ekstremitas atas (serta memberi asal A. vertebralis kanan-kiri dari masing-masing A. subclavia).',
      },
      {
        segment: '3. Aorta Desendens Torakalis (Thoracic Aorta)',
        branches: [
          'Cabang Somatik: Aa. intercostales, A. phrenica superior',
          'Cabang Viseral: Aa. bronchiales, Aa. esophageales, Aa. mediastinales, Aa. pericardiales',
        ],
        territory: 'Dinding toraks, diafragma bagian atas, bronkus, esofagus, mediastinum, dan perikardium.',
      },
      {
        segment: '4. Aorta Abdominalis (Level Vertebral T12–L4 pada Slide 53)',
        branches: [
          'Level T12: A. phrenica inferior & Celiac trunk (A. gastrica sinistra, A. hepatica, A. splenica)',
          'Level L1: A. suprarenalis media & Superior mesenteric artery (SMA)',
          'Antara L1–L2: A. renalis kanan & kiri',
          'Level L2: A. gonadalis (testicularis / ovarica)',
          'Level L3: Inferior mesenteric artery (IMA)',
          'Level L4: Bifurkasio menjadi A. iliaca communis kanan & kiri (+ A. sacralis mediana & Aa. lumbales)',
        ],
        territory:
          'Diafragma bawah, organ pencernaan (foregut, midgut, hindgut), ginjal & adrenal, gonad, dinding abdomen posterior, lalu bercabang ke pelvis dan tungkai.',
      },
      {
        segment: '5. Percabangan Iliaka & Ekstremitas Bawah (Slide 57)',
        branches: [
          'A. iliaca communis → A. iliaca interna (pelvis & glutea) + A. iliaca externa',
          'A. femoralis (+ profunda femoris / circumflexa femoris) → melewati hiatus adductor',
          'A. poplitea → A. tibialis anterior (→ A. dorsalis pedis) & A. tibialis posterior (+ A. fibularis → Aa. plantares & arcus plantaris)',
        ],
        territory: 'Organ pelvis, regio glutea, paha, lutut, tungkai bawah, dan telapak/punggung kaki.',
      },
    ],
    regionalCirculations: [
      {
        region: 'Kepala, Leher & Circulus Willisi',
        arteries: [
          'Sirkulasi Anterior: A. carotis communis (bercabang setinggi C3–C4 / kartilago tiroid) → A. carotis externa & A. carotis interna (ACA & MCA, suplai 3/5 serebrum)',
          'Sirkulasi Posterior: A. vertebralis kanan-kiri → menyatu menjadi A. basilaris → PCA (suplai 2/5 serebrum, lobus temporal/oksipital, cerebellum, batang otak)',
          'Circulus Arteriosus Willisi: ACA + A. communicans anterior + A. carotis interna + A. communicans posterior + PCA',
        ],
        veins: [
          'Vena serebral (tanpa katup!) → Sinus venosus duramater (Sinus sagittalis superior, Sinus transversus) → V. jugularis interna',
          'V. jugularis externa & V. vertebralis → V. brachiocephalica → Vena Cava Superior',
        ],
        keyHighlight:
          'Circulus Willisi menjadi jalur anastomosis kolateral di dasar otak (sekitar kiasma optikum & korpus mamilaris). Otak dewasa menerima ~20% curah jantung.',
        imageUrl: '/assets/materi/darah-willis.webp',
        source: 'Sistem Peredaran Darah.pptx slide 49–51 & Sistem Saraf slide 67–75',
      },
      {
        region: 'Dinding & Organ Toraks',
        arteries: [
          'Aorta torakalis: cabang somatik (Aa. intercostales, A. phrenica superior) & viseral (bronkialis, esofageal, mediastinal, perikardial)',
          'A. thoracica interna (cabang A. subclavia)',
        ],
        veins: [
          'Vv. intercostales → V. azygos & V. hemiazygos → Vena Cava Superior',
          'Vv. brachiocephalicae kanan & kiri bersatu membentuk Vena Cava Superior',
        ],
        keyHighlight:
          'Perhatikan pada cross-section toraks: V. azygos berjalan di sisi kanan corpus vertebrae lalu melengkung ke anterior masuk ke VCS di atas bronkus kanan.',
        imageUrl: '/assets/materi/darah-toraks.webp',
        source: 'Sistem Peredaran Darah.pptx slide 52',
      },
      {
        region: 'Abdomen & Vaskularisasi Viseral',
        arteries: [
          'T12: A. phrenica inferior, Celiac trunk (Left gastric, Hepatic, Splenic)',
          'L1: Middle suprarenal, SMA | L1–L2: Renal | L2: Gonadal | L3: IMA | L4: Common iliac',
        ],
        veins: [
          'Drainase langsung ke Vena Cava Inferior: Vv. hepaticae, V. renalis kanan/kiri, V. gonadalis, Vv. lumbales, Vv. iliacae communes',
          'Drainase saluran cerna melewati Sistem Vena Porta Hepatika terlebih dahulu sebelum masuk ke VCI',
        ],
        keyHighlight:
          'Hafalkan level vertebra cabang aorta abdominalis: T12 (Celiac & Phrenic inf.), L1 (SMA), L1–L2 (Renal), L2 (Gonadal), L3 (IMA), L4 (Bifurkasio Iliaca Communis).',
        imageUrl: '/assets/materi/darah-abdomen-1.webp',
        source: 'Sistem Peredaran Darah.pptx slide 53–54',
      },
      {
        region: 'Ekstremitas Bawah (Lower Limb)',
        arteries: [
          'A. iliaca communis → A. iliaca externa → A. femoralis (melewati adductor hiatus) → A. poplitea',
          'A. tibialis anterior (→ A. dorsalis pedis di punggung kaki) & A. tibialis posterior (+ A. fibularis → A. plantaris medialis/lateralis & arcus plantaris)',
        ],
        veins: [
          'Superfisialis: V. saphena magna (Great saphenous, medial) & V. saphena parva (Small saphenous, lateral/posterior)',
          'Profunda: Vv. tibiales anterior/posterior, V. fibularis, V. poplitea, V. femoralis, V. profunda femoris → V. iliaca externa → VCI',
        ],
        keyHighlight:
          'Pada slide 57, A. femoralis menjadi A. poplitea setelah melewati adductor hiatus, lalu bercabang di bawah lutut menjadi tibialis anterior, tibialis posterior, dan fibularis.',
        imageUrl: '/assets/materi/darah-limb-bawah.webp',
        source: 'Sistem Peredaran Darah.pptx slide 57 & 59',
      },
    ],
    hepaticPortalSystem: {
      definition:
        'Vena porta mencakup keseluruhan vena yang mengalirkan darah kaya nutrien dari saluran pencernaan (lambung, small intestine, large intestine) dan limpa menuju hati terlebih dahulu sebelum kembali ke Vena Cava Inferior.',
      tributaries: [
        'V. mesenterica superior (Superior mesenteric vein) — usus halus & kolon proksimal',
        'V. mesenterica inferior (Inferior mesenteric vein) — kolon distal & rektum',
        'V. splenica (Splenic vein) — limpa, pankreas, dan lambung (menerima V. mesenterica inferior)',
      ],
      pathway: [
        'Kapiler saluran pencernaan (usus halus, usus besar, lambung) dan limpa',
        'V. mesenterica inferior → V. splenica + V. mesenterica superior → membentuk Vena Porta Hepatis (Portal vein)',
        'Bercabang ke Right & Left Portal Vein masuk ke sinusoid hati (nutrien diproses & toksin didetoksifikasi)',
        'Keluar dari hati melalui Vena Hepatika (Hepatic veins)',
        'Bermuara ke Vena Cava Inferior (VCI) → Atrium Kanan jantung',
      ],
      imageUrl: '/assets/materi/darah-porta.webp',
      source: 'Sistem Peredaran Darah.pptx slide 55 (Fig. 17-26 Hepatic portal system)',
    },
    images: [
      {
        title: 'Skema Aliran Darah Pulmonal & Sistemik Lengkap',
        imageUrl: '/assets/materi/darah-sirkulasi.webp',
        source: 'Sistem Peredaran Darah.pptx slide 42',
        caption:
          'Jalur langkah demi langkah dari SVC/IVC → Atrium Kanan → Trikuspid → Ventrikel Kanan → Katup Pulmonal → Paru → Atrium Kiri → Mitral → Ventrikel Kiri → Katup Aorta → Aorta.',
      },
      {
        title: 'Pembuluh Darah Besar & Segmen Aorta',
        imageUrl: '/assets/materi/darah-aorta.webp',
        source: 'Sistem Peredaran Darah.pptx slide 45',
        caption:
          'Pembagian aorta: Aorta asendens, lengkung aorta (aortic arch), serta aorta desendens (torakalis dan abdominalis).',
      },
      {
        title: 'Percabangan Arcus Aorta & Variasi Anatomi',
        imageUrl: '/assets/materi/darah-arcus-aorta.webp',
        source: 'Sistem Peredaran Darah.pptx slide 46',
        caption:
          'Cabang normal arcus aorta (Brachiocephalic artery, Left common carotid, Left subclavian) serta perbandingan anomali asal Right subclavian artery yang menekan trakea.',
      },
      {
        title: 'Arteri Karotis & Sirkulasi Kepala-Leher',
        imageUrl: '/assets/materi/darah-carotis.webp',
        source: 'Sistem Peredaran Darah.pptx slide 49',
        caption:
          'Bifurkasio A. carotis communis menjadi A. carotis interna & eksterna setinggi vertebra C3–C4 (kartilago tiroid) serta A. vertebralis.',
      },
      {
        title: 'Circulus Arteriosus Willisi (Dasar Otak)',
        imageUrl: '/assets/materi/darah-willis.webp',
        source: 'Sistem Peredaran Darah.pptx slide 50',
        caption:
          'Anastomosis antara sirkulasi anterior (ACI, ACA, MCA, ACom) dan posterior (Vertebralis, Basilaris, PCA, PCom).',
      },
      {
        title: 'Drainase Vena Serebral & Sinus Venosus Dural',
        imageUrl: '/assets/materi/darah-vena-serebral.webp',
        source: 'Sistem Peredaran Darah.pptx slide 51',
        caption:
          'Sinus sagittalis superior dan sinus transversus mengalirkan darah ke V. jugularis interna, lalu bergabung dengan V. subclavia menjadi V. brachiocephalica.',
      },
      {
        title: 'Cabang Aorta Abdominalis & Level Vertebra (T12–L4)',
        imageUrl: '/assets/materi/darah-abdomen-1.webp',
        source: 'Sistem Peredaran Darah.pptx slide 53',
        caption:
          'Peta level vertebra cabang aorta abdominalis: T12 (Phrenic inf. & Celiac), L1 (Middle suprarenal & SMA), L1–L2 (Renal), L2 (Gonadal), L3 (IMA), L4 (Common iliac).',
      },
      {
        title: 'Sistem Vena Porta Hepatika',
        imageUrl: '/assets/materi/darah-porta.webp',
        source: 'Sistem Peredaran Darah.pptx slide 55',
        caption:
          'Aliran dari V. mesenterica superior, V. mesenterica inferior, dan V. splenica menuju V. porta -> Hati -> V. hepatika -> VCI.',
      },
      {
        title: 'Peta Arteri & Vena Seluruh Tubuh',
        imageUrl: '/assets/materi/darah-arteri-tubuh.webp',
        source: 'Sistem Peredaran Darah.pptx slide 58',
        caption:
          'Gambaran utuh sistem arteri tubuh dari kepala, ekstremitas atas, organ viseral, hingga ekstremitas bawah.',
      },
    ],
  },

  limbAtas: {
    title: 'Sirkulasi Ekstremitas Atas (Upper Limb Circulation)',
    subtitle:
      'Rantai arteri ekstremitas atas dari Arcus Aorta hingga arteri digitalis serta drainase vena superfisialis (cephalica, basilica, mediana cubiti) dan profunda.',
    sources: [
      'Sistem Peredaran Darah.pptx slide 56 (Upper Arm Circulation)',
      'Sistem Peredaran Darah.pptx slide 58–59 (Whole Body Arteries & Veins)',
    ],
    arteryChain: [
      {
        id: 'ul-art-1',
        order: 1,
        name: 'Arcus Aorta & Truncus Brachiocephalicus',
        latinName: 'Arcus aortae / Truncus brachiocephalicus',
        oxygenState: 'oxygenated',
        region: 'Mediastinum Superior',
        description:
          'Titik awal suplai ekstremitas atas: sisi kanan keluar dari Truncus brachiocephalicus, sedangkan sisi kiri langsung keluar sebagai cabang ketiga Arcus aorta.',
      },
      {
        id: 'ul-art-2',
        order: 2,
        name: 'Arteri Subklavia',
        latinName: 'A. subclavia (dextra / sinistra)',
        oxygenState: 'oxygenated',
        region: 'Pangkal Leher / Bawah Klavikula',
        description:
          'Berjalan melengkung di bawah klavikula dan di atas iga pertama menuju sisi lateral regio ketiak (juga memberi cabang A. vertebralis dan A. thoracica interna).',
      },
      {
        id: 'ul-art-3',
        order: 3,
        name: 'Arteri Aksilaris',
        latinName: 'A. axillaris',
        oxygenState: 'oxygenated',
        region: 'Regio Aksila (Ketiak)',
        description:
          'Kelanjutan langsung A. subklavia setelah melewati tepi lateral iga ke-1 saat melintasi rongga aksila menuju pangkal lengan atas.',
      },
      {
        id: 'ul-art-4',
        order: 4,
        name: 'Arteri Brakialis',
        latinName: 'A. brachialis',
        oxygenState: 'oxygenated',
        region: 'Lengan Atas (Brachium)',
        description:
          'Kelanjutan A. aksilaris sepanjang humerus (arteri distributif utama lengan atas, lokasi standar manset tensimeter) sebelum bercabang dua di fossa cubiti.',
      },
      {
        id: 'ul-art-5',
        order: 5,
        name: 'Arteri Radialis & Arteri Ulnaris',
        latinName: 'A. radialis (lateral) & A. ulnaris (medial)',
        oxygenState: 'oxygenated',
        region: 'Lengan Bawah (Antebrachium)',
        description:
          'Di bawah siku, A. brakialis bercabang menjadi A. radialis di sisi lateral (searah ibu jari, tempat palpasi denyut nadi radialis) dan A. ulnaris di sisi medial (searah kelingking).',
      },
      {
        id: 'ul-art-6',
        order: 6,
        name: 'Arkus Palmaris Profundus & Superfisialis',
        latinName: 'Arcus palmaris profundus & superficialis',
        oxygenState: 'oxygenated',
        region: 'Telapak Tangan (Manus)',
        description:
          'Anastomosis antara A. radialis dan A. ulnaris di telapak tangan (Deep palmar arch terutama dibentuk A. radialis; Superficial palmar arch terutama dibentuk A. ulnaris).',
      },
      {
        id: 'ul-art-7',
        order: 7,
        name: 'Arteri Digitales Palmares',
        latinName: 'Aa. digitales',
        oxygenState: 'oxygenated',
        region: 'Jari-Jari Tangan',
        description:
          'Percabangan distal dari arkus palmaris yang berjalan sepanjang kedua sisi setiap jari untuk menyuplai jaringan ujung jari.',
      },
    ],
    veinDrainage: [
      {
        group: 'Superfisialis',
        vessels: [
          {
            name: 'V. Cephalica (Sisi Lateral)',
            locationAndPath:
              'Berjalan di permukaan lateral (sisi ibu jari) lengan bawah dan lengan atas, lalu bermuara ke V. axillaris/V. subclavia di bahu.',
          },
          {
            name: 'V. Basilica (Sisi Medial)',
            locationAndPath:
              'Berjalan di permukaan medial (sisi kelingking) lengan bawah dan lengan atas, kemudian masuk ke jaringan dalam bergabung dengan V. brachialis membentuk V. axillaris.',
          },
          {
            name: 'V. Mediana Cubiti',
            locationAndPath:
              'Vena penghubung menyilang di fossa cubiti (lipat siku) antara V. cephalica dan V. basilica; menjadi lokasi utama pungsi vena / pemasangan infus.',
          },
          {
            name: 'V. Mediana Antebrachial',
            locationAndPath:
              'Mengalirkan darah superfisial dari telapak tangan naik di bagian tengah anterior lengan bawah menuju lipat siku.',
          },
          {
            name: 'Arcus Venosus Palmaris & Vv. Digitales',
            locationAndPath:
              'Jaringan vena di jari dan telapak tangan yang bermuara ke sistem vena lengan bawah.',
          },
        ],
      },
      {
        group: 'Profunda',
        vessels: [
          {
            name: 'V. Radialis & V. Ulnaris',
            locationAndPath:
              'Vena dalam berpasangan yang mendampingi A. radialis (lateral) dan A. ulnaris (medial) di lengan bawah.',
          },
          {
            name: 'V. Brachialis',
            locationAndPath:
              'Dibentuk oleh penyatuan V. radialis dan V. ulnaris di sekitar siku; berjalan naik sejajar A. brachialis di lengan atas.',
          },
          {
            name: 'V. Axillaris',
            locationAndPath:
              'Kelanjutan V. brachialis di ketiak setelah menerima V. basilica, serta menerima muara V. cephalica di proksimal.',
          },
          {
            name: 'V. Subclavia',
            locationAndPath:
              'Kelanjutan V. axillaris yang melintas di bawah klavikula menuju pangkal leher.',
          },
          {
            name: 'V. Brachiocephalica → Vena Cava Superior',
            locationAndPath:
              'V. subclavia bergabung dengan V. jugularis interna membentuk V. brachiocephalica (kanan dan kiri), yang bersatu menjadi Vena Cava Superior menuju Atrium Kanan.',
          },
        ],
      },
    ],
    clinicalHighlights: [
      {
        label: 'Asimetri Pangkal Kanan vs Kiri',
        value: 'Kanan via Truncus Brachiocephalicus; Kiri langsung dari Arcus Aorta',
        detail:
          'A. subclavia dextra adalah cabang dari Truncus brachiocephalicus, sedangkan A. subclavia sinistra keluar langsung dari Arcus aorta.',
      },
      {
        label: 'Orientasi Lengan Bawah (Posisi Anatomis)',
        value: 'Radialis = Lateral (Ibu Jari) | Ulnaris = Medial (Kelingking)',
        detail:
          'Sama seperti posisi tulang radius (lateral) dan ulna (medial), V. cephalica berada di lateral sedangkan V. basilica berada di medial.',
      },
      {
        label: 'Lokasi Venipuncture (Fossa Cubiti)',
        value: 'V. Mediana Cubiti',
        detail:
          'Menghubungkan V. cephalica dan V. basilica di lipat siku anterior sehingga mudah teraba dan stabil untuk pengambilan sampel darah.',
      },
    ],
    images: [
      {
        title: 'Sirkulasi Arteri Ekstremitas Atas (Upper Arm Circulation)',
        imageUrl: '/assets/materi/darah-limb-atas.webp',
        source: 'Sistem Peredaran Darah.pptx slide 56',
        caption:
          'Urutan aliran arteri dari Arcus aorta -> Brachiocephalic/Subclavian -> Axillary -> Brachial -> Radial & Ulnar -> Deep & Superficial palmar arches.',
      },
      {
        title: 'Peta Vena Superfisialis & Profunda Tubuh (Ekstremitas Atas)',
        imageUrl: '/assets/materi/darah-vena-tubuh.webp',
        source: 'Sistem Peredaran Darah.pptx slide 59',
        caption:
          'Perbedaan vena superfisial (biru muda: Basilic, Median cubital, Median antebrachial, Cephalic lateral) dan vena profunda (biru tua: Radial, Ulnar, Brachial, Axillary, Subclavian, Brachiocephalic -> VCS).',
      },
    ],
  },

  sarafKranial: {
    title: '12 Pasang Saraf Kranial & Foramen Cranium',
    subtitle:
      'Identifikasi N. I (Olfactorius) hingga N. XII (Hypoglossus), jenis serabut (Sensorik/Motorik/Campuran), fungsi spesifik, jembatan keledai, dan tabel lengkap foramen basis kranii.',
    sources: [
      'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 (FIGURE 11-7 Cranial Nerves)',
      'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 17–21 (Foramen Cranium & SST)',
    ],
    nerves: [
      {
        roman: 'I',
        number: 1,
        name: 'N. Olfactorius',
        indonesianName: 'Saraf Penciuman',
        modality: 'Sensorik',
        foramen: 'Olfactory foramina / lamina cribrosa (Os ethmoidale)',
        targetAndFunction:
          'Menghantarkan impuls indra penciuman (penghidu) dari epitel olfaktorius rongga hidung menuju bulbus olfaktorius otak.',
        sourceNote: 'FIGURE 11-7: "Olfactory (I): nose" (serabut merah/sensorik); Slide 19: olfactory foramen di ethmoid bone.',
      },
      {
        roman: 'II',
        number: 2,
        name: 'N. Opticus',
        indonesianName: 'Saraf Penglihatan',
        modality: 'Sensorik',
        foramen: 'Optic canal (Os sphenoidale)',
        targetAndFunction:
          'Menghantarkan impuls visual penglihatan dari retina mata menuju kiasma optikum dan korteks visual oksipital.',
        sourceNote: 'FIGURE 11-7: "Optic (II) sensory: eye"; Slide 19: optic canal di sphenoid bone (bersama A. ophthalmica).',
      },
      {
        roman: 'III',
        number: 3,
        name: 'N. Oculomotorius',
        indonesianName: 'Saraf Penggerak Bola Mata Utama',
        modality: 'Motorik',
        foramen: 'Fissura orbitalis superior (Os sphenoidale)',
        targetAndFunction:
          'Menggerakkan sebagian besar otot ekstrinsik bola mata (rectus superior, inferior, medialis, obliquus inferior), mengangkat kelopak mata atas, dan konstriksi pupil.',
        sourceNote: 'FIGURE 11-7: "Oculomotor (III, IV, VI): muscles of the eye" (serabut biru/motorik).',
      },
      {
        roman: 'IV',
        number: 4,
        name: 'N. Trochlearis',
        indonesianName: 'Saraf Troklearis (Otot Oblik Atas Mata)',
        modality: 'Motorik',
        foramen: 'Fissura orbitalis superior (Os sphenoidale)',
        targetAndFunction:
          'Menggerakkan otot ekstrinsik bola mata obliquus superior (memutar bola mata ke bawah-lateral/intorsi).',
        sourceNote: 'FIGURE 11-7: bagian kelompok motorik penggerak otot mata (III, IV, VI).',
      },
      {
        roman: 'V',
        number: 5,
        name: 'N. Trigeminus',
        indonesianName: 'Saraf Trigeminus (Sensasi Wajah & Mengunyah)',
        modality: 'Campuran',
        foramen: 'V1: Fissura orbitalis superior | V2 (maksila): Foramen rotundum | V3 (mandibula): Foramen ovale (Os sphenoidale)',
        targetAndFunction:
          'Sensorik: sensasi wajah, sinus paranasal, rongga mulut, dan gigi (cabang oftalmik, maksila, mandibula). Motorik: menggerakkan otot-otot pengunyahan (muscles of mastication: masseter, temporalis, pterygoideus).',
        sourceNote: 'FIGURE 11-7: "Trigeminal (V) sensory: face sinuses, teeth, etc.; motor: muscles of mastication"; Slide 19: rotundum & ovale di sphenoid bone.',
      },
      {
        roman: 'VI',
        number: 6,
        name: 'N. Abducens',
        indonesianName: 'Saraf Abdusen (Abduksi Bola Mata)',
        modality: 'Motorik',
        foramen: 'Fissura orbitalis superior (Os sphenoidale)',
        targetAndFunction:
          'Menggerakkan otot rectus lateralis untuk abduksi (melirik ke arah lateral/luar) bola mata.',
        sourceNote: 'FIGURE 11-7: bagian kelompok motorik penggerak otot mata (III, IV, VI); tampak juga di potongan koronal sinus kavernosus/orbita.',
      },
      {
        roman: 'VII',
        number: 7,
        name: 'N. Facialis',
        indonesianName: 'Saraf Fasialis (Ekspresi Wajah)',
        modality: 'Campuran',
        foramen: 'Internal auditory meatus → keluar via Stylomastoid foramen (Os temporale)',
        targetAndFunction:
          'Motorik: menggerakkan otot-otot ekspresi wajah (muscles of the face). Sensorik & otonom: pengecapan 2/3 anterior lidah serta sekresi kelenjar air mata dan ludah (submandibular/sublingual).',
        sourceNote: 'FIGURE 11-7 menyoroti "Facial (VII): muscles of the face"; Slide 18–19 mencantumkan internal auditory meatus & stylomastoid foramen di temporal bone.',
      },
      {
        roman: 'VIII',
        number: 8,
        name: 'N. Vestibulocochlearis',
        indonesianName: 'Saraf Pendengaran & Keseimbangan',
        modality: 'Sensorik',
        foramen: 'Internal auditory meatus (Os temporale)',
        targetAndFunction:
          'Mengantarkan impuls keseimbangan (cabang vestibular) dan pendengaran (cabang koklear) dari telinga bagian dalam (inner ear).',
        sourceNote: 'FIGURE 11-7: "Vestibulocochlear (VIII): inner ear (Vestibular & Cochlear)"; Slide 18: internal auditory meatus.',
      },
      {
        roman: 'IX',
        number: 9,
        name: 'N. Glossopharyngeus',
        indonesianName: 'Saraf Glosofaringeus (Lidah Belakang & Faring)',
        modality: 'Campuran',
        foramen: 'Jugular foramen (Os temporale & Os occipitale)',
        targetAndFunction:
          'Motorik: otot faring untuk menelan (+ sekresi parotis). Sensorik: pengecapan dan sensasi 1/3 posterior lidah, tonsil, serta faring.',
        sourceNote: 'FIGURE 11-7: "Glossopharyngeal (IX) motor: pharyngeal musculature; sensory: posterior part of tongue, tonsil, pharynx"; Slide 18: jugular foramen.',
      },
      {
        roman: 'X',
        number: 10,
        name: 'N. Vagus',
        indonesianName: 'Saraf Vagus (Parasimpatis Toraks & Abdomen)',
        modality: 'Campuran',
        foramen: 'Jugular foramen (Os temporale & Os occipitale)',
        targetAndFunction:
          'Motorik (termasuk parasimpatis): jantung (kardio-inhibitor), paru, bronkus, dan saluran cerna. Sensorik: jantung, paru, bronkus, trakea, laring, faring, saluran cerna, dan telinga luar.',
        sourceNote: 'FIGURE 11-7: "Vagus (X) motor & sensory: heart, lungs, bronchi, GI tract, trachea, larynx, pharynx, external ear"; Slide 18: jugular foramen.',
      },
      {
        roman: 'XI',
        number: 11,
        name: 'N. Accessorius',
        indonesianName: 'Saraf Aksesorius (Bahu & Leher)',
        modality: 'Motorik',
        foramen: 'Jugular foramen (serabut spinal masuk via Foramen magnum)',
        targetAndFunction:
          'Menggerakkan otot sternocleidomastoideus (memutar/menundukkan kepala) dan otot trapezius (mengangkat/menstabilkan bahu).',
        sourceNote: 'FIGURE 11-7: "Accesory (XI): sternocleidomastoid and trapezius muscles"; Slide 18: jugular foramen & foramen magnum.',
      },
      {
        roman: 'XII',
        number: 12,
        name: 'N. Hypoglossus',
        indonesianName: 'Saraf Hipoglosus (Otot Lidah)',
        modality: 'Motorik',
        foramen: 'Hypoglossal canal (Os occipitale)',
        targetAndFunction:
          'Menggerakkan otot-otot intrinsik dan ekstrinsik lidah untuk berbicara, mengunyah, dan menelan.',
        sourceNote: 'FIGURE 11-7: "Hypoglossal (XII): muscles of the tongue"; Slide 18: hypoglossal canal di occipital bone.',
      },
    ],
    mnemonics: [
      {
        title: 'Urutan Nama Saraf Kranial I–XII',
        phrase: '"On Old Olympus\' Towering Tops, A Finn And German Viewed Some Hops"',
        explanation:
          'O = Olfactorius (I), O = Opticus (II), O = Oculomotorius (III), T = Trochlearis (IV), T = Trigeminus (V), A = Abducens (VI), F = Facialis (VII), A/V = Vestibulocochlearis (VIII), G = Glossopharyngeus (IX), V = Vagus (X), S/A = Accessorius Spinalis (XI), H = Hypoglossus (XII).',
      },
      {
        title: 'Sifat Sensorik / Motorik / Campuran (I–XII)',
        phrase: '"Some Say Marry Money, But My Brother Says Big Brains Matter More"',
        explanation:
          'S = Sensorik (I, II, VIII), M = Motorik (III, IV, VI, XI, XII), B = Both / Campuran (V, VII, IX, X). Cocok 100% berurutan dari N. I sampai N. XII!',
      },
      {
        title: 'Kelompok Penggerak Mata & Lidah Cepat',
        phrase: 'Mata = III, IV, VI | Wajah = VII (ekspresi) vs V (kunyah) | Lidah = XII (gerak)',
        explanation:
          'Jangan tertukar saat ujian: otot pengunyahan (mastikasi) dipersarafi N. V (Trigeminus), otot ekspresi wajah oleh N. VII (Facialis), otot bahu-leher oleh N. XI, dan otot penggerak lidah oleh N. XII.',
      },
    ],
    foraminaTable: [
      {
        foramen: 'Carotid canal',
        location: 'Temporal bone',
        structures: 'Internal carotid artery, sympathetic nerves',
      },
      {
        foramen: 'Hypoglossal canal',
        location: 'Occipital bone',
        structures: 'Hypoglossal nerves (CN XII)',
      },
      {
        foramen: 'Infraorbital foramen',
        location: 'Maxilla',
        structures: 'Infraorbital nerve and artery',
      },
      {
        foramen: 'Internal auditory meatus',
        location: 'Temporal bone',
        structures: 'Facial nerve (CN VII), vestibulocochlear nerve (CN VIII)',
      },
      {
        foramen: 'Jugular foramen',
        location: 'Temporal and occipital bones',
        structures: 'Internal jugular vein, vagus (CN X), glossopharyngeal (CN IX), and spinal accessory nerves (CN XI)',
      },
      {
        foramen: 'Foramen magnum',
        location: 'Occipital bone',
        structures: 'Medulla oblongata/spinal cord, accessory nerves (CN XI), vertebral arteries',
      },
      {
        foramen: 'Nasolacrimal canal',
        location: 'Lacrimal bone',
        structures: 'Nasolacrimal duct',
      },
      {
        foramen: 'Olfactory foramina',
        location: 'Ethmoid bone',
        structures: 'Olfactory nerves (CN I)',
      },
      {
        foramen: 'Optic canal',
        location: 'Sphenoid bone',
        structures: 'Optic nerve (CN II), ophthalmic artery, sympathetic fibers',
      },
      {
        foramen: 'Foramen ovale',
        location: 'Sphenoid bone',
        structures: 'Mandibular branch of trigeminal nerve (CN V3)',
      },
      {
        foramen: 'Foramen rotundum',
        location: 'Sphenoid bone',
        structures: 'Maxillary (maxilla) branch of trigeminal nerve (CN V2)',
      },
      {
        foramen: 'Stylomastoid foramen',
        location: 'Temporal bone',
        structures: 'Facial nerve (CN VII)',
      },
    ],
    images: [
      {
        title: 'Diagram Lengkap 12 Saraf Kranial (FIGURE 11-7)',
        imageUrl: '/assets/materi/head-cranial-nerves.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27',
        caption:
          'Peta anatomi N. I–XII beserta serabut sensorik (merah), motorik (biru), serta organ target masing-masing saraf.',
      },
      {
        title: 'Dasar Tengkorak & Fossa Kranii (Anterior, Media, Posterior)',
        imageUrl: '/assets/materi/head-cranial-floor.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 18',
        caption:
          'Tulang penyusun dasar tengkorak (Frontal, Ethmoid, Sphenoid, Temporal, Occipital) tempat lokasi 12 foramen kranium.',
      },
    ],
  },
};
