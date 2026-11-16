import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Layers,
  ListChecks,
  RotateCcw,
  Shuffle,
  Sparkles,
  Zap,
  ZoomIn,
} from 'lucide-react';
import type { NumberedStructure, TMModule } from '../types/anatomy';
import {
  cn,
  springSnap,
  tabIndicatorTransition,
  tapScale,
} from '../lib/motion';

export interface TMIdentifikasiViewerProps {
  modules: TMModule[];
  studiedIds: string[];
  onToggleStudied: (id: string) => void;
  onStartTMQuiz: () => void;
}

type StudySubMode = 'list' | 'flashcard';

const ACCENT_CLASSES: Record<
  TMModule['accentColor'],
  {
    badge: string;
    borderActive: string;
    bgActive: string;
    bar: string;
    numberChip: string;
  }
> = {
  cyan: {
    badge:
      'border-cyan-500/35 bg-cyan-500/12 text-cyan-300 light:border-cyan-700/30 light:bg-cyan-600/10 light:text-cyan-800',
    borderActive: 'border-cyan-400/60 light:border-cyan-700',
    bgActive: 'bg-cyan-500/18 light:bg-cyan-600/12',
    bar: 'from-cyan-400 to-sky-400',
    numberChip: 'bg-cyan-500/20 text-cyan-300 light:bg-cyan-600 light:text-white',
  },
  rose: {
    badge:
      'border-rose-500/35 bg-rose-500/12 text-rose-300 light:border-rose-700/30 light:bg-rose-600/10 light:text-rose-800',
    borderActive: 'border-rose-400/60 light:border-rose-700',
    bgActive: 'bg-rose-500/18 light:bg-rose-600/12',
    bar: 'from-rose-400 to-pink-400',
    numberChip: 'bg-rose-500/20 text-rose-300 light:bg-rose-600 light:text-white',
  },
  emerald: {
    badge:
      'border-emerald-500/35 bg-emerald-500/12 text-emerald-300 light:border-emerald-700/30 light:bg-emerald-600/10 light:text-emerald-800',
    borderActive: 'border-emerald-400/60 light:border-emerald-700',
    bgActive: 'bg-emerald-500/18 light:bg-emerald-600/12',
    bar: 'from-emerald-400 to-teal-400',
    numberChip:
      'bg-emerald-500/20 text-emerald-300 light:bg-emerald-600 light:text-white',
  },
  amber: {
    badge:
      'border-amber-500/35 bg-amber-500/12 text-amber-300 light:border-amber-700/30 light:bg-amber-600/10 light:text-amber-800',
    borderActive: 'border-amber-400/60 light:border-amber-700',
    bgActive: 'bg-amber-500/18 light:bg-amber-600/12',
    bar: 'from-amber-400 to-orange-400',
    numberChip:
      'bg-amber-500/20 text-amber-300 light:bg-amber-600 light:text-white',
  },
};

export function TMIdentifikasiViewer({
  modules,
  studiedIds,
  onToggleStudied,
  onStartTMQuiz,
}: TMIdentifikasiViewerProps) {
  const sortedModules = useMemo(
    () => [...modules].sort((a, b) => a.tmNumber - b.tmNumber),
    [modules]
  );

  const [activeModuleId, setActiveModuleId] = useState<string>(
    sortedModules[0]?.id ?? ''
  );
  const [activeDiagramIndex, setActiveDiagramIndex] = useState(0);
  const [subMode, setSubMode] = useState<StudySubMode>('list');
  const [zoom, setZoom] = useState<number>(1);
  const [revealedKeys, setRevealedKeys] = useState<string[]>([]);
  const [rememberedKeys, setRememberedKeys] = useState<string[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<NumberedStructure[] | null>(
    null
  );

  const studiedSet = useMemo(() => new Set(studiedIds), [studiedIds]);

  const activeModule = useMemo(
    () =>
      sortedModules.find((m) => m.id === activeModuleId) ?? sortedModules[0],
    [sortedModules, activeModuleId]
  );

  const activeDiagram =
    activeModule?.diagrams[activeDiagramIndex] ?? activeModule?.diagrams[0];

  // Ensure activeModuleId stays valid if modules prop updates
  useEffect(() => {
    if (!activeModule && sortedModules[0]) {
      setActiveModuleId(sortedModules[0].id);
      setActiveDiagramIndex(0);
    }
  }, [activeModule, sortedModules]);

  // Reset flashcard/zoom state when diagram changes
  useEffect(() => {
    setZoom(1);
    setRevealedKeys([]);
    setRememberedKeys([]);
    setShuffledOrder(null);
  }, [activeModule?.id, activeDiagram?.id]);

  if (!activeModule || !activeDiagram) {
    return (
      <div className="clinical-surface rounded-2xl p-6 text-center">
        <p className="text-sm text-slate-400 light:text-slate-600">
          Belum ada modul identifikasi TM yang dimuat.
        </p>
      </div>
    );
  }

  const accent = ACCENT_CLASSES[activeModule.accentColor];
  const moduleDoneCount = activeModule.diagrams.filter((d) =>
    studiedSet.has(d.id)
  ).length;
  const modulePct =
    activeModule.diagrams.length > 0
      ? Math.round((moduleDoneCount / activeModule.diagrams.length) * 100)
      : 0;

  const isDiagramStudied = studiedSet.has(activeDiagram.id);
  const structuresToDisplay = shuffledOrder ?? activeDiagram.keyStructures;

  const getStructureKey = (st: NumberedStructure, idx: number) =>
    `${activeDiagram.id}-${st.no}-${idx}`;

  const toggleReveal = (key: string) => {
    setRevealedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const markRemembered = (key: string, remembered: boolean) => {
    setRememberedKeys((prev) => {
      if (remembered) {
        return prev.includes(key) ? prev : [...prev, key];
      }
      return prev.filter((k) => k !== key);
    });
  };

  const handleShuffleFlashcards = () => {
    const shuffled = [...activeDiagram.keyStructures].sort(
      () => Math.random() - 0.5
    );
    setShuffledOrder(shuffled);
    setRevealedKeys([]);
    setRememberedKeys([]);
  };

  const handleRevealAll = () => {
    setRevealedKeys(
      structuresToDisplay.map((st, idx) => getStructureKey(st, idx))
    );
  };

  const handleHideAll = () => {
    setRevealedKeys([]);
  };

  return (
    <section className="space-y-4">
      {/* TM 1 - TM 5 Module Tabs */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        {sortedModules.map((mod) => {
          const isActive = mod.id === activeModule.id;
          const done = mod.diagrams.filter((d) => studiedSet.has(d.id)).length;
          const modAccent = ACCENT_CLASSES[mod.accentColor];

          return (
            <motion.button
              key={mod.id}
              type="button"
              whileTap={tapScale}
              onClick={() => {
                setActiveModuleId(mod.id);
                setActiveDiagramIndex(0);
              }}
              className={cn(
                'relative inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition',
                isActive
                  ? cn(modAccent.borderActive, 'text-slate-100 light:text-slate-950')
                  : 'border-slate-800 bg-slate-900/75 text-slate-300 hover:border-slate-700 light:border-stone-300 light:bg-white light:text-slate-700'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="tm-module-pill"
                  transition={tabIndicatorTransition}
                  className={cn('absolute inset-0 rounded-xl', modAccent.bgActive)}
                />
              )}
              <span
                className={cn(
                  'relative z-10 rounded-md px-2 py-0.5 font-mono text-xs font-bold',
                  modAccent.numberChip
                )}
              >
                TM {mod.tmNumber}
              </span>
              <span className="relative z-10 max-w-[140px] truncate text-xs font-semibold sm:max-w-[180px]">
                {mod.title}
              </span>
              <span className="relative z-10 font-mono text-[11px] text-slate-400 light:text-slate-600">
                {done}/{mod.diagrams.length}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Active TM Module Banner */}
      <div className="clinical-surface rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'rounded-lg border px-2.5 py-0.5 font-mono text-xs font-bold',
                  accent.badge
                )}
              >
                Tatap Muka {activeModule.tmNumber}
              </span>
              <span className="font-mono text-xs text-slate-400 light:text-slate-600">
                {activeModule.diagrams.length} diagram
              </span>
            </div>
            <h2 className="mt-2 font-display text-lg font-bold tracking-tight sm:text-xl">
              {activeModule.title}
            </h2>
            <p className="mt-0.5 text-xs text-slate-400 light:text-slate-600 sm:text-sm">
              {activeModule.subtitle}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400 light:text-slate-600">
              <FileText className="h-3.5 w-3.5 text-cyan-400 light:text-cyan-700" />
              {activeModule.sourceSummary}
            </p>
          </div>

          <motion.button
            type="button"
            whileTap={tapScale}
            onClick={onStartTMQuiz}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-500 px-4 text-xs font-bold text-slate-950 shadow-md transition hover:brightness-110 sm:text-sm"
          >
            <Zap className="h-4 w-4" />
            <span>Kuis Identifikasi TM</span>
          </motion.button>
        </div>

        {/* Module Progress Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-400 light:text-slate-600">
              Progres Modul TM {activeModule.tmNumber}
            </span>
            <span className="font-mono font-semibold text-cyan-300 light:text-cyan-800">
              {moduleDoneCount}/{activeModule.diagrams.length} ({modulePct}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 light:bg-stone-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${modulePct}%` }}
              transition={springSnap}
              className={cn('h-full rounded-full bg-gradient-to-r', accent.bar)}
            />
          </div>
        </div>
      </div>

      {/* Diagram Picker Chips */}
      {activeModule.diagrams.length > 1 && (
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          {activeModule.diagrams.map((diag, idx) => {
            const active = idx === activeDiagramIndex;
            const done = studiedSet.has(diag.id);

            return (
              <motion.button
                key={diag.id}
                type="button"
                whileTap={tapScale}
                onClick={() => setActiveDiagramIndex(idx)}
                className={cn(
                  'inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition',
                  active
                    ? cn(
                        accent.borderActive,
                        accent.bgActive,
                        'text-slate-100 light:text-slate-950'
                      )
                    : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 light:border-stone-300 light:bg-white light:text-slate-700'
                )}
              >
                <span className="font-mono text-[11px] text-slate-400 light:text-slate-600">
                  #{idx + 1}
                </span>
                <span className="max-w-[165px] truncate">
                  {diag.indonesianTitle}
                </span>
                {done && (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 light:text-emerald-600" />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Active Diagram Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDiagram.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={springSnap}
          className="space-y-4"
        >
          {/* Diagram Details + Zoom + Prev/Next */}
          <div className="clinical-surface rounded-2xl p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300 light:bg-stone-200 light:text-slate-800">
                    Diagram {activeDiagramIndex + 1} /{' '}
                    {activeModule.diagrams.length}
                  </span>
                  {activeDiagram.hasPrintedNumbers && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/35 bg-amber-500/12 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-300 light:border-amber-600/30 light:bg-amber-100 light:text-amber-800">
                      <Layers className="h-3 w-3" />
                      Gambar Bernomor
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-display text-base font-bold sm:text-lg">
                  {activeDiagram.indonesianTitle}
                </h3>
                <p className="text-xs text-slate-400 light:text-slate-600">
                  {activeDiagram.title} • {activeDiagram.source}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 light:text-slate-700 sm:text-sm">
                  {activeDiagram.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  disabled={activeDiagramIndex <= 0}
                  onClick={() =>
                    setActiveDiagramIndex((prev) => Math.max(0, prev - 1))
                  }
                  aria-label="Diagram sebelumnya"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-200 disabled:opacity-40 light:border-stone-300 light:bg-white light:text-slate-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={
                    activeDiagramIndex >= activeModule.diagrams.length - 1
                  }
                  onClick={() =>
                    setActiveDiagramIndex((prev) =>
                      Math.min(activeModule.diagrams.length - 1, prev + 1)
                    )
                  }
                  aria-label="Diagram berikutnya"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-200 disabled:opacity-40 light:border-stone-300 light:bg-white light:text-slate-800"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Zoom & Mark Studied Row */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 light:border-stone-200">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 light:text-slate-600">
                  <ZoomIn className="h-3.5 w-3.5" />
                  Zoom:
                </span>
                {[1, 1.5, 2].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setZoom(z)}
                    className={cn(
                      'min-h-[40px] min-w-[44px] rounded-xl border px-2.5 font-mono text-xs font-semibold transition',
                      zoom === z
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:border-cyan-700 light:bg-cyan-600 light:text-white'
                        : 'border-slate-700/80 bg-slate-900/70 text-slate-300 light:border-stone-300 light:bg-stone-100 light:text-slate-700'
                    )}
                  >
                    {z}x
                  </button>
                ))}
                {zoom !== 1 && (
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border border-slate-700/80 px-2.5 text-xs font-semibold text-slate-300 light:border-stone-300 light:text-slate-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                )}
              </div>

              <motion.button
                type="button"
                whileTap={tapScale}
                onClick={() => onToggleStudied(activeDiagram.id)}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3.5 text-xs font-bold transition',
                  isDiagramStudied
                    ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 light:border-emerald-600 light:bg-emerald-600 light:text-white'
                    : 'border-cyan-500/50 bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                )}
              >
                {isDiagramStudied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Diagram Dikuasai</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Tandai Diagram Dikuasai</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Image Viewport */}
          <div className="max-h-[62vh] w-full overflow-auto rounded-2xl border border-slate-800 bg-[#050811] light:border-stone-300">
            <div
              className="mx-auto transition-[width] duration-200"
              style={{ width: `${zoom * 100}%` }}
            >
              <img
                src={activeDiagram.imageUrl}
                alt={activeDiagram.indonesianTitle}
                className="block h-auto w-full select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Sub-mode Toggle: Daftar Struktur vs Flashcard / Uji Hafalan */}
          <div className="clinical-surface rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="grid w-full grid-cols-2 gap-1.5 rounded-xl border border-slate-800 bg-slate-950/70 p-1 sm:w-auto light:border-stone-300 light:bg-stone-100">
                <button
                  type="button"
                  onClick={() => setSubMode('list')}
                  className={cn(
                    'inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-bold transition',
                    subMode === 'list'
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900'
                  )}
                >
                  <ListChecks className="h-4 w-4" />
                  <span>Lihat Daftar Struktur</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubMode('flashcard')}
                  className={cn(
                    'inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-bold transition',
                    subMode === 'flashcard'
                      ? 'bg-rose-500 text-white shadow'
                      : 'text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900'
                  )}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Flashcard / Uji Hafalan</span>
                </button>
              </div>

              {subMode === 'flashcard' && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1.5 font-mono text-xs font-semibold text-emerald-300 light:bg-emerald-100 light:text-emerald-800">
                    Hafal: {rememberedKeys.length}/
                    {activeDiagram.keyStructures.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleShuffleFlashcards}
                    className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-slate-700 px-2.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 light:border-stone-300 light:text-slate-800"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                    Acak
                  </button>
                  <button
                    type="button"
                    onClick={handleRevealAll}
                    className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-slate-700 px-2.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 light:border-stone-300 light:text-slate-800"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Buka
                  </button>
                  <button
                    type="button"
                    onClick={handleHideAll}
                    className="inline-flex min-h-[38px] items-center gap-1 rounded-lg border border-slate-700 px-2.5 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 light:border-stone-300 light:text-slate-800"
                  >
                    <EyeOff className="h-3.5 w-3.5" />
                    Tutup
                  </button>
                </div>
              )}
            </div>

            {/* Sub-Mode 1: Full Numbered List */}
            {subMode === 'list' ? (
              <div className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {activeDiagram.keyStructures.map((st, idx) => (
                  <div
                    key={getStructureKey(st, idx)}
                    className="flex items-start gap-3 rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
                  >
                    <span
                      className={cn(
                        'flex h-8 min-w-[32px] shrink-0 items-center justify-center rounded-lg px-1.5 font-mono text-xs font-bold',
                        accent.numberChip
                      )}
                    >
                      {st.no}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-bold text-slate-100 light:text-slate-900 sm:text-sm">
                        {st.name}
                      </p>
                      {st.indonesian && (
                        <p className="mt-0.5 text-xs font-medium text-cyan-300 light:text-cyan-800">
                          {st.indonesian}
                        </p>
                      )}
                      {st.functionOrNote && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                          {st.functionOrNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Sub-Mode 2: Interactive Flashcard / Uji Hafalan */
              <div className="mt-4 space-y-3">
                <p className="flex items-center gap-1.5 text-xs text-slate-400 light:text-slate-600">
                  <BookOpen className="h-3.5 w-3.5 text-rose-400" />
                  Cocokkan nomor pada gambar di atas, sebutkan nama strukturnya di
                  kepalamu, lalu ketuk kartu untuk memeriksa jawaban.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {structuresToDisplay.map((st, idx) => {
                    const key = getStructureKey(st, idx);
                    const isRevealed = revealedKeys.includes(key);
                    const isRemembered = rememberedKeys.includes(key);

                    return (
                      <div
                        key={key}
                        className={cn(
                          'rounded-2xl border p-3.5 transition-all',
                          isRemembered
                            ? 'border-emerald-500/45 bg-emerald-950/20 light:border-emerald-400 light:bg-emerald-50'
                            : isRevealed
                              ? 'border-cyan-500/40 bg-slate-900/90 light:border-cyan-600/40 light:bg-white'
                              : 'border-slate-800 bg-slate-950/75 light:border-stone-300 light:bg-stone-50'
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => toggleReveal(key)}
                          className="flex min-h-[44px] w-full items-center justify-between gap-2 text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                'flex h-9 min-w-[36px] items-center justify-center rounded-xl px-2 font-mono text-sm font-bold',
                                accent.numberChip
                              )}
                            >
                              #{st.no}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-slate-200 light:text-slate-900">
                                {isRevealed
                                  ? st.name
                                  : `Struktur Nomor ${st.no}`}
                              </p>
                              <p className="text-[11px] text-slate-400 light:text-slate-600">
                                {isRevealed
                                  ? 'Ketuk untuk sembunyikan'
                                  : 'Ketuk kartu untuk buka jawaban'}
                              </p>
                            </div>
                          </div>

                          <span className="rounded-lg border border-slate-700/80 p-2 text-slate-400 light:border-stone-300 light:text-slate-600">
                            {isRevealed ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </span>
                        </button>

                        {isRevealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.18 }}
                            className="mt-3 space-y-2 border-t border-slate-800/80 pt-3 light:border-stone-200"
                          >
                            {st.indonesian && (
                              <p className="text-sm font-semibold text-cyan-300 light:text-cyan-800">
                                {st.indonesian}
                              </p>
                            )}
                            {st.functionOrNote && (
                              <p className="text-xs leading-relaxed text-slate-300 light:text-slate-700">
                                {st.functionOrNote}
                              </p>
                            )}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => markRemembered(key, true)}
                                className={cn(
                                  'min-h-[38px] flex-1 rounded-lg border px-2.5 text-xs font-semibold transition',
                                  isRemembered
                                    ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                                    : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 light:border-emerald-600 light:text-emerald-800'
                                )}
                              >
                                Sudah Hafal
                              </button>
                              <button
                                type="button"
                                onClick={() => markRemembered(key, false)}
                                className="min-h-[38px] flex-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 text-xs font-semibold text-slate-300 hover:border-rose-400/50 light:border-stone-300 light:bg-stone-100 light:text-slate-700"
                              >
                                Perlu Ulang
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default TMIdentifikasiViewer;
