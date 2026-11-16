import type { MaskZone, QuestionItem } from '../types/anatomy';

const MASK_HEAD_P34: MaskZone[] = [
  { x: 42, y: 5, w: 17, h: 6, labelHint: 'Sinus dural superior' },
  { x: 18, y: 17, w: 18, h: 72, labelHint: 'Label sisi kiri' },
  { x: 64, y: 12, w: 19, h: 72, labelHint: 'Label sisi kanan' },
  { x: 34, y: 89, w: 35, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P35: MaskZone[] = [
  { x: 58, y: 10, w: 28, h: 68, labelHint: 'Label struktur MRI' },
  { x: 19, y: 92, w: 63, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P36: MaskZone[] = [
  { x: 43, y: 3, w: 14, h: 6, labelHint: 'Sinus anterior' },
  { x: 16, y: 14, w: 21, h: 79, labelHint: 'Label sisi kiri' },
  { x: 63, y: 9, w: 23, h: 83, labelHint: 'Label sisi kanan' },
  { x: 33, y: 93, w: 34, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P37: MaskZone[] = [
  { x: 58, y: 5, w: 26, h: 86, labelHint: 'Label struktur MRI' },
  { x: 23, y: 92, w: 54, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P39: MaskZone[] = [
  { x: 30, y: 7, w: 10, h: 5, labelHint: 'Sinus anterior' },
  { x: 17, y: 21, w: 20, h: 70, labelHint: 'Label sisi kiri' },
  { x: 59, y: 8, w: 24, h: 83, labelHint: 'Label sisi kanan' },
  { x: 35, y: 92, w: 30, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P41: MaskZone[] = [
  { x: 36, y: 8, w: 29, h: 6, labelHint: 'Label anterior' },
  { x: 17, y: 14, w: 20, h: 69, labelHint: 'Label sisi kiri' },
  { x: 60, y: 14, w: 27, h: 75, labelHint: 'Label sisi kanan' },
  { x: 37, y: 88, w: 28, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P42: MaskZone[] = [
  { x: 68, y: 10, w: 23, h: 71, labelHint: 'Label CT orbita' },
  { x: 28, y: 83, w: 46, h: 7, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P45: MaskZone[] = [
  { x: 7, y: 10, w: 12, h: 75, labelHint: 'Label anterior/inferior' },
  { x: 80, y: 9, w: 14, h: 78, labelHint: 'Label posterior' },
  { x: 37, y: 94, w: 28, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_HEAD_P50: MaskZone[] = [
  { x: 53, y: 2, w: 21, h: 12, labelHint: 'Label atas' },
  { x: 68, y: 14, w: 25, h: 71, labelHint: 'Label CT sinus' },
  { x: 24, y: 87, w: 53, h: 7, labelHint: 'Keterangan gambar' },
];

const MASK_THORAX_P30: MaskZone[] = [
  { x: 11, y: 12, w: 79, h: 20, labelHint: 'Label anterior/superior' },
  { x: 10, y: 63, w: 72, h: 26, labelHint: 'Label posterior' },
  { x: 35, y: 90, w: 30, h: 5, labelHint: 'Keterangan gambar' },
];

const MASK_THORAX_P32: MaskZone[] = [
  { x: 15, y: 14, w: 68, h: 14, labelHint: 'Label anterior' },
  { x: 4, y: 31, w: 19, h: 42, labelHint: 'Label sisi kanan pasien' },
  { x: 75, y: 33, w: 21, h: 37, labelHint: 'Label sisi kiri pasien' },
  { x: 31, y: 74, w: 46, h: 16, labelHint: 'Label posterior & keterangan' },
];

const MASK_THORAX_P33: MaskZone[] = [
  { x: 29, y: 13, w: 44, h: 14, labelHint: 'Label anterior' },
  { x: 8, y: 24, w: 17, h: 46, labelHint: 'Label sisi kanan pasien' },
  { x: 70, y: 31, w: 19, h: 38, labelHint: 'Label sisi kiri pasien' },
  { x: 32, y: 71, w: 38, h: 17, labelHint: 'Label posterior & keterangan' },
];

const MASK_THORAX_P34: MaskZone[] = [
  { x: 16, y: 10, w: 69, h: 16, labelHint: 'Label anterior' },
  { x: 7, y: 29, w: 17, h: 47, labelHint: 'Label sisi kanan pasien' },
  { x: 74, y: 42, w: 19, h: 25, labelHint: 'Label sisi kiri pasien' },
  { x: 31, y: 74, w: 46, h: 17, labelHint: 'Label posterior & keterangan' },
];

const MASK_THORAX_P36: MaskZone[] = [
  { x: 30, y: 4, w: 55, h: 10, labelHint: 'Label anterior' },
  { x: 5, y: 17, w: 22, h: 61, labelHint: 'Label sisi kanan pasien' },
  { x: 72, y: 24, w: 22, h: 59, labelHint: 'Label sisi kiri pasien' },
  { x: 31, y: 83, w: 39, h: 12, labelHint: 'Label posterior & keterangan' },
];

const MASK_THORAX_P37: MaskZone[] = [
  { x: 14, y: 12, w: 12, h: 66, labelHint: 'Label CT kiri' },
  { x: 74, y: 12, w: 21, h: 65, labelHint: 'Label CT kanan' },
];

const MASK_THORAX_P43: MaskZone[] = [
  { x: 3, y: 18, w: 22, h: 46, labelHint: 'Label CT kanan pasien' },
  { x: 79, y: 21, w: 19, h: 42, labelHint: 'Label CT kiri pasien' },
];

const MASK_THORAX_P45: MaskZone[] = [
  { x: 9, y: 18, w: 23, h: 53, labelHint: 'Label CT kanan pasien' },
  { x: 76, y: 24, w: 18, h: 36, labelHint: 'Label CT kiri pasien' },
];

const MASK_ABDOMEN_P15: MaskZone[] = [
  { x: 18, y: 12, w: 66, h: 15, labelHint: 'Label anterior' },
  { x: 18, y: 36, w: 19, h: 42, labelHint: 'Label sisi kanan pasien' },
  { x: 70, y: 40, w: 17, h: 40, labelHint: 'Label sisi kiri pasien' },
  { x: 34, y: 82, w: 34, h: 13, labelHint: 'Label posterior & keterangan' },
];

const MASK_ABDOMEN_P16: MaskZone[] = [
  { x: 18, y: 9, w: 66, h: 14, labelHint: 'Label anterior' },
  { x: 13, y: 23, w: 18, h: 57, labelHint: 'Label sisi kanan pasien' },
  { x: 58, y: 32, w: 22, h: 51, labelHint: 'Label sisi kiri pasien' },
  { x: 33, y: 83, w: 34, h: 11, labelHint: 'Label posterior & keterangan' },
];

const MASK_ABDOMEN_P17: MaskZone[] = [
  { x: 20, y: 11, w: 58, h: 12, labelHint: 'Label anterior' },
  { x: 10, y: 23, w: 22, h: 66, labelHint: 'Label sisi kanan pasien' },
  { x: 56, y: 35, w: 28, h: 55, labelHint: 'Label sisi kiri pasien' },
  { x: 31, y: 87, w: 38, h: 10, labelHint: 'Label posterior & keterangan' },
];

const MASK_ABDOMEN_P18: MaskZone[] = [
  { x: 7, y: 13, w: 20, h: 49, labelHint: 'Label CT kiri' },
  { x: 77, y: 16, w: 18, h: 45, labelHint: 'Label CT kanan' },
  { x: 17, y: 84, w: 66, h: 7, labelHint: 'Keterangan gambar' },
];

const MASK_ABDOMEN_P19: MaskZone[] = [
  { x: 23, y: 14, w: 50, h: 14, labelHint: 'Label anterior' },
  { x: 17, y: 33, w: 20, h: 51, labelHint: 'Label sisi kanan pasien' },
  { x: 70, y: 22, w: 17, h: 58, labelHint: 'Label sisi kiri pasien' },
  { x: 38, y: 78, w: 31, h: 17, labelHint: 'Label posterior & keterangan' },
];

const MASK_ABDOMEN_P20: MaskZone[] = [
  { x: 13, y: 15, w: 58, h: 12, labelHint: 'Label CT anterior' },
  { x: 5, y: 43, w: 19, h: 31, labelHint: 'Label CT kanan pasien' },
  { x: 70, y: 26, w: 27, h: 38, labelHint: 'Label CT kiri pasien' },
  { x: 20, y: 77, w: 56, h: 17, labelHint: 'Label CT posterior & keterangan' },
];

const MASK_ABDOMEN_P21: MaskZone[] = [
  { x: 31, y: 12, w: 46, h: 13, labelHint: 'Label anterior' },
  { x: 13, y: 22, w: 20, h: 61, labelHint: 'Label sisi kanan pasien' },
  { x: 67, y: 24, w: 17, h: 54, labelHint: 'Label sisi kiri pasien' },
  { x: 31, y: 78, w: 38, h: 14, labelHint: 'Label posterior & keterangan' },
];

const MASK_ABDOMEN_P29: MaskZone[] = [
  { x: 12, y: 10, w: 17, h: 78, labelHint: 'Label koronal kanan pasien' },
  { x: 68, y: 11, w: 17, h: 76, labelHint: 'Label koronal kiri pasien' },
  { x: 34, y: 88, w: 31, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_ABDOMEN_P30: MaskZone[] = [
  { x: 24, y: 14, w: 38, h: 12, labelHint: 'Label CT superior' },
  { x: 61, y: 27, w: 17, h: 39, labelHint: 'Label CT lateral kiri' },
  { x: 24, y: 84, w: 50, h: 12, labelHint: 'Keterangan gambar' },
];

const MASK_ABDOMEN_P33: MaskZone[] = [
  { x: 13, y: 17, w: 14, h: 59, labelHint: 'Label CT kanan pasien' },
  { x: 69, y: 26, w: 12, h: 42, labelHint: 'Label CT kiri pasien' },
  { x: 29, y: 81, w: 42, h: 6, labelHint: 'Keterangan gambar' },
];

const MASK_ABDOMEN_P38: MaskZone[] = [
  { x: 38, y: 8, w: 36, h: 11, labelHint: 'Label superior' },
  { x: 17, y: 21, w: 18, h: 66, labelHint: 'Label anterior' },
  { x: 62, y: 22, w: 22, h: 66, labelHint: 'Label posterior' },
  { x: 37, y: 89, w: 26, h: 5, labelHint: 'Keterangan gambar' },
];

const MASK_ABDOMEN_P44: MaskZone[] = [
  { x: 49, y: 22, w: 19, h: 43, labelHint: 'Label CT pelvis' },
  { x: 69, y: 45, w: 27, h: 10, labelHint: 'Keterangan gambar' },
];

const MASK_KARDIO_QUIZ_RUANG: MaskZone[] = [
  { x: 0, y: 18, w: 31, h: 72, labelHint: 'Label sisi kiri gambar' },
  { x: 24, y: 2, w: 48, h: 18, labelHint: 'Label bagian atas' },
  { x: 68, y: 22, w: 32, h: 76, labelHint: 'Label sisi kanan gambar' },
  { x: 34, y: 92, w: 26, h: 8, labelHint: 'Label bawah' },
];

const MASK_URINARI_1TO4: MaskZone[] = [
  { x: 6, y: 24, w: 20, h: 26, labelHint: 'Kunci jawaban 1–4 disembunyikan' },
];

const MASK_NAPAS_HILUM: MaskZone[] = [
  { x: 2, y: 15, w: 24, h: 54, labelHint: 'Lobus paru kanan' },
  { x: 7, y: 30, w: 20, h: 26, labelHint: 'Fisura paru kanan' },
  { x: 37, y: 12, w: 35, h: 12, labelHint: 'Trakea & apeks' },
  { x: 47, y: 54, w: 12, h: 10, labelHint: 'Cardiac notch' },
  { x: 42, y: 74, w: 18, h: 7, labelHint: 'Diafragma' },
  { x: 72, y: 15, w: 27, h: 54, labelHint: 'Lobus paru kiri' },
  { x: 84, y: 48, w: 15, h: 11, labelHint: 'Fisura paru kiri' },
  { x: 71, y: 77, w: 12, h: 7, labelHint: 'Basis paru' },
  { x: 0, y: 80, w: 46, h: 19, labelHint: 'Lapisan pleura' },
];

const MASK_NAPAS_BRONKUS: MaskZone[] = [
  { x: 42, y: 4, w: 13, h: 16, labelHint: 'Laring & trakea' },
  { x: 0, y: 20, w: 17, h: 73, labelHint: 'Label sisi kanan pasien' },
  { x: 52, y: 22, w: 30, h: 72, labelHint: 'Label sisi kiri pasien' },
  { x: 30, y: 86, w: 14, h: 7, labelHint: 'Lekuk jantung' },
  { x: 81, y: 1, w: 19, h: 49, labelHint: 'Kotak alur percabangan' },
];

export const QUESTION_BANK: QuestionItem[] = [
  // =========================================================================
  // 1. CROSSEC-HEAD (14 Soal, Dosen 1)
  // =========================================================================
  {
    id: 'q-head-01',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Ventrikel Lateralis (Skematik)',
    question:
      'Pada potongan aksial kepala setinggi ventrikel lateralis berikut, struktur sekat tipis di garis tengah yang memisahkan kedua rongga ventrikel lateralis serta lipatan dura mater vertikal yang memisahkan kedua hemisfer cerebri berturut-turut adalah...',
    imageUrl: '/assets/crossec/head/head-p34.webp',
    crossecId: 'head-p34',
    maskZones: MASK_HEAD_P34,
    options: [
      'Septum pellucidum dan Falx cerebri',
      'Corpus callosum splenium dan Tentorium cerebelli',
      'Thalamus dan Falx cerebelli',
      'Fornix dan Sinus rectus',
    ],
    correctIndex: 0,
    explanation:
      'Pada potongan aksial setinggi ventrikel lateralis (FIG. 5-28), Septum pellucidum adalah membran vertikal di garis tengah di antara kedua ventrikel lateralis, sedangkan Falx cerebri masuk ke fisura longitudinalis di anterior dan posterior.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 34 (FIG. 5-28)',
  },
  {
    id: 'q-head-02',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Ventrikel Lateralis (Skematik)',
    question:
      'Masih pada potongan aksial setinggi ventrikel lateralis berikut, bagian substansia alba komisura besar yang melengkung di ujung **anterior** dan **posterior** di antara kedua ventrikel lateralis adalah...',
    imageUrl: '/assets/crossec/head/head-p34.webp',
    crossecId: 'head-p34',
    maskZones: MASK_HEAD_P34,
    options: [
      'Nucleus caudatus (anterior) dan Putamen (posterior)',
      'Capsula interna (anterior) dan Capsula externa (posterior)',
      'Genu (anterior) dan Splenium (posterior) corpus callosum',
      'Sinus sagitalis inferior (anterior) dan Sinus rektus (posterior)',
    ],
    correctIndex: 2,
    explanation:
      'Pada bagian depan kedua ventrikel lateralis tampak genu corpus callosum, sementara di bagian belakang tampak splenium corpus callosum.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 34 (FIG. 5-28)',
  },
  {
    id: 'q-head-03',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Axial MRI Ventrikel Lateralis',
    question:
      'Pada citra MRI aksial T1 berikut, ruang hitam (hipointens berisi LCS) berbentuk sepasang huruf C simetris di bagian tengah hemisfer serebri adalah...',
    imageUrl: '/assets/crossec/head/head-p35.webp',
    crossecId: 'head-p35',
    maskZones: MASK_HEAD_P35,
    options: [
      'Ventriculus tertius (III)',
      'Cisterna superior',
      'Ventriculus quartus (IV)',
      'Ventriculus lateralis (Lateral ventricles)',
    ],
    correctIndex: 3,
    explanation:
      'Citra MRI aksial (FIG. 5-29) menunjukkan badan dan kornu kedua ventrikel lateralis berwarna gelap (hipointens) yang dipisahkan oleh septum pellucidum.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 35 (FIG. 5-29)',
  },
  {
    id: 'q-head-04',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Axial MRI Ventrikel Lateralis',
    question:
      'Pada citra MRI aksial setinggi ventrikel lateralis berikut, struktur sinus vena dural yang tampak pada tepi bebas posterior falx cerebri (di anterior splenium) vs yang berada tepat di garis tengah kubah tengkorak anterior adalah...',
    imageUrl: '/assets/crossec/head/head-p35.webp',
    crossecId: 'head-p35',
    maskZones: MASK_HEAD_P35,
    options: [
      'Sinus transversus dan Sinus sigmoideus',
      'Inferior sagittal sinus dan Superior sagittal sinus',
      'Sinus cavernosus dan Sinus petrosus superior',
      'Vena cerebri magna dan Confluens sinuum',
    ],
    correctIndex: 1,
    explanation:
      'Pada FIG. 5-29, ujung paling anterior di garis tengah menunjuk ke Superior sagittal sinus, sedangkan bagian inferior di tepi falx cerebri menunjuk ke Inferior sagittal sinus.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 35 (FIG. 5-29)',
  },
  {
    id: 'q-head-05',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Ganglia Basalis (Skematik)',
    question:
      'Pada potongan aksial setinggi ganglia basalis berikut, urutan nukleus grisea dalam dari **lateral ke medial** (di sebelah medial korteks insula dan kapsula eksterna) hingga berbatasan dengan kapsula interna adalah...',
    imageUrl: '/assets/crossec/head/head-p36.webp',
    crossecId: 'head-p36',
    maskZones: MASK_HEAD_P36,
    options: [
      'Thalamus → Globus pallidus → Putamen',
      'Nucleus caudatus → Claustrum → Insula',
      'Putamen → Globus pallidus → Capsula interna / Thalamus',
      'Fornix → Putamen → Claustrum',
    ],
    correctIndex: 2,
    explanation:
      'Pada FIG. 5-30 tampak urutan dari luar ke dalam di sebelah medial korteks insula: capsula extrema → claustrum → capsula externa → putamen → globus pallidus → capsula interna → thalamus.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 36 (FIG. 5-30)',
  },
  {
    id: 'q-head-06',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Ganglia Basalis (Skematik)',
    question:
      'Pada potongan aksial setinggi ganglia basalis berikut, rongga sempit di garis tengah yang diapit oleh thalamus kanan dan kiri serta berisi cairan serebrospinal adalah...',
    imageUrl: '/assets/crossec/head/head-p36.webp',
    crossecId: 'head-p36',
    maskZones: MASK_HEAD_P36,
    options: [
      'Third ventricle (Ventrikel III)',
      'Cerebral aqueduct',
      'Fourth ventricle',
      'Frontal sinus',
    ],
    correctIndex: 0,
    explanation:
      'Third ventricle (Ventrikel III) adalah celah sempit di garis tengah di antara kedua thalamus, berhubungan ke anterior dengan ventrikel lateralis via foramen interventrikular.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 36 (FIG. 5-30)',
  },
  {
    id: 'q-head-07',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Axial MRI Ventrikel & Thalamus',
    question:
      'Pada citra MRI aksial berikut, massa abu-abu berbentuk oval berpasangan yang mengapit celah ventrikel III di bagian tengah-posterior dan berperan sebagai stasiun pemancar sensorik adalah...',
    imageUrl: '/assets/crossec/head/head-p37.webp',
    crossecId: 'head-p37',
    maskZones: MASK_HEAD_P37,
    options: [
      'Caudate nucleus (caput)',
      'Thalamus',
      'Septum pellucidum',
      'Genu corpus callosum',
    ],
    correctIndex: 1,
    explanation:
      'Pada FIG. 5-31, Thalamus tampak sebagai massa jaringan kelabu berpasangan di sisi kanan dan kiri Third ventricle, sedangkan caput caudate nucleus menonjol di dinding lateral kornu anterior.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 37 (FIG. 5-31)',
  },
  {
    id: 'q-head-08',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Midbrain (Mesencephalon)',
    question:
      'Pada potongan aksial setinggi mesencephalon (otak tengah) berikut, pita berpigmen gelap melengkung di bagian anterior tangkai otak (pedunculus cerebri) serta saluran sempit di tengah tegmentum berturut-turut adalah...',
    imageUrl: '/assets/crossec/head/head-p39.webp',
    crossecId: 'head-p39',
    maskZones: MASK_HEAD_P39,
    options: [
      'Tentorium cerebelli dan Cisterna pontis',
      'Corpora quadrigemina dan Fourth ventricle',
      'Mammillary bodies dan Interventricular foramen',
      'Substantia nigra dan Cerebral aqueduct (of Sylvius)',
    ],
    correctIndex: 3,
    explanation:
      'Potongan mesencephalon (FIG. 5-34) mudah dikenali dari bentuk "Mickey Mouse": pedunculus cerebri di anterior, pita berpigmen Substantia nigra, serta saluran kecil Cerebral aqueduct (of Sylvius) di tengah.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 39 (FIG. 5-34)',
  },
  {
    id: 'q-head-09',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Midbrain (Mesencephalon)',
    question:
      'Pada potongan aksial setinggi mesencephalon berikut, sepasang struktur bulat kecil berwarna gelap tepat di garis tengah di dalam sisterna interpedunkularis (anterior dari pedunculus cerebri) adalah...',
    imageUrl: '/assets/crossec/head/head-p39.webp',
    crossecId: 'head-p39',
    maskZones: MASK_HEAD_P39,
    options: [
      'Optic chiasma',
      'Pineal gland',
      'Pituitary gland',
      'Mammillary bodies',
    ],
    correctIndex: 3,
    explanation:
      'Pada FIG. 5-34 tampak sepasang tonjolan bulat di garis tengah tepat di depan fossa/cisterna interpedunkularis, yaitu Mammillary bodies.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 39 (FIG. 5-34)',
  },
  {
    id: 'q-head-10',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Pons',
    question:
      'Pada potongan aksial setinggi pons berikut, pembuluh arteri tunggal di depan pons di dalam sisterna pontis serta pembuluh berpasangan yang mengapit kelenjar hipofisis (pituitary gland) di sela tursika adalah...',
    imageUrl: '/assets/crossec/head/head-p41.webp',
    crossecId: 'head-p41',
    maskZones: MASK_HEAD_P41,
    options: [
      'Middle cerebral artery dan Vertebral artery',
      'Basilar artery dan Internal carotid artery',
      'Anterior cerebral artery dan External carotid artery',
      'Posterior cerebral artery dan Sigmoid sinus',
    ],
    correctIndex: 1,
    explanation:
      'Pada potongan setinggi pons (FIG. 5-36), Basilar artery terletak di garis tengah di dalam pontine cistern tepat di depan pons, sedangkan sepasang Internal carotid artery tampak di kanan-kiri pituitary gland.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 41 (FIG. 5-36)',
  },
  {
    id: 'q-head-11',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Potongan Transversal Pons',
    question:
      'Masih pada potongan setinggi pons berikut, saraf kranial besar yang terlihat keluar langsung dari aspek anterolateral pons menuju fossa kranii media adalah...',
    imageUrl: '/assets/crossec/head/head-p41.webp',
    crossecId: 'head-p41',
    maskZones: MASK_HEAD_P41,
    options: [
      'Trigeminal nerve (CN V)',
      'Optic nerve (CN II)',
      'Vagus nerve (CN X)',
      'Hypoglossal nerve (CN XII)',
    ],
    correctIndex: 0,
    explanation:
      'CN V (Trigeminal nerve) keluar dari aspek lateral pons dan tampak jelas pada potongan transversal melalui pons (FIG. 5-36).',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 41 (FIG. 5-36)',
  },
  {
    id: 'q-head-12',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Axial CT Orbita',
    question:
      'Pada citra CT aksial setinggi orbita berikut, struktur otot yang melekat di sisi **medial** bola mata (sejajar sel udara sinus etmoidalis) dan struktur saraf sentral di belakang bola mata menuju apeks orbita adalah...',
    imageUrl: '/assets/crossec/head/head-p42.webp',
    crossecId: 'head-p42',
    maskZones: MASK_HEAD_P42,
    options: [
      'Lateral rectus muscle dan Trigeminal nerve',
      'Temporalis muscle dan Facial nerve',
      'Medial rectus muscle dan Optic nerve',
      'Levator palpebrae muscle dan Trochlear nerve',
    ],
    correctIndex: 2,
    explanation:
      'Pada CT orbita aksial (FIG. 5-38), Medial rectus muscle berjalan di dinding medial orbita bersebelahan dengan ethmoidal sinus, sedangkan Optic nerve tampak memanjang di tengah lemak retrobulbar.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 42 (FIG. 5-38)',
  },
  {
    id: 'q-head-13',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Midsagittal MRI Otak',
    question:
      'Pada citra MRI sagital tengah (midsagittal) berikut, bagian batang otak yang tampak menonjol cembung ke arah anterior di antara mesencephalon (superior) dan medula oblongata (inferior) adalah...',
    imageUrl: '/assets/crossec/head/head-p45.webp',
    crossecId: 'head-p45',
    maskZones: MASK_HEAD_P45,
    options: [
      'Thalamus',
      'Pons',
      'Corpus callosum splenium',
      'Hypothalamus',
    ],
    correctIndex: 1,
    explanation:
      'Pons tampak khas berbentuk perut menonjol ke anterior pada potongan midsagittal (FIG. 5-45), di antara cerebral peduncle/midbrain di atas dan medulla oblongata di bawah.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 45 (FIG. 5-45)',
  },
  {
    id: 'q-head-14',
    dosen: 1,
    topic: 'crossec-head',
    subtopic: 'Coronal CT Sinus Paranasal & Kavum Nasi',
    question:
      'Pada citra CT koronal rongga hidung berikut, rongga udara (hipodens/hitam) besar berpasangan di dalam tulang pipi (lateral dinding hidung) dan tonjolan konka paling bawah di dinding lateral kavum nasi berturut-turut adalah...',
    imageUrl: '/assets/crossec/head/head-p50.webp',
    crossecId: 'head-p50',
    maskZones: MASK_HEAD_P50,
    options: [
      'Sphenoid sinus dan Superior nasal concha',
      'Ethmoid air cells dan Nasal septum',
      'Frontal sinus dan Middle nasal concha',
      'Maxillary sinus dan Inferior nasal concha',
    ],
    correctIndex: 3,
    explanation:
      'Pada CT koronal kavum nasi (FIG. 5-49), Maxillary sinus adalah rongga udara piramidal terbesar di kanan-kiri rongga hidung, sedangkan gulungan tulang paling bawah di dinding lateral adalah Inferior nasal concha.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 50 (FIG. 5-49)',
  },

  // =========================================================================
  // 2. CROSSEC-THORAX (14 Soal, Dosen 1)
  // =========================================================================
  {
    id: 'q-thorax-01',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Thoracic Inlet (Pintu Atas Dada)',
    question:
      'Pada potongan aksial melalui thoracic inlet (pintu atas toraks) berikut, urutan struktur garis tengah dari **anterior ke posterior** di depan korpus vertebra adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p30.webp',
    crossecId: 'thorax-p30',
    maskZones: MASK_THORAX_P30,
    options: [
      'Esophagus → Trachea → Thyroid gland',
      'Trachea → Brachial plexus → Thyroid gland',
      'Thyroid gland → Trachea → Esophagus',
      'Clavicle → Esophagus → Trachea',
    ],
    correctIndex: 2,
    explanation:
      'Pada FIG. 2-16, kelenjar tiroid membungkus bagian anterior/lateral trakea, disusul Trachea berbentuk huruf C, dan tepat di belakangnya (anterior korpus vertebra) terdapat Esophagus.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 30 (FIG. 2-16)',
  },
  {
    id: 'q-thorax-02',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Thoracic Inlet (Pintu Atas Dada)',
    question:
      'Pada potongan thoracic inlet yang sama, kumpulan serabut saraf berwarna gelap yang berjalan berjajar di antara otot skalenus anterior dan skalenus media/posterior menuju aksila adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p30.webp',
    crossecId: 'thorax-p30',
    maskZones: MASK_THORAX_P30,
    options: [
      'Brachial plexus (Pleksus brakialis)',
      'Nervus vagus',
      'Ductus thoracicus',
      'Truncus sympathicus',
    ],
    correctIndex: 0,
    explanation:
      'Brachial plexus tampak sebagai deretan berkas gelap di celah interskalenus pada potongan thoracic inlet (FIG. 2-16).',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 30 (FIG. 2-16)',
  },
  {
    id: 'q-thorax-03',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Transverse Section Aortic Arch (Level T4)',
    question:
      'Pada potongan aksial toraks setinggi vertebra T4 berikut, pembuluh vena yang melintang dari kiri ke kanan di belakang manubrium sterni untuk bergabung dengan vena sisi kanan adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p32.webp',
    crossecId: 'thorax-p32',
    maskZones: MASK_THORAX_P32,
    options: [
      'Left brachiocephalic vein',
      'Azygos vein',
      'Superior vena cava',
      'Left pulmonary vein',
    ],
    correctIndex: 0,
    explanation:
      'Pada potongan setinggi arkus aorta/T4 (FIG. 2-21), Left brachiocephalic vein berjalan miring melintang dari kiri ke kanan tepat di posterior manubrium sterni.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 32 (FIG. 2-21)',
  },
  {
    id: 'q-thorax-04',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Transverse Section Aortic Arch (Level T4)',
    question:
      'Pada potongan setinggi T4 berikut, tiga pembuluh arteri besar yang tampak berjajar dari **kanan (anterior) ke kiri (posterior)** di sebelah kiri garis tengah berasal dari arkus aorta, yaitu...',
    imageUrl: '/assets/crossec/thorax/thorax-p32.webp',
    crossecId: 'thorax-p32',
    maskZones: MASK_THORAX_P32,
    options: [
      'Ascending aorta, Pulmonary trunk, Descending aorta',
      'Right subclavian artery, Azygos vein, Esophagus',
      'Brachiocephalic artery, Left common carotid artery, Left subclavian artery',
      'Right coronary artery, Left anterior descending, Circumflex artery',
    ],
    correctIndex: 2,
    explanation:
      'Urutan cabang arkus aorta dari anterior-kanan ke posterior-kiri pada FIG. 2-21 adalah Brachiocephalic artery → Left common carotid artery → Left subclavian artery.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 32 (FIG. 2-21)',
  },
  {
    id: 'q-thorax-05',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Transverse Section Sternal Angle (Level T5)',
    question:
      'Pada potongan aksial setinggi sudut sternum (sternal angle / T5) berikut, trakea telah bercabang menjadi bronkus utama kanan dan kiri. Di sisi kanan-posterior korpus vertebra T5 (bersebelahan dengan esofagus) tampak pembuluh vena kecil yaitu...',
    imageUrl: '/assets/crossec/thorax/thorax-p33.webp',
    crossecId: 'thorax-p33',
    maskZones: MASK_THORAX_P33,
    options: [
      'Hemiazygos vein',
      'Coronary sinus',
      'Right pulmonary vein',
      'Azygos vein',
    ],
    correctIndex: 3,
    explanation:
      'Pada FIG. 2-23 (level T5), Azygos vein terlihat di sisi kanan anterolateral vertebra T5 dan di posterior bronkus kanan; sementara Descending aorta berada di sisi kiri vertebra.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 33 (FIG. 2-23)',
  },
  {
    id: 'q-thorax-06',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Transverse Section Sternal Angle (Level T5)',
    question:
      'Masih pada potongan setinggi T5 berikut, pembuluh besar berpenampang bundar paling anterior tepat di sebelah kanan garis tengah (di sebelah kanan Ascending aorta) adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p33.webp',
    crossecId: 'thorax-p33',
    maskZones: MASK_THORAX_P33,
    options: [
      'Pulmonary trunk',
      'Superior vena cava',
      'Descending aorta',
      'Brachiocephalic artery',
    ],
    correctIndex: 1,
    explanation:
      'Pada level T5 (FIG. 2-23), Superior vena cava berada tepat di sebelah kanan Ascending aorta dan di anterior Right bronchus.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 33 (FIG. 2-23)',
  },
  {
    id: 'q-thorax-07',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Transverse Section Pulmonary Trunk',
    question:
      'Pada potongan aksial setinggi trunkus pulmonalis berikut, pembuluh besar yang melintang ke sisi kanan melewati bagian belakang Ascending aorta dan Superior vena cava adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p34.webp',
    crossecId: 'thorax-p34',
    maskZones: MASK_THORAX_P34,
    options: [
      'Thoracic duct',
      'Left brachiocephalic vein',
      'Right pulmonary artery',
      'Azygos arch',
    ],
    correctIndex: 2,
    explanation:
      'Pada FIG. 2-25, Pulmonary trunk bercabang di sisi kiri garis tengah menjadi Left pulmonary artery dan Right pulmonary artery yang berjalan melintas ke kanan di belakang Ascending aorta serta SVC.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 34 (FIG. 2-25)',
  },
  {
    id: 'q-thorax-08',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Transverse Section Pulmonary Trunk',
    question:
      'Pada potongan aksial yang sama, saluran limfe kecil tepat di depan korpus vertebra (di antara Azygos vein di kanan dan Esophagus/Descending aorta di kiri) adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p34.webp',
    crossecId: 'thorax-p34',
    maskZones: MASK_THORAX_P34,
    options: [
      'Thoracic duct',
      'Right vagus nerve',
      'Coronary sinus',
      'Phrenic nerve',
    ],
    correctIndex: 0,
    explanation:
      'Thoracic duct berjalan naik di mediastinum posterior tepat di depan badan vertebra torakal, diapit azygos vein di kanan dan aorta desendens/esofagus di kiri (FIG. 2-25).',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 34 (FIG. 2-25)',
  },
  {
    id: 'q-thorax-09',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Potongan Transversal Ruang Jantung (Skematik)',
    question:
      'Pada potongan aksial melalui keempat ruang jantung berikut, ruang jantung yang letaknya paling **posterior** (berhadapan langsung dengan esofagus dan aorta desendens) adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p36.webp',
    crossecId: 'thorax-p36',
    maskZones: MASK_THORAX_P36,
    options: [
      'Right ventricle',
      'Left atrium',
      'Right atrium',
      'Left ventricle',
    ],
    correctIndex: 1,
    explanation:
      'Pada citra aksial toraks (FIG. 2-29), Left atrium adalah ruang jantung paling posterior yang menerima vena pulmonalis dan berbatasan langsung di belakangnya dengan esophagus serta descending aorta.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 36 (FIG. 2-29)',
  },
  {
    id: 'q-thorax-10',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Potongan Transversal Ruang Jantung (Skematik)',
    question:
      'Masih pada potongan ruang jantung berikut, ruang yang letaknya paling **anterior** (tepat di belakang sternum) dan saluran vena besar di sulkus posterior di antara atrium kiri dan ventrikel kiri berturut-turut adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p36.webp',
    crossecId: 'thorax-p36',
    maskZones: MASK_THORAX_P36,
    options: [
      'Left ventricle dan Pulmonary trunk',
      'Left atrium dan Azygos vein',
      'Right atrium dan Thoracic duct',
      'Right ventricle dan Coronary sinus',
    ],
    correctIndex: 3,
    explanation:
      'Right ventricle adalah ruang jantung paling anterior tepat di belakang sternum, sedangkan Coronary sinus berjalan di sulkus atrioventrikularis posterior kiri sebelum bermuara ke atrium kanan.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 36 (FIG. 2-29)',
  },
  {
    id: 'q-thorax-11',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Axial CT Ruang Jantung',
    question:
      'Pada citra CT aksial jantung berikut, ruang jantung dengan dinding miokardium paling tebal yang berada di sisi kiri-lateral (sebelah kanan tampilan gambar) adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p37.webp',
    crossecId: 'thorax-p37',
    maskZones: MASK_THORAX_P37,
    options: [
      'Right atrium',
      'Right ventricle',
      'Left atrium',
      'Left ventricle',
    ],
    correctIndex: 3,
    explanation:
      'Pada potongan aksial standar radiologi (FIG. 2-30 / thorax-p37), sisi kiri pasien berada di kanan layar; Left ventricle terlihat memiliki dinding otot paling tebal dipisahkan oleh septum interventrikulare dari Right ventricle.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 37',
  },
  {
    id: 'q-thorax-12',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Axial CT Ruang Jantung',
    question:
      'Pada citra CT aksial jantung yang sama, struktur pembuluh arteri bundar tepat di anterior-kiri korpus vertebra torakal (di belakang atrium kiri) adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p37.webp',
    crossecId: 'thorax-p37',
    maskZones: MASK_THORAX_P37,
    options: [
      'Ascending aorta',
      'Descending aorta',
      'Superior vena cava',
      'Pulmonary trunk',
    ],
    correctIndex: 1,
    explanation:
      'Descending aorta tampak sebagai penampang bundar di mediastinum posterior tepat di sisi anterior-kiri korpus vertebra di belakang left atrium.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 37',
  },
  {
    id: 'q-thorax-13',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Coronal CT Left Atrium & Carina',
    question:
      'Pada citra CT koronal toraks berikut, titik percabangan trakea menjadi bronkus utama kanan dan kiri serta struktur pembuluh bundar terang (berisi kontras) tepat di atas arteri pulmonalis kiri adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p43.webp',
    crossecId: 'thorax-p43',
    maskZones: MASK_THORAX_P43,
    options: [
      'Carina dan Arch of aorta (Aorta, arch)',
      'Glottis dan Superior vena cava',
      'Bronchus lobaris dan Descending aorta',
      'Hilum dan Right brachiocephalic vein',
    ],
    correctIndex: 0,
    explanation:
      'Pada CT koronal (thorax-p43), titik bifurkasio trakea disebut Carina, sementara pembuluh bundar superior-kiri di atas Left pulmonary artery adalah penampang Arch of aorta.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 43',
  },
  {
    id: 'q-thorax-14',
    dosen: 1,
    topic: 'crossec-thorax',
    subtopic: 'Coronal CT Right Atrium & Left Ventricle',
    question:
      'Pada citra CT koronal toraks dengan kontras berikut, ruang jantung kanan bawah tempat bermuaranya Superior vena cava dan pembuluh aorta vertikal paling awal keluar dari ventrikel kiri adalah...',
    imageUrl: '/assets/crossec/thorax/thorax-p45.webp',
    crossecId: 'thorax-p45',
    maskZones: MASK_THORAX_P45,
    options: [
      'Right ventricle dan Pulmonary trunk',
      'Left atrium dan Descending aorta',
      'Right atrium dan Ascending aorta',
      'Left ventricle dan Right brachiocephalic vein',
    ],
    correctIndex: 2,
    explanation:
      'Pada CT koronal anterior ini (thorax-p45), Superior vena cava turun vertikal di sisi kanan menuju Right atrium, tepat di sebelah kanan pangkal Ascending aorta yang keluar dari Left ventricle.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 45',
  },

  // =========================================================================
  // 3. CROSSEC-ABDOMEN (18 Soal lintas 12 level berbeda, Dosen 1)
  // =========================================================================
  {
    id: 'q-abdomen-01',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Level T9 (Upper Abdomen)',
    question:
      'Pada potongan aksial abdomen atas setinggi vertebra T9 berikut, tiga pembuluh yang terlihat bermuara dari parenkim hati ke dalam Inferior vena cava (di antara lobus kanan dan kiri hati) adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p15.webp',
    crossecId: 'abdomen-p15',
    maskZones: MASK_ABDOMEN_P15,
    options: [
      'Vena porta hepatis (cabang kanan & kiri)',
      'Right dan Left hepatic veins (Vena hepatika)',
      'Hepatic arteries',
      'Bile ducts',
    ],
    correctIndex: 1,
    explanation:
      'Pada potongan setinggi T9 (FIG. 3-23), bagian superior hati terlihat dekat kubah diafragma dengan Right hepatic vein dan Left hepatic vein bermuara langsung ke Inferior vena cava.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 15 (FIG. 3-23)',
  },
  {
    id: 'q-abdomen-02',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Level T9 (Upper Abdomen)',
    question:
      'Pada potongan aksial level T9 yang sama, struktur rongga besar di kuadran kiri atas (berbatasan dengan miokardium ventrikel kiri di anterior dan paru kiri di posterolateral) adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p15.webp',
    crossecId: 'abdomen-p15',
    maskZones: MASK_ABDOMEN_P15,
    options: [
      'Spleen (Limpa)',
      'Left kidney',
      'Transverse colon',
      'Fundus of stomach (Fundus lambung)',
    ],
    correctIndex: 3,
    explanation:
      'Di kuadran kiri atas pada level T9 (FIG. 3-23) tampak Fundus of stomach tepat di bawah hemidiafragma kiri dan berbatasan anteromedial dengan esofagus abdominal.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 15 (FIG. 3-23)',
  },
  {
    id: 'q-abdomen-03',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Level T10',
    question:
      'Pada potongan aksial setinggi vertebra T10 berikut, celah ligamen fibrosa yang memisahkan lobus kaudatus dari lobus kiri hati serta organ padat berbentuk bulan sabit di posterolateral lambung berturut-turut adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p16.webp',
    crossecId: 'abdomen-p16',
    maskZones: MASK_ABDOMEN_P16,
    options: [
      'Falciform ligament dan Left kidney',
      'Ligamentum teres dan Pancreas',
      'Ligamentum venosum dan Spleen (Limpa)',
      'Bare area dan Adrenal gland',
    ],
    correctIndex: 2,
    explanation:
      'Pada level T10 (FIG. 3-25), Ligamentum venosum menjadi batas antara lobus kaudatus dan lobus kiri hati, sementara di sisi posterolateral gaster muncul Spleen (limpa).',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 16 (FIG. 3-25)',
  },
  {
    id: 'q-abdomen-04',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Level T10',
    question:
      'Masih pada potongan setinggi T10 berikut, lipatan peritoneum yang menghubungkan permukaan anterior hati ke dinding abdomen anterior (memisahkan lobus kanan dan kiri secara anatomis) adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p16.webp',
    crossecId: 'abdomen-p16',
    maskZones: MASK_ABDOMEN_P16,
    options: [
      'Falciform ligament',
      'Ligamentum venosum',
      'Mesocolon',
      'Bare area',
    ],
    correctIndex: 0,
    explanation:
      'Falciform ligament terlihat di bagian paling anterior memisahkan lobus kiri dan lobus kanan hati serta melekat ke dinding anterior abdomen (FIG. 3-25).',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 16 (FIG. 3-25)',
  },
  {
    id: 'q-abdomen-05',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Porta Hepatis (Level T11)',
    question:
      'Pada potongan aksial setinggi porta hepatis (T11) berikut, ketiga struktur utama triad porta yang tampak di celah porta hepatis (dengan lumen besar di posteriornya dan dua lumen lebih kecil di anteriornya) adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p17.webp',
    crossecId: 'abdomen-p17',
    maskZones: MASK_ABDOMEN_P17,
    options: [
      'Hepatic portal vein, Hepatic arteries, dan Hepatic ducts',
      'Inferior vena cava, Abdominal aorta, dan Thoracic duct',
      'Superior mesenteric vein, Renal artery, dan Ureter',
      'Splenic vein, Left gastric artery, dan Cystic duct',
    ],
    correctIndex: 0,
    explanation:
      'Triad porta pada FIG. 3-27 terdiri atas Hepatic portal vein (lumen paling besar), Hepatic arteries, dan Hepatic ducts.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 17 (FIG. 3-27)',
  },
  {
    id: 'q-abdomen-06',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Porta Hepatis (Level T11)',
    question:
      'Pada potongan setinggi T11 yang sama, sepasang kelenjar endokrin kecil di ruang perirenal kanan-kiri vertebra (kelenjar kanan tepat di belakang Inferior vena cava) adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p17.webp',
    crossecId: 'abdomen-p17',
    maskZones: MASK_ABDOMEN_P17,
    options: [
      'Right & Left Kidneys (Kutub bawah)',
      'Caudate lobe & Pancreas',
      'Right & Left Suprarenal (Adrenal) glands',
      'Lymph nodes & Psoas major',
    ],
    correctIndex: 2,
    explanation:
      'Pada level T11 (FIG. 3-27), kelenjar adrenal kanan dan kiri (Right & Left suprarenal glands) tampak di medial ruang lemak perirenal sebelum ginjal muncul penuh; kelenjar kanan khas berada tepat di posterior IVC.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 17 (FIG. 3-27)',
  },
  {
    id: 'q-abdomen-07',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'CT Aksial Porta Hepatis & Suprarenal (Level T11)',
    question:
      'Pada citra CT aksial abdomen level T11 berikut, struktur vena besar di posterior porta hepatis dan tepat di anterior kelenjar suprarenal kanan adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p18.webp',
    crossecId: 'abdomen-p18',
    maskZones: MASK_ABDOMEN_P18,
    options: [
      'Splenic vein',
      'Superior mesenteric vein',
      'Left renal vein',
      'Inferior vena cava',
    ],
    correctIndex: 3,
    explanation:
      'Pada CT level T11 (FIG. 3-28), Inferior vena cava tampak di antara parenkim hati (anterior) dan kelenjar suprarenal kanan (posterior), sebelah kanan korpus vertebra T11 dan Aorta.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 18 (FIG. 3-28)',
  },
  {
    id: 'q-abdomen-08',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'CT Aksial Porta Hepatis & Suprarenal (Level T11)',
    question:
      'Masih pada citra CT level T11 berikut, organ kelenjar yang tampak memanjang ke arah kiri di antara gaster (anterior) dan aorta/ginjal kiri, serta organ homogen paling lateral di kuadran kiri atas berturut-turut adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p18.webp',
    crossecId: 'abdomen-p18',
    maskZones: MASK_ABDOMEN_P18,
    options: [
      'Duodenum dan Descending colon',
      'Pancreas dan Spleen (Limpa)',
      'Gallbladder dan Stomach',
      'Right suprarenal gland dan Liver',
    ],
    correctIndex: 1,
    explanation:
      'Pada FIG. 3-28, korpus/ekor Pancreas tampak di retroperitoneum anterior aorta mengarah ke hilum Spleen yang berada di sisi lateral kiri.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 18 (FIG. 3-28)',
  },
  {
    id: 'q-abdomen-09',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Level L1/L2 (Ginjal & Vena Renalis)',
    question:
      'Pada potongan aksial setinggi L1/L2 berikut, pembuluh vena panjang dari ginjal kiri yang melintas secara horizontal ke kanan melalui celah **di antara Superior mesenteric artery dan Abdominal aorta** untuk bermuara ke IVC adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p19.webp',
    crossecId: 'abdomen-p19',
    maskZones: MASK_ABDOMEN_P19,
    options: [
      'Splenic vein',
      'Portal vein',
      'Left renal vein',
      'Left gonadal vein',
    ],
    correctIndex: 2,
    explanation:
      'Ciri khas anatomis potongan level L1/L2 (FIG. 3-31) adalah Left renal vein yang melintas ke kanan tepat di anterior Abdominal aorta dan di posterior Superior mesenteric artery ("nutcracker angle") menuju IVC.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 19 (FIG. 3-31)',
  },
  {
    id: 'q-abdomen-10',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Level L1/L2 (Ginjal & Vena Renalis)',
    question:
      'Pada potongan level L1/L2 yang sama, pembuluh vena yang berjalan tepat di sisi posterior korpus dan ekor pankreas menuju pembentukan vena porta adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p19.webp',
    crossecId: 'abdomen-p19',
    maskZones: MASK_ABDOMEN_P19,
    options: [
      'Splenic vein',
      'Inferior mesenteric vein',
      'Right renal vein',
      'Gastroduodenal artery',
    ],
    correctIndex: 0,
    explanation:
      'Splenic vein berjalan dari limpa sepanjang aspek posterior pankreas untuk bergabung membentuk Portal vein di belakang leher pankreas (FIG. 3-31).',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 19 (FIG. 3-31)',
  },
  {
    id: 'q-abdomen-11',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'CT Aksial Level L1/L2',
    question:
      'Pada citra CT aksial level L1/L2 berikut, kantung oval hipodens di cekungan anterior-medial lobus kanan hati dan segmen usus berisi kontras putih di sebelah kanan kaput pankreas berturut-turut adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p20.webp',
    crossecId: 'abdomen-p20',
    maskZones: MASK_ABDOMEN_P20,
    options: [
      'Urinary bladder dan Ileum',
      'Gallbladder dan Duodenum (1st & 2nd part)',
      'Right kidney dan Ascending colon',
      'Stomach dan Jejunum',
    ],
    correctIndex: 1,
    explanation:
      'Pada CT level L1/L2 (FIG. 3-32), Gallbladder tampak sebagai struktur oval gelap di sisi medial lobus kanan hati, tepat di sebelah lateral Duodenum pars 1 dan pars 2 yang terisi kontras.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 20 (FIG. 3-32)',
  },
  {
    id: 'q-abdomen-12',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'CT Aksial Level L1/L2',
    question:
      'Pada CT level L1/L2 berikut, arteri yang berasal dari aorta abdominalis setinggi L1 dan berjalan ke kanan tepat di belakang Inferior vena cava menuju ginjal kanan adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p20.webp',
    crossecId: 'abdomen-p20',
    maskZones: MASK_ABDOMEN_P20,
    options: [
      'Superior mesenteric artery',
      'Inferior mesenteric artery',
      'Celiac trunk',
      'Right renal artery',
    ],
    correctIndex: 3,
    explanation:
      'Right renal artery terlihat jelas keluar dari aorta lalu melintas di posterior Inferior vena cava menuju hilum ginjal kanan (FIG. 3-32).',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 20 (FIG. 3-32)',
  },
  {
    id: 'q-abdomen-13',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Aksial Kaput Pankreas',
    question:
      'Pada potongan aksial melalui kaput pankreas berikut, sepasang pembuluh mesenterika yang terletak tepat di sebelah anterior processus uncinatus / kaput pankreas adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p21.webp',
    crossecId: 'abdomen-p21',
    maskZones: MASK_ABDOMEN_P21,
    options: [
      'Inferior mesenteric artery dan vein',
      'Portal vein dan Splenic artery',
      'Common iliac artery dan vein',
      'Superior mesenteric vein dan Superior mesenteric arteries',
    ],
    correctIndex: 3,
    explanation:
      'Superior mesenteric vein (di kanan) dan Superior mesenteric artery (di kiri) merupakan penanda vaskular utama yang muncul di sebelah anterior pankreas pada potongan kaput pankreas (FIG. 3-33).',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 21 (FIG. 3-33)',
  },
  {
    id: 'q-abdomen-14',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Potongan Koronal Melalui Korpus Vertebra (Skematik)',
    question:
      'Pada potongan koronal melalui badan vertebra berikut, dua otot besar di dinding posterior abdomen yang berjalan turun simetris mengapit kanan-kiri korpus vertebra lumbal (dengan nervus femoralis di dalamnya) adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p29.webp',
    crossecId: 'abdomen-p29',
    maskZones: MASK_ABDOMEN_P29,
    options: [
      'Rectus abdominis muscle',
      'Psoas major muscle',
      'Transversus abdominis muscle',
      'Gluteus medius muscle',
    ],
    correctIndex: 1,
    explanation:
      'Psoas major muscle tampak menempel memanjang di kanan dan kiri korpus vertebra lumbal menuju pelvis (FIG. 3-43), tepat di sebelah medial ginjal dan ureter.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 29 (FIG. 3-43)',
  },
  {
    id: 'q-abdomen-15',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Coronal CT Melalui Korpus Vertebra',
    question:
      'Pada citra CT koronal abdomen berikut, perhatikan posisi kedua ginjal kanan dan kiri: mengapa ginjal kanan tampak sedikit lebih **rendah (inferior)** dibanding ginjal kiri?',
    imageUrl: '/assets/crossec/abdomen/abdomen-p30.webp',
    crossecId: 'abdomen-p30',
    maskZones: MASK_ABDOMEN_P30,
    options: [
      'Karena terdorong ke bawah oleh ukuran besar lobus kanan hati',
      'Karena adanya limpa yang lebih besar di sisi kanan',
      'Karena arteri renalis kiri lebih panjang daripada yang kanan',
      'Karena otot rektus abdominis kanan lebih tebal',
    ],
    correctIndex: 0,
    explanation:
      'Ginjal kanan sedikit lebih rendah dibanding ginjal kiri karena terdesak oleh keberadaan hati di kuadran kanan atas (FIG. 3-44 & Sistem Urinari hlm. 7).',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 30 (FIG. 3-44)',
  },
  {
    id: 'q-abdomen-16',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'CT Aksial Sendi Sakroiliaka (Pelvis Atas)',
    question:
      'Pada citra CT aksial setinggi sendi sakroiliaka berikut, tulang panggul berbentuk sayap yang bersendi dengan sacrum di posterior serta otot tebal di permukaan posterolateral bokong berturut-turut adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p33.webp',
    crossecId: 'abdomen-p33',
    maskZones: MASK_ABDOMEN_P33,
    options: [
      'Pubis dan Pectineus muscle',
      'Ischium dan Obturator internus muscle',
      'Ilium dan Gluteus maximus muscle',
      'Femur dan Sartorius muscle',
    ],
    correctIndex: 2,
    explanation:
      'Pada CT setinggi sacroiliac joint (FIG. 4-20), tulang sayap panggul di kanan-kiri sacrum adalah Ilium, sementara massa otot paling besar di aspek posterior-lateral adalah Gluteus maximus muscle.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 33 (FIG. 4-20)',
  },
  {
    id: 'q-abdomen-17',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'Midsagittal Pelvis Wanita',
    question:
      'Pada potongan midsagital pelvis wanita berikut, rongga peritoneum paling dalam yang terbentuk di antara **posterior uterus/serviks dan anterior rektum** adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p38.webp',
    crossecId: 'abdomen-p38',
    maskZones: MASK_ABDOMEN_P38,
    options: [
      'Vesicouterine pouch',
      'Rectouterine pouch (Kavum Douglas)',
      'Fornix anterior vaginae',
      'Uterine cavity',
    ],
    correctIndex: 1,
    explanation:
      'Rectouterine pouch terletak di antara uterus dan rektum (posterior uterus), sedangkan di antara kandung kemih dan uterus terdapat Vesicouterine pouch (FIG. 4-27).',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 38 (FIG. 4-27)',
  },
  {
    id: 'q-abdomen-18',
    dosen: 1,
    topic: 'crossec-abdomen',
    subtopic: 'CT Aksial Kelenjar Prostat (Pelvis Pria)',
    question:
      'Pada citra CT aksial setinggi kelenjar prostat berikut, struktur organ berlubang udara/gelap tepat di **posterior** kelenjar prostat dan tulang di **anterior** kelenjar prostat berturut-turut adalah...',
    imageUrl: '/assets/crossec/abdomen/abdomen-p44.webp',
    crossecId: 'abdomen-p44',
    maskZones: MASK_ABDOMEN_P44,
    options: [
      'Urinary bladder dan Sacrum',
      'Anal canal dan Ischium',
      'Seminal vesicle dan Coccyx',
      'Rectum dan Simfisis pubis / Os pubis',
    ],
    correctIndex: 3,
    explanation:
      'Pada CT setinggi prostate gland (FIG. 4-34), kelenjar prostat terletak di garis tengah tepat di belakang tulang pubis/simfisis pubis dan tepat di depan Rectum.',
    source: 'ANATOMY CROSSECTIONAL OF Abdomen.pdf hlm. 44 (FIG. 4-34)',
  },

  // =========================================================================
  // 4. TM-IDENTIFIKASI (20 Soal: Pencernaan, Urinari, Kardio, Saraf, Napas, Dosen 1)
  // =========================================================================
  {
    id: 'q-tm-01',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Organ Pencernaan (1–14)',
    question:
      'Pada diagram sistem pencernaan bernomor berikut, struktur berbentuk kantung kecil di permukaan bawah hati yang ditunjuk oleh **nomor 2** adalah...',
    imageUrl: '/assets/materi/pencernaan-quiz-14.webp',
    options: [
      'Duodenum',
      'Cecum',
      'Gallbladder (Kantung empedu)',
      'Pancreas',
    ],
    correctIndex: 2,
    explanation:
      'Nomor 1 adalah Liver (hati) dan nomor 2 tepat di cekungan bawah lobus kanan hati adalah Gallbladder (kantung empedu) yang menyimpan dan memekatkan empedu.',
    source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm. 35–36',
  },
  {
    id: 'q-tm-02',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Organ Pencernaan (1–14)',
    question:
      'Pada diagram saluran pencernaan bernomor yang sama, segmen awal usus halus berbentuk huruf C yang langsung terhubung dari pilorus lambung (**nomor 3**) adalah...',
    imageUrl: '/assets/materi/pencernaan-quiz-14.webp',
    options: [
      'Duodenum',
      'Ileum',
      'Jejunum',
      'Ascending colon',
    ],
    correctIndex: 0,
    explanation:
      'Nomor 3 adalah Duodenum (~25 cm, bagian terpendek usus halus), nomor 10 adalah Jejunum, dan nomor 6 adalah Ileum.',
    source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm. 26 & 35–36',
  },
  {
    id: 'q-tm-03',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Organ Pencernaan (1–14)',
    question:
      'Pada diagram sistem pencernaan berikut, struktur kantung awal usus besar di kuadran kanan bawah tempat bermuaranya ileum (**nomor 5**) dan segmen kolon berbentuk S sebelum rektum (**nomor 9**) berturut-turut adalah...',
    imageUrl: '/assets/materi/pencernaan-quiz-14.webp',
    options: [
      'Cecum dan Sigmoid colon',
      'Ileum dan Descending colon',
      'Ascending colon dan Anal canal',
      'Rectum dan Transverse colon',
    ],
    correctIndex: 0,
    explanation:
      'Berdasarkan kunci gambar hlm. 36: nomor 4 = Ascending colon, nomor 5 = Cecum, nomor 6 = Ileum, nomor 7 = Rectum, nomor 8 = Anal canal, nomor 9 = Sigmoid colon.',
    source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm. 35–36',
  },
  {
    id: 'q-tm-04',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Organ Pencernaan (1–14)',
    question:
      'Pada diagram sistem pencernaan berikut, organ berbentuk huruf J di kuadran kiri atas yang ditunjuk **nomor 13** dan pipa berotot di belakang trakea pada **nomor 14** berturut-turut adalah...',
    imageUrl: '/assets/materi/pencernaan-quiz-14.webp',
    options: [
      'Pancreas dan Pharynx',
      'Transverse colon dan Trachea',
      'Stomach (Lambung) dan Esophagus',
      'Spleen dan Laryngopharynx',
    ],
    correctIndex: 2,
    explanation:
      'Nomor 13 menunjuk Stomach (lambung berbentuk huruf J), sedangkan nomor 14 menunjuk Esophagus yang menembus diafragma menuju kardia lambung.',
    source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm. 14–16 & 35–36',
  },
  {
    id: 'q-tm-05',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Organ Pencernaan (1–14)',
    question:
      'Pada diagram yang sama, perhatikan perbedaan jalur kolon: segmen yang ditunjuk oleh **nomor 12** (melintang di bawah lambung) dan **nomor 11** (turun di sisi kiri abdomen) adalah...',
    imageUrl: '/assets/materi/pencernaan-quiz-14.webp',
    options: [
      'Ascending colon dan Sigmoid colon',
      'Duodenum dan Rectum',
      'Jejunum dan Ileum',
      'Transverse colon dan Descending colon',
    ],
    correctIndex: 3,
    explanation:
      'Nomor 12 adalah Transverse colon yang melintang dari fleksura hepatika ke fleksura splenika, lalu berlanjut ke bawah sebagai nomor 11 (Descending colon).',
    source: 'ANATOMI FISIOLOGI Sistem Pencernaan.pdf hlm. 32 & 35–36',
  },
  {
    id: 'q-tm-06',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Struktur Ginjal & Vaskular (1–4)',
    question:
      'Pada diagram ginjal dan pembuluh besar abdomen berikut (daftar kunci disembunyikan), pembuluh yang ditunjuk oleh **nomor 2** (bermuara ke Vena Cava Inferior) dan **nomor 4** (bercabang dari Aorta Abdominalis) berturut-turut adalah...',
    imageUrl: '/assets/materi/urinari-quiz-1to4.webp',
    maskZones: MASK_URINARI_1TO4,
    options: [
      'Renal artery dan Renal vein',
      'Renal vein dan Renal artery',
      'Proximal ureter dan Renal vein',
      'Superior mesenteric artery dan Proximal ureter',
    ],
    correctIndex: 1,
    explanation:
      'Sesuai kunci Urinari hlm. 33: 1 = Kidney, 2 = Renal vein (menuju IVC), 3 = Proximal ureter, dan 4 = Renal artery (cabang aorta abdominalis).',
    source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm. 33',
  },
  {
    id: 'q-tm-07',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Parenkim & Kaliks Ginjal (3–9)',
    question:
      'Pada penampang frontal ginjal berikut, area luar parenkim ginjal di bawah kapsul fibrosa yang ditunjuk **nomor 5** dan struktur segitiga bergaris pada medula di **nomor 6** adalah...',
    imageUrl: '/assets/materi/urinari-quiz-3to9.webp',
    options: [
      'Minor calices dan Proximal ureter',
      'Renal pelvis dan Major calices',
      'Renal cortex dan Renal pyramids (medulla)',
      'Renal medulla dan Renal cortex',
    ],
    correctIndex: 2,
    explanation:
      'Sesuai kunci Urinari hlm. 35: nomor 5 adalah Renal cortex (area luar), dan nomor 6 adalah Renal pyramids di dalam medula (8–18 struktur segitiga bergaris).',
    source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm. 9 & 34–35',
  },
  {
    id: 'q-tm-08',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Parenkim & Kaliks Ginjal (3–9)',
    question:
      'Pada penampang ginjal yang sama, perhatikan jalur pengumpulan urin setelah keluar dari papila piramida: urutan struktur **nomor 7 → nomor 8 → nomor 9** adalah...',
    imageUrl: '/assets/materi/urinari-quiz-3to9.webp',
    options: [
      'Minor calices → Major calices → Renal pelvis',
      'Major calices → Minor calices → Proximal ureter',
      'Renal pelvis → Major calices → Minor calices',
      'Renal artery → Minor calices → Renal cortex',
    ],
    correctIndex: 0,
    explanation:
      'Urin dari ujung papila piramida ditampung oleh nomor 7 (Minor calices), bergabung menjadi nomor 8 (Major calices), terkumpul di nomor 9 (Renal pelvis), lalu keluar melalui nomor 3 (Proximal ureter).',
    source: 'ANATOMI FISIOLOGI Sistem Urinari.pdf hlm. 10 & 34–35',
  },
  {
    id: 'q-tm-09',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Ruang & Katup Jantung (Label Tertutup)',
    question:
      'Pada penampang jantung berikut, ruang jantung berwarna biru-merah di **sisi kanan pasien (kiri tampilan gambar)** bagian atas yang menerima darah langsung dari Vena Cava Superior dan Inferior adalah...',
    imageUrl: '/assets/materi/kardio-quiz-ruang.webp',
    maskZones: MASK_KARDIO_QUIZ_RUANG,
    options: [
      'Atrium Kiri (Left Atrium)',
      'Atrium Kanan (Right Atrium)',
      'Ventrikel Kanan (Right Ventricle)',
      'Ventrikel Kiri (Left Ventricle)',
    ],
    correctIndex: 1,
    explanation:
      'Pada diagram jantung slide 6 (kardio-quiz-ruang), ruang di kanan atas tubuh pasien (sisi kiri gambar) yang menerima darah dari VCS dan VCI adalah Atrium Kanan.',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 6',
  },
  {
    id: 'q-tm-10',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Ruang & Katup Jantung (Label Tertutup)',
    question:
      'Pada penampang jantung yang sama, perhatikan bilik bawah di **sisi kiri pasien (kanan gambar)** yang memiliki dinding miokardium paling tebal serta katup berdaun dua di atasnya. Ruang dan katup tersebut adalah...',
    imageUrl: '/assets/materi/kardio-quiz-ruang.webp',
    maskZones: MASK_KARDIO_QUIZ_RUANG,
    options: [
      'Ventrikel Kanan dan Katup Trikuspidalis',
      'Ventrikel Kiri dan Katup Pulmonalis',
      'Atrium Kiri dan Katup Pulmonalis',
      'Ventrikel Kiri dan Katup Mitral / Bikuspidalis',
    ],
    correctIndex: 3,
    explanation:
      'Ventrikel Kiri memiliki dinding paling tebal untuk memompa darah ke aorta, dan di antara Atrium Kiri serta Ventrikel Kiri terletak Katup Mitral (Bikuspidalis).',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 5–7',
  },
  {
    id: 'q-tm-11',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Ruang & Katup Jantung (Label Tertutup)',
    question:
      'Pada gambar anatomi jantung berikut, sekat dinding otot tebal vertikal yang memisahkan ruang bilik kanan bawah dan bilik kiri bawah adalah...',
    imageUrl: '/assets/materi/kardio-quiz-ruang.webp',
    maskZones: MASK_KARDIO_QUIZ_RUANG,
    options: [
      'Chordae tendineae',
      'Pulmonary trunk',
      'Descending aorta',
      'Interventricular septum',
    ],
    correctIndex: 3,
    explanation:
      'Interventricular septum adalah dinding pemisah otot di antara Ventrikel Kanan dan Ventrikel Kiri (terlihat jelas di bagian tengah bawah diagram).',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 5–6',
  },
  {
    id: 'q-tm-12',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Hemisfer Cerebri (Tampak Superior)',
    question:
      'Pada foto otak tampak superior bernomor berikut, lekukan pembatas berlabel **nomor 1** (memisahkan lobus frontalis dan parietalis) serta girus di depannya pada **2/4** berturut-turut adalah...',
    imageUrl: '/assets/materi/saraf-hemisfer-quiz.webp',
    options: [
      'Fissura longitudinalis dan Gyrus postcentralis',
      'Sulcus centralis dan Gyrus precentralis (Cortex motorik)',
      'Fissura lateralis Sylvii dan Lobus occipitalis',
      'Sulcus parietooccipitalis dan Cortex sensorik',
    ],
    correctIndex: 1,
    explanation:
      'Sesuai kunci Slide 34: 1 = Sulcus centralis, 2/4 = Gyrus precentralis (Cortex motorik primer di lobus frontalis), 3/5 = Gyrus postcentralis (Cortex sensorik primer di lobus parietalis), dan 10 = Fissura longitudinalis.',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 34',
  },
  {
    id: 'q-tm-13',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Otak Potongan Sagital',
    question:
      'Pada foto otak potongan sagital bernomor berikut, pita komisura putih melengkung besar berlabel **nomor 2** dan bagian diencephalon yang ditunjuk oleh **nomor 3** berturut-turut adalah...',
    imageUrl: '/assets/materi/saraf-sagital-quiz.webp',
    options: [
      'Corpus callosum dan Diencephalon',
      'Cerebrum dan Mesencephalon',
      'Pons dan Medulla oblongata',
      'Cerebellum dan Corpus callosum',
    ],
    correctIndex: 0,
    explanation:
      'Sesuai kunci Slide 36: 1 = Cerebrum, 2 = Corpus callosum, 3 = Diencephalon, 4 = Mesencephalon, 5 = Pons, 6 = Cerebellum, 7 = Medulla oblongata.',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 36',
  },
  {
    id: 'q-tm-14',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Otak Potongan Sagital',
    question:
      'Pada potongan sagital otak yang sama, struktur berlipat-lipat ("pohon kehidupan") di fossa kranii posterior berlabel **nomor 6** dan batang otak paling bawah berlabel **nomor 7** berturut-turut adalah...',
    imageUrl: '/assets/materi/saraf-sagital-quiz.webp',
    options: [
      'Pons dan Mesencephalon',
      'Diencephalon dan Pons',
      'Cerebellum dan Medulla oblongata',
      'Cerebrum dan Spinal cord',
    ],
    correctIndex: 2,
    explanation:
      'Nomor 6 adalah Cerebellum (otak kecil) di posterior pons/medulla, dan nomor 7 adalah Medulla oblongata yang berlanjut menjadi medula spinalis di foramen magnum.',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 36',
  },
  {
    id: 'q-tm-15',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Otak Potongan Koronal',
    question:
      'Pada foto otak potongan koronal bernomor berikut, rongga berpasangan di bagian atas yang ditunjuk **nomor 2** dan celah vertikal sempit di garis tengah di bawahnya pada **nomor 3** berturut-turut adalah...',
    imageUrl: '/assets/materi/saraf-koronal-quiz.webp',
    options: [
      'Ventriculus III dan Ventriculus IV',
      'Ventriculus lateralis dan Ventriculus III (tertius)',
      'Aquaductus Sylvii dan Corpus callosum',
      'Cerebellum dan Pons',
    ],
    correctIndex: 1,
    explanation:
      'Sesuai kunci Slide 44: 1 = Cerebrum, 2 = Ventriculus lateralis, 3 = Ventriculus III, 4 = Mesencephalon, 5 = Pons, 6 = Medulla oblongata, 7 = Cerebellum.',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 44',
  },
  {
    id: 'q-tm-16',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Medula Spinalis & Kanalis Vertebralis',
    question:
      'Pada potongan sagital medula spinalis bernomor berikut, lapisan meninges paling luar berlabel **nomor 3** dan ruang di antara lapisan tersebut dengan dinding tulang vertebra pada **nomor 4** berturut-turut adalah...',
    imageUrl: '/assets/materi/saraf-spinal-quiz.webp',
    options: [
      'Pia mater dan Ruang subaraknoid',
      'Filum terminale dan Diskus intervertebralis',
      'Arachnoid mater dan Ruang subdural',
      'Dura mater dan Ruang epidural (extradural)',
    ],
    correctIndex: 3,
    explanation:
      'Sesuai kunci Slide 52: 1 = Discus intervertebralis, 2 = Corpus vertebrae, 3 = Dura mater, 4 = Ruang extradural/epidural, 5 = Medulla spinalis, 6 = Ruang subarachnoid.',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 52',
  },
  {
    id: 'q-tm-17',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Conus Medullaris & Filum Terminale',
    question:
      'Pada potongan sagital ujung kaudal medula spinalis berikut, ujung meruncing medula spinalis setinggi L1–L2 berlabel **nomor 3** dan benang jaringan pia memanjang ke kaudal pada **nomor 5** berturut-turut adalah...',
    imageUrl: '/assets/materi/saraf-conus-quiz.webp',
    options: [
      'Medulla spinalis dan Cauda equina',
      'Filum terminale dan Ruang subarachnoid',
      'Conus medullaris dan Filum terminale',
      'Dura mater dan Conus medullaris',
    ],
    correctIndex: 2,
    explanation:
      'Sesuai kunci Slide 53: 1 = Corpus vertebrae, 2 = Medulla spinalis, 3 = Conus medullaris, 4 = Discus intervertebralis, 5 = Filum terminale, 6 = Ruang subarachnoid.',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 47 & 53',
  },
  {
    id: 'q-tm-18',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Sistem Ventrikel Otak',
    question:
      'Pada model 3D sistem ventrikel bernomor berikut, saluran penghubung antara ventrikel lateral dan ventrikel III (**nomor 7**) serta saluran sempit yang menghubungkan ventrikel III ke ventrikel IV (**nomor 8**) berturut-turut adalah...',
    imageUrl: '/assets/materi/saraf-ventrikel-quiz.webp',
    options: [
      'Foramen interventriculare Monro dan Aquaductus cerebri (Sylvii)',
      'Foramen Magendie dan Foramen Luschka',
      'Canalis centralis dan Cornu posterior',
      'Aquaductus Sylvii dan Foramen Monro',
    ],
    correctIndex: 0,
    explanation:
      'Sesuai kunci Slide 56–57: 7 = Foramen interventriculare Monro (menghubungkan VL dan V III), 8 = Aquaductus cerebri/Sylvii (menghubungkan V III dan V IV/nomor 6).',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 56–57',
  },
  {
    id: 'q-tm-19',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Lobus & Fisura Paru (Sistem Pernapasan)',
    question:
      'Pada ilustrasi paru tampak anterior berikut, lobus tengah berwarna kuning dan celah horizontal pemisah antara lobus superior dan lobus tengah HANYA dimiliki oleh...',
    imageUrl: '/assets/materi/napas-hilum.webp',
    maskZones: MASK_NAPAS_HILUM,
    options: [
      'Paru kanan (memiliki lobus superior, medius, inferior dengan fisura horizontal & oblik)',
      'Paru kiri (memiliki 3 lobus dan 2 fisura)',
      'Kedua paru secara simetris',
      'Paru kiri karena adanya cardiac notch',
    ],
    correctIndex: 0,
    explanation:
      'Paru kanan memiliki tiga lobus (superior, medius, inferior) yang dipisahkan oleh fisura horizontal dan fisura oblik, sedangkan paru kiri hanya memiliki dua lobus (superior dan inferior) dipisahkan fisura oblik serta memiliki lekuk jantung (cardiac notch).',
    source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 8–9 & THORAX hlm. 16',
  },
  {
    id: 'q-tm-20',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Karina & Percabangan Bronkus',
    question:
      'Pada diagram saluran napas tampak anterior berikut, tonjolan mukosa/kartilago di dalam saluran napas tepat pada titik percabangan trakea (setinggi T5) menjadi bronkus utama kanan dan kiri disebut...',
    imageUrl: '/assets/materi/napas-bronkus.webp',
    maskZones: MASK_NAPAS_BRONKUS,
    options: [
      'Epiglotis',
      'Hilum paru',
      'Karina (Carina)',
      'Alveolus',
    ],
    correctIndex: 2,
    explanation:
      'Karina adalah tonjolan pada titik percabangan trakea setinggi T5 menjadi bronkus utama kanan dan kiri; bronkus utama kanan lebih tegak, pendek, dan lebar sehingga benda teraspirasi lebih sering masuk ke sisi kanan.',
    source: 'Anatomi_Sistem_Pernapasan_Bahasa_Indonesia.pptx slide 10–11',
  },
  {
    id: 'q-tm-21',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Atlas Peta Wilayah Vaskularisasi Cerebrum',
    question:
      'Pada peta aksial vaskularisasi serebri berikut, area berwarna **merah** (sisi lateral korteks), area **biru** (sisi medial/parasagital), dan area **kuning** (oksipital/inferior) masing-masing diperdarahi oleh...',
    imageUrl: '/assets/materi/saraf-vaskular-quiz.webp',
    options: [
      'Merah: ACA; Biru: MCA; Kuning: Arteri koroid anterior',
      'Merah: A. vertebralis; Biru: PCA; Kuning: ACA',
      'Merah: PCA; Biru: A. basilaris; Kuning: MCA',
      'Merah: MCA (A. cerebri media); Biru: ACA (A. cerebri anterior); Kuning: PCA (A. cerebri posterior)',
    ],
    correctIndex: 3,
    explanation:
      'Sesuai Slide 72 (Fisiologi Sistem Saraf): Biru = arteri cerebri anterior (ACA), Merah = arteri cerebri media (MCA), Kuning = arteri cerebri posterior (PCA), dan Hijau = arteri koroid anterior.',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 72',
  },
  {
    id: 'q-tm-22',
    dosen: 1,
    topic: 'tm-identifikasi',
    subtopic: 'Identifikasi Ruang & Katup Jantung (Ventrikel Kanan)',
    question:
      'Pada penampang jantung berikut, bilik bawah di **sisi kanan tubuh pasien (kiri bawah gambar)** yang berdinding lebih tipis dan memompa darah melalui katup semilunar menuju trunkus pulmonalis adalah...',
    imageUrl: '/assets/materi/kardio-quiz-ruang.webp',
    maskZones: MASK_KARDIO_QUIZ_RUANG,
    options: [
      'Atrium Kanan melalui Katup Trikuspidalis',
      'Ventrikel Kanan melalui Katup Pulmonalis',
      'Ventrikel Kiri melalui Katup Aorta',
      'Atrium Kiri melalui Katup Mitral',
    ],
    correctIndex: 1,
    explanation:
      'Ventrikel Kanan menerima darah dari Atrium Kanan melalui Katup Trikuspidalis lalu memompa darah kaya CO₂ melewati Katup Pulmonalis menuju Pulmonary Trunk / Arteri Pulmonalis ke paru-paru.',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 5–8',
  },

  // =========================================================================
  // 5. KARDIOVASKULER (12 Soal, Dosen 2)
  // =========================================================================
  {
    id: 'q-kardio-01',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Letak, Ukuran & Batas Jantung',
    question:
      'Di manakah letak anatomis **apex cordis** (ujung bawah jantung) diproyeksikan pada dinding dada normal?',
    imageUrl: '/assets/materi/thorax-heart.webp',
    maskZones: [
      { x: 52, y: 10, w: 46, h: 79, labelHint: 'Proyeksi dada & kunci katup disembunyikan' },
      { x: 4, y: 20, w: 45, h: 66, labelHint: 'Teks keterangan disembunyikan' },
    ],
    options: [
      'Sela iga ke-2 kanan setinggi vertebra T4',
      'Sela iga ke-3 kanan tepat di belakang manubrium sterni',
      'Sela iga ke-5 kiri di sebelah kiri garis tengah, setinggi vertebra T8',
      'Di bawah diafragma setinggi vertebra L1',
    ],
    correctIndex: 2,
    explanation:
      'Apex cordis berada di sela iga ke-5 (fifth intercostal space) di sebelah kiri garis tengah pada level vertebra T8, sedangkan basis cordis berada di bagian atas tempat pembuluh besar.',
    source: 'ANATOMY CROSSECTIONAL OF THORAX.pdf hlm. 18 & Sistem Peredaran Darah slide 27–29',
  },
  {
    id: 'q-kardio-02',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Ukuran & Massa Jantung',
    question:
      'Menurut materi Sistem Peredaran Darah, berapakah kisaran berat dan volume jantung orang dewasa sehat?',
    options: [
      'Berat 250–300 gram dengan volume 225–250 cm³',
      'Berat 100–150 gram dengan volume 80–100 cm³',
      'Berat 500–650 gram dengan volume 450–500 cm³',
      'Berat 1.400 gram dengan volume 1.200 cm³',
    ],
    correctIndex: 0,
    explanation:
      'Pada slide 27 Sistem Peredaran Darah disebutkan ukuran jantung sebesar kepalan tangan dengan berat 250–300 gram dan volume 225–250 cm³ (catatan: 1.400 gram adalah berat otak dewasa).',
    source: 'Sistem Peredaran Darah.pptx slide 27',
  },
  {
    id: 'q-kardio-03',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Lapisan Dinding Jantung & Perikardium',
    question:
      'Urutan lapisan dinding jantung dari yang **paling dalam** (melapisi ruang jantung) ke **paling luar** (berhubungan dengan kantung perikardium) adalah...',
    options: [
      'Epikardium → Miokardium → Endokardium',
      'Endokardium → Miokardium → Epikardium',
      'Miokardium → Endokardium → Epikardium',
      'Perikardium parietalis → Endokardium → Miokardium',
    ],
    correctIndex: 1,
    explanation:
      'Dari dalam ke luar: Endokardium (terdalam & paling tipis) → Miokardium (lapisan otot paling tebal) → Epikardium (lapisan luar berdampingan dengan jaringan lemak, identik dengan perikardium serosa viseralis).',
    source: 'Sistem Peredaran Darah.pptx slide 36 & Kardiovaskular slide 4',
  },
  {
    id: 'q-kardio-04',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Ruang Jantung & Ketebalan Miokardium',
    question:
      'Mengapa dinding miokardium **ventrikel kiri** jauh lebih tebal daripada ventrikel kanan?',
    options: [
      'Karena ventrikel kiri harus menerima darah langsung dari vena cava',
      'Karena ventrikel kiri harus mendorong darah ke paru-paru yang resistansinya paling tinggi',
      'Karena ventrikel kiri menyimpan cadangan darah vena lebih besar',
      'Karena ventrikel kiri memompa darah bertekanan tinggi ke seluruh tubuh (sirkulasi sistemik) melalui aorta',
    ],
    correctIndex: 3,
    explanation:
      'Ventrikel kanan berdinding lebih tipis karena hanya memompa jarak dekat ke paru-paru (sirkulasi pulmonal), sedangkan ventrikel kiri harus menghasilkan tekanan tinggi untuk memompa darah melalui aorta ke seluruh tubuh.',
    source: 'Sistem Peredaran Darah.pptx slide 30 & 34',
  },
  {
    id: 'q-kardio-05',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Katup Jantung & Struktur Penahan',
    question:
      'Struktur yang berfungsi menarik dan menahan daun katup atrioventrikular (termasuk katup mitral/bikuspidalis) agar tidak terbalik ke dalam atrium saat ventrikel berkontraksi adalah...',
    options: [
      'Serabut Purkinje dan Berkas His',
      'Crista terminalis dan Fossa ovalis',
      'Sinus koronarius dan Aurikula',
      'Papillary muscles (otot papilaris) dan Chordae tendineae',
    ],
    correctIndex: 3,
    explanation:
      'Pada slide 31–33 Sistem Peredaran Darah dijelaskan bahwa papillary muscles yang terhubung ke daun katup melalui chordae tendineae menarik dan menahan katup AV agar tidak prolaps saat sistol.',
    source: 'Sistem Peredaran Darah.pptx slide 31 & 33',
  },
  {
    id: 'q-kardio-06',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Sirkulasi Koroner (RCA & LCA)',
    question:
      'Arteri koroner kanan (RCA) dan kiri (LCA) merupakan cabang pertama dari pembuluh mana, dan cabang apa saja yang berasal langsung dari **Left Main Coronary Artery (LCA)**?',
    imageUrl: '/assets/materi/darah-koroner-2.webp',
    maskZones: [
      { x: 37, y: 50, w: 62, h: 48, labelHint: 'Daftar cabang RCA & LCA disembunyikan' },
      { x: 1, y: 1, w: 70, h: 48, labelHint: 'Label pembuluh koroner disembunyikan' },
    ],
    options: [
      'Bercabang dari Arcus aorta; LCA terbagi menjadi Conus branch dan Acute marginal',
      'Bercabang dari Aorta asendens tepat setelah katup aorta; LCA terbagi menjadi LAD dan LCx',
      'Bercabang dari Pulmonary trunk; LCA terbagi menjadi PDA dan AV node branch',
      'Bercabang dari Aorta torakalis; LCA terbagi menjadi Great cardiac vein dan Marginal',
    ],
    correctIndex: 1,
    explanation:
      'RCA dan LCA adalah cabang pertama Aorta asendens tepat di atas katup semilunar aorta. Left Main (LCA) bercabang menjadi Left Anterior Descending (LAD dengan cabang D1, D2, Septal) dan Left Circumflex (LCx dengan cabang M1, M2).',
    source: 'Sistem Peredaran Darah.pptx slide 47–48',
  },
  {
    id: 'q-kardio-07',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Sirkulasi Koroner (RCA & Sinus Koronarius)',
    question:
      'Manakah pasangan cabang arteri dari **Right Coronary Artery (RCA)** dan saluran drainase **vena jantung utama** yang tepat?',
    options: [
      'RCA: Conus branch, Acute marginal (AM), AV node branch, PDA | Drainase vena: Sinus koronarius ke atrium kanan',
      'RCA: LAD & LCx | Drainase vena: Vena pulmonalis ke atrium kiri',
      'RCA: Diagonal D1 & D2 | Drainase vena: Vena azygos ke ventrikel kanan',
      'RCA: Marginal M1 & M2 | Drainase vena: Vena cava inferior ke atrium kiri',
    ],
    correctIndex: 0,
    explanation:
      'Slide 48 mencantumkan cabang RCA: Conus branch, Acute marginal branch (AM), AV node branch, dan Posterior descending artery (PDA). Darah vena jantung bermuara melalui Great/Middle/Small cardiac vein ke Coronary sinus lalu masuk ke Atrium kanan.',
    source: 'Sistem Peredaran Darah.pptx slide 47–48 & Kardiovaskular slide 11',
  },
  {
    id: 'q-kardio-08',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Sistem Konduksi Listrik Jantung',
    question:
      'Urutan penjalaran impuls listrik jantung yang benar dari pemicu alami (*pacemaker*) hingga menyebabkan kontraksi dinding ventrikel adalah...',
    options: [
      'AV node → SA node → Serabut Purkinje → Berkas His',
      'Serabut Purkinje → Berkas His → AV node → SA node',
      'SA node → AV node → Berkas His (AV bundle) → Cabang berkas kanan/kiri → Serabut Purkinje',
      'SA node → Berkas His → AV node → Sinus koronarius',
    ],
    correctIndex: 2,
    explanation:
      'Impuls dimulai dari Nodus SA (pacemaker) di atrium kanan → menyebar ke dinding atrium → tertunda sesaat di Nodus AV → melewati Berkas His (AV bundle) → Cabang berkas kanan & kiri → Serabut Purkinje di dinding ventrikel.',
    source: 'Sistem Peredaran Darah.pptx slide 38–39 & Kardiovaskular slide 12',
  },
  {
    id: 'q-kardio-09',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Persarafan Otonom Jantung',
    question:
      'Bagaimana pengaruh **saraf simpatis** dan **saraf parasimpatis (N. Vagus)** terhadap kerja jantung?',
    options: [
      'Simpatis berfungsi kardio-inhibitor; Parasimpatis berfungsi kardio-akselerator',
      'Simpatis berfungsi kardio-akselerator (meningkatkan denyut & kontraksi); Parasimpatis berfungsi kardio-inhibitor (menurunkan denyut)',
      'Keduanya sama-sama menurunkan denyut jantung',
      'Jantung hanya dipersarafi saraf somatik sadar tanpa saraf otonom',
    ],
    correctIndex: 1,
    explanation:
      'Pada slide 38 Sistem Peredaran Darah dan slide 26 Sistem Saraf ditegaskan bahwa saraf simpatis berperan sebagai kardio-akselerator (meningkatkan denyut dan kekuatan kontraksi), sedangkan parasimpatis sebagai kardio-inhibitor.',
    source: 'Sistem Peredaran Darah.pptx slide 38 & Fisiologi Sistem Saraf slide 26',
  },
  {
    id: 'q-kardio-10',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Elektrokardiografi (EKG)',
    question:
      'Pada kurva EKG normal, arti dari **Gelombang P**, **Kompleks QRS**, dan **Gelombang T** secara berurutan adalah...',
    imageUrl: '/assets/materi/kardio-ekg.webp',
    options: [
      'Depolarisasi ventrikel — Depolarisasi atrium — Repolarisasi atrium',
      'Repolarisasi ventrikel — Depolarisasi atrium — Depolarisasi ventrikel',
      'Penutupan katup mitral — Pembukaan katup aorta — Penutupan katup trikuspid',
      'Depolarisasi atrium — Depolarisasi ventrikel — Repolarisasi ventrikel',
    ],
    correctIndex: 3,
    explanation:
      'Gelombang P mencerminkan depolarisasi atrium, Kompleks QRS mencerminkan depolarisasi ventrikel, dan Gelombang T mencerminkan repolarisasi ventrikel.',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 13 & 19',
  },
  {
    id: 'q-kardio-11',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Siklus Jantung & Suara Jantung S1/S2',
    question:
      'Suara jantung kedua **S2 ("dup")** timbul akibat peristiwa mekanik apakah pada siklus jantung?',
    options: [
      'Menutupnya katup trikuspid dan mitral pada awal sistol ventrikel',
      'Membukanya katup AV saat pengisian cepat ventrikel',
      'Menutupnya katup semilunar aorta dan pulmonal pada awal diastol ventrikel',
      'Kontraksi atrium saat mengalirkan sisa darah ke ventrikel',
    ],
    correctIndex: 2,
    explanation:
      'Suara S1 ("lub") terjadi saat katup AV (trikuspid & mitral) menutup pada awal sistol ventrikel; suara S2 ("dup") terjadi saat katup semilunar (aorta & pulmonal) menutup pada awal diastol ventrikel.',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 14–15',
  },
  {
    id: 'q-kardio-12',
    dosen: 2,
    topic: 'kardiovaskuler',
    subtopic: 'Perhitungan Curah Jantung (Cardiac Output)',
    question:
      'Jika isi sekuncup (*stroke volume*) seorang pasien adalah **60 mL** tiap denyut dan frekuensi denyut jantungnya **80 kali/menit**, berapakah curah jantung (*cardiac output*) pasien tersebut?',
    options: [
      '4.800 mL/menit (4,8 L/menit)',
      '1.400 mL/menit (1,4 L/menit)',
      '4.900 mL/menit (4,9 L/menit)',
      '6.080 mL/menit (6,08 L/menit)',
    ],
    correctIndex: 0,
    explanation:
      'Sesuai rumus Curah Jantung = Isi Sekuncup × Frekuensi Denyut (slide 16 & 19): 60 mL × 80 kali/menit = 4.800 mL/menit atau 4,8 L/menit.',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 16 & 19',
  },

  // =========================================================================
  // 6. SISTEMIK (12 Soal, Dosen 2)
  // =========================================================================
  {
    id: 'q-sistemik-01',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Sirkulasi Pulmonal vs Sistemik',
    question:
      'Pernyataan manakah yang paling tepat mengenai penamaan **arteri** dan **vena** pada peredaran darah kecil (pulmonal) dan besar (sistemik)?',
    options: [
      'Nama arteri dan vena ditentukan oleh arah aliran terhadap jantung: arteri keluar dari jantung, vena menuju jantung (sehingga A. pulmonalis membawa CO₂ dan V. pulmonalis membawa O₂)',
      'Semua arteri selalu membawa darah kaya oksigen, termasuk arteri pulmonalis',
      'Sirkulasi besar (sistemik) dimulai dari ventrikel kanan dan berakhir di atrium kiri',
      'Sirkulasi kecil (pulmonal) dimulai dari ventrikel kiri menuju paru lalu kembali ke atrium kanan',
    ],
    correctIndex: 0,
    explanation:
      'Pada slide 9 Kardiovaskular & slide 20–22 Sistem Peredaran Darah ditegaskan bahwa arteri meninggalkan jantung sedangkan vena kembali ke jantung. Oleh karena itu, Arteri pulmonalis membawa darah kaya CO₂ dari ventrikel kanan ke paru, dan Vena pulmonalis membawa darah kaya O₂ dari paru ke atrium kiri.',
    source: 'Sistem_Kardiovaskular_Semester_1_Radiologi.pptx slide 9–10 & 19',
  },
  {
    id: 'q-sistemik-02',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Perbedaan Arteri, Vena & Kapiler',
    question:
      'Manakah ciri khas struktur pembuluh **vena sistemik** dibandingkan arteri serta pembuluh **kapiler**?',
    options: [
      'Vena berdinding otot paling tebal, tanpa katup, dan bertekanan lebih tinggi daripada arteri',
      'Kapiler memiliki tiga lapis otot polos tebal untuk mendorong darah balik ke atrium',
      'Vena berdinding lebih tipis dan kurang elastis, bertekanan lebih lemah, memiliki katup (valvula semilunaris) untuk aliran satu arah; kapiler berdinding setebal satu lapis sel',
      'Arteri selalu terletak lebih dekat permukaan kulit daripada vena',
    ],
    correctIndex: 2,
    explanation:
      'Menurut slide 20–24 Sistem Peredaran Darah, vena memiliki dinding lebih tipis, tekanan lebih lemah, katup valvula semilunaris agar darah mengalir searah, sedangkan kapiler memiliki dinding hanya setebal satu sel untuk pertukaran gas/nutrien.',
    source: 'Sistem Peredaran Darah.pptx slide 18–24',
  },
  {
    id: 'q-sistemik-03',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Urutan Aliran Darah Lengkap',
    question:
      'Ikuti perjalanan satu tetes darah dari **Atrium Kanan** hingga mencapai **Atrium Kiri**. Urutan katup dan pembuluh yang dilewati secara berurutan adalah...',
    options: [
      'Katup mitral → Ventrikel kanan → Katup aorta → Vena pulmonalis → Paru',
      'Katup trikuspidalis → Ventrikel kiri → Katup semilunar aorta → Vena cava → Paru',
      'Katup semilunar pulmonalis → Ventrikel kiri → Katup trikuspidalis → Aorta → Paru',
      'Katup trikuspidalis → Ventrikel kanan → Katup semilunar pulmonalis → Arteri pulmonalis → Paru → Vena pulmonalis',
    ],
    correctIndex: 3,
    explanation:
      'Alur darah dari Atrium kanan: melewati Katup trikuspidalis → Ventrikel kanan → Katup semilunar pulmonalis → Arteri pulmonalis → Paru-paru (pertukaran gas) → Vena pulmonalis → Atrium kiri.',
    source: 'Sistem Peredaran Darah.pptx slide 43 & Kardiovaskular slide 9',
  },
  {
    id: 'q-sistemik-04',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Cabang Arcus Aorta',
    question:
      'Secara anatomis normal, urutan tiga cabang besar yang keluar dari **Arcus Aorta** berturut-turut dari proksimal (kanan) ke distal (kiri) adalah...',
    imageUrl: '/assets/materi/darah-arcus-aorta.webp',
    maskZones: [
      { x: 16, y: 4, w: 72, h: 48, labelHint: 'Label cabang arcus aorta disembunyikan' },
    ],
    options: [
      'A. carotis communis dextra → A. subclavia dextra → A. carotis communis sinistra',
      'Truncus brachiocephalicus → A. carotis communis sinistra → A. subclavia sinistra',
      'A. subclavia dextra → Truncus brachiocephalicus → A. subclavia sinistra',
      'A. coronaria dextra → Truncus brachiocephalicus → A. vertebralis sinistra',
    ],
    correctIndex: 1,
    explanation:
      'Tiga cabang normal Arcus Aorta adalah: (1) Truncus brachiocephalicus (yang lalu bercabang menjadi A. carotis communis dextra & A. subclavia dextra), (2) A. carotis communis sinistra, dan (3) A. subclavia sinistra.',
    source: 'Sistem Peredaran Darah.pptx slide 46 & 49',
  },
  {
    id: 'q-sistemik-05',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Cabang Aorta Torakalis',
    question:
      'Aorta desendens torakalis memberikan cabang **viseral** dan **somatik (parietal)**. Manakah kelompok cabang **viseral** dari aorta torakalis sesuai diagram kuliah?',
    imageUrl: '/assets/materi/darah-toraks.webp',
    maskZones: [
      { x: 2, y: 18, w: 38, h: 61, labelHint: 'Cabang somatik disembunyikan' },
      { x: 64, y: 27, w: 33, h: 46, labelHint: 'Cabang viseral disembunyikan' },
    ],
    options: [
      'Intercostal arteries dan Superior phrenic arteries',
      'Celiac trunk, Renal arteries, dan Lumbar arteries',
      'Bronchial, Esophageal, Mediastinal, dan Pericardial arteries',
      'Internal thoracic artery dan Inferior phrenic artery',
    ],
    correctIndex: 2,
    explanation:
      'Sesuai diagram Thoracic Circulatory System (slide 52): cabang somatik aorta torakalis adalah Intercostal arteries dan Superior phrenic arteries, sedangkan cabang viseralnya adalah Bronchial, Esophageal, Mediastinal, dan Pericardial arteries.',
    source: 'Sistem Peredaran Darah.pptx slide 52',
  },
  {
    id: 'q-sistemik-06',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Level Vertebra Cabang Aorta Abdominalis',
    question:
      'Berdasarkan peta level vertebra cabang aorta abdominalis, pada level vertebra berapakah **Truncus Coeliacus (Celiac trunk)** dan **Superior Mesenteric Artery (SMA)** berturut-turut keluar?',
    imageUrl: '/assets/materi/darah-abdomen-1.webp',
    maskZones: [
      { x: 67, y: 17, w: 28, h: 77, labelHint: 'Daftar arteri & level T12–L4 disembunyikan' },
    ],
    options: [
      'Celiac trunk di T12; SMA di L1',
      'Celiac trunk di L1; SMA di L3',
      'Celiac trunk di L2; SMA di L4',
      'Celiac trunk di T10; SMA di L2',
    ],
    correctIndex: 0,
    explanation:
      'Menurut tabel level vertebra pada slide 53: T12 = Inferior phrenic & Celiac trunk; L1 = Middle suprarenal & Superior mesenteric artery (SMA); antara L1–L2 = Renal artery; L2 = Gonadal artery; L3 = Inferior mesenteric artery (IMA); L4 = Common iliac artery.',
    source: 'Sistem Peredaran Darah.pptx slide 53',
  },
  {
    id: 'q-sistemik-07',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Level Vertebra Cabang Aorta Abdominalis',
    question:
      'Masih merujuk pada cabang aorta abdominalis (slide 53), **Inferior Mesenteric Artery (IMA)** serta bifurkasio aorta menjadi **A. iliaca communis** kanan-kiri masing-masing terletak setinggi vertebra...',
    options: [
      'IMA setinggi L1; Common iliac setinggi L2',
      'IMA setinggi L3; Common iliac setinggi L4',
      'IMA setinggi L2; Common iliac setinggi L3',
      'IMA setinggi T12; Common iliac setinggi S1',
    ],
    correctIndex: 1,
    explanation:
      'Pada slide 53 tercantum jelas: Inferior mesenteric artery keluar setinggi vertebra L3, sedangkan aorta abdominalis berakhir bercabang menjadi Common iliac artery kanan dan kiri setinggi L4.',
    source: 'Sistem Peredaran Darah.pptx slide 53',
  },
  {
    id: 'q-sistemik-08',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Sirkulasi Kepala & Leher (Arteri Karotis & Vertebralis)',
    question:
      'Setinggi struktur apakah **A. carotis communis** bercabang dua menjadi A. carotis interna dan A. carotis externa, serta dari pembuluh manakah **A. vertebralis** berasal?',
    imageUrl: '/assets/materi/darah-carotis.webp',
    maskZones: [
      { x: 1, y: 18, w: 49, h: 72, labelHint: 'Label arteri leher disembunyikan' },
      { x: 51, y: 12, w: 48, h: 80, labelHint: 'Label kanan disembunyikan' },
    ],
    options: [
      'Setinggi C1–C2; A. vertebralis berasal dari A. carotis externa',
      'Setinggi T4; A. vertebralis berasal dari Truncus thyrocervicalis',
      'Setinggi C6–C7; A. vertebralis berasal langsung dari Arcus aorta sisi kanan',
      'Setinggi C3–C4 (kartilago tiroid); A. vertebralis berasal dari A. subclavia',
    ],
    correctIndex: 3,
    explanation:
      'Pada slide 49 (darah-carotis.webp) dan Sistem Saraf slide 67: A. carotis communis bercabang di level C3–C4 (kartilago tiroid), sedangkan A. vertebralis kanan-kiri merupakan cabang dari A. subclavia.',
    source: 'Sistem Peredaran Darah.pptx slide 49 & Sistem Saraf slide 67',
  },
  {
    id: 'q-sistemik-09',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Circulus Arteriosus Willisi & Vena Otak',
    question:
      'Manakah pernyataan yang BENAR mengenai **Circulus Arteriosus Willisi** dan sistem **vena otak**?',
    options: [
      'Vena-vena otak bermuara langsung ke V. jugularis externa tanpa melewati sinus duramater',
      'A. carotis interna menyatu membentuk A. basilaris; vena otak memiliki katup semilunaris ganda',
      'Sirkulasi anterior hanya menyuplai serebelum dan batang otak',
      'A. vertebralis kanan-kiri menyatu menjadi A. basilaris yang membentuk PCA; vena otak tidak memiliki katup dan bermuara ke sinus venosus duramater lalu V. jugularis interna',
    ],
    correctIndex: 3,
    explanation:
      'Sirkulasi posterior dibentuk oleh A. vertebralis kanan-kiri → A. basilaris → PCA (menyuplai batang otak, cerebellum, lobus temporal/oksipital). Perbedaan penting vena otak vs vena sistemik (Sistem Saraf slide 74): vena otak tidak memiliki katup dan bermuara ke sinus venosus duramater sebelum ke V. jugularis interna.',
    source: 'Sistem Peredaran Darah.pptx slide 50–51 & Sistem Saraf slide 67–74',
  },
  {
    id: 'q-sistemik-10',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Sistem Vena Porta Hepatika',
    question:
      'Perhatikan skema **Hepatic Portal System** berikut. Tiga pembuluh vena utama yang menyalurkan darah dari saluran pencernaan dan limpa menuju **Vena Porta Hepatis** adalah...',
    imageUrl: '/assets/materi/darah-porta.webp',
    maskZones: [
      { x: 3, y: 12, w: 53, h: 72, labelHint: 'Label sistem porta disembunyikan' },
    ],
    options: [
      'Renal vein, Gonadal vein, dan Lumbar vein',
      'Superior mesenteric vein, Inferior mesenteric vein, dan Splenic vein',
      'Hepatic vein, Azygos vein, dan Inferior vena cava',
      'Internal iliac vein, External iliac vein, dan Femoral vein',
    ],
    correctIndex: 1,
    explanation:
      'Pada slide 55 (Fig. 17-26), darah dari usus halus, usus besar, lambung, dan limpa dikumpulkan melalui Inferior mesenteric vein, Splenic vein, dan Superior mesenteric vein membentuk Portal vein → masuk ke hati → keluar lewat Hepatic veins menuju Inferior vena cava.',
    source: 'Sistem Peredaran Darah.pptx slide 55',
  },
  {
    id: 'q-sistemik-11',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Sistem Vena Porta Hepatika',
    question:
      'Setelah darah melewati jaringan kapiler/sinusoid di dalam **hati** pada sistem vena porta hepatika, melalui pembuluh apakah darah meninggalkan hati menuju jantung?',
    options: [
      'Melalui Hepatic veins bermuara ke Inferior vena cava (VCI)',
      'Langsung melalui Portal vein ke Atrium kanan',
      'Melalui Hepatic artery menuju Superior vena cava',
      'Melalui Ductus choledochus ke VCI',
    ],
    correctIndex: 0,
    explanation:
      'Sesuai arah panah pada Fig. 17-26 (slide 55), Portal vein bercabang ke hati, kemudian darah keluar lewat Hepatic veins bermuara langsung ke Inferior vena cava (VCI).',
    source: 'Sistem Peredaran Darah.pptx slide 55',
  },
  {
    id: 'q-sistemik-12',
    dosen: 2,
    topic: 'sistemik',
    subtopic: 'Sirkulasi Ekstremitas Bawah',
    question:
      'Pada sirkulasi arteri ekstremitas bawah (slide 57), setelah melewati *adductor hiatus* di paha distal, **A. femoralis** berganti nama menjadi arteri apa di belakang lutut sebelum bercabang ke tungkai bawah?',
    options: [
      'A. iliaca externa',
      'A. tibialis anterior',
      'A. poplitea',
      'A. dorsalis pedis',
    ],
    correctIndex: 2,
    explanation:
      'Pada Lower limb circulation (slide 57), A. femoralis berjalan ke distal melewati adductor hiatus lalu menjadi A. poplitea di regio fossa poplitea, kemudian bercabang menjadi A. tibialis anterior (→ dorsalis pedis) dan A. tibialis posterior (serta A. fibularis).',
    source: 'Sistem Peredaran Darah.pptx slide 57',
  },

  // =========================================================================
  // 7. LIMB-ATAS (12 Soal, Dosen 2)
  // =========================================================================
  {
    id: 'q-limb-01',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Urutan Arteri Ekstremitas Atas',
    question:
      'Urutan aliran darah arteri menuju tangan kanan dari pangkal Arcus Aorta hingga lengan atas yang paling tepat adalah...',
    imageUrl: '/assets/materi/darah-limb-atas.webp',
    maskZones: [
      { x: 1, y: 15, w: 97, h: 75, labelHint: 'Label arteri lengan atas disembunyikan' },
    ],
    options: [
      'Arcus aorta → A. carotis communis dextra → A. axillaris → A. subclavia → A. brachialis',
      'Arcus aorta → Truncus brachiocephalicus → A. subclavia dextra → A. axillaris → A. brachialis',
      'Arcus aorta → A. subclavia sinistra → A. brachialis → A. axillaris',
      'Arcus aorta → Truncus brachiocephalicus → A. brachialis → A. radialis → A. axillaris',
    ],
    correctIndex: 1,
    explanation:
      'Pada sisi kanan (slide 56 Upper Arm Circulation), darah dari Arcus aorta masuk melalui Truncus brachiocephalicus → A. subclavia dextra → A. axillaris (ketiak) → A. brachialis (lengan atas).',
    source: 'Sistem Peredaran Darah.pptx slide 56',
  },
  {
    id: 'q-limb-02',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Asimetri Arteri Subklavia Kanan vs Kiri',
    question:
      'Apa perbedaan asal pangkal antara **A. subclavia dextra** (lengan kanan) dan **A. subclavia sinistra** (lengan kiri)?',
    options: [
      'Keduanya bercabang dari satu Truncus brachiocephalicus',
      'Keduanya keluar langsung dari Aorta asendens bersama arteri koroner',
      'A. subclavia sinistra bercabang dari Truncus brachiocephalicus, sedangkan A. subclavia dextra langsung dari Arcus aorta',
      'A. subclavia dextra bercabang dari Truncus brachiocephalicus, sedangkan A. subclavia sinistra bercabang langsung dari Arcus aorta',
    ],
    correctIndex: 3,
    explanation:
      'Terlihat jelas pada slide 56: Truncus brachiocephalicus hanya menyuplai sisi kanan (menjadi A. subclavia dextra & A. carotis communis dextra), sedangkan Left subclavian artery keluar langsung dari Arcus aorta.',
    source: 'Sistem Peredaran Darah.pptx slide 46, 49, & 56',
  },
  {
    id: 'q-limb-03',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Transisi Subklavia → Aksilaris → Brakialis',
    question:
      'Pada diagram sirkulasi lengan atas berikut, arteri yang melintas di regio ketiak tepat di antara **A. subclavia** (proksimal) dan **A. brachialis** (distal) adalah...',
    imageUrl: '/assets/materi/darah-limb-atas.webp',
    maskZones: [
      { x: 1, y: 15, w: 97, h: 75, labelHint: 'Label arteri lengan atas disembunyikan' },
    ],
    options: [
      'A. radialis',
      'A. ulnaris',
      'A. axillaris',
      'A. carotis externa',
    ],
    correctIndex: 2,
    explanation:
      'Setelah melewati tepi lateral iga pertama masuk ke ketiak, A. subclavia berganti nama menjadi A. axillaris, lalu berlanjut di lengan atas sepanjang humerus menjadi A. brachialis.',
    source: 'Sistem Peredaran Darah.pptx slide 56',
  },
  {
    id: 'q-limb-04',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Percabangan Lengan Bawah (Radialis vs Ulnaris)',
    question:
      'Di daerah fossa cubiti (siku), **A. brachialis** bercabang dua menyusuri lengan bawah. Manakah pernyataan orientasi anatomis yang benar?',
    options: [
      'A. radialis berjalan di sisi lateral (sisi ibu jari), sedangkan A. ulnaris berjalan di sisi medial (sisi kelingking)',
      'A. radialis berjalan di sisi medial (kelingking), A. ulnaris berjalan di sisi lateral (ibu jari)',
      'Keduanya berjalan di bagian posterior ulna tanpa mencapai telapak tangan',
      'A. ulnaris hanya berakhir di siku dan tidak beranastomosis di tangan',
    ],
    correctIndex: 0,
    explanation:
      'Pada posisi anatomis (telapak tangan menghadap depan, seperti pada gambar kanan slide 56), tulang radius dan A. radialis berada di sisi lateral (searah ibu jari), sedangkan ulna dan A. ulnaris berada di sisi medial (searah kelingking).',
    source: 'Sistem Peredaran Darah.pptx slide 56',
  },
  {
    id: 'q-limb-05',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Anastomosis Telapak Tangan (Arkus Palmaris)',
    question:
      'Setelah turun melewati pergelangan tangan, A. radialis dan A. ulnaris saling beranastomosis di telapak tangan membentuk dua lengkungan vaskular yaitu...',
    options: [
      'Deep palmar arch dan Superficial palmar arch',
      'Plantar arch dan Dorsalis pedis arch',
      'Arcus aortae dan Arcus venosus dorsalis',
      'Circle of Willis dan Sinus venosus',
    ],
    correctIndex: 0,
    explanation:
      'Terlihat pada bagian kanan diagram Upper Arm Circulation (slide 56): A. radialis dan A. ulnaris membentuk Deep palmar arch (arkus palmaris profundus) dan Superficial palmar arch (arkus palmaris superfisialis) sebelum bercabang menjadi A. digitalis ke jari-jari.',
    source: 'Sistem Peredaran Darah.pptx slide 56',
  },
  {
    id: 'q-limb-06',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Arteri Lengan atas & Klinis',
    question:
      'Pembuluh arteri utama di lengan atas yang merupakan arteri distributif muskuler (berjalan di sepanjang humerus sebelum bercabang menjadi radialis dan ulnaris) adalah...',
    options: [
      'A. subclavia',
      'A. femoralis',
      'A. brachialis',
      'A. thoracica interna',
    ],
    correctIndex: 2,
    explanation:
      'Pada slide 20 & 56 Sistem Peredaran Darah, A. brachialis disebut sebagai contoh arteri distributif (muskuler) yang menyalurkan darah sepanjang lengan atas sebelum bercabang di siku.',
    source: 'Sistem Peredaran Darah.pptx slide 20 & 56',
  },
  {
    id: 'q-limb-07',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Vena Superfisialis vs Profunda Lengan',
    question:
      'Pada peta vena tubuh (slide 59), vena superfisial berwarna biru muda yang berjalan di aspek **medial (sisi kelingking)** lengan atas adalah...',
    imageUrl: '/assets/materi/darah-vena-tubuh.webp',
    maskZones: [
      { x: 3, y: 12, w: 23, h: 78, labelHint: 'Label vena lengan kiri gambar disembunyikan' },
      { x: 46, y: 6, w: 34, h: 66, labelHint: 'Label sisi kanan gambar disembunyikan' },
    ],
    options: [
      'V. cephalica',
      'V. saphena magna',
      'V. brachialis',
      'V. basilica',
    ],
    correctIndex: 3,
    explanation:
      'Pada slide 59 (Whole body veins), V. basilica (Basilic vein) tampak sebagai vena superfisial biru muda di sisi medial lengan bawah dan lengan atas, sedangkan V. cephalica berada di sisi lateral (ibu jari).',
    source: 'Sistem Peredaran Darah.pptx slide 59',
  },
  {
    id: 'q-limb-08',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Vena Superfisialis Sisi Lateral Lengan',
    question:
      'Vena superfisial ekstremitas atas yang berjalan di sisi **lateral (searah ibu jari)** sepanjang lengan bawah dan lengan atas hingga bermuara ke daerah ketiak/subklavia adalah...',
    options: [
      'V. basilica',
      'V. cephalica',
      'V. ulnaris',
      'V. azygos',
    ],
    correctIndex: 1,
    explanation:
      'V. cephalica berjalan di permukaan lateral lengan bawah dan lengan atas (tampak sebagai garis vena superfisial lateral pada slide 59) sebelum bermuara ke V. axillaris/V. subclavia.',
    source: 'Sistem Peredaran Darah.pptx slide 59',
  },
  {
    id: 'q-limb-09',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Vena Mediana Cubiti (Venipuncture)',
    question:
      'Vena superfisial pendek yang melintang miring di lipat siku anterior (*fossa cubiti*) untuk menghubungkan V. cephalica dan V. basilica serta sering dipakai untuk pengambilan sampel darah vena adalah...',
    options: [
      'V. axillaris',
      'V. mediana antebrachial',
      'V. mediana cubiti (Median cubital vein)',
      'V. subclavia',
    ],
    correctIndex: 2,
    explanation:
      'Pada slide 59 tampak jelas Median cubital vein tepat di lipat siku menghubungkan vena sisi lateral dan sisi medial; vena ini paling mudah diakses untuk flebotomi/infus.',
    source: 'Sistem Peredaran Darah.pptx slide 59',
  },
  {
    id: 'q-limb-10',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Alur Drainase Vena Profunda Lengan ke Jantung',
    question:
      'Urutan aliran balik **vena profunda** dari lengan bawah hingga masuk kembali ke Atrium Kanan jantung adalah...',
    options: [
      'V. radialis/ulnaris → V. brachialis → V. axillaris → V. subclavia → V. brachiocephalica → Vena Cava Superior',
      'V. brachialis → V. radialis/ulnaris → V. basilica → Vena Cava Inferior',
      'V. mediana cubiti → V. saphena parva → V. axillaris → V. azygos',
      'V. cephalica → V. ulnaris → V. jugularis externa → Vena Cava Superior',
    ],
    correctIndex: 0,
    explanation:
      'Sesuai peta vena profunda (biru tua) pada slide 59: V. radialis & V. ulnaris bersatu menjadi V. brachialis → berlanjut ke V. axillaris → V. subclavia → bergabung dengan V. jugularis interna menjadi V. brachiocephalica → bermuara ke Superior vena cava.',
    source: 'Sistem Peredaran Darah.pptx slide 51 & 59',
  },
  {
    id: 'q-limb-11',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Vena Mediana Antebrachial',
    question:
      'Selain V. cephalica dan V. basilica, vena superfisial yang berjalan naik di bagian **tengah anterior lengan bawah** pada diagram Whole Body Veins (slide 59) adalah...',
    options: [
      'Deep femoral vein',
      'Median antebrachial vein',
      'Popliteal vein',
      'Internal jugular vein',
    ],
    correctIndex: 1,
    explanation:
      'Pada bagian lengan bawah diagram slide 59 berurutan terdapat label Radial, Median antebrachial (superfisial tengah anterior lengan bawah), dan Ulnar.',
    source: 'Sistem Peredaran Darah.pptx slide 59',
  },
  {
    id: 'q-limb-12',
    dosen: 2,
    topic: 'limb-atas',
    subtopic: 'Perbandingan Alur Arteri dan Vena Jari ke Bahu',
    question:
      'Jika seorang dokter menyuntikkan zat kontras intravena ke **V. mediana cubiti** lengan kanan untuk pencitraan CT toraks, manakah urutan pembuluh vena pertama yang dilewati kontras sebelum mencapai Vena Cava Superior?',
    options: [
      'V. radialis → A. brachialis → A. axillaris',
      'V. cephalica → V. ulnaris → Vena Cava Inferior',
      'V. jugularis interna → V. subclavia → V. axillaris',
      'V. basilica / V. brachialis → V. axillaris → V. subclavia → V. brachiocephalica dextra',
    ],
    correctIndex: 3,
    explanation:
      'Darah vena dari V. mediana cubiti mengalir ke V. basilica (dan/atau V. cephalica) lalu masuk ke V. axillaris → V. subclavia dextra → V. brachiocephalica dextra → Vena Cava Superior → Atrium kanan.',
    source: 'Sistem Peredaran Darah.pptx slide 59',
  },

  // =========================================================================
  // 8. SARAF-KRANIAL (12 Soal, Dosen 2)
  // =========================================================================
  {
    id: 'q-kranial-01',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'Identifikasi N. I & N. II (Sensorik Khusus)',
    question:
      'Sepasang saraf kranial pertama (**N. I** dan **N. II**) seluruhnya bersifat sensorik murni untuk penghidu dan penglihatan. Nama dan foramen kranium tempat keduanya melintas berturut-turut adalah...',
    imageUrl: '/assets/materi/head-cranial-nerves.webp',
    maskZones: [
      { x: 16, y: 17, w: 69, h: 77, labelHint: 'Label & diagram 12 saraf kranial disembunyikan' },
    ],
    options: [
      'N. Opticus (foramen magnum) dan N. Olfactorius (foramen ovale)',
      'N. Trigeminus (optic canal) dan N. Facialis (olfactory foramina)',
      'N. Oculomotorius (carotid canal) dan N. Trochlearis (rotundum)',
      'N. Olfactorius (olfactory foramina / os ethmoidale) dan N. Opticus (optic canal / os sphenoidale)',
    ],
    correctIndex: 3,
    explanation:
      'Sesuai FIGURE 11-7 dan tabel foramen slide 19: N. I (Olfactorius) melewati olfactory foramina di ethmoid bone untuk penciuman, sedangkan N. II (Opticus) melewati optic canal di sphenoid bone untuk penglihatan.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 & Sistem Saraf slide 19',
  },
  {
    id: 'q-kranial-02',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'Kelompok Penggerak Bola Mata (N. III, IV, VI)',
    question:
      'Pada FIGURE 11-7 (*Cranial nerves*), ketiga saraf kranial yang serabut motoriknya (garis biru) secara khusus menggerakkan **otot-otot ekstrinsik bola mata** (*muscles of the eye*) adalah...',
    options: [
      'N. I, N. II, dan N. V',
      'N. III (Oculomotorius), N. IV (Trochlearis), dan N. VI (Abducens)',
      'N. V (Trigeminus), N. VII (Facialis), dan N. VIII (Vestibulocochlearis)',
      'N. IX, N. X, dan N. XII',
    ],
    correctIndex: 1,
    explanation:
      'FIGURE 11-7 mengelompokkan N. III (Oculomotor), N. IV (Trochlear), dan N. VI (Abducens) sebagai saraf motorik penggerak otot bola mata.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 (FIGURE 11-7)',
  },
  {
    id: 'q-kranial-03',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'N. V (Trigeminus) — Sensasi Wajah & Otot Pengunyahan',
    question:
      'Saraf kranial manakah yang bersifat campuran dengan fungsi **sensorik wajah/sinus/gigi** sekaligus **motorik otot-otot pengunyahan (*muscles of mastication*)**?',
    options: [
      'N. V (Trigeminus)',
      'N. VII (Facialis)',
      'N. IX (Glossopharyngeus)',
      'N. XII (Hypoglossus)',
    ],
    correctIndex: 0,
    explanation:
      'Pada FIGURE 11-7 tertulis jelas: Trigeminal (V) memiliki fungsi sensory (face, sinuses, teeth, etc.) dan motor (muscles of mastication). Jangan tertukar dengan N. VII yang menggerakkan otot ekspresi wajah!',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 (FIGURE 11-7)',
  },
  {
    id: 'q-kranial-04',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'Foramen Cabang N. Trigeminus (V2 & V3)',
    question:
      'Berdasarkan tabel foramen kranium (slide 19), cabang **maksila (V2)** dan cabang **mandibula (V3)** dari N. Trigeminus masing-masing keluar dari tulang sphenoid melalui...',
    options: [
      'V2 melalui Foramen ovale; V3 melalui Foramen rotundum',
      'V2 melalui Stylomastoid foramen; V3 melalui Jugular foramen',
      'V2 melalui Foramen rotundum; V3 melalui Foramen ovale',
      'V2 melalui Carotid canal; V3 melalui Hypoglossal canal',
    ],
    correctIndex: 2,
    explanation:
      'Pada tabel Foramen Cranium slide 19: Foramen rotundum (sphenoid bone) dilewati maxilla branch of trigeminal nerve (V2), dan Foramen ovale (sphenoid bone) dilewati mandibular branch of trigeminal nerve (V3).',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 19',
  },
  {
    id: 'q-kranial-05',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'N. VII (Facialis) — Otot Wajah & Foramennya',
    question:
      'Saraf kranial manakah yang menggerakkan **otot-otot ekspresi wajah** (*muscles of the face*) dan melintasi tulang temporal melewati **internal auditory meatus** sebelum keluar lewat **stylomastoid foramen**?',
    options: [
      'N. V (Trigeminus)',
      'N. VII (Facialis)',
      'N. VI (Abducens)',
      'N. VIII (Vestibulocochlearis)',
    ],
    correctIndex: 1,
    explanation:
      'FIGURE 11-7 menunjukkan N. VII (Facial) mempersarafi muscles of the face, sementara tabel foramen slide 18–19 mencantumkan N. VII melewati internal auditory meatus dan stylomastoid foramen di temporal bone.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 & Sistem Saraf slide 18–19',
  },
  {
    id: 'q-kranial-06',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'N. VIII (Vestibulocochlearis)',
    question:
      'Sebuah lesi di **internal auditory meatus** (tulang temporal) dapat mengganggu dua saraf kranial yang lewat bersama di saluran tersebut. Salah satunya adalah saraf sensorik murni untuk pendengaran dan keseimbangan dari telinga dalam, yaitu...',
    options: [
      'N. IX (Glossopharyngeus)',
      'N. XI (Accessorius)',
      'N. X (Vagus)',
      'N. VIII (Vestibulocochlearis)',
    ],
    correctIndex: 3,
    explanation:
      'N. VIII (Vestibulocochlearis) membawa impuls keseimbangan (vestibular) dan pendengaran (cochlear) dari inner ear, dan melintasi internal auditory meatus bersama N. VII (slide 18).',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 & Sistem Saraf slide 18',
  },
  {
    id: 'q-kranial-07',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'N. IX (Glossopharyngeus)',
    question:
      'Pada FIGURE 11-7, saraf kranial campuran yang mempersarafi **motorik otot faring** (*pharyngeal musculature*) dan menerima **sensorik 1/3 bagian belakang lidah, tonsil, serta faring** adalah...',
    options: [
      'N. V (Trigeminus)',
      'N. VII (Facialis)',
      'N. IX (Glossopharyngeus)',
      'N. XII (Hypoglossus)',
    ],
    correctIndex: 2,
    explanation:
      'Glossopharyngeal (IX) berfungsi motorik pada otot faring dan sensorik dari posterior part of tongue, tonsil, serta pharynx.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 (FIGURE 11-7)',
  },
  {
    id: 'q-kranial-08',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'N. X (Vagus)',
    question:
      'Saraf kranial terpanjang dengan distribusi terluas ke organ toraks dan abdomen (motorik parasimpatis dan sensorik untuk **jantung, paru, bronkus, trakea, laring, faring, saluran cerna, serta telinga luar**) adalah...',
    options: [
      'N. X (Vagus)',
      'N. IX (Glossopharyngeus)',
      'N. XI (Accessorius)',
      'N. XII (Hypoglossus)',
    ],
    correctIndex: 0,
    explanation:
      'Vagus (X) merupakan saraf kranial campuran dengan jangkauan hingga organ visera toraks dan abdomen (heart, lungs, bronchi, gastrointestinal tract) sekaligus membawa serabut parasimpatis kardio-inhibitor jantung.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 (FIGURE 11-7)',
  },
  {
    id: 'q-kranial-09',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'Foramen Jugulare (Tulang Temporal & Oksipital)',
    question:
      'Berdasarkan tabel Foramen Cranium (slide 18), tiga saraf kranial beserta satu pembuluh vena besar yang bersama-sama melintasi **Jugular foramen** adalah...',
    options: [
      'N. IX (Glossopharyngeus), N. X (Vagus), N. XI (Spinal accessory) dan Internal jugular vein',
      'N. VII, VIII dan A. carotis interna',
      'N. III, IV, VI dan Sinus cavernosus',
      'N. V2, V3, N. XII dan Vertebral artery',
    ],
    correctIndex: 0,
    explanation:
      'Pada tabel slide 18 tercantum: Jugular foramen (antara temporal dan occipital bones) dilewati internal jugular vein, vagus (X), glossopharyngeal (IX), dan spinal accessory nerves (XI).',
    source: 'Fisiologi_Sistem_Saraf_Revisi_Slide7.pptx slide 18',
  },
  {
    id: 'q-kranial-10',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'N. XI (Accessorius) — Otot Leher & Bahu',
    question:
      'Saraf kranial motorik yang menginervasi otot **sternocleidomastoideus** (memutar kepala) dan otot **trapezius** (mengangkat bahu) adalah...',
    options: [
      'N. X (Vagus)',
      'N. XII (Hypoglossus)',
      'N. XI (Accessorius)',
      'N. VII (Facialis)',
    ],
    correctIndex: 2,
    explanation:
      'Sesuai FIGURE 11-7: Accessory (XI) adalah saraf motorik murni (serabut biru) yang menggerakkan sternocleidomastoid and trapezius muscles.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 (FIGURE 11-7)',
  },
  {
    id: 'q-kranial-11',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'N. XII (Hypoglossus) & Kanalis Hipoglosus',
    question:
      'Otot-otot **lidah** (*muscles of the tongue*) digerakkan oleh saraf kranial ke-12 yang keluar dari **os occipitale** melalui saluran khusus bernama...',
    options: [
      'N. Glossopharyngeus melalui Jugular foramen',
      'N. Facialis melalui Stylomastoid foramen',
      'N. Trigeminus melalui Foramen ovale',
      'N. Hypoglossus melalui Hypoglossal canal',
    ],
    correctIndex: 3,
    explanation:
      'Hypoglossal (XII) menggerakkan otot lidah (muscles of the tongue) dan melintasi Hypoglossal canal pada occipital bone (slide 18).',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 & Sistem Saraf slide 18',
  },
  {
    id: 'q-kranial-12',
    dosen: 2,
    topic: 'saraf-kranial',
    subtopic: 'Klasifikasi Sifat Sensorik / Motorik / Campuran',
    question:
      'Manakah pengelompokan **tiga saraf kranial yang seluruhnya bersifat Sensorik Murni** (berdasarkan sifat I–XII)?',
    options: [
      'N. III (Oculomotorius), N. IV (Trochlearis), dan N. VI (Abducens)',
      'N. I (Olfactorius), N. II (Opticus), dan N. VIII (Vestibulocochlearis)',
      'N. V (Trigeminus), N. VII (Facialis), dan N. IX (Glossopharyngeus)',
      'N. X (Vagus), N. XI (Accessorius), dan N. XII (Hypoglossus)',
    ],
    correctIndex: 1,
    explanation:
      'Ingat jembatan keledai sifat S-S-M-M-B-M-B-S-B-B-M-M: tiga saraf yang murni Sensorik adalah I (Olfactorius), II (Opticus), dan VIII (Vestibulocochlearis); Motorik murni adalah III, IV, VI, XI, XII; dan Campuran adalah V, VII, IX, X.',
    source: 'ANATOMY CROSSECTIONAL of head.pdf hlm. 27 (FIGURE 11-7)',
  },
];
