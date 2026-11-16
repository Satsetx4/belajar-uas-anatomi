import type { TMModule } from '../types/anatomy';

export const TM_MODULES: TMModule[] = [
  // =========================================================================
  // TM 1 — Anatomi Kepala & Sistem Saraf (18 diagram)
  // =========================================================================
  {
    id: 'tm-1',
    tmNumber: 1,
    title: 'TM 1 — Anatomi Kepala & Sistem Saraf',
    subtitle: 'Bidang potongan, tulang tengkorak, sinus paranasalis, otak, ventrikel, meninges, saraf kranial, & kuis identifikasi bernomor',
    accentColor: 'cyan',
    sourceSummary: 'ANATOMY CROSSECTIONAL of head.pdf & Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx',
    diagrams: [
      {
        id: 'tm1-head-planes',
        title: 'Anatomical Section Planes',
        indonesianTitle: 'Bidang Potongan Anatomi (Frontal, Sagital, Transversal)',
        imageUrl: '/assets/materi/head-planes.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.3',
        description:
          'Tiga bidang referensi dasar yang digunakan dalam anatomi potongan melintang dan pencitraan radiologi (CT/MRI).',
        keyStructures: [
          { no: 1, name: 'Frontal (coronal) plane', indonesian: 'Bidang koronal / frontal', functionOrNote: 'Membagi tubuh menjadi bagian anterior (depan) dan posterior (belakang)' },
          { no: 2, name: 'Sagittal plane', indonesian: 'Bidang sagital', functionOrNote: 'Membagi tubuh menjadi bagian kanan (dextra) dan kiri (sinistra)' },
          { no: 3, name: 'Transverse (horizontal) plane', indonesian: 'Bidang transversal / aksial', functionOrNote: 'Membagi tubuh menjadi bagian superior (atas) dan inferior (bawah)' },
        ],
      },
      {
        id: 'tm1-head-skull-ant',
        title: 'TABLE 5-1 Summary of Bones Associated With Head',
        indonesianTitle: 'Ringkasan Komponen Tulang Kepala (29 Tulang)',
        imageUrl: '/assets/materi/head-skull-ant.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.15',
        description:
          'Tabel klasifikasi lengkap tulang pembentuk kepala: 8 tulang kranium, 14 tulang wajah, 6 osikula telinga tengah, dan 1 tulang hioid.',
        keyStructures: [
          { no: '8', name: 'Bones of the Cranium', indonesian: 'Tulang Kranium (8 buah)', functionOrNote: 'Frontal (1), Parietal (2), Occipital (1), Temporal (2), Sphenoid (1), Ethmoid (1)' },
          { no: '14', name: 'Bones of the Face', indonesian: 'Tulang Wajah (14 buah)', functionOrNote: 'Maxillae (2), Nasal (2), Zygomatic (2), Lacrimal (2), Mandible (1), Vomer (1), Inferior nasal conchae (2), Palatine (2)' },
          { no: '6', name: 'Middle Ear Bones', indonesian: 'Tulang Pendengaran (6 buah)', functionOrNote: 'Malleus (2), Incus (2), Stapes (2)' },
          { no: '1', name: 'Hyoid Bone', indonesian: 'Tulang Hioid (1 buah)', functionOrNote: 'Tulang leher anterior yang tidak berartikulasi langsung dengan tulang lain' },
        ],
      },
      {
        id: 'tm1-head-skull-lat',
        title: 'FIG. 5-1 & 5-2 Lateral Skull and 3D CT Reconstruction',
        indonesianTitle: 'Tulang Tengkorak Tampak Lateral & Rekonstruksi CT 3D',
        imageUrl: '/assets/materi/head-skull-lat.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.16',
        description:
          'Perbandingan diagram skematik tulang kranium dan wajah tampak lateral dengan rekonstruksi CT 3 dimensi.',
        keyStructures: [
          { no: 1, name: 'Frontal bone', indonesian: 'Os frontale', functionOrNote: 'Membentuk dahi dan atap rongga orbita' },
          { no: 2, name: 'Parietal bone', indonesian: 'Os parietale', functionOrNote: 'Membentuk atap dan dinding lateral atas kranium' },
          { no: 3, name: 'Temporal bone & Mastoid process', indonesian: 'Os temporale & prosesus mastoideus', functionOrNote: 'Memuat meatus akustikus eksternus dan telinga tengah/dalam' },
          { no: 4, name: 'Occipital bone', indonesian: 'Os oksipitale', functionOrNote: 'Membentuk bagian belakang dan dasar tengkorak' },
          { no: 5, name: 'Sphenoid & Ethmoid bone', indonesian: 'Os sfenoidale & os etmoidale', functionOrNote: 'Membentuk dinding orbita dan dasar fosa kranii' },
          { no: 6, name: 'Zygomatic & Maxillary bone', indonesian: 'Os zigomatikum & maksila', functionOrNote: 'Membentuk tulang pipi dan rahang atas' },
          { no: 7, name: 'Mandible', indonesian: 'Mandibula', functionOrNote: 'Rahang bawah yang berartikulasi pada sendi TMJ' },
        ],
      },
      {
        id: 'tm1-head-cranial-floor',
        title: 'FIG. 5-5 Cranial Fossae (Floor of the Cranial Cavity)',
        indonesianTitle: 'Fosa Kranial (Dasar Rongga Kranium)',
        imageUrl: '/assets/materi/head-cranial-floor.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.18',
        description:
          'Pembagian dasar rongga tengkorak menjadi tiga fosa bertingkat beserta batas tulang penyusunnya.',
        keyStructures: [
          { no: 1, name: 'Anterior cranial fossa', indonesian: 'Fosa kranii anterior', functionOrNote: 'Dibentuk os frontale & etmoid; menopang lobus frontalis' },
          { no: 2, name: 'Middle cranial fossa', indonesian: 'Fosa kranii media', functionOrNote: 'Dibentuk os sfenoidale & temporale; menopang lobus temporalis & hipofisis' },
          { no: 3, name: 'Posterior cranial fossa', indonesian: 'Fosa kranii posterior', functionOrNote: 'Dibentuk os oksipitale & temporale; menopang serebelum & batang otak' },
          { no: 4, name: 'Foramen magnum', indonesian: 'Foramen magnum', functionOrNote: 'Lubang besar pada os oksipitale tempat keluar medula oblongata & arteri vertebralis' },
        ],
      },
      {
        id: 'tm1-head-sinuses',
        title: 'FIG. 5-6 The Paranasal Sinuses',
        indonesianTitle: 'Sinus Paranasalis (4 Pasang Rongga Udara)',
        imageUrl: '/assets/materi/head-sinuses.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.20',
        description:
          'Lokasi empat kelompok sinus paranasalis yang bermuara ke rongga hidung dan meringankan berat tengkorak.',
        keyStructures: [
          { no: 1, name: 'Frontal sinus', indonesian: 'Sinus frontalis', functionOrNote: 'Di dalam os frontale tepat di atas orbita dan pangkal hidung' },
          { no: 2, name: 'Ethmoid air cells', indonesian: 'Sel udara etmoidalis', functionOrNote: 'Rongga udara kecil berlapis di antara orbita dan rongga hidung bagian atas' },
          { no: 3, name: 'Sphenoid sinus', indonesian: 'Sinus sfenoidalis', functionOrNote: 'Terletak dalam korpus os sfenoidale tepat di bawah sela tursika' },
          { no: 4, name: 'Maxillary sinus', indonesian: 'Sinus maksilaris', functionOrNote: 'Sinus paranasalis terbesar di dalam os maksila bawah orbita' },
        ],
      },
      {
        id: 'tm1-head-brain',
        title: 'Brain Anatomy (Lateral View)',
        indonesianTitle: 'Anatomi Eksternal Otak Tampak Lateral',
        imageUrl: '/assets/materi/head-brain.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.24',
        description:
          'Pembagian lobus serebrum, girus-sulkus, serebelum, serta komponen batang otak tampak samping kiri.',
        keyStructures: [
          { no: 1, name: 'Frontal lobe', indonesian: 'Lobus frontalis', functionOrNote: 'Kontrol motorik volunter, bicara, fungsi eksekutif & emosi' },
          { no: 2, name: 'Parietal lobe', indonesian: 'Lobus parietalis', functionOrNote: 'Pengolahan sensasi umum, persepsi ruang, dan integrasi sensorik' },
          { no: 3, name: 'Temporal lobe', indonesian: 'Lobus temporalis', functionOrNote: 'Pengolahan pendengaran, memori, dan pemahaman bahasa' },
          { no: 4, name: 'Occipital lobe', indonesian: 'Lobus oksipitalis', functionOrNote: 'Pusat persepsi penglihatan dan pengenalan objek' },
          { no: 5, name: 'Cerebellum', indonesian: 'Serebelum (otak kecil)', functionOrNote: 'Koordinasi gerakan motorik halus, postur, dan keseimbangan' },
          { no: 6, name: 'Brainstem (Midbrain, Pons, Medulla)', indonesian: 'Batang otak (Mesensefalon, Pons, Medula)', functionOrNote: 'Pusat refleks vital pernapasan, kardiovaskular, dan jalur konduksi saraf' },
          { no: 7, name: 'Gyri and Sulci', indonesian: 'Girus (tonjolan) & Sulkus (lekukan)', functionOrNote: 'Memperluas permukaan korteks serebri hingga ±2.350 cm²' },
        ],
      },
      {
        id: 'tm1-head-ventricles',
        title: 'Ventricular System of the Brain',
        indonesianTitle: 'Sistem Ventrikel Otak & Aliran LCS',
        imageUrl: '/assets/materi/head-ventricles.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.25',
        description:
          'Rangkaian rongga penghasil dan pengalir cairan serebrospinal (LCS) di dalam otak menuju ruang subaraknoid.',
        keyStructures: [
          { no: 1, name: 'Lateral ventricles', indonesian: 'Ventrikel lateralis (kanan & kiri)', functionOrNote: 'Sepasang ventrikel terbesar berbentuk C di dalam hemisfer serebri' },
          { no: 2, name: 'Interventricular foramen', indonesian: 'Foramen interventrikular (Monro)', functionOrNote: 'Menghubungkan ventrikel lateralis dengan ventrikel ketiga' },
          { no: 3, name: 'Third ventricle', indonesian: 'Ventrikel ketiga (III)', functionOrNote: 'Rongga sempit di garis tengah diensefalon (antara kedua talamus)' },
          { no: 4, name: 'Aqueduct of the midbrain (cerebral aqueduct)', indonesian: 'Akuaduktus serebri (Sylvii)', functionOrNote: 'Menghubungkan ventrikel III dengan ventrikel IV melalui mesensefalon' },
          { no: 5, name: 'Fourth ventricle', indonesian: 'Ventrikel keempat (IV)', functionOrNote: 'Terletak antara pons/medula di anterior dan serebelum di posterior' },
          { no: 6, name: 'Median & Lateral apertures', indonesian: 'Apertura mediana (Magendie) & lateralis (Luschka)', functionOrNote: 'Pintu keluar LCS dari ventrikel IV menuju ruang subaraknoid' },
          { no: 7, name: 'Central canal', indonesian: 'Kanalis sentralis', functionOrNote: 'Saluran sempit ke tengah medula spinalis' },
        ],
      },
      {
        id: 'tm1-head-meninges',
        title: 'Cranial Meninges (Frontal Section)',
        indonesianTitle: 'Lapisan Meninges Kranial & Sinus Sagitalis Superior',
        imageUrl: '/assets/materi/head-meninges.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.26',
        description:
          'Susunan tiga selaput pelindung otak dari luar ke dalam serta penyerapan LCS oleh granulasi/vili araknoid.',
        keyStructures: [
          { no: 1, name: 'Dura mater (Periosteal & Meningeal layers)', indonesian: 'Dura mater (lapisan periosteal & meningeal)', functionOrNote: 'Lapisan terluar tebal dan kuat; membentuk sinus vena dural dan falx cerebri' },
          { no: 2, name: 'Arachnoid mater & Arachnoid villus', indonesian: 'Araknoid mater & vilus araknoid (Pacchioni)', functionOrNote: 'Lapisan tengah berbentuk jaring; menyerap LCS kembali ke darah vena' },
          { no: 3, name: 'Subarachnoid space', indonesian: 'Ruang subaraknoid', functionOrNote: 'Ruang di antara araknoid dan pia mater berisi LCS yang bersirkulasi' },
          { no: 4, name: 'Pia mater', indonesian: 'Pia mater', functionOrNote: 'Lapisan terdalam tipis kaya pembuluh darah yang menempel langsung pada korteks' },
          { no: 5, name: 'Superior sagittal sinus', indonesian: 'Sinus sagitalis superior', functionOrNote: 'Rongga vena di antara dua lapis dura di atas falx cerebri' },
          { no: 6, name: 'Falx cerebri', indonesian: 'Falks serebri', functionOrNote: 'Lipatan dura mater yang masuk ke fisura longitudinalis' },
        ],
      },
      {
        id: 'tm1-head-cranial-nerves',
        title: 'FIGURE 11-7 Distribution of the 12 Cranial Nerves',
        indonesianTitle: 'Peta Distribusi 12 Pasang Saraf Kranial (CN I–XII)',
        imageUrl: '/assets/materi/head-cranial-nerves.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.27',
        description:
          'Asal dan target distribusi sensorik (garis merah) serta motorik (garis biru) ke-12 pasang saraf kranial dari permukaan ventral otak.',
        keyStructures: [
          { no: 'I–II', name: 'Olfactory (I) & Optic (II)', indonesian: 'N. Olfaktorius (penciuman) & N. Optikus (penglihatan)', functionOrNote: 'Murni sensorik khusus' },
          { no: 'III, IV, VI', name: 'Oculomotor (III), Trochlear (IV), Abducens (VI)', indonesian: 'Saraf penggerak otot bola mata', functionOrNote: 'Motorik untuk otot ekstraokular (N. III juga parasimpatis pupil)' },
          { no: 'V', name: 'Trigeminal (V)', indonesian: 'N. Trigeminus', functionOrNote: 'Sensorik wajah/sinus/gigi dan motorik otot pengunyahan' },
          { no: 'VII', name: 'Facial (VII)', indonesian: 'N. Fasialis', functionOrNote: 'Motorik otot ekspresi wajah dan pengecapan 2/3 anterior lidah' },
          { no: 'VIII', name: 'Vestibulocochlear (VIII)', indonesian: 'N. Vestibulokoklearis', functionOrNote: 'Sensorik keseimbangan (vestibular) dan pendengaran (koklear)' },
          { no: 'IX–X', name: 'Glossopharyngeal (IX) & Vagus (X)', indonesian: 'N. Glosofaringeus & N. Vagus', functionOrNote: 'Menelan, faring/laring, serta persarafan parasimpatis jantung, paru, & GI' },
          { no: 'XI–XII', name: 'Accessory (XI) & Hypoglossal (XII)', indonesian: 'N. Aksesorius & N. Hipoglosus', functionOrNote: 'Motorik SCM & trapezius (XI) serta otot-otot lidah (XII)' },
        ],
      },
      {
        id: 'tm1-head-vessels',
        title: 'Arteries of the Head and Neck',
        indonesianTitle: 'Arteri Kepala dan Leher (Cabang Trunkus Brakiosefalikus)',
        imageUrl: '/assets/materi/head-vessels.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf hlm.28',
        description:
          'Percabangan arteri besar dari trunkus brakiosefalikus menuju leher, wajah, dan rongga kranium tampak lateral kanan.',
        keyStructures: [
          { no: 1, name: 'Brachiocephalic trunk', indonesian: 'Trunkus brakiosefalikus', functionOrNote: 'Bercabang menjadi arteri subklavia kanan dan karotis komunis kanan' },
          { no: 2, name: 'Right common carotid artery', indonesian: 'Arteri karotis komunis kanan', functionOrNote: 'Bercabang menjadi karotis interna dan karotis eksterna' },
          { no: 3, name: 'Right internal carotid artery', indonesian: 'Arteri karotis interna kanan', functionOrNote: 'Masuk kanalis karotikus menyuplai sirkulasi anterior otak' },
          { no: 4, name: 'Right external carotid artery', indonesian: 'Arteri karotis eksterna kanan', functionOrNote: 'Bercabang menjadi a. fasialis, maksilaris, dan temporalis superfisialis' },
          { no: 5, name: 'Right vertebral artery', indonesian: 'Arteri vertebralis kanan', functionOrNote: 'Cabang a. subklavia yang naik melalui foramen transversarium menuju otak' },
          { no: 6, name: 'Right subclavian & axillary artery', indonesian: 'Arteri subklavia & aksilaris kanan', functionOrNote: 'Melintas di antara klavikula dan iga I menuju lengan atas' },
        ],
      },
      {
        id: 'tm1-saraf-hemisfer-quiz',
        title: 'Hemispherium Cerebri (Quiz Bernomor Slide 34)',
        indonesianTitle: 'Identifikasi Hemisfer Serebri Tampak Superior (No. 1–10)',
        imageUrl: '/assets/materi/saraf-hemisfer-quiz.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 34',
        description:
          'Foto spesimen otak tampak superior dengan label nomor 1–10 untuk latihan identifikasi lobus, sulkus, dan girus utama.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: '1', name: 'Sulcus centralis', indonesian: 'Sulkus sentralis', functionOrNote: 'Membatasi lobus frontalis dan lobus parietalis' },
          { no: '2/4', name: 'Gyrus precentralis (Cortex motorik)', indonesian: 'Girus presentralis (korteks motorik)', functionOrNote: 'Bagian posterior lobus frontalis untuk kontrol motorik primer' },
          { no: '3/5', name: 'Gyrus postcentralis (Cortex sensorik)', indonesian: 'Girus postsentralis (korteks sensorik)', functionOrNote: 'Bagian anterior lobus parietalis untuk korteks somatosensorik primer' },
          { no: '2/4/6/7', name: 'Lobus frontalis', indonesian: 'Lobus frontalis', functionOrNote: 'Gerakan volunter, fungsi bicara, emosi, moral, dan kognitif' },
          { no: '3/5/8', name: 'Lobus parietalis', indonesian: 'Lobus parietalis', functionOrNote: 'Evaluasi sensorik umum dan persepsi ruang' },
          { no: '9', name: 'Lobus occipitalis', indonesian: 'Lobus oksipitalis', functionOrNote: 'Persepsi penglihatan dan pengenalan objek' },
          { no: '10', name: 'Fissura longitudinalis', indonesian: 'Fisura longitudinalis', functionOrNote: 'Celah dalam pemisah hemisfer serebri kanan dan kiri' },
        ],
      },
      {
        id: 'tm1-saraf-sagital-quiz',
        title: 'Struktur Otak Potongan Sagital (Slide 36)',
        indonesianTitle: 'Identifikasi Otak Potongan Sagital (No. 1–7)',
        imageUrl: '/assets/materi/saraf-sagital-quiz.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 36',
        description:
          'Spesimen otak potongan midsagital dengan penomoran 1–7 untuk identifikasi serebrum, komisura, diensefalon, batang otak, dan serebelum.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: '1', name: 'Cerebrum', indonesian: 'Serebrum', functionOrNote: 'Bagian terbesar otak yang membentuk korteks serebri' },
          { no: '2', name: 'Corpus callosum', indonesian: 'Korpus kalosum', functionOrNote: 'Serabut komisura utama penghubung kedua hemisfer serebri' },
          { no: '3', name: 'Diencephalon', indonesian: 'Diensefalon', functionOrNote: 'Mencakup talamus, hipotalamus, epitalamus, dan subtalamus' },
          { no: '4', name: 'Mesencephalon', indonesian: 'Mesensefalon (otak tengah)', functionOrNote: 'Bagian paling atas dari batang otak' },
          { no: '5', name: 'Pons', indonesian: 'Pons', functionOrNote: 'Penonjolan ventral batang otak di antara mesensefalon dan medula' },
          { no: '6', name: 'Cerebellum', indonesian: 'Serebelum', functionOrNote: 'Koordinasi gerakan dan keseimbangan di fosa posterior' },
          { no: '7', name: 'Medula oblongata', indonesian: 'Medula oblongata', functionOrNote: 'Bagian kaudal batang otak yang berlanjut ke medula spinalis' },
        ],
      },
      {
        id: 'tm1-saraf-koronal-quiz',
        title: 'Struktur Otak Potongan Koronal (Slide 44)',
        indonesianTitle: 'Identifikasi Otak Potongan Koronal (No. 1–7)',
        imageUrl: '/assets/materi/saraf-koronal-quiz.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 44',
        description:
          'Spesimen otak potongan koronal dengan penomoran 1–7 yang memperlihatkan hubungan ventrikel, batang otak, dan serebelum.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: '1', name: 'Cerebrum', indonesian: 'Serebrum', functionOrNote: 'Tampak korteks (substansia grisea luar) & substansia alba dalam' },
          { no: '2', name: 'Ventrikel lateral', indonesian: 'Ventriculus lateralis', functionOrNote: 'Rongga berpasangan di bawah korpus kalosum' },
          { no: '3', name: 'Ventrikel III', indonesian: 'Ventriculus tertius (III)', functionOrNote: 'Celah garis tengah antara kedua talamus' },
          { no: '4', name: 'Mesencephalon', indonesian: 'Mesensefalon', functionOrNote: 'Penghubung diensefalon ke pons' },
          { no: '5', name: 'Pons', indonesian: 'Pons', functionOrNote: 'Bagian tengah batang otak yang melebar ke pedunkulus serebelaris' },
          { no: '6', name: 'Medula oblongata', indonesian: 'Medulla oblongata', functionOrNote: 'Segmen terbawah batang otak menuju foramen magnum' },
          { no: '7', name: 'Cerebellum', indonesian: 'Serebelum', functionOrNote: 'Mengapit kanan dan kiri batang otak di bagian bawah' },
        ],
      },
      {
        id: 'tm1-saraf-spinal-quiz',
        title: 'Medula Spinalis di Kanalis Vertebralis (Slide 52)',
        indonesianTitle: 'Identifikasi Medula Spinalis & Selaput Meninges (No. 1–6)',
        imageUrl: '/assets/materi/saraf-spinal-quiz.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 52',
        description:
          'Potongan sagital kolumna vertebralis yang menampakkan diskus, korpus vertebra, dura mater, ruang epidural, medula spinalis, dan ruang subaraknoid.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: '1', name: 'Diskus intervertebralis', indonesian: 'Discus intervertebralis', functionOrNote: 'Bantalan fibrokartilago di antara korpus vertebra' },
          { no: '2', name: 'Corpus vertebrae', indonesian: 'Korpus vertebra', functionOrNote: 'Bagian tulang utama penyusun anterior kanalis vertebralis' },
          { no: '3', name: 'Dura mater', indonesian: 'Duramater spinalis', functionOrNote: 'Selaput meningen terluar yang kuat melindungi medula spinalis' },
          { no: '4', name: 'Ruang epidural', indonesian: 'Ruang extradural / epidural', functionOrNote: 'Ruang antara dinding kanalis vertebralis dan dura mater' },
          { no: '5', name: 'Medula spinalis', indonesian: 'Medulla spinalis', functionOrNote: 'Lanjutan medula oblongata di dalam kanalis vertebralis' },
          { no: '6', name: 'Ruang subaraknoid', indonesian: 'Ruang subarachnoid', functionOrNote: 'Berisi cairan serebrospinal (LCS) di sekeliling medula spinalis' },
        ],
      },
      {
        id: 'tm1-saraf-conus-quiz',
        title: 'Conus Medullaris & Filum Terminale (Slide 53)',
        indonesianTitle: 'Identifikasi Conus Medullaris & Filum Terminale (No. 1–6)',
        imageUrl: '/assets/materi/saraf-conus-quiz.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 53',
        description:
          'Potongan sagital regio torakolumbal-sakral menunjukkan batas akhir medula spinalis setinggi vertebra L1–L2.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: '1', name: 'Corpus vertebrae', indonesian: 'Korpus vertebra (setinggi L1–L2)', functionOrNote: 'Penanda level anatomis berakhirnya medula spinalis dewasa' },
          { no: '2', name: 'Medula spinalis', indonesian: 'Medulla spinalis', functionOrNote: 'Bagian distal medula sebelum meruncing' },
          { no: '3', name: 'Conus medullaris', indonesian: 'Konus medularis', functionOrNote: 'Ujung meruncing kaudal medula spinalis umumnya setinggi L1–L2' },
          { no: '4', name: 'Diskus intervertebralis', indonesian: 'Discus intervertebralis', functionOrNote: 'Bantalan antara dua korpus vertebra berurutan' },
          { no: '5', name: 'Filum terminale', indonesian: 'Filum terminale', functionOrNote: 'Perpanjangan jaringan fibrosa pia mater menambat konus ke kaudal' },
          { no: '6', name: 'Ruang subaraknoid', indonesian: 'Ruang subarachnoid', functionOrNote: 'Sisterna lumbalis berisi LCS dan akar saraf cauda equina' },
        ],
      },
      {
        id: 'tm1-saraf-ventrikel-quiz',
        title: 'Komponen Sistem Ventrikel (Slide 57)',
        indonesianTitle: 'Identifikasi Coran 3D Sistem Ventrikel Otak (No. 1–8)',
        imageUrl: '/assets/materi/saraf-ventrikel-quiz.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 57',
        description:
          'Model anatomi sistem ventrikel tampak lateral dan anterior dengan penomoran bagian ventrikel lateralis, III, IV, serta salurannya.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: '1', name: 'Cornu anterior ventriculus lateralis', indonesian: 'Kornu anterior ventrikel lateralis', functionOrNote: 'Menjorok ke lobus frontalis (1–4 = bagian Ventrikel lateral)' },
          { no: '2', name: 'Corpus ventriculus lateralis', indonesian: 'Korpus ventrikel lateralis', functionOrNote: 'Bagian sentral di lobus parietalis' },
          { no: '3', name: 'Cornu posterior ventriculus lateralis', indonesian: 'Kornu posterior ventrikel lateralis', functionOrNote: 'Menjorok ke posterior menuju lobus oksipitalis' },
          { no: '4', name: 'Cornu inferior (temporal) ventriculus lateralis', indonesian: 'Kornu inferior / lateralis ventrikel lateralis', functionOrNote: 'Melengkung ke inferior-anterior masuk lobus temporalis' },
          { no: '5', name: 'Ventrikel III', indonesian: 'Ventriculus tertius (III)', functionOrNote: 'Berada di garis tengah antara kanan dan kiri diensefalon' },
          { no: '6', name: 'Ventrikel IV', indonesian: 'Ventriculus quartus (IV)', functionOrNote: 'Rongga berbentuk tenda di antara pons/medula dan serebelum' },
          { no: '7', name: 'Foramen interventrikular Monro', indonesian: 'Foramen interventriculare Monroe', functionOrNote: 'Saluran penghubung ventrikel lateral ke ventrikel III' },
          { no: '8', name: 'Akuaduktus cerebri', indonesian: 'Aquaductus Sylvii', functionOrNote: 'Saluran sempit penghubung ventrikel III ke ventrikel IV' },
        ],
      },
      {
        id: 'tm1-saraf-willis',
        title: 'Arteri Otak & Circulus Arteriosus Willis (Slide 70)',
        indonesianTitle: 'Sirkulasi Arteri Otak: Sirkulasi Anterior & Posterior (Willis)',
        imageUrl: '/assets/materi/saraf-willis.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 70',
        description:
          'Skema anastomosis arteri otak antara sistem karotis interna (sirkulasi anterior) dan sistem vertebrobasilar (sirkulasi posterior).',
        keyStructures: [
          { no: 1, name: 'Internal carotid artery & Carotid syphon', indonesian: 'Arteri karotis interna', functionOrNote: 'Pemasok utama sirkulasi anterior (ACA & MCA)' },
          { no: 2, name: 'Anterior cerebral artery (ACA) & Anterior communicating artery', indonesian: 'Arteri serebri anterior & komunikans anterior', functionOrNote: 'Menghubungkan sisi kanan-kiri pada bagian anterior Circulus Willis' },
          { no: 3, name: 'Middle cerebral artery (MCA)', indonesian: 'Arteri serebri media', functionOrNote: 'Cabang terminal utama karotis interna ke permukaan lateral otak' },
          { no: 4, name: 'Vertebral artery & Basilar artery', indonesian: 'Arteri vertebralis & arteri basilaris', functionOrNote: 'Kedua a. vertebralis menyatu menjadi a. basilaris (sirkulasi posterior)' },
          { no: 5, name: 'Posterior cerebral artery (PCA) & Posterior communicating artery', indonesian: 'Arteri serebri posterior & komunikans posterior', functionOrNote: 'Menghubungkan sirkulasi posterior dan anterior di Circulus Willis' },
          { no: 6, name: 'Superior, Anterior Inferior (AICA) & Posterior Inferior Cerebellar Artery (PICA)', indonesian: 'Arteri serebelaris (SCA, AICA, PICA)', functionOrNote: 'Menyuplai serebelum dan batang otak' },
        ],
      },
      {
        id: 'tm1-saraf-vaskular-quiz',
        title: 'Wilayah Vaskularisasi Cerebrum (Slide 72)',
        indonesianTitle: 'Peta Wilayah Teritori Vaskularisasi Serebrum (Kode Warna)',
        imageUrl: '/assets/materi/saraf-vaskular-quiz.webp',
        source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 72',
        description:
          'Peta warna teritori suplai arteri serebri pada tiga level potongan aksial otak (basal, ventrikel, dan konveksitas atas).',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: 'Biru', name: 'Arteri cerebri anterior (ACA)', indonesian: 'Teritori Arteri Serebri Anterior (ACA)', functionOrNote: 'Menyuplai korteks medial & superior-anterior lobus frontalis dan parietalis' },
          { no: 'Merah', name: 'Arteri cerebri media (MCA)', indonesian: 'Teritori Arteri Serebri Media (MCA)', functionOrNote: 'Menyuplai sebagian besar konveksitas lateral hemisfer serebri' },
          { no: 'Kuning', name: 'Arteri cerebri posterior (PCA)', indonesian: 'Teritori Arteri Serebri Posterior (PCA)', functionOrNote: 'Menyuplai lobus oksipitalis dan bagian inferior-medial lobus temporalis' },
          { no: 'Hijau', name: 'Arteri koroid anterior', indonesian: 'Teritori Arteri Koroid Anterior', functionOrNote: 'Menyuplai krus posterior kapsula interna dan struktur medial lobus temporalis' },
        ],
      },
    ],
  },

  // =========================================================================
  // TM 2 — Anatomi Thorax & Sistem Pernapasan (13 diagram)
  // =========================================================================
  {
    id: 'tm-2',
    tmNumber: 2,
    title: 'TM 2 — Anatomi Thorax & Sistem Pernapasan',
    subtitle: 'Rangka thorax, pleura, lobus paru, mediastinum, proyeksi katup jantung, trakea-esofagus, faring, laring, bronkus, & alveolus',
    accentColor: 'emerald',
    sourceSummary: 'ANATOMY CROSSECTIONAL OF THORAX.pdf & Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx',
    diagrams: [
      {
        id: 'tm2-thorax-bones',
        title: 'Osseous Component of the Thorax',
        indonesianTitle: 'Komponen Tulang Rangka Thorax (Sternum, Iga, Vertebra)',
        imageUrl: '/assets/materi/thorax-bones.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm.4',
        description:
          'Struktur tulang pelindung rongga dada tampak anterior meliputi sternum, tulang iga beserta kartilago kostalis, dan vertebra torakalis.',
        keyStructures: [
          { no: 1, name: 'Sternum (Manubrium, Body, Xiphoid process)', indonesian: 'Tulang dada (manubrium, korpus, prosesus xifoideus)', functionOrNote: 'Pertemuan manubrium dan korpus membentuk sudut sternal (manubriosternal joint)' },
          { no: 2, name: 'Ribs (Costae) & Costal cartilage', indonesian: 'Tulang iga (1–12) & kartilago kostalis', functionOrNote: 'Membentuk sangkar dada elastis pelindung jantung dan paru' },
          { no: 3, name: 'Thoracic vertebrae (T1–T12)', indonesian: 'Vertebra torakalis', functionOrNote: 'Dinding tulang posterior tempat artikulasi kepala iga' },
          { no: 4, name: 'Jugular notch & Infrasternal angle', indonesian: 'Takik jugularis & sudut infrasternal', functionOrNote: 'Landmark permukaan dinding anterior dada' },
        ],
      },
      {
        id: 'tm2-thorax-pleura',
        title: 'FIG. 2-5 The Pleura of the Lung',
        indonesianTitle: 'Rongga Pleura & Pembagian Pleura Parietalis–Viseralis',
        imageUrl: '/assets/materi/thorax-pleura.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm.15',
        description:
          'Dua lapis membran serosa pembungkus masing-masing paru serta ruang potensial berisi cairan pleura di antara keduanya.',
        keyStructures: [
          { no: 1, name: 'Visceral pleura', indonesian: 'Pleura viseralis', functionOrNote: 'Selaput dalam yang menempel langsung pada permukaan paru' },
          { no: 2, name: 'Parietal pleura (Cervical, Costal, Mediastinal, Diaphragmatic)', indonesian: 'Pleura parietalis', functionOrNote: 'Melapisi dinding dalam dada, mediastinum, dan permukaan atas diafragma' },
          { no: 3, name: 'Pleural space / cavity', indonesian: 'Rongga pleura', functionOrNote: 'Celah potensial berisi cairan serosa pelumas pergerakan paru' },
          { no: 4, name: 'Costodiaphragmatic recess', indonesian: 'Resesus kostodiafragmatikus', functionOrNote: 'Sudut pleura paling bawah antara iga dan diafragma (lokasi awal efusi pleura)' },
        ],
      },
      {
        id: 'tm2-thorax-lungs',
        title: 'Right and Left Lungs (Anterior View)',
        indonesianTitle: 'Anatomi Paru Kanan (3 Lobus) & Paru Kiri (2 Lobus)',
        imageUrl: '/assets/materi/thorax-lungs.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm.16',
        description:
          'Perbedaan lobus, fisura, dan hilum antara paru kanan yang lebih lebar/pendek dan paru kiri yang memiliki takik jantung.',
        keyStructures: [
          { no: 1, name: 'Right lung (Superior, Middle, Inferior lobes)', indonesian: 'Paru kanan (3 lobus: superior, medius, inferior)', functionOrNote: 'Dipisahkan oleh fisura horizontal dan fisura oblikua; lebih besar namun lebih pendek' },
          { no: 2, name: 'Left lung (Superior & Inferior lobes)', indonesian: 'Paru kiri (2 lobus: superior, inferior)', functionOrNote: 'Dipisahkan oleh satu fisura oblikua' },
          { no: 3, name: 'Cardiac notch', indonesian: 'Takik jantung (cardiac notch)', functionOrNote: 'Lekukan dalam pada tepi anterior lobus superior paru kiri' },
          { no: 4, name: 'Hilum of lung', indonesian: 'Hilum paru', functionOrNote: 'Pintu masuk/keluar bronkus utama, arteri/vena pulmonalis, limfatik, dan saraf' },
          { no: 5, name: 'Middle mediastinum & Diaphragm', indonesian: 'Mediastinum media & diafragma', functionOrNote: 'Memisahkan paru kanan-kiri serta membatasi dasar rongga pleura' },
        ],
      },
      {
        id: 'tm2-thorax-mediastinum',
        title: 'FIG. 2-6 The Four Regions of the Mediastinum',
        indonesianTitle: 'Empat Kompartemen Mediastinum (Superior, Anterior, Media, Posterior)',
        imageUrl: '/assets/materi/thorax-mediastinum.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm.17',
        description:
          'Pembagian mediastinum berdasarkan garis horizontal sudut sternal (T4–T5) serta posisi relatif terhadap perikardium.',
        keyStructures: [
          { no: 1, name: 'Superior mediastinum', indonesian: 'Mediastinum superior', functionOrNote: 'Di atas T4–T5: arkus aorta, vena brakiosefalika, VCS atas, timus, trakea, esofagus, n. vagus & frenikus' },
          { no: 2, name: 'Anterior mediastinum', indonesian: 'Mediastinum anterior', functionOrNote: 'Antara sternum dan perikardium: jaringan ikat, lemak, kelenjar limfe, sebagian timus' },
          { no: 3, name: 'Middle mediastinum', indonesian: 'Mediastinum media', functionOrNote: 'Berisi jantung, pangkal aorta asendens, arteri pulmonalis, VCS/VCI, vena pulmonalis' },
          { no: 4, name: 'Posterior mediastinum', indonesian: 'Mediastinum posterior', functionOrNote: 'Di belakang jantung s/d T12: aorta torasika desendens, vena azigos/hemiazigos, duktus torasikus, esofagus' },
        ],
      },
      {
        id: 'tm2-thorax-heart',
        title: 'Heart Projection & Valve Auscultation Sites',
        indonesianTitle: 'Proyeksi Jantung & Lokasi Katup pada Dinding Thorax',
        imageUrl: '/assets/materi/thorax-heart.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm.18',
        description:
          'Proyeksi letak anatomis keempat katup jantung beserta titik auskultasi klinis relatif terhadap tulang iga dan ruang interkostal.',
        keyStructures: [
          { no: 'A', name: 'Aortic valve', indonesian: 'Katup aorta (semilunar)', functionOrNote: 'Auskultasi di ICS 2 garis parasternal kanan' },
          { no: 'P', name: 'Pulmonary valve', indonesian: 'Katup pulmonalis (semilunar)', functionOrNote: 'Auskultasi di ICS 2 garis parasternal kiri' },
          { no: 'T', name: 'Tricuspid valve', indonesian: 'Katup trikuspidalis (AV kanan)', functionOrNote: 'Auskultasi di ICS 4–5 tepi sternum kiri bawah' },
          { no: 'M', name: 'Mitral / Bicuspid valve', indonesian: 'Katup mitral / bikuspidalis (AV kiri)', functionOrNote: 'Auskultasi di ICS 5 garis midklavikula kiri (apeks jantung setinggi T8)' },
        ],
      },
      {
        id: 'tm2-thorax-trachea',
        title: 'Trachea and Primary Bronchi',
        indonesianTitle: 'Struktur Trakea, Cincin Kartilago C, & Bronkus Primer',
        imageUrl: '/assets/materi/thorax-trachea.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm.25',
        description:
          'Saluran napas konduksi dari laring (C6) hingga percabangan bronkus primer (T5), lengkap dengan potongan melintang cincin kartilago bentuk C.',
        keyStructures: [
          { no: 1, name: 'Larynx & Hyoid bone', indonesian: 'Laring & tulang hioid (C6)', functionOrNote: 'Batas awal trakea pada kartilago krikoidea setinggi C6' },
          { no: 2, name: 'Tracheal cartilages (16–20 C-shaped rings)', indonesian: '16–20 cincin kartilago trakea berbentuk C', functionOrNote: 'Menjaga patensi lumen jalan napas; bagian posterior terbuka menghadap esofagus' },
          { no: 3, name: 'Trachealis muscle & Esophagus', indonesian: 'Otot trakealis & esofagus', functionOrNote: 'Otot polos di dinding posterior trakea memberi ruang saat bolus lewat di esofagus' },
          { no: 4, name: 'Right & Left primary bronchus', indonesian: 'Bronkus utama kanan & kiri (setinggi T5)', functionOrNote: 'Percabangan di mediastinum menuju masing-masing paru' },
        ],
      },
      {
        id: 'tm2-thorax-esophagus',
        title: 'Esophagus and Mediastinal Relations',
        indonesianTitle: 'Esofagus & Hubungan Pembuluh Besar di Mediastinum',
        imageUrl: '/assets/materi/thorax-esophagus.webp',
        source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm.24',
        description:
          'Lintasan esofagus dari leher (C6) di belakang trakea melalui mediastinum posterior menembus hiatus esofagus diafragma menuju lambung.',
        keyStructures: [
          { no: 1, name: 'Oesophagus, Pars cervicalis & Pars thoracica', indonesian: 'Esofagus pars servikalis & torasika', functionOrNote: 'Tabung otot di antara trakea dan korpus vertebra dari C6 hingga diafragma' },
          { no: 2, name: 'Bifurcatio tracheae & Arch of aorta', indonesian: 'Bifurkasio trakea & arkus aorta', functionOrNote: 'Berada tepat di anterior/kiri esofagus pars torasika' },
          { no: 3, name: 'Hiatus oesophageus', indonesian: 'Hiatus esofagus diafragma', functionOrNote: 'Lubang tempat esofagus menembus diafragma menuju gaster pars kardiaka' },
          { no: 4, name: 'Pars thoracica & abdominalis aortae', indonesian: 'Aorta torasika & abdominalis', functionOrNote: 'Berjalan di sisi kiri esofagus sebelum turun melewati hiatus aortikus' },
        ],
      },
      {
        id: 'tm2-napas-saluran',
        title: 'Parasagittal Section of Respiratory Tract',
        indonesianTitle: 'Saluran Pernapasan Atas & Bawah Tampak Parasagital',
        imageUrl: '/assets/materi/napas-saluran.webp',
        source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 3',
        description:
          'Potongan parasagital kepala dan leher memperlihatkan rongga hidung, tiga regio faring, laring, serta awal trakea.',
        keyStructures: [
          { no: 1, name: 'Nasal conchae & Nasal meatuses (Superior, Middle, Inferior)', indonesian: 'Konka & meatus nasalis', functionOrNote: 'Menghangatkan, melembapkan, dan menyaring udara inspirasi' },
          { no: 2, name: 'Nasopharynx', indonesian: 'Nasofaring', functionOrNote: 'Bagian atas faring belakang rongga hidung; memuat tonsil faringea & muara tuba auditiva' },
          { no: 3, name: 'Oropharynx', indonesian: 'Orofaring', functionOrNote: 'Bagian tengah faring di belakang rongga mulut antara palatum mole dan epiglotis' },
          { no: 4, name: 'Laryngopharynx', indonesian: 'Laringofaring (hipofaring)', functionOrNote: 'Bagian bawah faring yang bercabang ke laring (anterior) dan esofagus (posterior)' },
          { no: 5, name: 'Epiglottis, Larynx & Vocal folds', indonesian: 'Epiglotis, laring & pita suara', functionOrNote: 'Pelindung jalan napas dan organ penghasil suara' },
          { no: 6, name: 'Trachea & Esophagus', indonesian: 'Trakea (anterior) & Esofagus (posterior)', functionOrNote: 'Saluran napas di depan saluran cerna' },
        ],
      },
      {
        id: 'tm2-napas-laring',
        title: 'FIGURE 23.3 Sagittal Section of the Larynx',
        indonesianTitle: 'Anatomi Laring & Kartilago Penyusunnya (Potongan Sagital)',
        imageUrl: '/assets/materi/napas-laring.webp',
        source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 5',
        description:
          'Detail struktur kartilago tunggal (epiglotis, tiroid, krikoid), kartilago berpasangan (aritenoid, kornikulata, kuneiformis), serta lipatan vokal.',
        keyStructures: [
          { no: 1, name: 'Epiglottis', indonesian: 'Epiglotis', functionOrNote: 'Kartilago elastis menutup pintu masuk laring saat menelan' },
          { no: 2, name: 'Thyroid cartilage', indonesian: 'Kartilago tiroidea', functionOrNote: 'Kartilago hialin terbesar membentuk dinding anterior laring (jakun)' },
          { no: 3, name: 'Cricoid cartilage', indonesian: 'Kartilago krikoidea', functionOrNote: 'Cincin kartilago utuh paling bawah yang menyambung ke trakea' },
          { no: 4, name: 'Arytenoid, Corniculate & Cuneiform cartilages', indonesian: 'Kartilago aritenoid, kornikulata & kuneiformis', functionOrNote: 'Mengatur tegangan dan posisi pita suara' },
          { no: 5, name: 'Vestibular fold & Vocal fold', indonesian: 'Pita suara palsu (vestibular) & sejati (vokal)', functionOrNote: 'Lipatan vokal sejati bergetar oleh aliran udara untuk menghasilkan suara' },
        ],
      },
      {
        id: 'tm2-napas-trakea',
        title: 'Pharynx, Larynx, and Upper Trachea Relations',
        indonesianTitle: 'Hubungan Rongga Hidung, Faring, Laring, & Trakea',
        imageUrl: '/assets/materi/napas-trakea.webp',
        source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 6',
        description:
          'Ilustrasi berwarna pembagian tiga zona faring (nasofaring, orofaring, hipofaring) dan batas transisi ke laring, trakea, serta esofagus.',
        keyStructures: [
          { no: 1, name: 'Nasal cavity, Hard & Soft palate', indonesian: 'Rongga hidung, palatum durum & mole', functionOrNote: 'Memisahkan rongga hidung dengan rongga mulut' },
          { no: 2, name: 'Nasopharynx, Oropharynx, Hypopharynx', indonesian: 'Nasofaring, Orofaring, Hipofaring', functionOrNote: 'Tiga segmen faring berurutan dari atas ke bawah' },
          { no: 3, name: 'Epiglottis & Larynx (voice box)', indonesian: 'Epiglotis & Laring', functionOrNote: 'Menghubungkan faring dengan trakea dan menjadi tempat pita suara' },
          { no: 4, name: 'Trachea & Esophagus', indonesian: 'Trakea (depan) & Esofagus (belakang)', functionOrNote: 'Trakea memanjang sekitar 12 cm dari laring hingga setinggi T5' },
        ],
      },
      {
        id: 'tm2-napas-hilum',
        title: 'Anterior View of Lung Lobes, Fissures, and Pleural Sac',
        indonesianTitle: 'Lobus Paru, Fisura, & Kantung Pleura (Tampak Anterior)',
        imageUrl: '/assets/materi/napas-hilum.webp',
        source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 9',
        description:
          'Visualisasi skematis warna lobus superior, medius, dan inferior paru kanan-kiri, apeks, basis, serta selubung kantung pleura.',
        keyStructures: [
          { no: 1, name: 'Apex & Base of lung', indonesian: 'Apeks (puncak) & Basis paru', functionOrNote: 'Basis paru cekung mengikuti kubah diafragma; apeks menjorok ke atas' },
          { no: 2, name: 'Right lung: Superior, Middle, Inferior lobes', indonesian: 'Paru kanan: 3 lobus', functionOrNote: 'Dipisahkan oleh fisura horizontalis dan fisura oblikua' },
          { no: 3, name: 'Left lung: Superior & Inferior lobes + Cardiac notch', indonesian: 'Paru kiri: 2 lobus & takik jantung', functionOrNote: 'Dipisahkan oleh fisura oblikua dengan ruang bagi apeks jantung' },
          { no: 4, name: 'Pleural sac (Visceral pleura, Pleural cavity, Parietal pleura)', indonesian: 'Kantung pleura (viseral, rongga pleura, parietal)', functionOrNote: 'Menyelubungi masing-masing paru secara terpisah oleh mediastinum' },
        ],
      },
      {
        id: 'tm2-napas-bronkus',
        title: 'Branching of the Bronchial Tree & Carina',
        indonesianTitle: 'Percabangan Pohon Bronkial & Lokasi Karina',
        imageUrl: '/assets/materi/napas-bronkus.webp',
        source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 10',
        description:
          'Urutan percabangan jalan napas dari trakea, karina (T5), bronkus utama kanan-kiri, lobaris, segmentalis, hingga bronkiolus terminal.',
        keyStructures: [
          { no: 1, name: 'Location of carina', indonesian: 'Karina trakea', functionOrNote: 'Tonjolan internal pada titik bifurkasio trakea setinggi T5' },
          { no: 2, name: 'Right & Left main (primary) bronchus', indonesian: 'Bronkus utama kanan & kiri', functionOrNote: 'Bronkus kanan lebih tegak, pendek, dan lebar sehingga benda asing sering masuk ke kanan' },
          { no: 3, name: 'Lobar (secondary) bronchi', indonesian: 'Bronkus lobaris', functionOrNote: '3 cabang di paru kanan, 2 cabang di paru kiri sesuai jumlah lobus' },
          { no: 4, name: 'Segmental (tertiary) bronchi', indonesian: 'Bronkus segmentalis', functionOrNote: 'Menuju segmen bronkopulmonalis individual' },
          { no: 5, name: 'Bronchioles & Terminal bronchioles', indonesian: 'Bronkiolus & bronkiolus terminal', functionOrNote: 'Akhir zona konduksi sebelum masuk zona respirasi' },
        ],
      },
      {
        id: 'tm2-napas-alveolus',
        title: 'Alveoli and Microscopic Airways (Lung Lobule)',
        indonesianTitle: 'Alveolus, Duktus Alveolaris, & Kapiler Pertukaran Gas',
        imageUrl: '/assets/materi/napas-alveolus.webp',
        source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 12',
        description:
          'Struktur mikroskopis lobulus paru tempat terjadinya respirasi eksternal (difusi O₂ dan CO₂ melewati membran respirasi).',
        keyStructures: [
          { no: 1, name: 'Terminal bronchiole → Respiratory bronchiole', indonesian: 'Bronkiolus terminal → Bronkiolus respiratorik', functionOrNote: 'Transisi dari jalur penghantar udara menuju zona pertukaran gas' },
          { no: 2, name: 'Alveolar ducts', indonesian: 'Duktus alveolaris', functionOrNote: 'Saluran bercabang yang bermuara ke kantong-kantong alveolar' },
          { no: 3, name: 'Alveolar sac & Alveoli', indonesian: 'Kantung alveolar & alveolus', functionOrNote: 'Kantong epitel skuamosa selapis tipis tempat utama difusi O₂ dan CO₂' },
          { no: 4, name: 'Pulmonary arteriole, Capillary & Venule', indonesian: 'Arteriol, jaring kapiler & venula pulmonalis', functionOrNote: 'Jaring kapiler mengelilingi dinding alveolus untuk pertukaran gas' },
        ],
      },
    ],
  },

  // =========================================================================
  // TM 3 — Anatomi Abdomen & Sistem Pencernaan (11 diagram)
  // =========================================================================
  {
    id: 'tm-3',
    tmNumber: 3,
    title: 'TM 3 — Anatomi Abdomen & Sistem Pencernaan',
    subtitle: 'Rongga tubuh, peritoneum, tunika saluran cerna, lambung, hati-empedu, pankreas, usus halus, kolon, & kuis identifikasi 1–14',
    accentColor: 'amber',
    sourceSummary: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf & ANATOMI FISIOLOGI Sistem Pencernaan.pdf',
    diagrams: [
      {
        id: 'tm3-abdomen-regions',
        title: 'FIG. 3-1 Divisions of the Ventral Body Cavity',
        indonesianTitle: 'Pembagian Rongga Tubuh Ventral & Dorsal',
        imageUrl: '/assets/materi/abdomen-regions.webp',
        source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm.2',
        description:
          'Diagram posisi sagital rongga tubuh utama: rongga dorsal (kranial & spinal) dan rongga ventral (toraks & abdominopelvis).',
        keyStructures: [
          { no: 1, name: 'Dorsal cavity (Cranial & Spinal cavity)', indonesian: 'Rongga dorsal (kranial & spinal)', functionOrNote: 'Melindungi otak dan medula spinalis' },
          { no: 2, name: 'Thoracic cavity', indonesian: 'Rongga toraks', functionOrNote: 'Di atas diafragma, berisi paru-paru dan jantung' },
          { no: 3, name: 'Abdominal cavity', indonesian: 'Rongga abdomen', functionOrNote: 'Di bawah diafragma; berisi organ pencernaan, hati, limpa, dan ginjal' },
          { no: 4, name: 'Pelvic cavity', indonesian: 'Rongga pelvis', functionOrNote: 'Bagian bawah rongga abdominopelvis berisi kandung kemih, rektum, organ reproduksi' },
        ],
      },
      {
        id: 'tm3-abdomen-peritoneum',
        title: 'Midsagittal Section Showing the Peritoneal Folds',
        indonesianTitle: 'Lipatan Peritoneum & Organ Intraperitoneal/Retroperitoneal',
        imageUrl: '/assets/materi/abdomen-peritoneum.webp',
        source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm.10',
        description:
          'Potongan midsagital abdomen-pelvis memperlihatkan peritoneum parietalis, viseralis, omentum mayor/minor, mesenterium, dan mesokolon.',
        keyStructures: [
          { no: 1, name: 'Parietal & Visceral peritoneum', indonesian: 'Peritoneum parietalis & viseralis', functionOrNote: 'Melapisi dinding abdomen dan permukaan luar organ viseral' },
          { no: 2, name: 'Greater omentum & Lesser omentum', indonesian: 'Omentum mayor & omentum minor', functionOrNote: 'Lipatan ganda peritoneum dari kurvatura mayor & minor lambung' },
          { no: 3, name: 'Mesentery & Mesocolon', indonesian: 'Mesenterium & mesokolon', functionOrNote: 'Menggantung usus halus dan kolon transversum ke dinding posterior' },
          { no: 4, name: 'Peritoneal cavity', indonesian: 'Rongga peritoneal', functionOrNote: 'Ruang berisi cairan serosa antara peritoneum parietalis dan viseralis' },
        ],
      },
      {
        id: 'tm3-abdomen-stomach',
        title: 'Liver, Biliary Tree, Pancreas & Stomach Anatomy',
        indonesianTitle: 'Anatomi Lambung, Sistem Biliaris, & Pankreas',
        imageUrl: '/assets/materi/abdomen-stomach.webp',
        source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm.11',
        description:
          'Dua panel memperlihatkan aliran empedu-pankreas ke duodenum (kiri) serta empat regio dan tiga lapisan otot lambung (kanan).',
        keyStructures: [
          { no: 1, name: 'Four stomach regions (Cardia, Fundus, Body, Pyloric part)', indonesian: 'Empat regio lambung (kardia, fundus, korpus, pilorus)', functionOrNote: 'Terhubung dengan esofagus (sfingter gastroesofageal) & duodenum (sfingter pilorus)' },
          { no: 2, name: 'Three muscularis layers (Longitudinal, Circular, Oblique)', indonesian: 'Tiga lapisan otot lambung + rugae mukosa', functionOrNote: 'Lapisan oblik unik membantu mengaduk makanan menjadi kimus' },
          { no: 3, name: 'Gallbladder, Cystic duct & Common bile duct', indonesian: 'Kantung empedu, duktus sistikus & koledokus', functionOrNote: 'Menyalurkan empedu ke ampula hepatopankreatika (Vater)' },
          { no: 4, name: 'Pancreas & Duct of Wirsung / Santorini', indonesian: 'Pankreas & duktus pankreatikus', functionOrNote: 'Mengeluarkan getah pankreas menuju duodenum' },
        ],
      },
      {
        id: 'tm3-abdomen-colon',
        title: 'Anterior View of Large Intestine (Colon)',
        indonesianTitle: 'Anatomi Usus Besar (Sekum, Kolon, Fleksura, Rektum)',
        imageUrl: '/assets/materi/abdomen-colon.webp',
        source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm.12',
        description:
          'Wilayah utama usus besar (±1,5 m) mulai dari katup ileosekal dan sekum hingga kanalis ani beserta ciri khas haustra dan teniae coli.',
        keyStructures: [
          { no: 1, name: 'Cecum, Ileocecal valve & Vermiform appendix', indonesian: 'Sekum, katup ileosekal & apendiks vermiformis', functionOrNote: 'Pintu masuk isi ileum ke usus besar; penyerapan air paling banyak' },
          { no: 2, name: 'Ascending colon & Right colic (hepatic) flexure', indonesian: 'Kolon asendens & fleksura hepatika kanan', functionOrNote: 'Naik di sisi kanan perut lalu membelok di bawah permukaan hati' },
          { no: 3, name: 'Transverse colon & Left colic (splenic) flexure', indonesian: 'Kolon transversum & fleksura splenika kiri', functionOrNote: 'Melintang ke kiri lalu membelok di bawah limpa' },
          { no: 4, name: 'Descending colon & Sigmoid colon', indonesian: 'Kolon desendens & kolon sigmoid', functionOrNote: 'Menurun di sisi kiri dan membentuk lengkung S menuju rektum' },
          { no: 5, name: 'Teniae coli & Haustra', indonesian: 'Teniae koli & haustra', functionOrNote: 'Pita otot longitudinal dan kantong-kantong khas dinding kolon' },
          { no: 6, name: 'Rectum, Anal canal & Anus', indonesian: 'Rektum, kanalis ani & anus', functionOrNote: 'Segmen terminal penyimpan dan pengeluar feses' },
        ],
      },
      {
        id: 'tm3-pencernaan-organ',
        title: 'Digestive System Organs Overview',
        indonesianTitle: 'Organ Utama & Struktur Aksesori Sistem Pencernaan',
        imageUrl: '/assets/materi/pencernaan-organ.webp',
        source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm.3',
        description:
          'Peta lengkap saluran gastrointestinal (oral cavity hingga rektum) beserta kelenjar dan organ aksesori sistem pencernaan.',
        keyStructures: [
          { no: 1, name: 'Oral cavity, Pharynx & Salivary glands', indonesian: 'Rongga mulut, faring & kelenjar ludah', functionOrNote: 'Ingesti, pengunyahan, dan pencernaan karbohidrat awal oleh amilase saliva' },
          { no: 2, name: 'Esophagus & Stomach', indonesian: 'Esofagus & lambung', functionOrNote: 'Transportasi bolus via peristaltik dan awal pencernaan protein oleh pepsin' },
          { no: 3, name: 'Liver, Gallbladder & Pancreas', indonesian: 'Hati, kantung empedu & pankreas (aksesori)', functionOrNote: 'Menghasilkan empedu dan enzim pencernaan menuju duodenum' },
          { no: 4, name: 'Small intestine & Large intestine', indonesian: 'Usus halus & usus besar', functionOrNote: 'Usus halus untuk 80% absorpsi nutrisi; usus besar untuk absorpsi air & pembentukan feses' },
        ],
      },
      {
        id: 'tm3-pencernaan-tunika',
        title: 'Histology: Four Tunics of the GI Tract',
        indonesianTitle: 'Empat Lapisan Tunika Dinding Saluran Pencernaan',
        imageUrl: '/assets/materi/pencernaan-tunika.webp',
        source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm.5',
        description:
          'Susunan konsentris dinding saluran pencernaan dari esofagus hingga kanalis ani yang terdiri atas empat tunika utama.',
        keyStructures: [
          { no: 1, name: 'Tunika mukosa (Mucosa)', indonesian: '1. Tunika mukosa', functionOrNote: 'Epitel, lamina propria & muskularis mukosa untuk proteksi, sekresi, dan absorpsi' },
          { no: 2, name: 'Tunika submucosa (Submucosa)', indonesian: '2. Tunika submukosa', functionOrNote: 'Jaringan ikat longgar pembawa pembuluh darah, limfa, dan pleksus saraf' },
          { no: 3, name: 'Tunika muskularis (Muscularis)', indonesian: '3. Tunika muskularis', functionOrNote: 'Otot polos sirkular dalam & longitudinal luar (plus pleksus mienterikus Auerbach)' },
          { no: 4, name: 'Tunika serosa / adventisia (Serosa)', indonesian: '4. Tunika serosa / adventisia', functionOrNote: 'Peritoneum viseral terluar pembungkus organ saluran cerna' },
        ],
      },
      {
        id: 'tm3-pencernaan-lambung',
        title: 'Internal Anatomy of the Stomach & Gastric Glands',
        indonesianTitle: 'Anatomi Internal Lambung & Sel Kelenjar Lambung',
        imageUrl: '/assets/materi/pencernaan-lambung.webp',
        source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm.17',
        description:
          'Lipatan mukosa (rugae), tiga lapisan otot polos lambung, serta sel sekresi pada kelenjar mukosa lambung.',
        keyStructures: [
          { no: 1, name: 'Fundus, Body, Pylorus & Cardiac orifice', indonesian: 'Fundus, korpus, pilorus & orifisium kardia', functionOrNote: 'Empat bagian anatomis utama lambung berbentuk huruf J' },
          { no: 2, name: 'Rugae & Lesser/Greater curvature', indonesian: 'Rugae mukosa & kurvatura minor/mayor', functionOrNote: 'Rugae mendatar saat lambung terisi penuh makanan' },
          { no: 3, name: 'Mucous cell, Parietal cell, Chief cell & G cell', indonesian: 'Sel mukosa, parietal, chief (zimogenik) & sel G', functionOrNote: 'Chief sekresi pepsinogen; parietal sekresi HCl; mukosa lindungi dinding lambung' },
        ],
      },
      {
        id: 'tm3-pencernaan-pankreas',
        title: 'Anatomy of the Pancreas (Endocrine & Exocrine)',
        indonesianTitle: 'Anatomi Pankreas (Kaput, Korpus, Kauda & Pulau Langerhans)',
        imageUrl: '/assets/materi/pencernaan-pankreas.webp',
        source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm.21',
        description:
          'Pankreas (±15 cm) dengan pembagian regio anatomis serta peran ganda sebagai kelenjar eksokrin (asini) dan endokrin (pulau Langerhans).',
        keyStructures: [
          { no: 1, name: 'Head, Body & Tail of pancreas', indonesian: 'Kepala (kaput), badan (korpus) & ekor (kauda)', functionOrNote: 'Kaput menempel lengkung duodenum; kauda memanjang ke kiri' },
          { no: 2, name: 'Main pancreatic duct (duct of Wirsung)', indonesian: 'Duktus pankreatikus utama (Wirsung)', functionOrNote: 'Menyalurkan enzim lipase, amilase, dan protease ke duodenum' },
          { no: 3, name: 'Islets of Langerhans (Endocrine)', indonesian: 'Pulau Langerhans (bagian endokrin)', functionOrNote: 'Sel alfa sekresi glukagon; sel beta sekresi insulin ke darah' },
          { no: 4, name: 'Acinar & Duct cells (Exocrine)', indonesian: 'Sel asini & duktus (bagian eksokrin)', functionOrNote: 'Menghasilkan getah pankreas dan bikarbonat penetral asam lambung' },
        ],
      },
      {
        id: 'tm3-pencernaan-liver',
        title: 'Liver Lobes, Biliary Ducts, and Hepatic Lobule',
        indonesianTitle: 'Hati, Sistem Duktus Biliaris, & Lobulus Hati',
        imageUrl: '/assets/materi/pencernaan-liver.webp',
        source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm.24',
        description:
          'Anatomi lobus kanan-kiri hati, aliran empedu dari duktus hepatikus ke duktus biliaris komunis, serta struktur mikroskopis lobulus hati.',
        keyStructures: [
          { no: 1, name: 'Right & Left lobe of liver', indonesian: 'Lobus kanan & lobus kiri hati', functionOrNote: 'Dipisahkan oleh ligamen falsiformis; terdiri atas unit fungsional lobulus' },
          { no: 2, name: 'Right/Left hepatic duct, Common hepatic duct & Cystic duct', indonesian: 'Duktus hepatikus, sistikus & koledokus', functionOrNote: 'Menyalurkan empedu ke kantung empedu dan duodenum' },
          { no: 3, name: 'Portal vein & Hepatic artery', indonesian: 'Vena porta & arteri hepatika', functionOrNote: 'Suplai darah kaya nutrisi dari usus dan darah kaya O₂ ke hepatosit' },
          { no: 4, name: 'Liver lobule (Sinusoids, Central vein, Hepatocytes)', indonesian: 'Lobulus hati (sinusoid, vena sentralis, hepatosit)', functionOrNote: 'Mengandung sel Kupffer untuk fagositosis dan detoksifikasi amonia → urea' },
        ],
      },
      {
        id: 'tm3-pencernaan-usus',
        title: 'Small Intestine (Duodenum, Jejunum, Ileum)',
        indonesianTitle: 'Anatomi Usus Halus & Hubungannya dengan Kolon',
        imageUrl: '/assets/materi/pencernaan-usus.webp',
        source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm.26',
        description:
          'Tiga segmen usus halus dengan total panjang ±6 meter (duodenum 25 cm, jejunum 2,5 m, ileum 3,5 m) beserta mesenterium.',
        keyStructures: [
          { no: 1, name: 'Duodenum', indonesian: 'Duodenum (25 cm)', functionOrNote: 'Bagian terpendek menerima empedu dan getah pankreas; memiliki kelenjar Brunner' },
          { no: 2, name: 'Jejunum', indonesian: 'Jejunum / yeyunum (±2,5 m)', functionOrNote: 'Segmen tengah usus halus tempat pencernaan dan penyerapan aktif' },
          { no: 3, name: 'Ileum', indonesian: 'Ileum (±3,5 m)', functionOrNote: 'Segmen terpanjang yang bermuara ke sekum melalui katup ileosekal' },
          { no: 4, name: 'Mesentery', indonesian: 'Mesenterium', functionOrNote: 'Lipatan peritoneum berbentuk kipas penyangga pembuluh darah & usus halus' },
        ],
      },
      {
        id: 'tm3-pencernaan-quiz-14',
        title: 'Identifikasi Sistem Pencernaan (Nomor 1–14)',
        indonesianTitle: 'Latihan Identifikasi Organ Pencernaan Bernomor 1–14',
        imageUrl: '/assets/materi/pencernaan-quiz-14.webp',
        source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm.35–36',
        description:
          'Diagram ujian identifikasi anatomi lengkap sistem pencernaan dengan kotak nomor 1–14 sesuai kunci resmi modul kuliah.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: 1, name: 'Liver', indonesian: 'Hati', functionOrNote: 'Organ kelenjar terbesar di kuadran kanan atas; memproduksi garam empedu' },
          { no: 2, name: 'Gallbladder', indonesian: 'Kantung empedu', functionOrNote: 'Menyimpan dan memekatkan empedu di bawah hati' },
          { no: 3, name: 'Duodenum', indonesian: 'Duodenum', functionOrNote: 'Bagian awal usus halus (25 cm) berbentuk huruf C' },
          { no: 4, name: 'Ascending colon', indonesian: 'Kolon asendens', functionOrNote: 'Naik di sisi kanan rongga abdomen menuju fleksura hepatika' },
          { no: 5, name: 'Cecum', indonesian: 'Sekum', functionOrNote: 'Bagian awal usus besar berbentuk kantong di kuadran kanan bawah' },
          { no: 6, name: 'Ileum', indonesian: 'Ileum', functionOrNote: 'Bagian akhir usus halus (3,5 m) yang masuk ke sekum' },
          { no: 7, name: 'Rectum', indonesian: 'Rektum', functionOrNote: '7–8 inci terakhir saluran cerna di anterior sakrum' },
          { no: 8, name: 'Anal canal', indonesian: 'Kanalis ani', functionOrNote: 'Ujung 1 inci terakhir menuju anus dengan sfingter interna & eksterna' },
          { no: 9, name: 'Sigmoid colon', indonesian: 'Kolon sigmoid', functionOrNote: 'Segmen berbentuk S penghubung kolon desendens dengan rektum' },
          { no: 10, name: 'Jejunum', indonesian: 'Jejunum', functionOrNote: 'Segmen tengah usus halus (2,5 m) antara duodenum dan ileum' },
          { no: 11, name: 'Descending colon', indonesian: 'Kolon desendens', functionOrNote: 'Berjalan ke bawah di sisi kiri dari fleksura splenika menuju sigmoid' },
          { no: 12, name: 'Transverse colon', indonesian: 'Kolon transversum', functionOrNote: 'Melintang dari kanan ke kiri melintasi rongga abdomen' },
          { no: 13, name: 'Stomach', indonesian: 'Lambung', functionOrNote: 'Organ berbentuk huruf J di kuadran kiri atas di bawah diafragma' },
          { no: 14, name: 'Esophagus', indonesian: 'Esofagus', functionOrNote: 'Tabung berotot 23–25 cm pengangkut bolus dari faring ke lambung' },
        ],
      },
    ],
  },

  // =========================================================================
  // TM 4 — Sistem Urinari (6 diagram)
  // =========================================================================
  {
    id: 'tm-4',
    tmNumber: 4,
    title: 'TM 4 — Sistem Urinari',
    subtitle: 'Organ urinari, parenkim ginjal, nefron, suplai vaskular ginjal, serta kuis identifikasi ginjal bernomor (1–4 & 3–9)',
    accentColor: 'cyan',
    sourceSummary: 'ANATOMI FISIOLOGI Sistem Urinari.pdf',
    diagrams: [
      {
        id: 'tm4-urinari-organ',
        title: 'Figure 18-1 The Urinary System (Anterior View)',
        indonesianTitle: 'Organ-Organ Sistem Urinari Tampak Anterior',
        imageUrl: '/assets/materi/urinari-organ.webp',
        source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm.6',
        description:
          'Keempat komponen utama sistem urinari retroperitoneal dan pelvis beserta pembuluh besar aorta abdominalis dan vena kava inferior.',
        keyStructures: [
          { no: 1, name: 'Right & Left kidney', indonesian: 'Dua Ginjal', functionOrNote: 'Retroperitoneal; ginjal kanan sedikit lebih rendah akibat keberadaan hati' },
          { no: 2, name: 'Right & Left ureter', indonesian: 'Dua Ureter', functionOrNote: 'Saluran sepanjang 25–30 cm dari pelvis renalis ke posterior kandung kemih' },
          { no: 3, name: 'Urinary bladder & Trigone', indonesian: 'Kandung kemih & trigonum vesika', functionOrNote: 'Kapasitas ±500 mL; dinding berotot detrusor di belakang simfisis pubis' },
          { no: 4, name: 'Urethra', indonesian: 'Uretra', functionOrNote: 'Menyalurkan urin keluar tubuh (wanita ±3,8 cm; pria ±20 cm menembus prostat)' },
          { no: 5, name: 'Aorta & Inferior vena cava', indonesian: 'Aorta abdominalis & Vena kava inferior', functionOrNote: 'Asal arteri renalis dan muara vena renalis' },
        ],
      },
      {
        id: 'tm4-urinari-ginjal',
        title: 'Internal Structure & Parenchyma of the Kidney',
        indonesianTitle: 'Parenkim Ginjal (Korteks, Medula, Piramida, Kaliks & Pelvis)',
        imageUrl: '/assets/materi/urinari-ginjal.webp',
        source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm.9',
        description:
          'Potongan koronal ginjal memperlihatkan lapisan pembungkus luar, parenkim korteks-medula, dan sistem pengumpul urin.',
        keyStructures: [
          { no: 1, name: 'Renal cortex', indonesian: 'Korteks ginjal', functionOrNote: 'Area luar dari kapsul renalis hingga dasar piramida ginjal' },
          { no: 2, name: 'Renal medulla & Pyramids (8–18)', indonesian: 'Medula & 8–18 piramida ginjal', functionOrNote: 'Struktur segitiga bergaris dengan puncak papila ginjal mengarah ke pusat' },
          { no: 3, name: 'Minor & Major calyces', indonesian: 'Kaliks minor & kaliks mayor', functionOrNote: 'Corong penampung urin dari papila ginjal bergabung menjadi 2–3 kaliks mayor' },
          { no: 4, name: 'Renal pelvis & Ureter', indonesian: 'Pelvis renalis & ureter', functionOrNote: 'Corong besar di sinus renalis yang menyempit keluar sebagai ureter' },
          { no: 5, name: 'Renal capsule, Adipose capsule & Renal fascia', indonesian: 'Kapsul renalis, kapsul adiposa & fasia renalis', functionOrNote: 'Tiga lapisan jaringan pelindung dan penahan posisi ginjal' },
        ],
      },
      {
        id: 'tm4-urinari-nefron',
        title: 'Functional Unit of the Kidney: Nephron',
        indonesianTitle: 'Struktur Nefron, Korpuskel Renal, & Tubulus Ginjal',
        imageUrl: '/assets/materi/urinari-nefron.webp',
        source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm.12',
        description:
          'Unit fungsional mikroskopis ginjal tempat berlangsungnya tiga proses pembentukan urin: filtrasi glomerulus, reabsorpsi tubulus, dan sekresi tubulus.',
        keyStructures: [
          { no: 1, name: "Glomerulus & Bowman's capsule (Podocytes)", indonesian: 'Glomerulus & kapsula Bowman (korpuskel renal)', functionOrNote: 'Tempat filtrasi air dan zat terlarut plasma darah di korteks ginjal' },
          { no: 2, name: 'Proximal convoluted tubule (PCT)', indonesian: 'Tubulus kontortus proksimal', functionOrNote: 'Lokasi reabsorpsi aktif glukosa, asam amino, elektrolit, serta sekresi kreatinin/penisilin' },
          { no: 3, name: 'Loop of Henle (Descending & Ascending)', indonesian: 'Lengkung Henle (desenden & asenden)', functionOrNote: 'Desenden menyerap air (osmosis); asenden menyerap ion Na+, K+, Cl-' },
          { no: 4, name: 'Distal convoluted tubule (DCT) & Collecting tubule', indonesian: 'Tubulus kontortus distal & duktus pengumpul', functionOrNote: 'Diatur hormon vasopresin (ADH) & aldosteron; sekresi K+ dan H+' },
          { no: 5, name: 'Afferent/Efferent arteriole & Peritubular capillaries', indonesian: 'Arteriol aferen/eferen & kapiler peritubular', functionOrNote: 'Komponen vaskular nefron untuk filtrasi dan pertukaran reabsorpsi-sekresi' },
        ],
      },
      {
        id: 'tm4-urinari-vaskular',
        title: 'Renal Blood Supply Pathway to the Nephron',
        indonesianTitle: 'Alur Suplai Pembuluh Darah Ginjal Menuju Nefron',
        imageUrl: '/assets/materi/urinari-vaskular.webp',
        source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm.16',
        description:
          'Urutan aliran darah arteri dan vena di dalam ginjal (±1.200 mL/menit atau 25% curah jantung, disaring ±60 kali per hari).',
        keyStructures: [
          { no: 1, name: 'Renal artery → Interlobar → Arcuate → Interlobular arteries', indonesian: 'A. renalis → A. interlobaris → A. arkuata → A. interlobularis', functionOrNote: 'Jalur arteri dari hilum menuju korteks ginjal' },
          { no: 2, name: 'Afferent arteriole → Glomerular capillaries → Efferent arteriole', indonesian: 'Arteriol aferen → Glomerulus → Arteriol eferen', functionOrNote: 'Rangkaian vaskular filtrasi bertekanan tinggi' },
          { no: 3, name: 'Peritubular capillaries', indonesian: 'Kapiler peritubular', functionOrNote: 'Mengelilingi tubulus ginjal untuk reabsorpsi dan sekresi' },
          { no: 4, name: 'Interlobular → Arcuate → Interlobar veins → Renal vein', indonesian: 'V. korteks/interlobularis → V. arkuata → V. interlobaris → V. renalis', functionOrNote: 'Mengembalikan darah bersih menuju vena kava inferior' },
        ],
      },
      {
        id: 'tm4-urinari-quiz-1to4',
        title: 'Identifikasi Ginjal & Pembuluh Hilum (Nomor 1–4)',
        indonesianTitle: 'Kuis Identifikasi Struktur Ginjal & Hilum (No. 1–4)',
        imageUrl: '/assets/materi/urinari-quiz-1to4.webp',
        source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm.33',
        description:
          'Diagram tampak anterior kedua ginjal, kelenjar suprarenal, dan pembuluh besar retroperitoneal dengan kotak nomor 1–4.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: 1, name: 'Kidney', indonesian: 'Ginjal', functionOrNote: 'Organ retroperitoneal pengatur homeostasis komposisi dan volume darah' },
          { no: 2, name: 'Renal vein', indonesian: 'Vena renalis', functionOrNote: 'Keluar dari hilum ginjal mengembalikan darah ke vena kava inferior' },
          { no: 3, name: 'Proximal ureter', indonesian: 'Ureter proksimal', functionOrNote: 'Lanjutan sempit dari pelvis renalis turun sejajar kolumna vertebralis' },
          { no: 4, name: 'Renal artery', indonesian: 'Arteri renalis', functionOrNote: 'Cabang aorta abdominalis yang memasuki hilum ginjal' },
        ],
      },
      {
        id: 'tm4-urinari-quiz-3to9',
        title: 'Identifikasi Anatomi Internal Ginjal (Nomor 3–9)',
        indonesianTitle: 'Kuis Identifikasi Parenkim & Sistem Kaliks Ginjal (No. 3–9)',
        imageUrl: '/assets/materi/urinari-quiz-3to9.webp',
        source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm.34–35',
        description:
          'Potongan frontal ginjal kanan dan kiri untuk mengidentifikasi ureter proksimal, arteri renalis, korteks, piramida, kaliks minor/mayor, dan pelvis renalis.',
        hasPrintedNumbers: true,
        keyStructures: [
          { no: 3, name: 'Proximal ureter', indonesian: 'Ureter proksimal', functionOrNote: 'Saluran keluar urin dari pelvis renalis menuju kandung kemih' },
          { no: 4, name: 'Renal artery', indonesian: 'Arteri renalis', functionOrNote: 'Masuk hilum lalu bercabang menjadi arteri segmentalis & interlobaris' },
          { no: 5, name: 'Renal cortex', indonesian: 'Korteks renalis', functionOrNote: 'Zona luar parenkim ginjal di bawah kapsula fibrosa' },
          { no: 6, name: 'Renal pyramids (medulla)', indonesian: 'Piramida ginjal (medula)', functionOrNote: '8–18 struktur segitiga bergaris pada medula dengan papila di puncaknya' },
          { no: 7, name: 'Minor calices', indonesian: 'Kaliks minor', functionOrNote: 'Corong kecil penampung langsung urin dari papila piramida ginjal' },
          { no: 8, name: 'Major calices', indonesian: 'Kaliks mayor', functionOrNote: '2–3 cabang pengumpul gabungan beberapa kaliks minor' },
          { no: 9, name: 'Renal pelvis', indonesian: 'Pelvis renalis', functionOrNote: 'Corong pengumpul utama di sinus renalis sebelum menyempit ke ureter' },
        ],
      },
    ],
  },

  // =========================================================================
  // TM 5 — Identifikasi Jantung & Pembuluh Darah (10 diagram)
  // =========================================================================
  {
    id: 'tm-5',
    tmNumber: 5,
    title: 'TM 5 — Identifikasi Jantung & Pembuluh Darah',
    subtitle: 'Empat ruang jantung, tantangan A–D, katup jantung, sistem konduksi, koroner, pembuluh besar, & peta arteri/vena tubuh',
    accentColor: 'rose',
    sourceSummary: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx & Sistem Peredaran Darah.pptx',
    diagrams: [
      {
        id: 'tm5-kardio-empat-ruang',
        title: 'Empat Ruang, Katup, & Pembuluh Besar Jantung',
        indonesianTitle: 'Empat Ruang Jantung & Katup (Atrium, Ventrikel, Septum)',
        imageUrl: '/assets/materi/kardio-empat-ruang.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 5',
        description:
          'Potongan koronal jantung lengkap dengan label bahasa Indonesia untuk empat ruang, empat katup, septum, dan pembuluh darah besar.',
        keyStructures: [
          { no: 1, name: 'Atrium Kanan', indonesian: 'Atrium kanan', functionOrNote: 'Menerima darah rendah O₂ dari seluruh tubuh via vena kava superior & inferior' },
          { no: 2, name: 'Ventrikel Kanan', indonesian: 'Ventrikel kanan', functionOrNote: 'Memompa darah ke paru melalui katup pulmonalis dan pulmonary trunk' },
          { no: 3, name: 'Atrium Kiri', indonesian: 'Atrium kiri', functionOrNote: 'Menerima darah kaya O₂ dari paru via vena pulmonalis kanan & kiri' },
          { no: 4, name: 'Ventrikel Kiri', indonesian: 'Ventrikel kiri', functionOrNote: 'Dinding otot paling tebal; memompa darah ke seluruh tubuh melalui aorta' },
          { no: 5, name: 'Katup Trikuspidalis & Mitral/Bikuspidalis', indonesian: 'Katup atrioventrikular (AV)', functionOrNote: 'Mencegah aliran balik dari ventrikel ke atrium saat sistol' },
          { no: 6, name: 'Katup Pulmonalis & Katup Aorta', indonesian: 'Katup semilunar', functionOrNote: 'Berada pada jalan keluar ventrikel kanan dan ventrikel kiri' },
          { no: 7, name: 'Interventricular Septum', indonesian: 'Septum interventrikulare', functionOrNote: 'Dinding otot pemisah ventrikel kanan dan ventrikel kiri' },
        ],
      },
      {
        id: 'tm5-kardio-quiz-ruang',
        title: 'Tantangan 30 Detik: Identifikasi Empat Ruang (A–D)',
        indonesianTitle: 'Latihan Identifikasi Empat Ruang Jantung (A–D) & Arah Aorta',
        imageUrl: '/assets/materi/kardio-quiz-ruang.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 6',
        description:
          'Latihan cepat slide 6: tunjukkan ruang A, B, C, D dan tentukan ruang mana yang memompa darah langsung ke aorta (Ventrikel kiri).',
        keyStructures: [
          { no: 'A', name: 'Atrium kanan', indonesian: 'Atrium kanan', functionOrNote: 'Sisi kanan atas jantung; menerima muara vena kava superior dan inferior' },
          { no: 'B', name: 'Ventrikel kanan', indonesian: 'Ventrikel kanan', functionOrNote: 'Sisi kanan bawah jantung; memompa darah ke paru lewat arteri pulmonalis' },
          { no: 'C', name: 'Atrium kiri', indonesian: 'Atrium kiri', functionOrNote: 'Sisi kiri atas jantung; menerima darah kaya O₂ dari vena pulmonalis' },
          { no: 'D', name: 'Ventrikel kiri', indonesian: 'Ventrikel kiri (memompa ke aorta)', functionOrNote: 'Jawaban tantangan: ruang berdinding paling tebal yang memompa darah ke aorta' },
        ],
      },
      {
        id: 'tm5-kardio-katup',
        title: 'Superior View of the Four Heart Valves',
        indonesianTitle: 'Keempat Katup Jantung Tampak Superior (Basis Jantung)',
        imageUrl: '/assets/materi/kardio-katup.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 7',
        description:
          'Posisi anatomis katup atrioventrikular (posterior) dan katup semilunar (anterior) dilihat dari atas dengan atrium diangkat.',
        keyStructures: [
          { no: 1, name: 'Tricuspid valve', indonesian: 'Katup trikuspidalis (AV kanan)', functionOrNote: 'Memiliki 3 daun katup antara atrium kanan dan ventrikel kanan' },
          { no: 2, name: 'Bicuspid (mitral) valve', indonesian: 'Katup bikuspidalis / mitral (AV kiri)', functionOrNote: 'Memiliki 2 daun katup antara atrium kiri dan ventrikel kiri' },
          { no: 3, name: 'Aortic valve', indonesian: 'Katup semilunar aorta', functionOrNote: 'Di tengah di antara katup AV dan pulmonal; menutup saat diastol (bunyi S2)' },
          { no: 4, name: 'Pulmonary valve', indonesian: 'Katup semilunar pulmonalis', functionOrNote: 'Paling anterior pada pangkal trunkus pulmonalis' },
        ],
      },
      {
        id: 'tm5-kardio-koroner',
        title: 'Coronary Vessels (Anterior & Posterior Views)',
        indonesianTitle: 'Pembuluh Darah Koroner Permukaan Anterior & Posterior Jantung',
        imageUrl: '/assets/materi/kardio-koroner.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 11',
        description:
          'Distribusi arteri koroner kanan dan kiri beserta drainase vena jantung menuju sinus koronarius pada permukaan jantung.',
        keyStructures: [
          { no: 1, name: 'Right coronary artery & Marginal/Posterior descending branches', indonesian: 'Arteri koroner kanan, cabang marginal & desendens posterior', functionOrNote: 'Berjalan di sulkus koronarius kanan lalu turun di sisi posterior' },
          { no: 2, name: 'Left coronary artery, Anterior descending (LAD) & Circumflex branch', indonesian: 'Arteri koroner kiri, LAD & cabang sirkumfleksa', functionOrNote: 'Cabang utama penyuplai dinding anterior-lateral ventrikel kiri' },
          { no: 3, name: 'Great & Middle cardiac veins → Coronary sinus', indonesian: 'Vena kardiaka magna/media → Sinus koronarius', functionOrNote: 'Mengumpulkan darah vena miokardium lalu bermuara ke atrium kanan' },
        ],
      },
      {
        id: 'tm5-kardio-konduksi',
        title: 'Cardiac Conduction System',
        indonesianTitle: 'Sistem Konduksi Listrik Jantung (SA Node s/d Serabut Purkinje)',
        imageUrl: '/assets/materi/kardio-konduksi.webp',
        source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 12',
        description:
          'Jalur pemicu dan penghantar impuls listrik terkoordinasi dari atas atrium hingga dinding ventrikel.',
        keyStructures: [
          { no: 1, name: 'Sinoatrial node (pacemaker)', indonesian: 'Nodus sinoatrial (SA node)', functionOrNote: 'Pemacu alami jantung di dinding atas atrium kanan dekat muara VCS' },
          { no: 2, name: 'Atrioventricular node', indonesian: 'Nodus atrioventrikular (AV node)', functionOrNote: 'Di dasar septum interatriale; memberi jeda singkat agar atrium selesai berkontraksi' },
          { no: 3, name: 'Atrioventricular bundle (Bundle of His) & Bundle branches', indonesian: 'Berkas His & cabang berkas kanan-kiri', functionOrNote: 'Menghantarkan impuls menuruni septum interventrikulare' },
          { no: 4, name: 'Purkinje fibers', indonesian: 'Serabut Purkinje', functionOrNote: 'Menyebarkan eksitasi cepat ke seluruh miokardium ventrikel dari apeks ke atas' },
        ],
      },
      {
        id: 'tm5-darah-pembuluh-besar',
        title: 'Pembuluh Darah Besar Jantung & Arkus Aorta',
        indonesianTitle: 'Pembuluh Darah Besar & Tiga Cabang Arkus Aorta',
        imageUrl: '/assets/materi/darah-pembuluh-besar.webp',
        source: 'Sistem Peredaran Darah.pptx slide 44',
        description:
          'Tampilan anterior jantung utuh menampilkan keempat pembuluh darah besar beserta tiga cabang utama arkus aorta.',
        keyStructures: [
          { no: 1, name: 'Aorta (Ascending, Arch, Descending)', indonesian: '1. Aorta (asendens, arkus, desendens)', functionOrNote: 'Arkus bercabang: Brachiocephalic trunk, Left common carotid, Left subclavian artery' },
          { no: 2, name: 'Pulmonary trunk & Left pulmonary artery', indonesian: '2. Arteri pulmonalis (trunkus pulmonalis)', functionOrNote: 'Membawa darah kaya CO₂ dari ventrikel kanan menuju paru; terhubung ke arkus via ligamentum arteriosum' },
          { no: 3, name: 'Superior & Inferior vena cava', indonesian: '3. Vena kava superior & inferior', functionOrNote: 'Mengembalikan darah kaya CO₂ dari tubuh atas dan bawah ke atrium kanan' },
          { no: 4, name: 'Pulmonary veins', indonesian: '4. Vena pulmonalis', functionOrNote: 'Mengembalikan darah kaya O₂ dari paru ke atrium kiri' },
        ],
      },
      {
        id: 'tm5-darah-koroner-1',
        title: 'Coronary Circulation (Radiology Key Branches)',
        indonesianTitle: 'Sirkulasi Koroner: 4 Arteri Koroner Evaluasi Radiologi & Vena Kardiaka',
        imageUrl: '/assets/materi/darah-koroner-1.webp',
        source: 'Sistem Peredaran Darah.pptx slide 47',
        description:
          'Rincian percabangan arteri dan vena koroner yang dievaluasi pada pemeriksaan radiologi jantung (CT/angiografi koroner).',
        keyStructures: [
          { no: 1, name: 'Right coronary artery (RCA) & Right marginal / Posterior interventricular', indonesian: 'RCA, marginal kanan & interventrikular posterior', functionOrNote: 'Berasal dari pangkal aorta asendens tepat di atas katup semilunar aorta' },
          { no: 2, name: 'Left main coronary artery (LCA)', indonesian: 'LCA (Left Main Coronary Artery)', functionOrNote: 'Bercabang dua menjadi LAD dan LCx' },
          { no: 3, name: 'Left anterior descending artery (LAD / Anterior interventricular)', indonesian: 'LAD (Anterior interventricular artery)', functionOrNote: 'Turun di sulkus interventrikularis anterior menuju apeks' },
          { no: 4, name: 'Left circumflex artery (LCx)', indonesian: 'LCx (Circumflex artery)', functionOrNote: 'Melengkung ke sisi kiri-posterior jantung di sulkus koronarius' },
          { no: 5, name: 'Anterior, Great, Middle & Small cardiac veins → Coronary sinus', indonesian: 'Vena kardiaka & sinus koronarius', functionOrNote: 'Drainase vena jantung di bagian posterior menuju atrium kanan' },
        ],
      },
      {
        id: 'tm5-darah-limb-atas',
        title: 'Upper Arm Arterial Circulation',
        indonesianTitle: 'Sirkulasi Arteri Ekstremitas Atas (Subklavia s/d Arkus Palmaris)',
        imageUrl: '/assets/materi/darah-limb-atas.webp',
        source: 'Sistem Peredaran Darah.pptx slide 56',
        description:
          'Rantai arteri ekstremitas atas dari pangkal arkus aorta melewati bahu, lengan atas, lengan bawah, hingga telapak tangan.',
        keyStructures: [
          { no: 1, name: 'Brachiocephalic → Right subclavian / Left subclavian artery', indonesian: 'Arteri subklavia kanan & kiri', functionOrNote: 'Melintasi iga I sebelum berganti nama menjadi arteri aksilaris' },
          { no: 2, name: 'Axillary artery', indonesian: 'Arteri aksilaris', functionOrNote: 'Melintas di regio ketiak / aksila' },
          { no: 3, name: 'Brachial artery', indonesian: 'Arteri brakialis', functionOrNote: 'Menyusuri sisi medial humerus; lokasi pengukuran tekanan darah (sfigmomanometer)' },
          { no: 4, name: 'Radial & Ulnar artery', indonesian: 'Arteri radialis (lateral) & ulnaris (medial)', functionOrNote: 'Bercabang di fossa kubiti; a. radialis lokasi perabaan nadi pergelangan tangan' },
          { no: 5, name: 'Deep & Superficial palmar arch', indonesian: 'Arkus palmaris profunda & superfisialis', functionOrNote: 'Anastomosis di telapak tangan pemberi cabang ke jari-jari' },
        ],
      },
      {
        id: 'tm5-darah-arteri-tubuh',
        title: 'Systemic Arteries of the Body',
        indonesianTitle: 'Peta Arteri Sistemik Utama Seluruh Tubuh',
        imageUrl: '/assets/materi/darah-arteri-tubuh.webp',
        source: 'Sistem Peredaran Darah.pptx slide 58',
        description:
          'Diagram arteri utama tubuh mulai dari arkus aorta, cabang torakoabdominal, hingga arteri ekstremitas atas dan bawah.',
        keyStructures: [
          { no: 1, name: 'Carotid, Vertebral & Subclavian arteries', indonesian: 'Arteri karotis, vertebralis & subklavia', functionOrNote: 'Pemasok darah arteri ke kepala, leher, otak, dan ekstremitas atas' },
          { no: 2, name: 'Aortic arch, Ascending & Descending aorta', indonesian: 'Aorta asendens, arkus & desendens', functionOrNote: 'Pembuluh arteri elastis utama keluar dari ventrikel kiri' },
          { no: 3, name: 'Celiac trunk, Renal, Superior & Inferior mesenteric, Gonadal arteries', indonesian: 'Trunkus seliakus, renalis, mesenterika superior/inferior & gonadalis', functionOrNote: 'Cabang aorta abdominalis penyuplai organ pencernaan, ginjal, dan gonad' },
          { no: 4, name: 'Common, External & Internal iliac arteries', indonesian: 'Arteri iliaka komunis, eksterna & interna', functionOrNote: 'Percabangan terminal aorta menuju pelvis dan tungkai' },
          { no: 5, name: 'Femoral, Deep femoral, Popliteal, Anterior/Posterior tibial & Fibular arteries', indonesian: 'Arteri femoralis, poplitea, tibialis anterior/posterior & fibularis', functionOrNote: 'Rantai arteri utama ekstremitas bawah hingga kaki' },
        ],
      },
      {
        id: 'tm5-darah-vena-tubuh',
        title: 'Systemic Veins of the Body (Superficial & Deep)',
        indonesianTitle: 'Peta Vena Sistemik Superfisialis & Profunda Seluruh Tubuh',
        imageUrl: '/assets/materi/darah-vena-tubuh.webp',
        source: 'Sistem Peredaran Darah.pptx slide 59',
        description:
          'Jalur kembalinya darah vena superfisial (biru muda) dan profunda (biru tua) dari seluruh tubuh menuju vena kava superior dan inferior.',
        keyStructures: [
          { no: 1, name: 'Internal/External jugular, Vertebral & Brachiocephalic veins → SVC', indonesian: 'Vena jugularis, vertebralis, brakiosefalika → VCS', functionOrNote: 'Mengalirkan darah vena dari kepala, leher, dan lengan ke atrium kanan' },
          { no: 2, name: 'Subclavian, Axillary, Brachial, Basilic & Median cubital veins', indonesian: 'Vena subklavia, aksilaris, brakialis, basilika & mediana kubiti', functionOrNote: 'Vena mediana kubiti di lipat siku lokasi utama pungsi vena' },
          { no: 3, name: 'Hepatic, Renal, Gonadal & Lumbar veins → IVC', indonesian: 'Vena hepatika, renalis, gonadalis & lumbalis → VCI', functionOrNote: 'Bermuara ke vena kava inferior di rongga abdomen' },
          { no: 4, name: 'Common, External & Internal iliac veins', indonesian: 'Vena iliaka komunis, eksterna & interna', functionOrNote: 'Bergabung di L5 membentuk vena kava inferior' },
          { no: 5, name: 'Femoral, Popliteal, Great & Small saphenous veins', indonesian: 'Vena femoralis, poplitea, safena magna & parva', functionOrNote: 'Drainase profunda dan superfisial ekstremitas bawah' },
        ],
      },
    ],
  },
];
