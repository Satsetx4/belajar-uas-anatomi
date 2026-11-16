import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Crosshair,
  Eye,
  EyeOff,
  FileText,
  Layers,
  MapPin,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  X,
  Zap,
  ZoomIn,
} from 'lucide-react';
import type {
  CrossSecItem,
  CrossSecModality,
  CrossSecPin,
  CrossSecRegion,
} from '../types/anatomy';
import {
  cn,
  fadeSlideUp,
  springSnap,
  tabIndicatorTransition,
  tapScale,
} from '../lib/motion';

export interface CrossSecViewerProps {
  items: CrossSecItem[];
  studiedIds: string[];
  onToggleStudied: (id: string) => void;
  onStartRegionQuiz: (region: CrossSecRegion | 'all') => void;
  initialRegion?: CrossSecRegion | 'all';
}

const REGION_META: Record<
  CrossSecRegion | 'all',
  { label: string; shortLabel: string; accent: string }
> = {
  all: { label: 'Semua Regio', shortLabel: 'Semua', accent: 'cyan' },
  head: { label: 'Kepala (Head)', shortLabel: 'Kepala', accent: 'cyan' },
  thorax: { label: 'Thorax (Dada)', shortLabel: 'Thorax', accent: 'rose' },
  abdomen: { label: 'Abdomen (Perut)', shortLabel: 'Abdomen', accent: 'emerald' },
};

const MODALITY_OPTIONS: Array<CrossSecModality | 'all'> = [
  'all',
  'Schematic',
  'Axial CT',
  'Axial MRI',
  'Sagittal',
  'Coronal',
];

const ZOOM_LEVELS = [1, 1.5, 2] as const;

export function CrossSecViewer({
  items,
  studiedIds,
  onToggleStudied,
  onStartRegionQuiz,
  initialRegion = 'all',
}: CrossSecViewerProps) {
  const [regionFilter, setRegionFilter] = useState<CrossSecRegion | 'all'>(
    initialRegion
  );
  const [modalityFilter, setModalityFilter] = useState<CrossSecModality | 'all'>(
    'all'
  );
  const [onlyUnstudied, setOnlyUnstudied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Detail plate controls
  const [zoom, setZoom] = useState<number>(1);
  const [maskMode, setMaskMode] = useState(false);
  const [peekedMaskIndexes, setPeekedMaskIndexes] = useState<number[]>([]);
  const [hideIndonesianList, setHideIndonesianList] = useState(false);

  // Pin interactive state
  const [activePinNo, setActivePinNo] = useState<number | null>(null);
  const [pinQuizActive, setPinQuizActive] = useState(false);
  const [pinQuizQueue, setPinQuizQueue] = useState<CrossSecPin[]>([]);
  const [pinQuizStep, setPinQuizStep] = useState(0);
  const [pinQuizScore, setPinQuizScore] = useState(0);
  const [pinQuizFeedback, setPinQuizFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setRegionFilter(initialRegion);
    setSelectedId(null);
  }, [initialRegion]);

  // Reset per-slice visual states whenever selected slice changes
  useEffect(() => {
    setZoom(1);
    setPeekedMaskIndexes([]);
    setActivePinNo(null);
    setPinQuizActive(false);
    setPinQuizQueue([]);
    setPinQuizStep(0);
    setPinQuizScore(0);
    setPinQuizFeedback(null);
  }, [selectedId]);

  const regionCounts = useMemo(() => {
    const counts: Record<CrossSecRegion | 'all', number> = {
      all: items.length,
      head: 0,
      thorax: 0,
      abdomen: 0,
    };
    for (const item of items) {
      counts[item.region] = (counts[item.region] ?? 0) + 1;
    }
    return counts;
  }, [items]);

  const studiedSet = useMemo(() => new Set(studiedIds), [studiedIds]);

  const regionItems = useMemo(() => {
    if (regionFilter === 'all') return items;
    return items.filter((item) => item.region === regionFilter);
  }, [items, regionFilter]);

  const regionStudiedCount = useMemo(
    () => regionItems.filter((item) => studiedSet.has(item.id)).length,
    [regionItems, studiedSet]
  );

  const availableModalities = useMemo(() => {
    const present = new Set(regionItems.map((i) => i.modality));
    return MODALITY_OPTIONS.filter((m) => m === 'all' || present.has(m));
  }, [regionItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return regionItems.filter((item) => {
      if (modalityFilter !== 'all' && item.modality !== modalityFilter) {
        return false;
      }
      if (onlyUnstudied && studiedSet.has(item.id)) {
        return false;
      }
      if (!q) return true;

      const haystack = [
        item.title,
        item.indonesianTitle,
        item.levelTag,
        item.figureCode,
        item.modality,
        item.sourcePdf,
        `hal ${item.pageNumber}`,
        `p${item.pageNumber}`,
        ...item.structures.flatMap((s) => [s.name, s.indonesian, s.note ?? '']),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [regionItems, modalityFilter, onlyUnstudied, studiedSet, searchQuery]);

  const selectedIndex = useMemo(() => {
    if (!selectedId) return -1;
    return filteredItems.findIndex((item) => item.id === selectedId);
  }, [filteredItems, selectedId]);

  const selectedItem = useMemo(() => {
    if (!selectedId) return null;
    return (
      filteredItems.find((item) => item.id === selectedId) ??
      items.find((item) => item.id === selectedId) ??
      null
    );
  }, [filteredItems, items, selectedId]);

  const startPinQuiz = (pins: CrossSecPin[]) => {
    const shuffled = [...pins].sort(() => Math.random() - 0.5);
    setPinQuizQueue(shuffled);
    setPinQuizStep(0);
    setPinQuizScore(0);
    setPinQuizFeedback(null);
    setPinQuizActive(true);
    setActivePinNo(null);
  };

  const handlePinTap = (pin: CrossSecPin, allPins: CrossSecPin[]) => {
    if (!pinQuizActive) {
      setActivePinNo((prev) => (prev === pin.no ? null : pin.no));
      return;
    }

    const target = pinQuizQueue[pinQuizStep];
    if (!target) return;

    if (pin.no === target.no) {
      const nextScore = pinQuizScore + 1;
      setPinQuizScore(nextScore);
      setActivePinNo(pin.no);
      setPinQuizFeedback({
        correct: true,
        message: `Tepat! Pin [${pin.no}] adalah ${pin.indonesian || pin.label}.`,
      });
      if (pinQuizStep + 1 < pinQuizQueue.length) {
        setPinQuizStep((prev) => prev + 1);
      } else {
        setPinQuizStep(pinQuizQueue.length);
      }
    } else {
      const clickedLabel = pin.indonesian || pin.label;
      setActivePinNo(pin.no);
      setPinQuizFeedback({
        correct: false,
        message: `Pin [${pin.no}] adalah ${clickedLabel}. Cari: ${target.indonesian || target.label} (${allPins.length} pin).`,
      });
    }
  };

  const toggleMaskZone = (idx: number) => {
    setPeekedMaskIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const resetAllFilters = () => {
    setModalityFilter('all');
    setOnlyUnstudied(false);
    setSearchQuery('');
  };

  // ======================== DETAIL VIEW ========================
  if (selectedItem) {
    const isStudied = studiedSet.has(selectedItem.id);
    const hasMasks = selectedItem.labelMaskZones.length > 0;
    const pins = selectedItem.pins ?? [];
    const activePin = pins.find((p) => p.no === activePinNo) ?? null;
    const prevItem =
      selectedIndex > 0 ? filteredItems[selectedIndex - 1] : null;
    const nextItem =
      selectedIndex >= 0 && selectedIndex < filteredItems.length - 1
        ? filteredItems[selectedIndex + 1]
        : null;
    const currentQuizTarget =
      pinQuizActive && pinQuizStep < pinQuizQueue.length
        ? pinQuizQueue[pinQuizStep]
        : null;
    const pinQuizFinished =
      pinQuizActive &&
      pinQuizQueue.length > 0 &&
      pinQuizStep >= pinQuizQueue.length;

    return (
      <motion.section
        key={selectedItem.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springSnap}
        className="space-y-4"
      >
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <motion.button
            type="button"
            whileTap={tapScale}
            onClick={() => setSelectedId(null)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-500/50 light:border-stone-300 light:bg-white light:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 text-cyan-400 light:text-cyan-700" />
            <span>Daftar Potongan</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1.5 font-mono text-xs text-slate-300 light:border-stone-300 light:bg-white light:text-slate-700">
              {selectedIndex >= 0
                ? `${selectedIndex + 1} / ${filteredItems.length}`
                : selectedItem.figureCode}
            </span>

            <motion.button
              type="button"
              whileTap={tapScale}
              disabled={!prevItem}
              onClick={() => prevItem && setSelectedId(prevItem.id)}
              aria-label="Potongan sebelumnya"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/80 text-slate-200 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40 light:border-stone-300 light:bg-white light:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.button>

            <motion.button
              type="button"
              whileTap={tapScale}
              disabled={!nextItem}
              onClick={() => nextItem && setSelectedId(nextItem.id)}
              aria-label="Potongan berikutnya"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/80 text-slate-200 transition hover:border-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-40 light:border-stone-300 light:bg-white light:text-slate-800"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Plate Header Info */}
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300 light:border-cyan-600/30 light:bg-cyan-600/10 light:text-cyan-800">
              {REGION_META[selectedItem.region].shortLabel}
            </span>
            <span className="rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-slate-200 light:border-stone-300 light:bg-stone-100 light:text-slate-800">
              {selectedItem.modality}
            </span>
            <span className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-rose-300 light:border-rose-600/30 light:bg-rose-600/10 light:text-rose-800">
              {selectedItem.levelTag}
            </span>
            <span className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 font-mono text-xs text-slate-400 light:border-stone-200 light:bg-stone-50 light:text-slate-600">
              {selectedItem.figureCode}
            </span>
          </div>

          <h2 className="mt-3 font-display text-lg font-bold tracking-tight sm:text-2xl">
            {selectedItem.indonesianTitle}
          </h2>
          <p className="mt-0.5 text-sm text-slate-400 light:text-slate-600">
            {selectedItem.title}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 light:text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-cyan-400 light:text-cyan-700" />
              {selectedItem.sourcePdf} • Hal. {selectedItem.pageNumber}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-rose-400 light:text-rose-600" />
              {selectedItem.structures.length} struktur tercatat
            </span>
          </div>
        </div>

        {/* Diagnostic Controls Bar */}
        <div className="clinical-surface flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3">
          {/* Zoom Controls */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 light:text-slate-600">
              <ZoomIn className="h-3.5 w-3.5" />
              Zoom:
            </span>
            {ZOOM_LEVELS.map((z) => (
              <motion.button
                key={z}
                type="button"
                whileTap={tapScale}
                onClick={() => setZoom(z)}
                className={cn(
                  'min-h-[44px] min-w-[44px] rounded-xl border px-3 font-mono text-xs font-semibold transition',
                  zoom === z
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:border-cyan-700 light:bg-cyan-600 light:text-white'
                    : 'border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-slate-500 light:border-stone-300 light:bg-stone-100 light:text-slate-700'
                )}
              >
                {z}x
              </motion.button>
            ))}
            {zoom !== 1 && (
              <motion.button
                type="button"
                whileTap={tapScale}
                onClick={() => setZoom(1)}
                className="inline-flex min-h-[44px] items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-900/70 px-3 text-xs font-semibold text-slate-300 hover:border-slate-500 light:border-stone-300 light:bg-stone-100 light:text-slate-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </motion.button>
            )}
          </div>

          {/* Study Mask & Pin Quiz Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={() => {
                setMaskMode((prev) => !prev);
                setPeekedMaskIndexes([]);
              }}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition',
                maskMode
                  ? 'border-amber-400/60 bg-amber-500/20 text-amber-200 light:border-amber-600 light:bg-amber-500 light:text-white'
                  : 'border-slate-700/80 bg-slate-900/80 text-slate-200 hover:border-cyan-500/50 light:border-stone-300 light:bg-white light:text-slate-800'
              )}
            >
              {maskMode ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span>
                {maskMode ? 'Tutup Label Aktif' : 'Mode Tutup Label'}
              </span>
            </motion.button>

            {pins.length > 0 && (
              <motion.button
                type="button"
                whileTap={tapScale}
                onClick={() => {
                  if (pinQuizActive) {
                    setPinQuizActive(false);
                    setPinQuizFeedback(null);
                  } else {
                    startPinQuiz(pins);
                  }
                }}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition',
                  pinQuizActive
                    ? 'border-rose-400/60 bg-rose-500/20 text-rose-200 light:border-rose-600 light:bg-rose-600 light:text-white'
                    : 'border-cyan-500/40 bg-cyan-500/12 text-cyan-300 hover:bg-cyan-500/20 light:border-cyan-700/40 light:bg-cyan-600/10 light:text-cyan-800'
                )}
              >
                <Crosshair className="h-4 w-4" />
                <span>
                  {pinQuizActive
                    ? 'Keluar Uji Pin'
                    : `Uji Pin (${pins.length})`}
                </span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Mask Mode Helper Strip */}
        {maskMode && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-200 light:border-amber-400 light:bg-amber-50 light:text-amber-900">
            <span>
              {hasMasks
                ? `Mode Latihan Hafalan aktif (${peekedMaskIndexes.length}/${selectedItem.labelMaskZones.length} zona diintip). Ketuk kotak buram pada gambar untuk mengintip label aslinya.`
                : 'Potongan ini tidak memiliki zona label margin terpisah. Gunakan sembunyi arti pada daftar struktur atau uji pin di bawah.'}
            </span>
            {hasMasks && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPeekedMaskIndexes(
                      selectedItem.labelMaskZones.map((_, idx) => idx)
                    )
                  }
                  className="min-h-[34px] rounded-lg border border-amber-400/40 px-2.5 font-semibold hover:bg-amber-500/20"
                >
                  Buka Semua
                </button>
                <button
                  type="button"
                  onClick={() => setPeekedMaskIndexes([])}
                  className="min-h-[34px] rounded-lg border border-amber-400/40 px-2.5 font-semibold hover:bg-amber-500/20"
                >
                  Tutup Semua
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pin Quiz Prompt Banner */}
        {pinQuizActive && (
          <div className="rounded-2xl border border-cyan-500/35 bg-cyan-950/35 p-3.5 light:border-cyan-600/40 light:bg-cyan-50">
            {currentQuizTarget ? (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-300 light:text-cyan-800">
                    Uji Pin Interaktif • Soal {pinQuizStep + 1} dari{' '}
                    {pinQuizQueue.length}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-100 light:text-slate-900">
                    Ketuk pin bernomor untuk:{' '}
                    <span className="text-cyan-300 light:text-cyan-700">
                      {currentQuizTarget.indonesian || currentQuizTarget.label}
                    </span>
                  </p>
                </div>
                <span className="rounded-lg bg-cyan-500/20 px-2.5 py-1 font-mono text-xs font-bold text-cyan-200 light:bg-cyan-600 light:text-white">
                  Skor: {pinQuizScore}/{pinQuizQueue.length}
                </span>
              </div>
            ) : pinQuizFinished ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-base font-bold text-emerald-300 light:text-emerald-800">
                    Uji Pin Selesai! Skor: {pinQuizScore} / {pinQuizQueue.length}
                  </p>
                  <p className="text-xs text-slate-300 light:text-slate-700">
                    Mantap! Kamu bisa ulangi uji pin atau lanjut ke potongan berikutnya.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => startPinQuiz(pins)}
                  className="min-h-[44px] rounded-xl bg-cyan-500 px-3.5 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                >
                  Ulangi Uji Pin
                </button>
              </div>
            ) : null}

            {pinQuizFeedback && (
              <p
                className={cn(
                  'mt-2 rounded-lg px-2.5 py-1.5 text-xs font-medium',
                  pinQuizFeedback.correct
                    ? 'bg-emerald-500/20 text-emerald-200 light:bg-emerald-100 light:text-emerald-900'
                    : 'bg-rose-500/20 text-rose-200 light:bg-rose-100 light:text-rose-900'
                )}
              >
                {pinQuizFeedback.message}
              </p>
            )}
          </div>
        )}

        {/* Zoomable Radiological Viewport */}
        <div className="overflow-auto max-h-[68vh] w-full rounded-2xl border border-slate-800 bg-[#050811] shadow-inner light:border-stone-300">
          <div
            className="relative mx-auto select-none transition-[width] duration-200"
            style={{ width: `${zoom * 100}%` }}
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.indonesianTitle}
              className="block h-auto w-full select-none"
              draggable={false}
            />

            {/* Frosted Blur Label Mask Curtains */}
            {maskMode &&
              selectedItem.labelMaskZones.map((zone, idx) => {
                const isPeeked = peekedMaskIndexes.includes(idx);
                return (
                  <button
                    key={`${selectedItem.id}-mask-${idx}`}
                    type="button"
                    onClick={() => toggleMaskZone(idx)}
                    aria-label={
                      isPeeked
                        ? `Tutup kembali zona label ${idx + 1}`
                        : `Intip label zona ${idx + 1}`
                    }
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.w}%`,
                      height: `${zone.h}%`,
                    }}
                    className={cn(
                      'absolute z-10 flex items-center justify-center rounded-md transition-all',
                      isPeeked
                        ? 'border border-dashed border-emerald-400/70 bg-emerald-500/10 hover:bg-emerald-500/20'
                        : 'border border-cyan-400/50 bg-slate-950/82 backdrop-blur-md hover:border-cyan-300 hover:bg-slate-900/75'
                    )}
                  >
                    {!isPeeked && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-900/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 shadow">
                        <Eye className="h-3 w-3" />
                        {zone.labelHint || 'Intip'}
                      </span>
                    )}
                  </button>
                );
              })}

            {/* Interactive Structure Pins */}
            {pins.map((pin) => {
              const isSelectedPin = activePinNo === pin.no;
              return (
                <button
                  key={`${selectedItem.id}-pin-${pin.no}`}
                  type="button"
                  onClick={() => handlePinTap(pin, pins)}
                  aria-label={`Pin ${pin.no}: ${pin.indonesian || pin.label}`}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 p-1 focus:outline-none"
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border font-mono text-[10px] font-bold shadow-md transition-transform group-hover:scale-110 sm:h-7 sm:w-7 sm:border-2 sm:text-xs sm:shadow-lg',
                      isSelectedPin
                        ? 'scale-115 border-white bg-rose-500 text-white ring-4 ring-rose-500/35'
                        : 'border-slate-950 bg-cyan-400 text-slate-950'
                    )}
                  >
                    {pin.no}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pin Inspection Readout */}
        {!pinQuizActive && activePin && (
          <div className="flex items-start justify-between gap-3 rounded-2xl border border-cyan-500/35 bg-cyan-500/10 p-3.5 light:border-cyan-600/30 light:bg-cyan-50">
            <div className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500 font-mono text-xs font-bold text-white">
                {activePin.no}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-100 light:text-slate-900">
                  {activePin.indonesian || activePin.label}
                </p>
                {activePin.indonesian && (
                  <p className="font-mono text-xs text-cyan-300 light:text-cyan-800">
                    {activePin.label}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActivePinNo(null)}
              aria-label="Tutup info pin"
              className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white light:hover:bg-stone-200 light:hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <motion.button
            type="button"
            whileTap={tapScale}
            onClick={() => onToggleStudied(selectedItem.id)}
            className={cn(
              'inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition',
              isStudied
                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 light:border-emerald-600 light:bg-emerald-600 light:text-white'
                : 'border-cyan-500/50 bg-cyan-500 text-slate-950 hover:bg-cyan-400'
            )}
          >
            {isStudied ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Sudah Dikuasai</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Tandai Sudah Dikuasai</span>
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            whileTap={tapScale}
            onClick={() => onStartRegionQuiz(selectedItem.region)}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 text-sm font-bold text-rose-200 transition hover:bg-rose-500/25 light:border-rose-600/40 light:bg-rose-600/10 light:text-rose-800"
          >
            <Zap className="h-4 w-4" />
            <span>Kuis Regio {REGION_META[selectedItem.region].shortLabel}</span>
          </motion.button>
        </div>

        {/* Pins Quick List (if present) */}
        {pins.length > 0 && !pinQuizActive && (
          <div className="clinical-surface rounded-2xl p-4">
            <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-cyan-400 light:text-cyan-800">
              <MapPin className="h-4 w-4" />
              Daftar Pin Interaktif ({pins.length})
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {pins.map((pin) => {
                const active = activePinNo === pin.no;
                return (
                  <button
                    key={`pin-list-${pin.no}`}
                    type="button"
                    onClick={() => setActivePinNo(pin.no)}
                    className={cn(
                      'flex min-h-[44px] items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition',
                      active
                        ? 'border-rose-400/60 bg-rose-500/15 light:border-rose-500 light:bg-rose-50'
                        : 'border-slate-800 bg-slate-900/50 hover:border-cyan-500/40 light:border-stone-200 light:bg-stone-50'
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 font-mono text-xs font-bold text-cyan-300 light:bg-cyan-600 light:text-white">
                      {pin.no}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-100 light:text-slate-900">
                        {pin.indonesian || pin.label}
                      </p>
                      {pin.indonesian && (
                        <p className="truncate font-mono text-[11px] text-slate-400 light:text-slate-600">
                          {pin.label}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete Anatomical Structures List */}
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 font-display text-base font-bold">
              <BookOpen className="h-4 w-4 text-cyan-400 light:text-cyan-700" />
              Struktur Anatomi pada Potongan Ini ({selectedItem.structures.length})
            </h3>

            <button
              type="button"
              onClick={() => setHideIndonesianList((prev) => !prev)}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-700/80 px-2.5 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 light:border-stone-300 light:text-slate-700"
            >
              {hideIndonesianList ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
              <span>
                {hideIndonesianList ? 'Tampilkan Arti' : 'Sembunyikan Arti'}
              </span>
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {selectedItem.structures.map((st, idx) => (
              <div
                key={`${selectedItem.id}-st-${idx}`}
                className="rounded-xl border border-slate-800/90 bg-slate-950/50 p-3 light:border-stone-200 light:bg-stone-50"
              >
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800 font-mono text-[11px] font-semibold text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs font-semibold text-slate-100 light:text-slate-900">
                      {st.name}
                    </p>
                    {!hideIndonesianList ? (
                      <p className="mt-0.5 text-sm font-medium text-cyan-300 light:text-cyan-800">
                        {st.indonesian}
                      </p>
                    ) : (
                      <p className="mt-0.5 font-mono text-xs italic text-slate-500">
                        [Tersembunyi — tekan Tampilkan Arti untuk cek]
                      </p>
                    )}
                    {st.note && !hideIndonesianList && (
                      <p className="mt-1 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                        {st.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  // ======================== GALLERY BROWSE VIEW ========================
  const regionCompletionPct =
    regionItems.length > 0
      ? Math.round((regionStudiedCount / regionItems.length) * 100)
      : 0;

  return (
    <section className="space-y-4">
      {/* Region Filter Pills */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'head', 'thorax', 'abdomen'] as const).map((reg) => {
          const active = regionFilter === reg;
          return (
            <motion.button
              key={reg}
              type="button"
              whileTap={tapScale}
              onClick={() => {
                setRegionFilter(reg);
                setModalityFilter('all');
              }}
              className={cn(
                'relative inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition sm:text-sm',
                active
                  ? 'border-cyan-400/60 text-cyan-100 light:border-cyan-700 light:text-cyan-950'
                  : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 light:border-stone-300 light:bg-white light:text-slate-700'
              )}
            >
              {active && (
                <motion.span
                  layoutId="crossec-region-pill"
                  transition={tabIndicatorTransition}
                  className="absolute inset-0 rounded-xl bg-cyan-500/18 light:bg-cyan-500/15"
                />
              )}
              <span className="relative z-10">{REGION_META[reg].shortLabel}</span>
              <span className="relative z-10 rounded-md bg-slate-950/70 px-1.5 py-0.5 font-mono text-[11px] text-cyan-300 light:bg-stone-100 light:text-cyan-800">
                {regionCounts[reg]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Mastery Telemetry + Start Region Quiz */}
      <div className="clinical-surface flex flex-col justify-between gap-3 rounded-2xl p-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold">
            <span className="text-slate-300 light:text-slate-700">
              Penguasaan {REGION_META[regionFilter].label}
            </span>
            <span className="font-mono text-cyan-300 light:text-cyan-800">
              {regionStudiedCount}/{regionItems.length} ({regionCompletionPct}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 light:bg-stone-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${regionCompletionPct}%` }}
              transition={springSnap}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
            />
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={tapScale}
          onClick={() => onStartRegionQuiz(regionFilter)}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 text-xs font-bold text-slate-950 shadow-md transition hover:brightness-110 sm:text-sm"
        >
          <Zap className="h-4 w-4" />
          <span>Kuis {REGION_META[regionFilter].shortLabel}</span>
        </motion.button>
      </div>

      {/* Search & Modality Filters */}
      <div className="clinical-surface space-y-3 rounded-2xl p-3.5">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari level vertebra (T4, L1), organ (aorta, thalamus), atau figur..."
            className="min-h-[44px] w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pr-10 pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none light:border-stone-300 light:bg-stone-50 light:text-slate-900"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian"
              className="absolute top-1/2 right-1.5 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white light:hover:bg-stone-200 light:hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {availableModalities.map((mod) => {
              const active = modalityFilter === mod;
              return (
                <button
                  key={mod}
                  type="button"
                  onClick={() => setModalityFilter(mod)}
                  className={cn(
                    'min-h-[38px] shrink-0 rounded-lg border px-2.5 font-mono text-xs font-medium transition',
                    active
                      ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-200 light:border-cyan-700 light:bg-cyan-600 light:text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 light:border-stone-200 light:bg-stone-100 light:text-slate-700'
                  )}
                >
                  {mod === 'all' ? 'Semua Modalitas' : mod}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOnlyUnstudied((prev) => !prev)}
            className={cn(
              'inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition',
              onlyUnstudied
                ? 'border-rose-400/60 bg-rose-500/15 text-rose-200 light:border-rose-600 light:bg-rose-600 light:text-white'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 light:border-stone-200 light:bg-stone-100 light:text-slate-700'
            )}
          >
            <Target className="h-3.5 w-3.5" />
            <span>Belum Dikuasai</span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {filteredItems.length === 0 ? (
        <div className="clinical-surface flex flex-col items-center justify-center rounded-2xl px-4 py-12 text-center">
          <Sparkles className="h-8 w-8 text-cyan-400 light:text-cyan-700" />
          <h3 className="mt-3 font-display text-base font-bold">
            Tidak Ada Potongan yang Cocok
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-400 light:text-slate-600">
            Coba kata kunci anatomi lain atau reset filter modalitas dan status
            penguasaan.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-cyan-500 px-4 text-xs font-bold text-slate-950 hover:bg-cyan-400"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filter
          </button>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const isStudied = studiedSet.has(item.id);
              const pinCount = item.pins?.length ?? 0;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  layout
                  variants={fadeSlideUp}
                  initial="hidden"
                  animate="visible"
                  whileTap={tapScale}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'group flex flex-col overflow-hidden rounded-2xl border text-left transition-all',
                    'bg-slate-900/75 hover:-translate-y-0.5 hover:border-cyan-500/50',
                    'light:bg-white light:shadow-xs light:hover:border-cyan-600/50',
                    isStudied
                      ? 'border-emerald-500/40'
                      : 'border-slate-800/90 light:border-stone-200'
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050811]">
                    <img
                      src={item.imageUrl}
                      alt={item.indonesianTitle}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="rounded-md border border-slate-700/80 bg-slate-950/85 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 backdrop-blur-sm">
                        {item.modality}
                      </span>
                    </div>
                    {isStudied && (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-slate-950 shadow">
                        <CheckCircle2 className="h-3 w-3" />
                        Dikuasai
                      </span>
                    )}
                    <div className="absolute right-2 bottom-2 left-2 flex items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-950/85 px-2 py-0.5 font-mono text-[10px] text-slate-200 backdrop-blur-sm">
                        {item.figureCode}
                      </span>
                      <span className="rounded-md bg-slate-950/85 px-2 py-0.5 font-mono text-[10px] text-rose-300 backdrop-blur-sm">
                        Hal. {item.pageNumber}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-3.5">
                    <div>
                      <p className="font-mono text-[11px] font-semibold text-cyan-400 light:text-cyan-700">
                        {item.levelTag}
                      </p>
                      <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold leading-snug text-slate-100 light:text-slate-900">
                        {item.indonesianTitle}
                      </h3>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-400 light:border-stone-200 light:text-slate-600">
                      <span>{item.structures.length} struktur</span>
                      {pinCount > 0 ? (
                        <span className="inline-flex items-center gap-1 font-mono text-cyan-300 light:text-cyan-700">
                          <Crosshair className="h-3 w-3" />
                          {pinCount} pin
                        </span>
                      ) : (
                        <span className="font-mono">
                          {item.labelMaskZones.length} zona label
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}

export default CrossSecViewer;
