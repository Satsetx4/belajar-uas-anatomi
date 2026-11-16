import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileSearch,
  GitBranch,
  Hand,
  HeartPulse,
  Home,
  Layers,
  Play,
  RefreshCw,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Trash2,
  User,
  X,
} from 'lucide-react';
import AppHeader, { type BreadcrumbItem } from './components/AppHeader';
import MobileBottomNav, { type NavTabId } from './components/MobileBottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import CrossSecViewer from './components/CrossSecViewer';
import TMIdentifikasiViewer from './components/TMIdentifikasiViewer';
import Dosen2ModuleViewer from './components/Dosen2ModuleViewer';
import QuizEngine from './components/QuizEngine';
import { CROSSEC_ITEMS } from './data/crossecData';
import { TM_MODULES } from './data/tmImagesData';
import { DOSEN2_DATA } from './data/dosen2Data';
import { QUESTION_BANK } from './data/questionBank';
import {
  applyDocumentTheme,
  loadProgressState,
  recordQuizResult,
  resetProgressState,
  saveActiveQuizDraft,
  saveProgressState,
  toggleStudiedItem,
} from './lib/storage';
import { cn, fadeSlideUp, springSnap, staggerContainer, tapScale } from './lib/motion';
import type {
  ActiveQuizDraft,
  CrossSecRegion,
  Dosen2TopicId,
  QuestionTopic,
  QuizHistoryEntry,
  UserProgressState,
} from './types/anatomy';

type RouteView =
  | { kind: 'home' }
  | { kind: 'dosen1'; sub: 'crossec' | 'tm'; region?: CrossSecRegion | 'all' }
  | { kind: 'dosen2'; topic: Dosen2TopicId }
  | {
      kind: 'ujian';
      activeQuiz: {
        mode: 'belajar' | 'ujian' | 'simulasi-uas' | 'ulang-salah';
        topicFilter?: QuestionTopic | 'all';
      } | null;
    }
  | { kind: 'progres' }
  | { kind: 'not-found'; path: string };

const TOPIC_META: Array<{
  topic: QuestionTopic;
  dosen: 1 | 2;
  label: string;
  desc: string;
  accent: string;
}> = [
  {
    topic: 'crossec-head',
    dosen: 1,
    label: 'Cross-Section Kepala',
    desc: 'Potongan aksial, CT, MRI & sagital kranium/otak (17 plate)',
    accent: 'text-cyan-400 light:text-cyan-700',
  },
  {
    topic: 'crossec-thorax',
    dosen: 1,
    label: 'Cross-Section Thorax',
    desc: 'Thoracic inlet, arcus aorta, ruang jantung & CT toraks (16 plate)',
    accent: 'text-cyan-400 light:text-cyan-700',
  },
  {
    topic: 'crossec-abdomen',
    dosen: 1,
    label: 'Cross-Section Abdomen',
    desc: 'Level T9–L5, porta hepatis, ginjal & pelvis (34 plate)',
    accent: 'text-cyan-400 light:text-cyan-700',
  },
  {
    topic: 'tm-identifikasi',
    dosen: 1,
    label: 'Identifikasi Gambar TM 1–5',
    desc: 'Pencernaan #1–14, Urinari #1–9, Saraf, Napas & Ruang Jantung A–D',
    accent: 'text-emerald-400 light:text-emerald-700',
  },
  {
    topic: 'kardiovaskuler',
    dosen: 2,
    label: 'Kardiovaskuler',
    desc: 'Lapisan, ruang, katup, koroner RCA/LCA, SA/AV node, EKG & CO',
    accent: 'text-rose-400 light:text-rose-700',
  },
  {
    topic: 'sistemik',
    dosen: 2,
    label: 'Peredaran Darah Besar',
    desc: 'Aorta, Circulus Willisi, sirkulasi abdomen & Vena Porta Hepatika',
    accent: 'text-rose-400 light:text-rose-700',
  },
  {
    topic: 'limb-atas',
    dosen: 2,
    label: 'Limb Atas (Upper Arm)',
    desc: 'Subclavia → Axillaris → Brachialis → Radialis/Ulnaris & Vena Lengan',
    accent: 'text-amber-400 light:text-amber-700',
  },
  {
    topic: 'saraf-kranial',
    dosen: 2,
    label: '12 Saraf Kranial',
    desc: 'N. I–XII, sifat Sensorik/Motorik/Campuran, fungsi & Foramen Kranium',
    accent: 'text-amber-400 light:text-amber-700',
  },
];

function parsePathToRoute(pathname: string): RouteView {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/index.html') return { kind: 'home' };
  if (clean === '/dosen-1' || clean === '/dosen-1/crossec') {
    return { kind: 'dosen1', sub: 'crossec', region: 'all' };
  }
  if (clean === '/dosen-1/crossec/head') return { kind: 'dosen1', sub: 'crossec', region: 'head' };
  if (clean === '/dosen-1/crossec/thorax') return { kind: 'dosen1', sub: 'crossec', region: 'thorax' };
  if (clean === '/dosen-1/crossec/abdomen') return { kind: 'dosen1', sub: 'crossec', region: 'abdomen' };
  if (clean === '/dosen-1/tm') return { kind: 'dosen1', sub: 'tm' };
  if (clean === '/dosen-2' || clean === '/dosen-2/kardiovaskuler') {
    return { kind: 'dosen2', topic: 'kardiovaskuler' };
  }
  if (clean === '/dosen-2/sistemik') return { kind: 'dosen2', topic: 'sistemik' };
  if (clean === '/dosen-2/limb-atas') return { kind: 'dosen2', topic: 'limb-atas' };
  if (clean === '/dosen-2/saraf-kranial') return { kind: 'dosen2', topic: 'saraf-kranial' };
  if (clean === '/ujian' || clean === '/latihan') return { kind: 'ujian', activeQuiz: null };
  if (clean === '/simulasi-uas' || clean === '/ujian/simulasi') {
    return { kind: 'ujian', activeQuiz: { mode: 'simulasi-uas', topicFilter: 'all' } };
  }
  if (clean === '/ulang-salah' || clean === '/ujian/salah') {
    return { kind: 'ujian', activeQuiz: { mode: 'ulang-salah', topicFilter: 'all' } };
  }
  if (clean === '/progres') return { kind: 'progres' };
  return { kind: 'not-found', path: pathname };
}

function routeToPath(route: RouteView): string {
  switch (route.kind) {
    case 'home':
      return '/';
    case 'dosen1':
      if (route.sub === 'tm') return '/dosen-1/tm';
      if (route.region && route.region !== 'all') return `/dosen-1/crossec/${route.region}`;
      return '/dosen-1/crossec';
    case 'dosen2':
      return `/dosen-2/${route.topic}`;
    case 'ujian':
      if (route.activeQuiz?.mode === 'simulasi-uas') return '/simulasi-uas';
      if (route.activeQuiz?.mode === 'ulang-salah') return '/ulang-salah';
      return '/ujian';
    case 'progres':
      return '/progres';
    case 'not-found':
      return route.path;
  }
}

export function App() {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    const loaded = loadProgressState();
    applyDocumentTheme(loaded.theme);
    return loaded;
  });

  const [route, setRoute] = useState<RouteView>(() =>
    typeof window !== 'undefined' ? parsePathToRoute(window.location.pathname) : { kind: 'home' }
  );
  const [showResetModal, setShowResetModal] = useState(false);
  const [nameInput, setNameInput] = useState<string>(() => progress.userName);

  useEffect(() => {
    applyDocumentTheme(progress.theme);
  }, [progress.theme]);

  useEffect(() => {
    setNameInput(progress.userName);
  }, [progress.userName]);

  useEffect(() => {
    const onPopState = () => {
      setRoute(parsePathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateRoute = useCallback(
    (next: RouteView) => {
      const sameSection = next.kind === 'dosen2' && route.kind === 'dosen2';
      setRoute(next);
      const nextPath = routeToPath(next);
      if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
      if (typeof window !== 'undefined' && !sameSection) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const labelMap: Record<RouteView['kind'], string> = {
        home: 'Beranda',
        dosen1:
          next.kind === 'dosen1' && next.sub === 'tm'
            ? 'Identifikasi TM 1–5'
            : 'Atlas Cross-Section',
        dosen2: 'Materi Dosen 2',
        ujian: 'Latihan & Simulasi UAS',
        progres: 'Progres Belajar',
        'not-found': 'Halaman Tidak Ditemukan',
      };

      if (next.kind !== 'not-found') {
        setProgress((prev) =>
          saveProgressState({
            ...prev,
            lastVisitedPath: nextPath,
            lastVisitedLabel: labelMap[next.kind],
          })
        );
      }
    },
    [route.kind]
  );

  const handleToggleTheme = useCallback(() => {
    setProgress((prev) => {
      const nextTheme = prev.theme === 'dark' ? 'light' : 'dark';
      return saveProgressState({ ...prev, theme: nextTheme });
    });
  }, []);

  const handleToggleStudied = useCallback((id: string) => {
    setProgress((prev) => toggleStudiedItem(id, prev));
  }, []);

  const handleSaveDraft = useCallback((draft: ActiveQuizDraft | null) => {
    setProgress((prev) => saveActiveQuizDraft(draft, prev));
  }, []);

  const handleCompleteQuiz = useCallback(
    (entry: QuizHistoryEntry, wrongIds: string[], correctIds: string[]) => {
      setProgress((prev) => recordQuizResult(entry, wrongIds, correctIds, prev));
    },
    []
  );

  const handleConfirmReset = useCallback(() => {
    const fresh = resetProgressState();
    setProgress(fresh);
    setNameInput('');
    setShowResetModal(false);
    navigateRoute({ kind: 'home' });
  }, [navigateRoute]);

  const handleSaveName = useCallback((val: string) => {
    setNameInput(val);
    setProgress((prev) => saveProgressState({ ...prev, userName: val.trimStart() }));
  }, []);

  // Computed Metrics (strictly from real localStorage state — 0% on fresh start)
  const totalTMDiagrams = useMemo(
    () => TM_MODULES.reduce((acc, m) => acc + m.diagrams.length, 0),
    []
  );

  const metrics = useMemo(() => {
    const studiedSet = new Set(progress.studiedItemIds);
    const masteredSet = new Set(progress.masteredQuestionIds);

    const crossecHeadStudied = CROSSEC_ITEMS.filter(
      (i) => i.region === 'head' && studiedSet.has(i.id)
    ).length;
    const crossecThoraxStudied = CROSSEC_ITEMS.filter(
      (i) => i.region === 'thorax' && studiedSet.has(i.id)
    ).length;
    const crossecAbdomenStudied = CROSSEC_ITEMS.filter(
      (i) => i.region === 'abdomen' && studiedSet.has(i.id)
    ).length;
    const crossecStudied = crossecHeadStudied + crossecThoraxStudied + crossecAbdomenStudied;

    const tmDiagramsStudied = TM_MODULES.reduce(
      (sum, m) => sum + m.diagrams.filter((d) => studiedSet.has(d.id)).length,
      0
    );

    const dosen2Topics: Dosen2TopicId[] = [
      'kardiovaskuler',
      'sistemik',
      'limb-atas',
      'saraf-kranial',
    ];
    const dosen2Studied = dosen2Topics.filter((t) => studiedSet.has(`dosen2-${t}`)).length;

    const totalMaterials = CROSSEC_ITEMS.length + totalTMDiagrams + dosen2Topics.length;
    const studiedMaterials = crossecStudied + tmDiagramsStudied + dosen2Studied;

    const masteredQuestions = QUESTION_BANK.filter((q) => masteredSet.has(q.id)).length;
    const materialPct = totalMaterials > 0 ? Math.round((studiedMaterials / totalMaterials) * 100) : 0;
    const quizPct =
      QUESTION_BANK.length > 0 ? Math.round((masteredQuestions / QUESTION_BANK.length) * 100) : 0;
    const overallReadiness = Math.round((materialPct * 0.45) + (quizPct * 0.55));

    const topicBreakdown = TOPIC_META.map((meta) => {
      const questions = QUESTION_BANK.filter((q) => q.topic === meta.topic);
      const mastered = questions.filter((q) => masteredSet.has(q.id)).length;
      const pct = questions.length > 0 ? Math.round((mastered / questions.length) * 100) : 0;
      return { ...meta, total: questions.length, mastered, pct };
    });

    return {
      crossecHeadStudied,
      crossecThoraxStudied,
      crossecAbdomenStudied,
      crossecStudied,
      tmDiagramsStudied,
      dosen2Studied,
      totalMaterials,
      studiedMaterials,
      masteredQuestions,
      overallReadiness,
      topicBreakdown,
    };
  }, [progress.studiedItemIds, progress.masteredQuestionIds, totalTMDiagrams]);

  const activeNavTab: NavTabId = useMemo(() => {
    if (route.kind === 'dosen1') return 'dosen1';
    if (route.kind === 'dosen2') return 'dosen2';
    if (route.kind === 'ujian') return 'ujian';
    if (route.kind === 'progres') return 'progres';
    return 'home';
  }, [route]);

  const headerProps = useMemo((): {
    title: string;
    subtitle?: string;
    showBack: boolean;
    onBack?: () => void;
    breadcrumbs?: BreadcrumbItem[];
  } => {
    switch (route.kind) {
      case 'home':
        return {
          title: 'Anatomi Studio UAS',
          subtitle: 'Radiologi Cross-Section & Fisiologi',
          showBack: false,
        };
      case 'dosen1':
        return {
          title: route.sub === 'crossec' ? 'Dosen 1: Cross-Section' : 'Dosen 1: Identifikasi TM 1–5',
          subtitle:
            route.sub === 'crossec'
              ? '67 Potongan Kepala, Thorax & Abdomen'
              : '58 Diagram Materi & Soal Bernomor',
          showBack: true,
          onBack: () => navigateRoute({ kind: 'home' }),
          breadcrumbs: [
            { label: 'Beranda', onClick: () => navigateRoute({ kind: 'home' }) },
            { label: 'Dosen 1' },
            { label: route.sub === 'crossec' ? 'Cross-Section' : 'Identifikasi TM' },
          ],
        };
      case 'dosen2': {
        const labelMap: Record<Dosen2TopicId, string> = {
          kardiovaskuler: 'Kardiovaskuler',
          sistemik: 'Peredaran Darah Besar',
          'limb-atas': 'Limb Atas (Lengan)',
          'saraf-kranial': '12 Saraf Kranial',
        };
        return {
          title: `Dosen 2: ${labelMap[route.topic]}`,
          subtitle: 'Ringkasan Materi, Tracer Interaktif & Mini-Game',
          showBack: true,
          onBack: () => navigateRoute({ kind: 'home' }),
          breadcrumbs: [
            { label: 'Beranda', onClick: () => navigateRoute({ kind: 'home' }) },
            { label: 'Dosen 2' },
            { label: labelMap[route.topic] },
          ],
        };
      }
      case 'ujian':
        if (route.activeQuiz) {
          const titleMap = {
            'simulasi-uas': 'Simulasi UAS Resmi',
            'ulang-salah': 'Drill Jawaban Salah',
            belajar: 'Mode Belajar Soal',
            ujian: 'Mode Ujian Topik',
          };
          return {
            title: titleMap[route.activeQuiz.mode],
            subtitle: 'Soal & Pembahasan Terverifikasi Sumber',
            showBack: true,
            onBack: () => navigateRoute({ kind: 'ujian', activeQuiz: null }),
            breadcrumbs: [
              { label: 'Beranda', onClick: () => navigateRoute({ kind: 'home' }) },
              { label: 'Ujian', onClick: () => navigateRoute({ kind: 'ujian', activeQuiz: null }) },
              { label: titleMap[route.activeQuiz.mode] },
            ],
          };
        }
        return {
          title: 'Pusat Latihan & Simulasi UAS',
          subtitle: '116 Soal Terverifikasi Dosen 1 & Dosen 2',
          showBack: true,
          onBack: () => navigateRoute({ kind: 'home' }),
          breadcrumbs: [
            { label: 'Beranda', onClick: () => navigateRoute({ kind: 'home' }) },
            { label: 'Ujian & Latihan' },
          ],
        };
      case 'progres':
        return {
          title: 'Progres & Profil Belajar',
          subtitle: 'Statistik penguasaan lokal & reset data',
          showBack: true,
          onBack: () => navigateRoute({ kind: 'home' }),
          breadcrumbs: [
            { label: 'Beranda', onClick: () => navigateRoute({ kind: 'home' }) },
            { label: 'Progres' },
          ],
        };
      case 'not-found':
        return {
          title: 'Halaman Tidak Ditemukan',
          subtitle: 'Rute tidak tersedia',
          showBack: true,
          onBack: () => navigateRoute({ kind: 'home' }),
        };
    }
  }, [route, navigateRoute]);

  const handleNavTab = useCallback(
    (tab: NavTabId) => {
      switch (tab) {
        case 'home':
          navigateRoute({ kind: 'home' });
          break;
        case 'dosen1':
          navigateRoute({ kind: 'dosen1', sub: 'crossec', region: 'all' });
          break;
        case 'dosen2':
          navigateRoute({ kind: 'dosen2', topic: 'kardiovaskuler' });
          break;
        case 'ujian':
          navigateRoute({ kind: 'ujian', activeQuiz: null });
          break;
        case 'progres':
          navigateRoute({ kind: 'progres' });
          break;
      }
    },
    [navigateRoute]
  );

  const resumeRoute = useMemo(() => {
    if (progress.lastVisitedPath && progress.lastVisitedPath !== '/') {
      const parsed = parsePathToRoute(progress.lastVisitedPath);
      if (parsed.kind !== 'not-found' && parsed.kind !== 'home') {
        return parsed;
      }
    }
    return null;
  }, [progress.lastVisitedPath]);

  const isDark = progress.theme === 'dark';

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary onGoHome={() => navigateRoute({ kind: 'home' })}>
        <div
          className={cn(
            'min-h-screen pb-24 transition-colors duration-200 md:pb-28',
            isDark ? 'text-slate-100' : 'text-slate-900'
          )}
        >
          <AppHeader
            title={headerProps.title}
            subtitle={headerProps.subtitle}
            showBack={headerProps.showBack}
            onBack={headerProps.onBack}
            breadcrumbs={headerProps.breadcrumbs}
            theme={progress.theme}
            onToggleTheme={handleToggleTheme}
            onOpenReset={() => setShowResetModal(true)}
          />

          <main className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-7">
            <AnimatePresence mode="wait">
              {route.kind === 'home' && (
                <motion.div
                  key="page-home"
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  {/* Asymmetric Diagnostic Hero (Anti-Slop: no 3-card cliché below hero) */}
                  <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <div
                      className={cn(
                        'relative overflow-hidden rounded-3xl border p-5 sm:p-7 lg:col-span-8',
                        isDark
                          ? 'border-slate-800/90 bg-slate-900/75 shadow-xl shadow-black/30'
                          : 'border-stone-300/90 bg-white/95 shadow-lg shadow-stone-300/25'
                      )}
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
                            isDark
                              ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                              : 'border-cyan-700/25 bg-cyan-50 text-cyan-800'
                          )}
                        >
                          <Stethoscope className="h-3.5 w-3.5" />
                          Kisi-Kisi UAS Terpadu
                        </span>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium',
                            isDark
                              ? 'border-slate-700 bg-slate-800/80 text-slate-300'
                              : 'border-stone-300 bg-stone-100 text-stone-700'
                          )}
                        >
                          100% Dari Materi Upload
                        </span>
                      </div>

                      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        {progress.userName.trim()
                          ? `Siap bedah materi UAS, ${progress.userName.trim()}?`
                          : 'Ruang Latih UAS Anatomi & Cross-Section'}
                      </h2>
                      <p
                        className={cn(
                          'mt-2 max-w-2xl text-sm leading-relaxed sm:text-base',
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        )}
                      >
                        Seluruh materi disaring ketat sesuai kisi-kisi: identifikasi gambar per TM,
                        potongan melintang Kepala, Thorax, dan Abdomen (Dosen 1), serta
                        Kardiovaskuler, Peredaran Darah Besar, Limb Atas, dan 12 Saraf Kranial
                        (Dosen 2).
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2.5">
                        <motion.button
                          type="button"
                          whileTap={tapScale}
                          onClick={() =>
                            navigateRoute({
                              kind: 'ujian',
                              activeQuiz: { mode: 'simulasi-uas', topicFilter: 'all' },
                            })
                          }
                          className="inline-flex min-h-[46px] items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-105"
                        >
                          <Play className="h-4 w-4 fill-current" />
                          Mulai Simulasi UAS (28 Soal)
                        </motion.button>

                        {progress.activeQuizDraft && (
                          <motion.button
                            type="button"
                            whileTap={tapScale}
                            onClick={() =>
                              navigateRoute({
                                kind: 'ujian',
                                activeQuiz: {
                                  mode: progress.activeQuizDraft!.mode,
                                  topicFilter:
                                    (progress.activeQuizDraft!.topicKey as QuestionTopic | 'all') ||
                                    'all',
                                },
                              })
                            }
                            className={cn(
                              'inline-flex min-h-[46px] items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition',
                              isDark
                                ? 'border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                                : 'border-amber-600/30 bg-amber-50 text-amber-800 hover:bg-amber-100'
                            )}
                          >
                            <RefreshCw className="h-4 w-4" />
                            Lanjutkan Kuis Berjalan ({Object.keys(progress.activeQuizDraft.answers).length}/
                            {progress.activeQuizDraft.questionIds.length})
                          </motion.button>
                        )}

                        {resumeRoute && !progress.activeQuizDraft && (
                          <motion.button
                            type="button"
                            whileTap={tapScale}
                            onClick={() => navigateRoute(resumeRoute)}
                            className={cn(
                              'inline-flex min-h-[46px] items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition',
                              isDark
                                ? 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-cyan-500/40'
                                : 'border-stone-300 bg-stone-100 text-slate-800 hover:border-cyan-600/40'
                            )}
                          >
                            <Compass className="h-4 w-4" />
                            Lanjut: {progress.lastVisitedLabel}
                          </motion.button>
                        )}

                        {progress.wrongQuestionIds.length > 0 && (
                          <motion.button
                            type="button"
                            whileTap={tapScale}
                            onClick={() =>
                              navigateRoute({
                                kind: 'ujian',
                                activeQuiz: { mode: 'ulang-salah', topicFilter: 'all' },
                              })
                            }
                            className={cn(
                              'inline-flex min-h-[46px] items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition',
                              isDark
                                ? 'border-rose-500/40 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25'
                                : 'border-rose-600/30 bg-rose-50 text-rose-700 hover:bg-rose-100'
                            )}
                          >
                            <RotateCcw className="h-4 w-4" />
                            Ulangi {progress.wrongQuestionIds.length} Soal Salah
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Right Telemetry Panel: Live Readiness */}
                    <div
                      className={cn(
                        'flex flex-col justify-between rounded-3xl border p-5 sm:p-6 lg:col-span-4',
                        isDark
                          ? 'border-slate-800/90 bg-slate-900/75'
                          : 'border-stone-300/90 bg-white/95'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p
                            className={cn(
                              'text-xs font-semibold uppercase tracking-wider',
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            )}
                          >
                            Kesiapan Ujian
                          </p>
                          <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="font-display text-4xl font-bold tabular-nums">
                              {metrics.overallReadiness}%
                            </span>
                            <span
                              className={cn(
                                'text-xs',
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              )}
                            >
                              keseluruhan
                            </span>
                          </div>
                        </div>
                        <div
                          className={cn(
                            'flex h-11 w-11 items-center justify-center rounded-2xl border',
                            isDark
                              ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                              : 'border-cyan-600/25 bg-cyan-50 text-cyan-700'
                          )}
                        >
                          <Activity className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="my-4 space-y-3">
                        <div>
                          <div className="mb-1 flex justify-between text-xs font-medium">
                            <span>Cross-Section (67 Plate)</span>
                            <span className="font-mono tabular-nums">
                              {metrics.crossecStudied}/{CROSSEC_ITEMS.length}
                            </span>
                          </div>
                          <div
                            className={cn(
                              'h-2 overflow-hidden rounded-full',
                              isDark ? 'bg-slate-800' : 'bg-stone-200'
                            )}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.round(
                                  (metrics.crossecStudied / CROSSEC_ITEMS.length) * 100
                                )}%`,
                              }}
                              transition={{ duration: 0.45 }}
                              className="h-full rounded-full bg-cyan-400"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="mb-1 flex justify-between text-xs font-medium">
                            <span>Diagram TM 1–5</span>
                            <span className="font-mono tabular-nums">
                              {metrics.tmDiagramsStudied}/{totalTMDiagrams}
                            </span>
                          </div>
                          <div
                            className={cn(
                              'h-2 overflow-hidden rounded-full',
                              isDark ? 'bg-slate-800' : 'bg-stone-200'
                            )}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.round(
                                  (metrics.tmDiagramsStudied / totalTMDiagrams) * 100
                                )}%`,
                              }}
                              transition={{ duration: 0.45 }}
                              className="h-full rounded-full bg-emerald-400"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="mb-1 flex justify-between text-xs font-medium">
                            <span>Bank Soal Dikuasai</span>
                            <span className="font-mono tabular-nums">
                              {metrics.masteredQuestions}/{QUESTION_BANK.length}
                            </span>
                          </div>
                          <div
                            className={cn(
                              'h-2 overflow-hidden rounded-full',
                              isDark ? 'bg-slate-800' : 'bg-stone-200'
                            )}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.round(
                                  (metrics.masteredQuestions / QUESTION_BANK.length) * 100
                                )}%`,
                              }}
                              transition={{ duration: 0.45 }}
                              className="h-full rounded-full bg-rose-400"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateRoute({ kind: 'progres' })}
                        className={cn(
                          'inline-flex min-h-[42px] w-full items-center justify-between rounded-xl border px-3.5 py-2 text-xs font-semibold transition',
                          isDark
                            ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-cyan-500/40'
                            : 'border-stone-200 bg-stone-50 text-slate-700 hover:border-cyan-600/40'
                        )}
                      >
                        <span>Lihat rincian skor & riwayat</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </section>

                  {/* Two Main Tracks: Dosen 1 vs Dosen 2 */}
                  <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Track Dosen 1 */}
                    <div
                      className={cn(
                        'rounded-3xl border p-5 sm:p-6',
                        isDark
                          ? 'border-slate-800/90 bg-slate-900/70'
                          : 'border-stone-300/90 bg-white/95'
                      )}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-xl border',
                              isDark
                                ? 'border-cyan-500/30 bg-cyan-500/15 text-cyan-300'
                                : 'border-cyan-600/30 bg-cyan-50 text-cyan-700'
                            )}
                          >
                            <ScanLine className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-bold">
                              Dosen 1 — Identifikasi Visual
                            </h3>
                            <p
                              className={cn(
                                'text-xs',
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              )}
                            >
                              4 Cross-Section (1 Kepala, 1 Thorax, 2 Abdomen) + Gambar TM
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {[
                          {
                            label: 'Kepala',
                            count: '17 plate',
                            done: metrics.crossecHeadStudied,
                            total: 17,
                            region: 'head' as CrossSecRegion,
                          },
                          {
                            label: 'Thorax',
                            count: '16 plate',
                            done: metrics.crossecThoraxStudied,
                            total: 16,
                            region: 'thorax' as CrossSecRegion,
                          },
                          {
                            label: 'Abdomen',
                            count: '34 plate',
                            done: metrics.crossecAbdomenStudied,
                            total: 34,
                            region: 'abdomen' as CrossSecRegion,
                          },
                          {
                            label: 'TM 1–5',
                            count: `${totalTMDiagrams} gbr`,
                            done: metrics.tmDiagramsStudied,
                            total: totalTMDiagrams,
                            region: null,
                          },
                        ].map((item) => (
                          <motion.button
                            key={item.label}
                            type="button"
                            whileTap={tapScale}
                            onClick={() =>
                              item.region
                                ? navigateRoute({
                                    kind: 'dosen1',
                                    sub: 'crossec',
                                    region: item.region,
                                  })
                                : navigateRoute({ kind: 'dosen1', sub: 'tm' })
                            }
                            className={cn(
                              'flex min-h-[82px] flex-col justify-between rounded-2xl border p-3 text-left transition',
                              isDark
                                ? 'border-slate-800 bg-slate-950/60 hover:border-cyan-500/45'
                                : 'border-stone-200 bg-stone-50 hover:border-cyan-600/45'
                            )}
                          >
                            <div>
                              <div className="font-display text-sm font-bold">{item.label}</div>
                              <div
                                className={cn(
                                  'font-mono text-[11px]',
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                )}
                              >
                                {item.count}
                              </div>
                            </div>
                            <div className="mt-2 font-mono text-[11px] font-semibold text-cyan-400 light:text-cyan-700">
                              {item.done}/{item.total}
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <motion.button
                          type="button"
                          whileTap={tapScale}
                          onClick={() =>
                            navigateRoute({ kind: 'dosen1', sub: 'crossec', region: 'all' })
                          }
                          className={cn(
                            'inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition',
                            isDark
                              ? 'bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25'
                              : 'bg-cyan-600 text-white hover:bg-cyan-700'
                          )}
                        >
                          <Layers className="h-4 w-4" />
                          Buka Atlas Cross-Section
                        </motion.button>
                        <motion.button
                          type="button"
                          whileTap={tapScale}
                          onClick={() => navigateRoute({ kind: 'dosen1', sub: 'tm' })}
                          className={cn(
                            'inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition',
                            isDark
                              ? 'border-slate-700 bg-slate-800/70 text-slate-200 hover:border-emerald-500/45'
                              : 'border-stone-300 bg-stone-100 text-slate-800 hover:border-emerald-600/45'
                          )}
                        >
                          <FileSearch className="h-4 w-4" />
                          Identifikasi TM 1–5
                        </motion.button>
                      </div>
                    </div>

                    {/* Track Dosen 2 */}
                    <div
                      className={cn(
                        'rounded-3xl border p-5 sm:p-6',
                        isDark
                          ? 'border-slate-800/90 bg-slate-900/70'
                          : 'border-stone-300/90 bg-white/95'
                      )}
                    >
                      <div className="mb-4 flex items-center gap-2.5">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-xl border',
                            isDark
                              ? 'border-rose-500/30 bg-rose-500/15 text-rose-300'
                              : 'border-rose-600/30 bg-rose-50 text-rose-700'
                          )}
                        >
                          <HeartPulse className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold">
                            Dosen 2 — 4 Topik Kisi-Kisi Teori
                          </h3>
                          <p
                            className={cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-500')}
                          >
                            Materi terfokus, Tracer Aliran, Kalkulator CO & 12 Saraf Kranial
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {[
                          {
                            id: 'kardiovaskuler' as Dosen2TopicId,
                            title: 'Kardiovaskuler',
                            sub: 'Ruang, Katup, Koroner, Konduksi, CO',
                            icon: HeartPulse,
                          },
                          {
                            id: 'sistemik' as Dosen2TopicId,
                            title: 'Peredaran Darah Besar',
                            sub: 'Aorta, Willisi, Porta Hepatika',
                            icon: GitBranch,
                          },
                          {
                            id: 'limb-atas' as Dosen2TopicId,
                            title: 'Limb Atas (Upper Arm)',
                            sub: 'Subclavia → Palmar & Vena Lengan',
                            icon: Hand,
                          },
                          {
                            id: 'saraf-kranial' as Dosen2TopicId,
                            title: '12 Saraf Kranial',
                            sub: 'N. I–XII, S/M/B, Foramen & Mnemonic',
                            icon: Brain,
                          },
                        ].map((item) => {
                          const Icon = item.icon;
                          const done = progress.studiedItemIds.includes(`dosen2-${item.id}`);
                          return (
                            <motion.button
                              key={item.id}
                              type="button"
                              whileTap={tapScale}
                              onClick={() => navigateRoute({ kind: 'dosen2', topic: item.id })}
                              className={cn(
                                'flex min-h-[70px] items-center justify-between gap-2.5 rounded-2xl border p-3 text-left transition',
                                isDark
                                  ? 'border-slate-800 bg-slate-950/60 hover:border-rose-500/45'
                                  : 'border-stone-200 bg-stone-50 hover:border-rose-600/45'
                              )}
                            >
                              <div className="flex min-w-0 items-center gap-2.5">
                                <Icon className="h-4 w-4 shrink-0 text-rose-400 light:text-rose-600" />
                                <div className="min-w-0">
                                  <div className="truncate font-display text-sm font-bold">
                                    {item.title}
                                  </div>
                                  <div
                                    className={cn(
                                      'truncate text-[11px]',
                                      isDark ? 'text-slate-400' : 'text-slate-500'
                                    )}
                                  >
                                    {item.sub}
                                  </div>
                                </div>
                              </div>
                              {done ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                              ) : (
                                <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {/* Topic Mastery Sparkbars */}
                  <section
                    className={cn(
                      'rounded-3xl border p-5 sm:p-6',
                      isDark
                        ? 'border-slate-800/90 bg-slate-900/65'
                        : 'border-stone-300/90 bg-white/95'
                    )}
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-bold">
                          Peta Penguasaan Soal per Topik Kisi-Kisi
                        </h3>
                        <p
                          className={cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-500')}
                        >
                          Klik topik mana saja untuk langsung berlatih soalnya.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateRoute({ kind: 'ujian', activeQuiz: null })}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-cyan-500/35 px-3 py-1.5 text-xs font-semibold text-cyan-400 light:text-cyan-700"
                      >
                        <Target className="h-3.5 w-3.5" />
                        Semua Mode Latihan
                      </button>
                    </div>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                    >
                      {metrics.topicBreakdown.map((item) => (
                        <motion.button
                          key={item.topic}
                          type="button"
                          whileTap={tapScale}
                          onClick={() =>
                            navigateRoute({
                              kind: 'ujian',
                              activeQuiz: { mode: 'belajar', topicFilter: item.topic },
                            })
                          }
                          className={cn(
                            'rounded-2xl border p-3.5 text-left transition',
                            isDark
                              ? 'border-slate-800 bg-slate-950/60 hover:border-cyan-500/40'
                              : 'border-stone-200 bg-stone-50 hover:border-cyan-600/40'
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                              <span
                                className={cn(
                                  'rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold',
                                  item.dosen === 1
                                    ? 'bg-cyan-500/15 text-cyan-300 light:text-cyan-800'
                                    : 'bg-rose-500/15 text-rose-300 light:text-rose-800'
                                )}
                              >
                                D{item.dosen}
                              </span>
                              <span className="truncate font-display text-sm font-bold">
                                {item.label}
                              </span>
                            </div>
                            <span className="shrink-0 font-mono text-xs font-semibold tabular-nums">
                              {item.mastered}/{item.total} ({item.pct}%)
                            </span>
                          </div>
                          <div
                            className={cn(
                              'mt-2.5 h-1.5 overflow-hidden rounded-full',
                              isDark ? 'bg-slate-800' : 'bg-stone-200'
                            )}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5 }}
                              className={cn(
                                'h-full rounded-full',
                                item.dosen === 1 ? 'bg-cyan-400' : 'bg-rose-400'
                              )}
                            />
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  </section>
                </motion.div>
              )}

              {route.kind === 'dosen1' && (
                <motion.div
                  key={`page-dosen1-${route.sub}`}
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-5"
                >
                  {/* Switcher between Cross-Section and TM 1-5 */}
                  <div
                    className={cn(
                      'inline-flex w-full flex-wrap gap-2 rounded-2xl border p-1.5 sm:w-auto',
                      isDark
                        ? 'border-slate-800 bg-slate-900/80'
                        : 'border-stone-300 bg-white/90'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        navigateRoute({ kind: 'dosen1', sub: 'crossec', region: 'all' })
                      }
                      className={cn(
                        'inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition sm:flex-initial sm:text-sm',
                        route.sub === 'crossec'
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : isDark
                            ? 'text-slate-300 hover:bg-slate-800'
                            : 'text-slate-700 hover:bg-stone-100'
                      )}
                    >
                      <ScanLine className="h-4 w-4" />
                      Cross-Section (67 Plate)
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateRoute({ kind: 'dosen1', sub: 'tm' })}
                      className={cn(
                        'inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition sm:flex-initial sm:text-sm',
                        route.sub === 'tm'
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : isDark
                            ? 'text-slate-300 hover:bg-slate-800'
                            : 'text-slate-700 hover:bg-stone-100'
                      )}
                    >
                      <FileSearch className="h-4 w-4" />
                      Identifikasi Gambar TM 1–5
                    </button>
                  </div>

                  {route.sub === 'crossec' ? (
                    <CrossSecViewer
                      key={`crossec-${route.region || 'all'}`}
                      items={CROSSEC_ITEMS}
                      studiedIds={progress.studiedItemIds}
                      onToggleStudied={handleToggleStudied}
                      initialRegion={route.region || 'all'}
                      onStartRegionQuiz={(reg) => {
                        const topicMap: Record<CrossSecRegion | 'all', QuestionTopic | 'all'> = {
                          all: 'crossec-head',
                          head: 'crossec-head',
                          thorax: 'crossec-thorax',
                          abdomen: 'crossec-abdomen',
                        };
                        navigateRoute({
                          kind: 'ujian',
                          activeQuiz: { mode: 'belajar', topicFilter: topicMap[reg] },
                        });
                      }}
                    />
                  ) : (
                    <TMIdentifikasiViewer
                      modules={TM_MODULES}
                      studiedIds={progress.studiedItemIds}
                      onToggleStudied={handleToggleStudied}
                      onStartTMQuiz={() =>
                        navigateRoute({
                          kind: 'ujian',
                          activeQuiz: { mode: 'belajar', topicFilter: 'tm-identifikasi' },
                        })
                      }
                    />
                  )}
                </motion.div>
              )}

              {route.kind === 'dosen2' && (
                <motion.div
                  key="page-dosen2"
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Dosen2ModuleViewer
                    data={DOSEN2_DATA}
                    initialTopic={route.topic}
                    studiedIds={progress.studiedItemIds}
                    onToggleStudied={handleToggleStudied}
                    onTopicChange={(topic) => navigateRoute({ kind: 'dosen2', topic })}
                    onStartTopicQuiz={(topic) =>
                      navigateRoute({
                        kind: 'ujian',
                        activeQuiz: { mode: 'belajar', topicFilter: topic },
                      })
                    }
                  />
                </motion.div>
              )}

              {route.kind === 'ujian' && (
                <motion.div
                  key={route.activeQuiz ? `quiz-${route.activeQuiz.mode}` : 'quiz-hub'}
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-5"
                >
                  {route.activeQuiz ? (
                    <QuizEngine
                      allQuestions={QUESTION_BANK}
                      mode={route.activeQuiz.mode}
                      topicFilter={route.activeQuiz.topicFilter || 'all'}
                      wrongQuestionIds={progress.wrongQuestionIds}
                      activeDraft={progress.activeQuizDraft}
                      onSaveDraft={handleSaveDraft}
                      onCompleteQuiz={handleCompleteQuiz}
                      onExit={() => navigateRoute({ kind: 'ujian', activeQuiz: null })}
                    />
                  ) : (
                    <>
                      {/* Primary Simulasi UAS & Drill Salah Cards */}
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div
                          className={cn(
                            'rounded-3xl border p-5 sm:p-6 lg:col-span-2',
                            isDark
                              ? 'border-cyan-500/35 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/35'
                              : 'border-cyan-600/30 bg-gradient-to-br from-white to-cyan-50/70'
                          )}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3 py-1 font-mono text-xs font-bold text-cyan-300 light:text-cyan-800">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              FORMAT RESMI KISI-KISI UAS
                            </span>
                            <span className="font-mono text-xs opacity-75">
                              28 Soal • 35 Menit
                            </span>
                          </div>
                          <h2 className="mt-3 font-display text-2xl font-bold">
                            Simulasi Ujian Akhir Semester (Acak)
                          </h2>
                          <p
                            className={cn(
                              'mt-1.5 text-sm leading-relaxed',
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            )}
                          >
                            Setiap paket mengacak tepat{' '}
                            <strong>4 Cross-Section wajib</strong> (1 Kepala, 1 Thorax, 2 Abdomen
                            dari level potongan berbeda) + <strong>4 Identifikasi Gambar TM</strong>{' '}
                            + <strong>20 Soal Dosen 2</strong> (5 Kardiovaskuler, 5 Sistemik, 5 Limb
                            Atas, 5 Saraf Kranial). Label teks tercetak otomatis tertutup tirai buram.
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2.5">
                            <motion.button
                              type="button"
                              whileTap={tapScale}
                              onClick={() =>
                                navigateRoute({
                                  kind: 'ujian',
                                  activeQuiz: { mode: 'simulasi-uas', topicFilter: 'all' },
                                })
                              }
                              className="inline-flex min-h-[46px] items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20"
                            >
                              <Play className="h-4 w-4 fill-current" />
                              Mulai Simulasi UAS
                            </motion.button>
                            <motion.button
                              type="button"
                              whileTap={tapScale}
                              onClick={() =>
                                navigateRoute({
                                  kind: 'ujian',
                                  activeQuiz: { mode: 'belajar', topicFilter: 'all' },
                                })
                              }
                              className={cn(
                                'inline-flex min-h-[46px] items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold',
                                isDark
                                  ? 'border-slate-700 bg-slate-800/80 text-slate-200'
                                  : 'border-stone-300 bg-white text-slate-800'
                              )}
                            >
                              <BookOpen className="h-4 w-4" />
                              Latih Semua 116 Soal (Mode Belajar)
                            </motion.button>
                          </div>
                        </div>

                        {/* Wrong Questions Drill Card */}
                        <div
                          className={cn(
                            'flex flex-col justify-between rounded-3xl border p-5 sm:p-6',
                            isDark
                              ? 'border-slate-800 bg-slate-900/75'
                              : 'border-stone-300 bg-white/95'
                          )}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span
                                className={cn(
                                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                                  progress.wrongQuestionIds.length > 0
                                    ? 'bg-rose-500/20 text-rose-300 light:text-rose-700'
                                    : 'bg-emerald-500/20 text-emerald-300 light:text-emerald-700'
                                )}
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Ulangi Soal Salah
                              </span>
                              <span className="font-mono text-lg font-bold tabular-nums">
                                {progress.wrongQuestionIds.length}
                              </span>
                            </div>
                            <h3 className="mt-3 font-display text-lg font-bold">
                              Drill Titik Lemah
                            </h3>
                            <p
                              className={cn(
                                'mt-1 text-xs leading-relaxed',
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              )}
                            >
                              {progress.wrongQuestionIds.length > 0
                                ? `Ada ${progress.wrongQuestionIds.length} soal yang pernah salah. Jawab benar di sini untuk membersihkannya dari daftar.`
                                : 'Belum ada soal salah tercatat. Mulai latihan untuk mendeteksi materi yang perlu diulang.'}
                            </p>
                          </div>

                          <motion.button
                            type="button"
                            whileTap={tapScale}
                            onClick={() =>
                              navigateRoute({
                                kind: 'ujian',
                                activeQuiz: { mode: 'ulang-salah', topicFilter: 'all' },
                              })
                            }
                            className={cn(
                              'mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition',
                              progress.wrongQuestionIds.length > 0
                                ? 'border-rose-500/50 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30 light:text-rose-800'
                                : isDark
                                  ? 'border-slate-700 bg-slate-800/70 text-slate-300'
                                  : 'border-stone-300 bg-stone-100 text-slate-700'
                            )}
                          >
                            <Sparkles className="h-4 w-4" />
                            {progress.wrongQuestionIds.length > 0
                              ? 'Mulai Drill Soal Salah'
                              : 'Buka Daftar Soal Salah'}
                          </motion.button>
                        </div>
                      </div>

                      {/* Topic-based Quiz Grid */}
                      <section
                        className={cn(
                          'rounded-3xl border p-5 sm:p-6',
                          isDark
                            ? 'border-slate-800/90 bg-slate-900/70'
                            : 'border-stone-300/90 bg-white/95'
                        )}
                      >
                        <h3 className="font-display text-lg font-bold">
                          Latihan Fokus per Topik Kisi-Kisi
                        </h3>
                        <p
                          className={cn(
                            'mt-0.5 text-xs',
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          )}
                        >
                          Pilih <strong>Mode Belajar</strong> (pembahasan langsung keluar tiap nomor)
                          atau <strong>Mode Ujian</strong> (timer & skor akhir).
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {metrics.topicBreakdown.map((item) => (
                            <div
                              key={item.topic}
                              className={cn(
                                'flex flex-col justify-between rounded-2xl border p-4',
                                isDark
                                  ? 'border-slate-800 bg-slate-950/60'
                                  : 'border-stone-200 bg-stone-50/90'
                              )}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={cn(
                                      'rounded-md px-2 py-0.5 font-mono text-[11px] font-bold',
                                      item.dosen === 1
                                        ? 'bg-cyan-500/15 text-cyan-300 light:text-cyan-800'
                                        : 'bg-rose-500/15 text-rose-300 light:text-rose-800'
                                    )}
                                  >
                                    Dosen {item.dosen} • {item.total} Soal
                                  </span>
                                  <span className="font-mono text-xs font-semibold tabular-nums">
                                    {item.mastered}/{item.total} Benar
                                  </span>
                                </div>
                                <h4 className="mt-2 font-display text-base font-bold">
                                  {item.label}
                                </h4>
                                <p
                                  className={cn(
                                    'mt-1 text-xs',
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  )}
                                >
                                  {item.desc}
                                </p>
                              </div>

                              <div className="mt-4 flex gap-2">
                                <motion.button
                                  type="button"
                                  whileTap={tapScale}
                                  onClick={() =>
                                    navigateRoute({
                                      kind: 'ujian',
                                      activeQuiz: { mode: 'belajar', topicFilter: item.topic },
                                    })
                                  }
                                  className={cn(
                                    'inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition',
                                    isDark
                                      ? 'bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30'
                                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
                                  )}
                                >
                                  <BookOpen className="h-3.5 w-3.5" />
                                  Belajar
                                </motion.button>
                                <motion.button
                                  type="button"
                                  whileTap={tapScale}
                                  onClick={() =>
                                    navigateRoute({
                                      kind: 'ujian',
                                      activeQuiz: { mode: 'ujian', topicFilter: item.topic },
                                    })
                                  }
                                  className={cn(
                                    'inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition',
                                    isDark
                                      ? 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-amber-500/45'
                                      : 'border-stone-300 bg-white text-slate-800 hover:border-amber-600/45'
                                  )}
                                >
                                  <ClipboardCheck className="h-3.5 w-3.5" />
                                  Ujian
                                </motion.button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </>
                  )}
                </motion.div>
              )}

              {route.kind === 'progres' && (
                <motion.div
                  key="page-progres"
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-5"
                >
                  {/* Profile Name + Reset Controls */}
                  <section className="grid grid-cols-1 gap-4 md:grid-cols-12">
                    <div
                      className={cn(
                        'rounded-3xl border p-5 sm:p-6 md:col-span-7',
                        isDark
                          ? 'border-slate-800/90 bg-slate-900/75'
                          : 'border-stone-300/90 bg-white/95'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="h-5 w-5 text-cyan-400 light:text-cyan-700" />
                        <h2 className="font-display text-lg font-bold">Identitas Lokal</h2>
                      </div>
                      <p
                        className={cn(
                          'mt-1 text-xs',
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        )}
                      >
                        Opsional. Disimpan murni di browser perangkat ini (`localStorage`), bukan
                        server. Perangkat baru selalu mulai dari kondisi 0%.
                      </p>

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => handleSaveName(e.target.value)}
                          placeholder="Ketik nama panggilan (kosongkan jika tidak perlu)"
                          aria-label="Nama Mahasiswa"
                          className={cn(
                            'min-h-[44px] flex-1 rounded-xl border px-3.5 py-2 text-sm outline-none transition',
                            isDark
                              ? 'border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400'
                              : 'border-stone-300 bg-stone-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-600'
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold',
                              isDark
                                ? 'border-slate-800 bg-slate-950/70 text-emerald-300'
                                : 'border-stone-200 bg-stone-100 text-emerald-700'
                            )}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Auto-Tersimpan
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'flex flex-col justify-between rounded-3xl border p-5 sm:p-6 md:col-span-5',
                        isDark
                          ? 'border-rose-500/25 bg-slate-900/75'
                          : 'border-rose-300/70 bg-white/95'
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2 text-rose-400 light:text-rose-700">
                          <Trash2 className="h-5 w-5" />
                          <h2 className="font-display text-lg font-bold">Reset Data Belajar</h2>
                        </div>
                        <p
                          className={cn(
                            'mt-1 text-xs leading-relaxed',
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          )}
                        >
                          Hapus seluruh progres hafalan, daftar soal salah, draft kuis, dan riwayat
                          nilai untuk mulai ulang dari 0%.
                        </p>
                      </div>
                      <motion.button
                        type="button"
                        whileTap={tapScale}
                        onClick={() => setShowResetModal(true)}
                        className={cn(
                          'mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition',
                          isDark
                            ? 'border-rose-500/40 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25'
                            : 'border-rose-500/40 bg-rose-50 text-rose-700 hover:bg-rose-100'
                        )}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset Data / Mulai dari Awal
                      </motion.button>
                    </div>
                  </section>

                  {/* Topic Sparkbars */}
                  <section
                    className={cn(
                      'rounded-3xl border p-5 sm:p-6',
                      isDark
                        ? 'border-slate-800/90 bg-slate-900/75'
                        : 'border-stone-300/90 bg-white/95'
                    )}
                  >
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-cyan-400 light:text-cyan-700" />
                        <h3 className="font-display text-lg font-bold">
                          Rekap Penguasaan per Topik
                        </h3>
                      </div>
                      <span className="font-mono text-sm font-bold tabular-nums">
                        {metrics.masteredQuestions}/{QUESTION_BANK.length} Soal
                      </span>
                    </div>

                    <div className="space-y-3">
                      {metrics.topicBreakdown.map((item) => (
                        <div
                          key={item.topic}
                          className={cn(
                            'rounded-2xl border p-3.5',
                            isDark
                              ? 'border-slate-800 bg-slate-950/60'
                              : 'border-stone-200 bg-stone-50'
                          )}
                        >
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <span className="font-display text-sm font-bold">{item.label}</span>
                            <span className="font-mono text-xs font-semibold tabular-nums">
                              {item.mastered}/{item.total} ({item.pct}%)
                            </span>
                          </div>
                          <div
                            className={cn(
                              'h-2 overflow-hidden rounded-full',
                              isDark ? 'bg-slate-800' : 'bg-stone-200'
                            )}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.45 }}
                              className={cn(
                                'h-full rounded-full',
                                item.dosen === 1 ? 'bg-cyan-400' : 'bg-rose-400'
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Quiz History */}
                  <section
                    className={cn(
                      'rounded-3xl border p-5 sm:p-6',
                      isDark
                        ? 'border-slate-800/90 bg-slate-900/75'
                        : 'border-stone-300/90 bg-white/95'
                    )}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-400 light:text-amber-700" />
                      <h3 className="font-display text-lg font-bold">Riwayat Nilai Kuis & UAS</h3>
                    </div>

                    {progress.quizHistory.length === 0 ? (
                      <div
                        className={cn(
                          'rounded-2xl border border-dashed p-6 text-center',
                          isDark ? 'border-slate-700 text-slate-400' : 'border-stone-300 text-slate-500'
                        )}
                      >
                        <p className="text-sm font-medium">
                          Belum ada riwayat nilai. Selesaikan minimal 1 sesi latihan atau Simulasi
                          UAS untuk melihat grafik pencapaianmu.
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            navigateRoute({
                              kind: 'ujian',
                              activeQuiz: { mode: 'simulasi-uas', topicFilter: 'all' },
                            })
                          }
                          className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          Coba Simulasi UAS Sekarang
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {progress.quizHistory.map((h) => (
                          <div
                            key={h.id}
                            className={cn(
                              'flex flex-col justify-between gap-2 rounded-2xl border p-3.5 sm:flex-row sm:items-center',
                              isDark
                                ? 'border-slate-800 bg-slate-950/60'
                                : 'border-stone-200 bg-stone-50'
                            )}
                          >
                            <div>
                              <div className="font-display text-sm font-bold">{h.topicLabel}</div>
                              <div
                                className={cn(
                                  'mt-0.5 flex flex-wrap gap-2 font-mono text-[11px]',
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                )}
                              >
                                <span>{new Date(h.timestamp).toLocaleString('id-ID')}</span>
                                {h.dosen1Score && (
                                  <span>
                                    D1: {h.dosen1Score.correct}/{h.dosen1Score.total}
                                  </span>
                                )}
                                {h.dosen2Score && (
                                  <span>
                                    D2: {h.dosen2Score.correct}/{h.dosen2Score.total}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm font-bold tabular-nums">
                                {h.score}/{h.total}
                              </span>
                              <span
                                className={cn(
                                  'rounded-xl px-2.5 py-1 font-mono text-xs font-bold tabular-nums',
                                  h.percentage >= 75
                                    ? 'bg-emerald-500/20 text-emerald-300 light:text-emerald-800'
                                    : h.percentage >= 50
                                      ? 'bg-amber-500/20 text-amber-300 light:text-amber-800'
                                      : 'bg-rose-500/20 text-rose-300 light:text-rose-800'
                                )}
                              >
                                {h.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </motion.div>
              )}

              {route.kind === 'not-found' && (
                <motion.div
                  key="page-404"
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={cn(
                    'mx-auto max-w-lg rounded-3xl border p-8 text-center',
                    isDark
                      ? 'border-slate-800 bg-slate-900/80'
                      : 'border-stone-300 bg-white/95'
                  )}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                    <AlertTriangle className="h-7 w-7" />
                  </div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 light:text-cyan-700">
                    Error 404 • Potongan Tidak Ditemukan
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold">
                    Rute Anatomi Tidak Tersedia
                  </h2>
                  <p
                    className={cn('mt-2 text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}
                  >
                    Alamat <code className="font-mono">{route.path}</code> tidak terdaftar dalam
                    kisi-kisi UAS. Gunakan tombol di bawah untuk kembali ke Beranda.
                  </p>
                  <motion.button
                    type="button"
                    whileTap={tapScale}
                    onClick={() => navigateRoute({ kind: 'home' })}
                    className="mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950"
                  >
                    <Home className="h-4 w-4" />
                    Kembali ke Beranda
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <MobileBottomNav
            activeTab={activeNavTab}
            onNavigate={handleNavTab}
            wrongCount={progress.wrongQuestionIds.length}
          />

          {/* Reset Confirmation Modal */}
          <AnimatePresence>
            {showResetModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                onClick={() => setShowResetModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 8 }}
                  transition={springSnap}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="reset-dialog-title"
                  className={cn(
                    'w-full max-w-md rounded-3xl border p-6 shadow-2xl',
                    isDark
                      ? 'border-slate-700 bg-slate-900 text-slate-100'
                      : 'border-stone-300 bg-white text-slate-900'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-rose-400 light:text-rose-700">
                      <AlertTriangle className="h-5 w-5" />
                      <h3 id="reset-dialog-title" className="font-display text-lg font-bold">
                        Mulai Ulang dari 0%?
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowResetModal(false)}
                      aria-label="Tutup dialog"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/60"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p
                    className={cn(
                      'mt-3 text-sm leading-relaxed',
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    )}
                  >
                    Tindakan ini akan menghapus seluruh status potongan yang ditandai dikuasai,
                    riwayat skor Simulasi UAS, daftar soal salah, dan draft kuis yang tersimpan di
                    browser ini.
                  </p>

                  <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setShowResetModal(false)}
                      className={cn(
                        'min-h-[44px] rounded-xl border px-4 py-2 text-sm font-semibold',
                        isDark
                          ? 'border-slate-700 bg-slate-800 text-slate-200'
                          : 'border-stone-300 bg-stone-100 text-slate-800'
                      )}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmReset}
                      className="min-h-[44px] rounded-xl bg-rose-500 px-4 py-2 text-sm font-bold text-white hover:bg-rose-600"
                    >
                      Ya, Reset Semua Data
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
