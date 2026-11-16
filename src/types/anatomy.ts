export type CrossSecRegion = 'head' | 'thorax' | 'abdomen';

export type CrossSecModality =
  | 'Schematic'
  | 'Axial CT'
  | 'Axial MRI'
  | 'Sagittal'
  | 'Coronal';

export interface MaskZone {
  /** Normalized percentages (0-100) relative to image dimensions */
  x: number;
  y: number;
  w: number;
  h: number;
  labelHint?: string;
}

export interface CrossSecPin {
  no: number;
  label: string;
  indonesian: string;
  /** Pin point on the anatomical structure (0-100%) */
  x: number;
  y: number;
}

export interface CrossSecStructure {
  name: string;
  indonesian: string;
  note?: string;
}

export interface CrossSecItem {
  id: string;
  region: CrossSecRegion;
  pageNumber: number;
  figureCode: string;
  title: string;
  indonesianTitle: string;
  levelTag: string;
  modality: CrossSecModality;
  imageUrl: string;
  sourcePdf: string;
  structures: CrossSecStructure[];
  /** Left/right or margin zones covering printed labels for Study Masking & Exam Mode */
  labelMaskZones: MaskZone[];
  /** Optional interactive structure pins for direct pin-pointing practice */
  pins?: CrossSecPin[];
}

export interface NumberedStructure {
  no: string | number;
  name: string;
  indonesian?: string;
  functionOrNote?: string;
}

export interface TMDiagram {
  id: string;
  title: string;
  indonesianTitle: string;
  imageUrl: string;
  source: string;
  description: string;
  keyStructures: NumberedStructure[];
  hasPrintedNumbers?: boolean;
}

export interface TMModule {
  id: string;
  tmNumber: number;
  title: string;
  subtitle: string;
  accentColor: 'cyan' | 'rose' | 'emerald' | 'amber';
  sourceSummary: string;
  diagrams: TMDiagram[];
}

export type Dosen2TopicId =
  | 'kardiovaskuler'
  | 'sistemik'
  | 'limb-atas'
  | 'saraf-kranial';

export interface KeyValueFact {
  label: string;
  value: string;
  detail?: string;
}

export interface HeartLayer {
  order: number;
  name: string;
  description: string;
}

export interface HeartValve {
  name: string;
  alias?: string;
  location: string;
  function: string;
}

export interface ConductionStep {
  step: number;
  name: string;
  role: string;
}

export interface BloodFlowNode {
  id: string;
  order: number;
  name: string;
  latinName?: string;
  oxygenState: 'oxygenated' | 'deoxygenated' | 'mixed';
  region: string;
  description: string;
}

export interface CranialNerveItem {
  roman: string;
  number: number;
  name: string;
  indonesianName: string;
  modality: 'Sensorik' | 'Motorik' | 'Campuran';
  foramen: string;
  targetAndFunction: string;
  sourceNote: string;
}

export interface CranialForamenRow {
  foramen: string;
  location: string;
  structures: string;
}

export interface Dosen2DataBundle {
  kardiovaskuler: {
    title: string;
    subtitle: string;
    sources: string[];
    overviewFacts: KeyValueFact[];
    wallLayers: HeartLayer[];
    chambers: { name: string; side: 'Kanan' | 'Kiri'; role: string; bloodType: string }[];
    valves: HeartValve[];
    coronaryArteries: {
      mainBranch: string;
      subBranches: string[];
      territory: string;
    }[];
    conductionSystem: ConductionStep[];
    autonomicNerves: { name: string; role: string; effect: string }[];
    ekgWaves: { wave: string; meaning: string }[];
    cardiacCycle: { phase: string; state: string; heartSound?: string; detail: string }[];
    cardiacOutputFormula: {
      formula: string;
      example: string;
      variables: KeyValueFact[];
    };
    images: { title: string; imageUrl: string; source: string; caption: string }[];
  };
  sistemik: {
    title: string;
    subtitle: string;
    sources: string[];
    pulmonalVsSistemik: {
      name: string;
      route: string;
      purpose: string;
    }[];
    vesselTypes: { type: string; direction: string; wallFeature: string; note: string }[];
    flowSequence: BloodFlowNode[];
    aortaBranches: {
      segment: string;
      branches: string[];
      territory: string;
    }[];
    regionalCirculations: {
      region: string;
      arteries: string[];
      veins: string[];
      keyHighlight: string;
      imageUrl?: string;
      source: string;
    }[];
    hepaticPortalSystem: {
      definition: string;
      tributaries: string[];
      pathway: string[];
      imageUrl: string;
      source: string;
    };
    images: { title: string; imageUrl: string; source: string; caption: string }[];
  };
  limbAtas: {
    title: string;
    subtitle: string;
    sources: string[];
    arteryChain: BloodFlowNode[];
    veinDrainage: {
      group: 'Superfisialis' | 'Profunda';
      vessels: { name: string; locationAndPath: string }[];
    }[];
    clinicalHighlights: KeyValueFact[];
    images: { title: string; imageUrl: string; source: string; caption: string }[];
  };
  sarafKranial: {
    title: string;
    subtitle: string;
    sources: string[];
    nerves: CranialNerveItem[];
    mnemonics: {
      title: string;
      phrase: string;
      explanation: string;
    }[];
    foraminaTable: CranialForamenRow[];
    images: { title: string; imageUrl: string; source: string; caption: string }[];
  };
}

export type QuestionTopic =
  | 'crossec-head'
  | 'crossec-thorax'
  | 'crossec-abdomen'
  | 'tm-identifikasi'
  | 'kardiovaskuler'
  | 'sistemik'
  | 'limb-atas'
  | 'saraf-kranial';

export interface QuestionItem {
  id: string;
  dosen: 1 | 2;
  topic: QuestionTopic;
  subtopic: string;
  question: string;
  imageUrl?: string;
  /** Optional label masking zones to apply over imageUrl during quiz */
  maskZones?: MaskZone[];
  /** Cross-section item ID if this question corresponds to a specific CrossSec plate */
  crossecId?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  source: string;
}

export interface QuizHistoryEntry {
  id: string;
  mode: 'belajar' | 'ujian' | 'simulasi-uas' | 'ulang-salah';
  topicLabel: string;
  score: number;
  total: number;
  percentage: number;
  dosen1Score?: { correct: number; total: number };
  dosen2Score?: { correct: number; total: number };
  timestamp: string;
}

export interface ActiveQuizDraft {
  mode: 'belajar' | 'ujian' | 'simulasi-uas' | 'ulang-salah';
  topicKey: string;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, number>;
  flaggedIds: string[];
  startedAt: number;
  durationSeconds?: number;
}

export interface UserProgressState {
  userName: string;
  theme: 'dark' | 'light';
  studiedItemIds: string[];
  lastVisitedPath: string;
  lastVisitedLabel: string;
  quizHistory: QuizHistoryEntry[];
  wrongQuestionIds: string[];
  masteredQuestionIds: string[];
  activeQuizDraft: ActiveQuizDraft | null;
}
