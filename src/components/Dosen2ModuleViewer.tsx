import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Droplets,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  Hand,
  Heart,
  HeartPulse,
  HelpCircle,
  Pause,
  Play,
  Search,
  Shuffle,
  Sliders,
  Sparkles,
  Table2,
  X,
  Zap,
  ZoomIn,
} from 'lucide-react';
import type {
  BloodFlowNode,
  CranialNerveItem,
  Dosen2DataBundle,
  Dosen2TopicId,
  QuestionTopic,
} from '../types/anatomy';
import {
  cn,
  springSnap,
  tabIndicatorTransition,
  tapScale,
} from '../lib/motion';

export interface Dosen2ModuleViewerProps {
  data: Dosen2DataBundle;
  initialTopic?: Dosen2TopicId;
  studiedIds: string[];
  onToggleStudied: (id: string) => void;
  onStartTopicQuiz: (topic: QuestionTopic) => void;
  onTopicChange?: (topic: Dosen2TopicId) => void;
}

interface ImagePreviewState {
  title: string;
  imageUrl: string;
  source?: string;
  caption?: string;
}

const TOPIC_TABS: Array<{
  id: Dosen2TopicId;
  label: string;
  shortLabel: string;
  icon: typeof HeartPulse;
}> = [
  {
    id: 'kardiovaskuler',
    label: 'Kardiovaskuler',
    shortLabel: 'Kardio',
    icon: HeartPulse,
  },
  {
    id: 'sistemik',
    label: 'Peredaran Darah Besar',
    shortLabel: 'Sistemik',
    icon: GitBranch,
  },
  {
    id: 'limb-atas',
    label: 'Limb Atas (Lengan)',
    shortLabel: 'Limb Atas',
    icon: Hand,
  },
  {
    id: 'saraf-kranial',
    label: '12 Saraf Kranial',
    shortLabel: 'Saraf XII',
    icon: Brain,
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function oxygenBadgeStyle(state: BloodFlowNode['oxygenState']) {
  if (state === 'oxygenated') {
    return {
      label: 'Kaya O2',
      className:
        'border-rose-500/40 bg-rose-500/15 text-rose-300 light:border-rose-600/35 light:bg-rose-100 light:text-rose-800',
    };
  }
  if (state === 'deoxygenated') {
    return {
      label: 'Miskin O2',
      className:
        'border-cyan-500/40 bg-cyan-500/15 text-cyan-300 light:border-cyan-600/35 light:bg-cyan-100 light:text-cyan-800',
    };
  }
  return {
    label: 'Kapiler / Campuran',
    className:
      'border-amber-500/40 bg-amber-500/15 text-amber-300 light:border-amber-600/35 light:bg-amber-100 light:text-amber-800',
  };
}

// ============================================================================
// Reusable Mini-Game: Sequence Ordering Game (used by Sistemik & Limb Atas)
// ============================================================================
function SequenceOrderGame({
  title,
  subtitle,
  orderedNodes,
}: {
  title: string;
  subtitle: string;
  orderedNodes: BloodFlowNode[];
}) {
  const sortedExpected = useMemo(
    () => [...orderedNodes].sort((a, b) => a.order - b.order),
    [orderedNodes]
  );

  // Keep game manageable & crisp on mobile (max 8 nodes, preserving start/end)
  const targetSequence = useMemo(() => {
    if (sortedExpected.length <= 8) return sortedExpected;
    const step = (sortedExpected.length - 1) / 7;
    const picked: BloodFlowNode[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < 8; i++) {
      const candidate = sortedExpected[Math.round(i * step)];
      if (candidate && !seen.has(candidate.id)) {
        seen.add(candidate.id);
        picked.push(candidate);
      }
    }
    return picked;
  }, [sortedExpected]);

  const [pool, setPool] = useState<BloodFlowNode[]>(() =>
    shuffleArray(targetSequence)
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPool(shuffleArray(targetSequence));
    setSelectedIds([]);
    setChecked(false);
  }, [targetSequence]);

  if (targetSequence.length < 2) return null;

  const nodeMap = new Map(targetSequence.map((n) => [n.id, n]));
  const remainingPool = pool.filter((n) => !selectedIds.includes(n.id));
  const isComplete = selectedIds.length === targetSequence.length;

  const correctCount = selectedIds.reduce((acc, id, idx) => {
    return acc + (targetSequence[idx]?.id === id ? 1 : 0);
  }, 0);

  const handlePick = (id: string) => {
    if (checked) return;
    setSelectedIds((prev) => [...prev, id]);
  };

  const handleRemoveFromSlot = (id: string) => {
    if (checked) return;
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleReset = () => {
    setPool(shuffleArray(targetSequence));
    setSelectedIds([]);
    setChecked(false);
  };

  return (
    <div className="clinical-surface rounded-2xl border-cyan-500/25 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
            <Sparkles className="h-3.5 w-3.5" />
            Mini-Game Interaktif
          </span>
          <h4 className="mt-1.5 font-display text-base font-bold">{title}</h4>
          <p className="text-xs text-slate-400 light:text-slate-600">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-700 px-3 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 light:border-stone-300 light:text-slate-700"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Acak Ulang
        </button>
      </div>

      {/* Answer Slots */}
      <div className="mt-4 space-y-2">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600">
          Urutan Jawabanmu ({selectedIds.length}/{targetSequence.length})
        </p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {targetSequence.map((expectedNode, idx) => {
            const chosenId = selectedIds[idx];
            const chosenNode = chosenId ? nodeMap.get(chosenId) : undefined;
            const isCorrectSlot = checked && chosenId === expectedNode.id;
            const isWrongSlot =
              checked && chosenId !== undefined && chosenId !== expectedNode.id;

            return (
              <div
                key={`slot-${idx}`}
                className={cn(
                  'flex min-h-[48px] items-center justify-between gap-2 rounded-xl border px-3 py-2 transition',
                  isCorrectSlot
                    ? 'border-emerald-500/60 bg-emerald-500/15 light:border-emerald-600 light:bg-emerald-50'
                    : isWrongSlot
                      ? 'border-rose-500/60 bg-rose-500/15 light:border-rose-600 light:bg-rose-50'
                      : chosenNode
                        ? 'border-cyan-500/45 bg-cyan-500/10 light:border-cyan-600/40 light:bg-cyan-50'
                        : 'border-dashed border-slate-700 bg-slate-950/40 light:border-stone-300 light:bg-stone-50'
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800 font-mono text-xs font-bold text-slate-200 light:bg-stone-200 light:text-slate-800">
                    {idx + 1}
                  </span>
                  {chosenNode ? (
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-100 light:text-slate-900">
                        {chosenNode.name}
                      </p>
                      {isWrongSlot && (
                        <p className="truncate font-mono text-[10px] text-emerald-300 light:text-emerald-700">
                          Seharusnya: {expectedNode.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs italic text-slate-500">
                      Ketuk kartu pilihan di bawah...
                    </span>
                  )}
                </div>

                {chosenNode && !checked && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFromSlot(chosenNode.id)}
                    aria-label={`Keluarkan ${chosenNode.name}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white light:hover:bg-stone-200"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shuffled Pool */}
      {remainingPool.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600">
            Pilihan Tersedia — Ketuk sesuai urutan aliran:
          </p>
          <div className="flex flex-wrap gap-2">
            {remainingPool.map((node) => (
              <motion.button
                key={node.id}
                type="button"
                whileTap={tapScale}
                onClick={() => handlePick(node.id)}
                className="min-h-[44px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-left text-xs font-semibold text-slate-100 transition hover:border-cyan-400 light:border-stone-300 light:bg-white light:text-slate-900"
              >
                {node.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Verify Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 light:border-stone-200">
        {checked ? (
          <p className="text-xs font-bold text-slate-200 light:text-slate-900">
            Skor Urutan:{' '}
            <span
              className={
                correctCount === targetSequence.length
                  ? 'text-emerald-400 light:text-emerald-700'
                  : 'text-amber-300 light:text-amber-700'
              }
            >
              {correctCount} / {targetSequence.length} tepat
            </span>
          </p>
        ) : (
          <p className="text-xs text-slate-400 light:text-slate-600">
            Isi seluruh {targetSequence.length} langkah lalu cek urutan.
          </p>
        )}

        <div className="flex items-center gap-2">
          {!checked ? (
            <button
              type="button"
              disabled={!isComplete}
              onClick={() => setChecked(true)}
              className="min-h-[44px] rounded-xl bg-cyan-500 px-4 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cek Urutan
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[44px] rounded-xl bg-emerald-500 px-4 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Main Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Sub-Module 1: KARDIOVASKULER
// ============================================================================
function KardiovaskulerPanel({
  data,
  onPreviewImage,
}: {
  data: Dosen2DataBundle['kardiovaskuler'];
  onPreviewImage: (img: ImagePreviewState) => void;
}) {
  const [activeConductionIdx, setActiveConductionIdx] = useState(0);
  const [conductionPlaying, setConductionPlaying] = useState(false);
  const [activeEkgIdx, setActiveEkgIdx] = useState(0);
  const [strokeVolume, setStrokeVolume] = useState(70);
  const [heartRate, setHeartRate] = useState(72);

  useEffect(() => {
    if (!conductionPlaying || data.conductionSystem.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveConductionIdx(
        (prev) => (prev + 1) % data.conductionSystem.length
      );
    }, 1500);
    return () => window.clearInterval(timer);
  }, [conductionPlaying, data.conductionSystem.length]);

  const cardiacOutputMl = strokeVolume * heartRate;
  const cardiacOutputL = (cardiacOutputMl / 1000).toFixed(2);
  const coStatus =
    cardiacOutputMl < 4000
      ? {
          label: 'Rendah (< 4.0 L/mnt)',
          cls: 'border-amber-500/40 bg-amber-500/15 text-amber-300 light:bg-amber-100 light:text-amber-800',
        }
      : cardiacOutputMl <= 8000
        ? {
            label: 'Normal Istirahat (4.0–8.0 L/mnt)',
            cls: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 light:bg-emerald-100 light:text-emerald-800',
          }
        : {
            label: 'Tinggi / Aktivitas Fisik (> 8.0 L/mnt)',
            cls: 'border-rose-500/40 bg-rose-500/15 text-rose-300 light:bg-rose-100 light:text-rose-800',
          };

  const coBarPct = Math.min(100, Math.round((cardiacOutputMl / 16000) * 100));

  return (
    <div className="space-y-5">
      {/* Overview Facts */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.overviewFacts.map((fact, idx) => (
          <div
            key={`kv-fact-${idx}`}
            className="clinical-surface rounded-2xl p-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-400 light:text-cyan-700">
              {fact.label}
            </p>
            <p className="mt-1 font-display text-base font-bold text-slate-100 light:text-slate-900">
              {fact.value}
            </p>
            {fact.detail && (
              <p className="mt-1 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                {fact.detail}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 4 Chambers & 4 Valves */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-bold">
            <Heart className="h-4 w-4 text-rose-400" />
            4 Ruang Jantung (Chambers)
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {data.chambers.map((ch, idx) => {
              const isLeft = ch.side === 'Kiri';
              return (
                <div
                  key={`chamber-${idx}`}
                  className={cn(
                    'rounded-xl border p-3',
                    isLeft
                      ? 'border-rose-500/30 bg-rose-500/8 light:border-rose-300 light:bg-rose-50'
                      : 'border-cyan-500/30 bg-cyan-500/8 light:border-cyan-300 light:bg-cyan-50'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-slate-100 light:text-slate-900">
                      {ch.name}
                    </span>
                    <span
                      className={cn(
                        'rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold',
                        isLeft
                          ? 'bg-rose-500/20 text-rose-300 light:bg-rose-600 light:text-white'
                          : 'bg-cyan-500/20 text-cyan-300 light:bg-cyan-700 light:text-white'
                      )}
                    >
                      {ch.side}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] font-semibold text-slate-300 light:text-slate-700">
                    {ch.bloodType}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                    {ch.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-bold">
            <Sliders className="h-4 w-4 text-cyan-400" />
            4 Katup Jantung (Valves)
          </h3>
          <div className="mt-3 space-y-2.5">
            {data.valves.map((v, idx) => (
              <div
                key={`valve-${idx}`}
                className="rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-slate-100 light:text-slate-900">
                    {v.name}
                  </span>
                  {v.alias && (
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
                      {v.alias}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-[11px] text-rose-300 light:text-rose-700">
                  Lokasi: {v.location}
                </p>
                <p className="mt-1 text-xs text-slate-300 light:text-slate-700">
                  {v.function}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Wall Layers + Coronary Arteries */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="font-display text-base font-bold">
            Lapisan Dinding Jantung (Luar → Dalam)
          </h3>
          <div className="mt-3 space-y-2.5">
            {[...data.wallLayers]
              .sort((a, b) => a.order - b.order)
              .map((layer) => (
                <div
                  key={`layer-${layer.order}`}
                  className="flex items-start gap-3 rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 font-mono text-xs font-bold text-cyan-300 light:bg-cyan-600 light:text-white">
                    {layer.order}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-slate-100 light:text-slate-900">
                      {layer.name}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                      {layer.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="font-display text-base font-bold">
            Vaskularisasi Koroner &amp; Saraf Otonom
          </h3>
          <div className="mt-3 space-y-2.5">
            {data.coronaryArteries.map((cor, idx) => (
              <div
                key={`cor-${idx}`}
                className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-3 light:border-rose-200 light:bg-rose-50/70"
              >
                <p className="font-display text-sm font-bold text-rose-300 light:text-rose-800">
                  {cor.mainBranch}
                </p>
                <p className="mt-1 font-mono text-[11px] text-slate-300 light:text-slate-700">
                  Cabang: {cor.subBranches.join(' • ')}
                </p>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-600">
                  Area suplai: {cor.territory}
                </p>
              </div>
            ))}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.autonomicNerves.map((nerve, idx) => (
                <div
                  key={`auto-${idx}`}
                  className="rounded-xl border border-slate-800 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
                >
                  <p className="text-xs font-bold text-cyan-300 light:text-cyan-800">
                    {nerve.name}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-300 light:text-slate-700">
                    {nerve.role}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400 light:text-slate-600">
                    {nerve.effect}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Conduction System (SA -> Purkinje) */}
      <div className="clinical-surface rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-bold">
              <Zap className="h-4 w-4 text-amber-400" />
              Sistem Konduksi Listrik Jantung (SA Node → Purkinje)
            </h3>
            <p className="text-xs text-slate-400 light:text-slate-600">
              Ketuk tiap nodus/berkas atau putar simulasi untuk mengikuti jalur
              depolarisasi jantung.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setConductionPlaying((prev) => !prev)}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 text-xs font-bold transition',
              conductionPlaying
                ? 'bg-amber-500 text-slate-950'
                : 'border border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 light:border-amber-600 light:text-amber-800'
            )}
          >
            {conductionPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Jeda Simulasi</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Putar Impuls</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {data.conductionSystem.map((step, idx) => {
            const active = idx === activeConductionIdx;
            return (
              <motion.button
                key={`cond-${step.step}`}
                type="button"
                whileTap={tapScale}
                onClick={() => {
                  setConductionPlaying(false);
                  setActiveConductionIdx(idx);
                }}
                className={cn(
                  'relative flex min-h-[76px] flex-col justify-between rounded-xl border p-3 text-left transition',
                  active
                    ? 'border-amber-400 bg-amber-500/15 shadow-[0_0_24px_rgba(245,158,11,0.18)] light:border-amber-600 light:bg-amber-50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-600 light:border-stone-200 light:bg-stone-50'
                )}
              >
                <span className="font-mono text-[11px] font-bold text-amber-400 light:text-amber-700">
                  Langkah {step.step}
                </span>
                <p className="mt-1 font-display text-xs font-bold text-slate-100 light:text-slate-900">
                  {step.name}
                </p>
              </motion.button>
            );
          })}
        </div>

        {data.conductionSystem[activeConductionIdx] && (
          <div className="mt-3 rounded-xl border border-amber-500/35 bg-amber-500/10 p-3.5 light:border-amber-400 light:bg-amber-50">
            <p className="font-display text-sm font-bold text-amber-300 light:text-amber-900">
              {data.conductionSystem[activeConductionIdx].step}.{' '}
              {data.conductionSystem[activeConductionIdx].name}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-200 light:text-slate-700 sm:text-sm">
              {data.conductionSystem[activeConductionIdx].role}
            </p>
          </div>
        )}
      </div>

      {/* EKG Waves & Cardiac Cycle S1/S2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-bold">
            <Activity className="h-4 w-4 text-cyan-400" />
            Gelombang EKG Dasar
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.ekgWaves.map((item, idx) => (
              <button
                key={`ekg-${idx}`}
                type="button"
                onClick={() => setActiveEkgIdx(idx)}
                className={cn(
                  'min-h-[44px] rounded-xl border px-3.5 font-mono text-xs font-bold transition',
                  activeEkgIdx === idx
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:border-cyan-700 light:bg-cyan-600 light:text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 light:border-stone-300 light:bg-stone-100 light:text-slate-700'
                )}
              >
                {item.wave}
              </button>
            ))}
          </div>
          {data.ekgWaves[activeEkgIdx] && (
            <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-500/8 p-3.5 light:border-cyan-300 light:bg-cyan-50">
              <p className="font-mono text-xs font-bold text-cyan-300 light:text-cyan-800">
                {data.ekgWaves[activeEkgIdx].wave}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-200 light:text-slate-700 sm:text-sm">
                {data.ekgWaves[activeEkgIdx].meaning}
              </p>
            </div>
          )}
        </div>

        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="font-display text-base font-bold">
            Siklus Jantung &amp; Suara Jantung (S1 / S2)
          </h3>
          <div className="mt-3 space-y-2.5">
            {data.cardiacCycle.map((cyc, idx) => (
              <div
                key={`cycle-${idx}`}
                className="rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-slate-100 light:text-slate-900">
                    {cyc.phase} ({cyc.state})
                  </span>
                  {cyc.heartSound && (
                    <span className="rounded-md bg-rose-500/20 px-2 py-0.5 font-mono text-[11px] font-bold text-rose-300 light:bg-rose-100 light:text-rose-800">
                      {cyc.heartSound}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                  {cyc.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Cardiac Output Calculator (SV * HR = CO) */}
      <div className="clinical-surface rounded-2xl border-cyan-500/30 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
              <Gauge className="h-3.5 w-3.5" />
              Kalkulator Curah Jantung Interaktif
            </span>
            <h3 className="mt-1.5 font-display text-base font-bold sm:text-lg">
              {data.cardiacOutputFormula.formula}
            </h3>
            <p className="font-mono text-xs text-slate-400 light:text-slate-600">
              Contoh referensi: {data.cardiacOutputFormula.example}
            </p>
          </div>

          <span
            className={cn(
              'rounded-xl border px-3 py-1.5 font-mono text-xs font-bold',
              coStatus.cls
            )}
          >
            {coStatus.label}
          </span>
        </div>

        {/* Live Telemetry Readout */}
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 light:border-stone-300 light:bg-stone-100">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 light:text-slate-600">
                Hasil Cardiac Output (CO)
              </p>
              <p className="mt-1 font-mono text-2xl font-bold text-cyan-300 light:text-cyan-800 sm:text-3xl">
                {cardiacOutputL} L/mnt{' '}
                <span className="text-sm font-medium text-slate-400 light:text-slate-600">
                  ({cardiacOutputMl.toLocaleString('id-ID')} mL/mnt)
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setStrokeVolume(70);
                  setHeartRate(72);
                }}
                className="min-h-[36px] rounded-lg border border-slate-700 px-2.5 font-mono text-[11px] font-semibold text-slate-300 hover:border-cyan-400 light:border-stone-300 light:bg-white light:text-slate-700"
              >
                Istirahat (70×72)
              </button>
              <button
                type="button"
                onClick={() => {
                  setStrokeVolume(95);
                  setHeartRate(130);
                }}
                className="min-h-[36px] rounded-lg border border-slate-700 px-2.5 font-mono text-[11px] font-semibold text-slate-300 hover:border-rose-400 light:border-stone-300 light:bg-white light:text-slate-700"
              >
                Olahraga (95×130)
              </button>
              <button
                type="button"
                onClick={() => {
                  setStrokeVolume(60);
                  setHeartRate(50);
                }}
                className="min-h-[36px] rounded-lg border border-slate-700 px-2.5 font-mono text-[11px] font-semibold text-slate-300 hover:border-amber-400 light:border-stone-300 light:bg-white light:text-slate-700"
              >
                Bradikardia (60×50)
              </button>
            </div>
          </div>

          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-800 light:bg-stone-300">
            <motion.div
              animate={{ width: `${coBarPct}%` }}
              transition={springSnap}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-400"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <label htmlFor="sv-slider">Stroke Volume (SV)</label>
                <span className="font-mono text-cyan-300 light:text-cyan-800">
                  {strokeVolume} mL/denyut
                </span>
              </div>
              <input
                id="sv-slider"
                type="range"
                min={30}
                max={130}
                step={5}
                value={strokeVolume}
                onChange={(e) => setStrokeVolume(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <label htmlFor="hr-slider">Heart Rate (HR)</label>
                <span className="font-mono text-rose-300 light:text-rose-700">
                  {heartRate} bpm
                </span>
              </div>
              <input
                id="hr-slider"
                type="range"
                min={40}
                max={180}
                step={2}
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-rose-400"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {data.cardiacOutputFormula.variables.map((v, idx) => (
            <div
              key={`co-var-${idx}`}
              className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 light:border-stone-200 light:bg-stone-50"
            >
              <p className="font-mono text-xs font-bold text-cyan-300 light:text-cyan-800">
                {v.label}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-slate-100 light:text-slate-900">
                {v.value}
              </p>
              {v.detail && (
                <p className="mt-0.5 text-[11px] text-slate-400 light:text-slate-600">
                  {v.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Material Images */}
      {data.images.length > 0 && (
        <ImageGalleryGrid
          title="Diagram Materi Kardiovaskuler"
          images={data.images}
          onPreviewImage={onPreviewImage}
        />
      )}
    </div>
  );
}

// ============================================================================
// Sub-Module 2: PEREDARAN DARAH BESAR (SISTEMIK)
// ============================================================================
function SistemikPanel({
  data,
  onPreviewImage,
}: {
  data: Dosen2DataBundle['sistemik'];
  onPreviewImage: (img: ImagePreviewState) => void;
}) {
  const sortedFlow = useMemo(
    () => [...data.flowSequence].sort((a, b) => a.order - b.order),
    [data.flowSequence]
  );

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [autoTracing, setAutoTracing] = useState(false);

  useEffect(() => {
    if (!autoTracing || sortedFlow.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % sortedFlow.length);
    }, 1600);
    return () => window.clearInterval(timer);
  }, [autoTracing, sortedFlow.length]);

  const activeNode = sortedFlow[activeStepIdx];

  return (
    <div className="space-y-5">
      {/* Pulmonal vs Sistemik */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {data.pulmonalVsSistemik.map((item, idx) => (
          <div key={`pvs-${idx}`} className="clinical-surface rounded-2xl p-4">
            <h3 className="font-display text-base font-bold text-cyan-300 light:text-cyan-800">
              {item.name}
            </h3>
            <p className="mt-1.5 font-mono text-xs text-slate-200 light:text-slate-800">
              {item.route}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400 light:text-slate-600">
              {item.purpose}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Blood Flow Tracer */}
      {sortedFlow.length > 0 && activeNode && (
        <div className="clinical-surface rounded-2xl border-rose-500/30 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-rose-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-rose-300 light:bg-rose-100 light:text-rose-800">
                <Droplets className="h-3.5 w-3.5" />
                Interactive Blood Flow Tracer
              </span>
              <h3 className="mt-1.5 font-display text-base font-bold sm:text-lg">
                Jalur Sirkulasi Sistemik (Ventrikel Kiri → Atrium Kanan)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoTracing((prev) => !prev)}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3.5 text-xs font-bold transition',
                  autoTracing
                    ? 'bg-rose-500 text-white'
                    : 'border border-rose-500/40 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 light:border-rose-600 light:text-rose-800'
                )}
              >
                {autoTracing ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Auto-Trace</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tracer Step Chips */}
          <div className="no-scrollbar mt-4 flex items-center gap-1.5 overflow-x-auto pb-2">
            {sortedFlow.map((node, idx) => {
              const active = idx === activeStepIdx;
              const ox = oxygenBadgeStyle(node.oxygenState);
              return (
                <div key={node.id} className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setAutoTracing(false);
                      setActiveStepIdx(idx);
                    }}
                    className={cn(
                      'min-h-[44px] rounded-xl border px-3 py-2 text-left transition',
                      active
                        ? 'border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.18)] light:border-cyan-700 light:bg-cyan-600/15'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-600 light:border-stone-300 light:bg-stone-50'
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-400 light:text-slate-600">
                        {node.order}.
                      </span>
                      <span
                        className={cn(
                          'rounded px-1.5 py-0.2 font-mono text-[9px] font-bold border',
                          ox.className
                        )}
                      >
                        {ox.label}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-bold text-slate-100 light:text-slate-900">
                      {node.name}
                    </p>
                  </button>
                  {idx < sortedFlow.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Node Inspector */}
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/75 p-4 light:border-stone-300 light:bg-stone-50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-cyan-500/20 px-2 py-0.5 font-mono text-xs font-bold text-cyan-300 light:bg-cyan-600 light:text-white">
                  Langkah {activeNode.order} / {sortedFlow.length}
                </span>
                <span
                  className={cn(
                    'rounded-lg border px-2 py-0.5 font-mono text-xs font-semibold',
                    oxygenBadgeStyle(activeNode.oxygenState).className
                  )}
                >
                  {oxygenBadgeStyle(activeNode.oxygenState).label}
                </span>
                <span className="font-mono text-xs text-slate-400 light:text-slate-600">
                  {activeNode.region}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAutoTracing(false);
                    setActiveStepIdx((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={activeStepIdx === 0}
                  className="min-h-[38px] rounded-lg border border-slate-700 px-2.5 text-xs font-semibold disabled:opacity-40 light:border-stone-300"
                >
                  Mundur
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAutoTracing(false);
                    setActiveStepIdx((prev) =>
                      Math.min(sortedFlow.length - 1, prev + 1)
                    );
                  }}
                  disabled={activeStepIdx >= sortedFlow.length - 1}
                  className="min-h-[38px] rounded-lg border border-slate-700 px-2.5 text-xs font-semibold disabled:opacity-40 light:border-stone-300"
                >
                  Lanjut
                </button>
              </div>
            </div>

            <h4 className="mt-2 font-display text-base font-bold text-slate-100 light:text-slate-900">
              {activeNode.name}
            </h4>
            {activeNode.latinName && (
              <p className="font-mono text-xs text-cyan-300 light:text-cyan-800">
                {activeNode.latinName}
              </p>
            )}
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300 light:text-slate-700 sm:text-sm">
              {activeNode.description}
            </p>
          </div>
        </div>
      )}

      {/* Vessel Types & Aorta Branches */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="font-display text-base font-bold">
            Karakteristik Pembuluh Darah
          </h3>
          <div className="mt-3 space-y-2.5">
            {data.vesselTypes.map((vt, idx) => (
              <div
                key={`vt-${idx}`}
                className="rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-cyan-300 light:text-cyan-800">
                    {vt.type}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 light:text-slate-600">
                    {vt.direction}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-200 light:text-slate-800">
                  Dinding: {vt.wallFeature}
                </p>
                <p className="mt-0.5 text-xs text-slate-400 light:text-slate-600">
                  {vt.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="font-display text-base font-bold">
            Segmen &amp; Cabang Utama Aorta
          </h3>
          <div className="mt-3 space-y-2.5">
            {data.aortaBranches.map((seg, idx) => (
              <div
                key={`aorta-${idx}`}
                className="rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
              >
                <p className="font-display text-sm font-bold text-rose-300 light:text-rose-800">
                  {seg.segment}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-200 light:text-slate-800">
                  {seg.branches.join(' • ')}
                </p>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-600">
                  {seg.territory}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Circulations (including Cerebral + Circulus Willisi) */}
      <div className="clinical-surface rounded-2xl p-4 sm:p-5">
        <h3 className="font-display text-base font-bold">
          Sirkulasi Regional &amp; Circulus Willisi
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.regionalCirculations.map((reg, idx) => (
            <div
              key={`reg-circ-${idx}`}
              className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-950/55 p-3.5 light:border-stone-200 light:bg-stone-50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-sm font-bold text-cyan-300 light:text-cyan-800">
                    {reg.region}
                  </h4>
                  <span className="font-mono text-[10px] text-slate-400 light:text-slate-600">
                    {reg.source}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-200 light:text-slate-800">
                  <span className="font-semibold text-rose-300 light:text-rose-700">
                    Arteri:
                  </span>{' '}
                  {reg.arteries.join(', ')}
                </p>
                <p className="mt-1 text-xs text-slate-200 light:text-slate-800">
                  <span className="font-semibold text-cyan-300 light:text-cyan-700">
                    Vena:
                  </span>{' '}
                  {reg.veins.join(', ')}
                </p>
                <p className="mt-2 rounded-lg bg-slate-900/70 px-2.5 py-2 text-xs leading-relaxed text-slate-300 light:bg-white light:text-slate-700">
                  {reg.keyHighlight}
                </p>
              </div>

              {reg.imageUrl && (
                <button
                  type="button"
                  onClick={() =>
                    onPreviewImage({
                      title: reg.region,
                      imageUrl: reg.imageUrl!,
                      source: reg.source,
                      caption: reg.keyHighlight,
                    })
                  }
                  className="mt-3 inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-cyan-500/35 bg-cyan-500/10 px-3 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 light:border-cyan-600/35 light:text-cyan-800"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>Lihat Diagram {reg.region}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hepatic Portal System */}
      <div className="clinical-surface rounded-2xl p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-7">
            <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-300 light:bg-emerald-100 light:text-emerald-800">
              Sistem Khusus • {data.hepaticPortalSystem.source}
            </span>
            <h3 className="font-display text-base font-bold sm:text-lg">
              Sistem Vena Porta Hepatika
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 light:text-slate-700 sm:text-sm">
              {data.hepaticPortalSystem.definition}
            </p>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase text-slate-400 light:text-slate-600">
                Pembuluh Pembentuk Utama (Tributaries):
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {data.hepaticPortalSystem.tributaries.map((tr, idx) => (
                  <span
                    key={`trib-${idx}`}
                    className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-cyan-300 light:border-stone-300 light:bg-white light:text-cyan-800"
                  >
                    {tr}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] font-bold uppercase text-slate-400 light:text-slate-600">
                Alur Aliran Porta:
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {data.hepaticPortalSystem.pathway.map((step, idx) => (
                  <div
                    key={`porta-step-${idx}`}
                    className="flex items-center gap-1.5"
                  >
                    <span className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-200 light:border-emerald-500/40 light:bg-emerald-50 light:text-emerald-900">
                      {step}
                    </span>
                    {idx < data.hepaticPortalSystem.pathway.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  title: 'Sistem Vena Porta Hepatika',
                  imageUrl: data.hepaticPortalSystem.imageUrl,
                  source: data.hepaticPortalSystem.source,
                  caption: data.hepaticPortalSystem.definition,
                })
              }
              className="group relative w-full overflow-hidden rounded-xl border border-slate-800 bg-[#050811] light:border-stone-300"
            >
              <img
                src={data.hepaticPortalSystem.imageUrl}
                alt="Sistem Vena Porta Hepatika"
                loading="lazy"
                className="aspect-[16/10] w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-lg bg-slate-950/85 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                <ZoomIn className="h-3.5 w-3.5" />
                Perbesar
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mini-Game: Order Blood Flow */}
      <SequenceOrderGame
        title="Susun Urutan Aliran Darah Sistemik"
        subtitle="Susun perjalanan darah dari Ventrikel Kiri hingga kembali ke Atrium Kanan."
        orderedNodes={sortedFlow}
      />

      {data.images.length > 0 && (
        <ImageGalleryGrid
          title="Galeri Slide Peredaran Darah"
          images={data.images}
          onPreviewImage={onPreviewImage}
        />
      )}
    </div>
  );
}

// ============================================================================
// Sub-Module 3: LIMB ATAS (UPPER ARM CIRCULATION)
// ============================================================================
function LimbAtasPanel({
  data,
  onPreviewImage,
}: {
  data: Dosen2DataBundle['limbAtas'];
  onPreviewImage: (img: ImagePreviewState) => void;
}) {
  const sortedChain = useMemo(
    () => [...data.arteryChain].sort((a, b) => a.order - b.order),
    [data.arteryChain]
  );

  // Ensure Slide 56 & Slide 59 visuals are always prominently accessible
  const featuredImages = useMemo(() => {
    const imgs = [...data.images];
    const hasSlide56 = imgs.some((i) => i.imageUrl.includes('darah-limb-atas'));
    const hasSlide59 = imgs.some((i) =>
      i.imageUrl.includes('darah-vena-tubuh')
    );

    if (!hasSlide56) {
      imgs.unshift({
        title: 'Sirkulasi Arteri & Vena Limb Atas (Slide 56)',
        imageUrl: '/assets/materi/darah-limb-atas.webp',
        source: 'Sistem Peredaran Darah.pptx (Slide 56)',
        caption:
          'Rantai arteri ekstremitas atas: Subclavia → Axillaris → Brachialis → Radialis/Ulnaris → Arcus Palmaris → Digitalis.',
      });
    }
    if (!hasSlide59) {
      imgs.push({
        title: 'Drainase Vena Tubuh & Lengan Atas (Slide 59)',
        imageUrl: '/assets/materi/darah-vena-tubuh.webp',
        source: 'Sistem Peredaran Darah.pptx (Slide 59)',
        caption:
          'Peta drainase vena superfisial (Cephalica, Basilica, Mediana Cubiti) dan vena profunda ekstremitas atas.',
      });
    }
    return imgs;
  }, [data.images]);

  return (
    <div className="space-y-5">
      {/* Highlighted Visuals: Slide 56 & Slide 59 */}
      <ImageGalleryGrid
        title="Visualisasi Slide Pembuluh Lengan Atas (Slide 56 & Vena Slide 59)"
        images={featuredImages}
        onPreviewImage={onPreviewImage}
      />

      {/* Artery Chain Pipeline */}
      <div className="clinical-surface rounded-2xl p-4 sm:p-5">
        <h3 className="font-display text-base font-bold">
          Rantai Arteri Ekstremitas Atas (Proksimal → Distal)
        </h3>
        <div className="mt-3 space-y-2">
          {sortedChain.map((node, idx) => (
            <div key={node.id} className="flex flex-col items-stretch">
              <div className="flex items-start gap-3 rounded-xl border border-rose-500/25 bg-rose-500/6 p-3 light:border-rose-200 light:bg-rose-50/60">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 font-mono text-xs font-bold text-rose-300 light:bg-rose-600 light:text-white">
                  {node.order}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-sm font-bold text-slate-100 light:text-slate-900">
                      {node.name}
                    </p>
                    <span className="font-mono text-[11px] text-rose-300 light:text-rose-700">
                      {node.region}
                    </span>
                  </div>
                  {node.latinName && (
                    <p className="font-mono text-xs text-cyan-300 light:text-cyan-800">
                      {node.latinName}
                    </p>
                  )}
                  <p className="mt-1 text-xs leading-relaxed text-slate-300 light:text-slate-700">
                    {node.description}
                  </p>
                </div>
              </div>
              {idx < sortedChain.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="h-4 w-4 text-rose-400/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Superficial & Deep Veins */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.veinDrainage.map((group) => (
          <div
            key={group.group}
            className="clinical-surface rounded-2xl p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-base font-bold text-cyan-300 light:text-cyan-800">
                Vena {group.group}
              </h3>
              <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
                {group.vessels.length} pembuluh
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              {group.vessels.map((v, idx) => (
                <div
                  key={`${group.group}-${idx}`}
                  className="rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
                >
                  <p className="font-mono text-xs font-bold text-slate-100 light:text-slate-900">
                    {v.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400 light:text-slate-600">
                    {v.locationAndPath}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Clinical Highlights */}
      {data.clinicalHighlights.length > 0 && (
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="font-display text-base font-bold">
            Sorotan Klinis &amp; Pengambilan Darah / Nadi
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.clinicalHighlights.map((hl, idx) => (
              <div
                key={`hl-${idx}`}
                className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-3.5 light:border-emerald-300 light:bg-emerald-50"
              >
                <p className="font-mono text-xs font-bold text-emerald-300 light:text-emerald-800">
                  {hl.label}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-100 light:text-slate-900">
                  {hl.value}
                </p>
                {hl.detail && (
                  <p className="mt-1 text-xs text-slate-300 light:text-slate-700">
                    {hl.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mini-Game: Order Upper Limb Arteries */}
      <SequenceOrderGame
        title="Urutkan Pembuluh Arteri Lengan Atas"
        subtitle="Susun rantai arteri dari pangkal (Subclavia) menuju ujung jari (Digitalis)."
        orderedNodes={sortedChain}
      />
    </div>
  );
}

// ============================================================================
// Sub-Module 4: 12 SARAF KRANIAL
// ============================================================================
const MODALITY_BADGE: Record<CranialNerveItem['modality'], string> = {
  Sensorik:
    'border-cyan-500/40 bg-cyan-500/15 text-cyan-300 light:border-cyan-600/35 light:bg-cyan-100 light:text-cyan-800',
  Motorik:
    'border-rose-500/40 bg-rose-500/15 text-rose-300 light:border-rose-600/35 light:bg-rose-100 light:text-rose-800',
  Campuran:
    'border-amber-500/40 bg-amber-500/15 text-amber-300 light:border-amber-600/35 light:bg-amber-100 light:text-amber-800',
};

function CranialNerveMiniGame({ nerves }: { nerves: CranialNerveItem[] }) {
  const [gameMode, setGameMode] = useState<'function' | 'modality'>('function');
  const [roundSeed, setRoundSeed] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedAnswer, setPickedAnswer] = useState<string | null>(null);

  const deck = useMemo(() => {
    void roundSeed;
    return shuffleArray(nerves).slice(0, Math.min(6, nerves.length));
  }, [nerves, roundSeed]);

  const currentNerve = deck[roundIdx];

  const functionOptions = useMemo(() => {
    if (!currentNerve) return [];
    const distractors = shuffleArray(
      nerves.filter((n) => n.number !== currentNerve.number)
    )
      .slice(0, 3)
      .map((n) => n.targetAndFunction);
    return shuffleArray([currentNerve.targetAndFunction, ...distractors]);
  }, [currentNerve, nerves]);

  if (nerves.length < 4) return null;

  const isFinished = roundIdx >= deck.length;

  const handleSelectOption = (choice: string) => {
    if (pickedAnswer !== null || !currentNerve) return;
    setPickedAnswer(choice);
    const correctVal =
      gameMode === 'function'
        ? currentNerve.targetAndFunction
        : currentNerve.modality;
    if (choice === correctVal) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setPickedAnswer(null);
    setRoundIdx((prev) => prev + 1);
  };

  const handleRestart = (nextMode?: 'function' | 'modality') => {
    if (nextMode) setGameMode(nextMode);
    setRoundSeed((s) => s + 1);
    setRoundIdx(0);
    setScore(0);
    setPickedAnswer(null);
  };

  const correctAnswer = currentNerve
    ? gameMode === 'function'
      ? currentNerve.targetAndFunction
      : currentNerve.modality
    : '';

  return (
    <div className="clinical-surface rounded-2xl border-cyan-500/30 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
            <Sparkles className="h-3.5 w-3.5" />
            Mini-Game Saraf Kranial
          </span>
          <h4 className="mt-1.5 font-display text-base font-bold">
            Cocokkan Saraf Kranial ↔ Fungsi / Jenis
          </h4>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950/70 p-1 light:border-stone-300 light:bg-stone-100">
          <button
            type="button"
            onClick={() => handleRestart('function')}
            className={cn(
              'min-h-[36px] rounded-lg px-2.5 text-xs font-bold transition',
              gameMode === 'function'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-400 light:text-slate-600'
            )}
          >
            Tebak Fungsi
          </button>
          <button
            type="button"
            onClick={() => handleRestart('modality')}
            className={cn(
              'min-h-[36px] rounded-lg px-2.5 text-xs font-bold transition',
              gameMode === 'modality'
                ? 'bg-rose-500 text-white'
                : 'text-slate-400 light:text-slate-600'
            )}
          >
            Tebak Jenis
          </button>
        </div>
      </div>

      {isFinished ? (
        <div className="mt-4 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-center light:border-emerald-400 light:bg-emerald-50">
          <p className="font-display text-lg font-bold text-emerald-300 light:text-emerald-800">
            Skor Mini-Game: {score} / {deck.length}
          </p>
          <p className="mt-1 text-xs text-slate-300 light:text-slate-700">
            Latihan cepat 6 saraf acak selesai. Ulangi untuk memperkuat hafalan
            foramen &amp; modalitas!
          </p>
          <button
            type="button"
            onClick={() => handleRestart()}
            className="mt-3 min-h-[44px] rounded-xl bg-cyan-500 px-4 text-xs font-bold text-slate-950 hover:bg-cyan-400"
          >
            Main Ronde Baru
          </button>
        </div>
      ) : currentNerve ? (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 light:border-stone-200 light:bg-stone-50">
            <div>
              <span className="font-mono text-xs font-bold text-cyan-400 light:text-cyan-700">
                Ronde {roundIdx + 1} / {deck.length} • N. {currentNerve.roman}
              </span>
              <p className="mt-0.5 font-display text-base font-bold text-slate-100 light:text-slate-900">
                {currentNerve.name} ({currentNerve.indonesianName})
              </p>
            </div>
            <span className="rounded-lg bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-emerald-300 light:bg-emerald-100 light:text-emerald-800">
              Skor: {score}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {(gameMode === 'function'
              ? functionOptions
              : (['Sensorik', 'Motorik', 'Campuran'] as const)
            ).map((opt) => {
              const isPicked = pickedAnswer === opt;
              const isCorrectChoice = opt === correctAnswer;

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={pickedAnswer !== null}
                  onClick={() => handleSelectOption(opt)}
                  className={cn(
                    'min-h-[46px] rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition sm:text-sm',
                    pickedAnswer === null
                      ? 'border-slate-700/80 bg-slate-900/75 text-slate-200 hover:border-cyan-400 light:border-stone-300 light:bg-white light:text-slate-900'
                      : isCorrectChoice
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 light:border-emerald-600 light:bg-emerald-50 light:text-emerald-900'
                        : isPicked
                          ? 'border-rose-500 bg-rose-500/20 text-rose-200 light:border-rose-600 light:bg-rose-50 light:text-rose-900'
                          : 'border-slate-800 bg-slate-950/50 text-slate-500 opacity-60 light:border-stone-200 light:bg-stone-100'
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {pickedAnswer !== null && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/75 p-3 light:border-stone-200 light:bg-stone-50">
              <p className="text-xs text-slate-300 light:text-slate-700">
                <span className="font-bold text-cyan-300 light:text-cyan-800">
                  Foramen:
                </span>{' '}
                {currentNerve.foramen} •{' '}
                <span className="font-semibold">{currentNerve.modality}</span>
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[40px] rounded-xl bg-cyan-500 px-4 text-xs font-bold text-slate-950 hover:bg-cyan-400"
              >
                {roundIdx + 1 >= deck.length ? 'Lihat Skor' : 'Lanjut'}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SarafKranialPanel({
  data,
  onPreviewImage,
}: {
  data: Dosen2DataBundle['sarafKranial'];
  onPreviewImage: (img: ImagePreviewState) => void;
}) {
  const [modalityFilter, setModalityFilter] = useState<
    'all' | CranialNerveItem['modality']
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [hideNerveFunctions, setHideNerveFunctions] = useState(false);

  const featuredImages = useMemo(() => {
    const imgs = [...data.images];
    const hasCranialImg = imgs.some((i) =>
      i.imageUrl.includes('head-cranial-nerves')
    );
    if (!hasCranialImg) {
      imgs.unshift({
        title: 'Peta 12 Saraf Kranial & Basis Kranii',
        imageUrl: '/assets/materi/head-cranial-nerves.webp',
        source: 'ANATOMY CROSSECTIONAL of head.pdf',
        caption:
          'Visualisasi keluarnya N. I–XII beserta relasi foramen di basis kranii.',
      });
    }
    return imgs;
  }, [data.images]);

  const counts = useMemo(() => {
    return {
      all: data.nerves.length,
      Sensorik: data.nerves.filter((n) => n.modality === 'Sensorik').length,
      Motorik: data.nerves.filter((n) => n.modality === 'Motorik').length,
      Campuran: data.nerves.filter((n) => n.modality === 'Campuran').length,
    };
  }, [data.nerves]);

  const filteredNerves = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return data.nerves.filter((n) => {
      if (modalityFilter !== 'all' && n.modality !== modalityFilter) {
        return false;
      }
      if (!q) return true;
      return [
        n.roman,
        `n.${n.roman}`,
        `cn ${n.number}`,
        n.name,
        n.indonesianName,
        n.foramen,
        n.targetAndFunction,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [data.nerves, modalityFilter, searchQuery]);

  return (
    <div className="space-y-5">
      {/* Mnemonic Interactive Panel */}
      {data.mnemonics.length > 0 && (
        <div className="clinical-surface rounded-2xl border-amber-500/30 p-4 sm:p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-amber-300 light:text-amber-800">
            <HelpCircle className="h-4 w-4" />
            Jembatan Keledai (Mnemonic) N. I – XII
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {data.mnemonics.map((mn, idx) => (
              <div
                key={`mn-${idx}`}
                className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-3.5 light:border-amber-300 light:bg-amber-50"
              >
                <p className="font-mono text-xs font-bold text-amber-300 light:text-amber-800">
                  {mn.title}
                </p>
                <p className="mt-1 font-display text-sm font-bold text-slate-100 light:text-slate-900">
                  {mn.phrase.replace(/^["“”]+|["“”]+$/g, '')}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300 light:text-slate-700">
                  {mn.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter & View Switch */}
      <div className="clinical-surface space-y-3 rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {(['all', 'Sensorik', 'Motorik', 'Campuran'] as const).map(
              (mod) => {
                const active = modalityFilter === mod;
                return (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => setModalityFilter(mod)}
                    className={cn(
                      'min-h-[42px] shrink-0 rounded-xl border px-3 text-xs font-bold transition',
                      active
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:border-cyan-700 light:bg-cyan-600 light:text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 light:border-stone-300 light:bg-stone-100 light:text-slate-700'
                    )}
                  >
                    {mod === 'all' ? 'Semua' : mod} ({counts[mod]})
                  </button>
                );
              }
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHideNerveFunctions((prev) => !prev)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-700 px-3 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 light:border-stone-300 light:text-slate-700"
            >
              <Eye className="h-3.5 w-3.5" />
              {hideNerveFunctions ? 'Tampilkan Fungsi' : 'Uji Hafalan'}
            </button>

            <button
              type="button"
              onClick={() =>
                setViewMode((prev) => (prev === 'cards' ? 'table' : 'cards'))
              }
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-700 px-3 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 light:border-stone-300 light:text-slate-700"
            >
              <Table2 className="h-3.5 w-3.5" />
              {viewMode === 'cards' ? 'Tabel' : 'Kartu'}
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari saraf (Vagus, VII, Facialis), foramen, atau fungsi..."
            className="min-h-[44px] w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pr-10 pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none light:border-stone-300 light:bg-stone-50 light:text-slate-900"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian saraf"
              className="absolute top-1/2 right-1.5 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Cards or Responsive Table of N. I–XII */}
      {filteredNerves.length === 0 ? (
        <div className="clinical-surface rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold">
            Tidak ada saraf kranial yang cocok dengan pencarianmu.
          </p>
          <button
            type="button"
            onClick={() => {
              setModalityFilter('all');
              setSearchQuery('');
            }}
            className="mt-3 min-h-[44px] rounded-xl bg-cyan-500 px-4 text-xs font-bold text-slate-950"
          >
            Reset Filter
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filteredNerves.map((nerve) => (
            <div
              key={`cn-${nerve.number}`}
              className="clinical-surface rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 min-w-[40px] items-center justify-center rounded-xl bg-slate-800 px-2 font-mono text-sm font-bold text-cyan-300 light:bg-cyan-600 light:text-white">
                    N.{nerve.roman}
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-bold text-slate-100 light:text-slate-900 sm:text-base">
                      {nerve.name}
                    </h4>
                    <p className="text-xs font-medium text-cyan-300 light:text-cyan-800">
                      {nerve.indonesianName}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    'rounded-lg border px-2 py-0.5 font-mono text-[11px] font-bold',
                    MODALITY_BADGE[nerve.modality]
                  )}
                >
                  {nerve.modality}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-2.5 text-xs light:border-stone-200">
                <p className="text-slate-300 light:text-slate-700">
                  <span className="font-mono font-semibold text-rose-300 light:text-rose-700">
                    Foramen:
                  </span>{' '}
                  {hideNerveFunctions ? '••••••' : nerve.foramen}
                </p>
                <p className="leading-relaxed text-slate-200 light:text-slate-800">
                  <span className="font-mono font-semibold text-cyan-300 light:text-cyan-800">
                    Fungsi:
                  </span>{' '}
                  {hideNerveFunctions
                    ? 'Tersembunyi (tekan Tampilkan Fungsi di atas)'
                    : nerve.targetAndFunction}
                </p>
                <p className="font-mono text-[10px] text-slate-500">
                  Sumber: {nerve.sourceNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="clinical-surface overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-[11px] uppercase text-slate-400 light:border-stone-300 light:bg-stone-100 light:text-slate-700">
                  <th className="px-3.5 py-3">N.</th>
                  <th className="px-3.5 py-3">Nama Saraf</th>
                  <th className="px-3.5 py-3">Jenis</th>
                  <th className="px-3.5 py-3">Foramen Kranium</th>
                  <th className="px-3.5 py-3">Target &amp; Fungsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 light:divide-stone-200">
                {filteredNerves.map((nerve) => (
                  <tr
                    key={`cn-row-${nerve.number}`}
                    className="hover:bg-slate-900/40 light:hover:bg-stone-50"
                  >
                    <td className="px-3.5 py-3 font-mono font-bold text-cyan-300 light:text-cyan-800">
                      {nerve.roman}
                    </td>
                    <td className="px-3.5 py-3">
                      <p className="font-semibold text-slate-100 light:text-slate-900">
                        {nerve.name}
                      </p>
                      <p className="text-[11px] text-slate-400 light:text-slate-600">
                        {nerve.indonesianName}
                      </p>
                    </td>
                    <td className="px-3.5 py-3">
                      <span
                        className={cn(
                          'inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold',
                          MODALITY_BADGE[nerve.modality]
                        )}
                      >
                        {nerve.modality}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-slate-300 light:text-slate-700">
                      {hideNerveFunctions ? '••••••' : nerve.foramen}
                    </td>
                    <td className="px-3.5 py-3 leading-relaxed text-slate-200 light:text-slate-800">
                      {hideNerveFunctions
                        ? '[Mode Uji Hafalan]'
                        : nerve.targetAndFunction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Foramina Table (Mobile stacked cards + Desktop table) */}
      {data.foraminaTable.length > 0 && (
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <h3 className="font-display text-base font-bold">
            Tabel Ringkas Foramen Kranium &amp; Struktur yang Melintas
          </h3>

          {/* Mobile Stacked Cards */}
          <div className="mt-3 space-y-2.5 md:hidden">
            {data.foraminaTable.map((row, idx) => (
              <div
                key={`for-m-${idx}`}
                className="rounded-xl border border-slate-800/90 bg-slate-950/55 p-3 light:border-stone-200 light:bg-stone-50"
              >
                <p className="font-mono text-xs font-bold text-cyan-300 light:text-cyan-800">
                  {row.foramen}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-rose-300 light:text-rose-700">
                  {row.location}
                </p>
                <p className="mt-1 text-xs text-slate-200 light:text-slate-800">
                  {row.structures}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="mt-3 hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 font-mono text-[11px] uppercase text-slate-400 light:border-stone-300 light:text-slate-600">
                  <th className="py-2.5 pr-4">Foramen</th>
                  <th className="px-4 py-2.5">Lokasi Fossa</th>
                  <th className="py-2.5 pl-4">Struktur Melintas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 light:divide-stone-200">
                {data.foraminaTable.map((row, idx) => (
                  <tr key={`for-d-${idx}`}>
                    <td className="py-2.5 pr-4 font-mono font-bold text-cyan-300 light:text-cyan-800">
                      {row.foramen}
                    </td>
                    <td className="px-4 py-2.5 text-slate-300 light:text-slate-700">
                      {row.location}
                    </td>
                    <td className="py-2.5 pl-4 text-slate-200 light:text-slate-800">
                      {row.structures}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mini-Game */}
      <CranialNerveMiniGame nerves={data.nerves} />

      {/* Cranial Nerves Images */}
      <ImageGalleryGrid
        title="Visualisasi Peta 12 Saraf Kranial"
        images={featuredImages}
        onPreviewImage={onPreviewImage}
      />
    </div>
  );
}

// ============================================================================
// Shared Image Gallery Grid
// ============================================================================
function ImageGalleryGrid({
  title,
  images,
  onPreviewImage,
}: {
  title: string;
  images: { title: string; imageUrl: string; source: string; caption: string }[];
  onPreviewImage: (img: ImagePreviewState) => void;
}) {
  return (
    <div className="clinical-surface rounded-2xl p-4 sm:p-5">
      <h3 className="font-display text-base font-bold">{title}</h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {images.map((img, idx) => (
          <button
            key={`${img.imageUrl}-${idx}`}
            type="button"
            onClick={() => onPreviewImage(img)}
            className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 text-left transition hover:border-cyan-500/50 light:border-stone-300 light:bg-white"
          >
            <div className="relative aspect-[16/10] w-full bg-[#050811]">
              <img
                src={img.imageUrl}
                alt={img.title}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-lg bg-slate-950/85 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                <ZoomIn className="h-3.5 w-3.5" />
                Perbesar
              </span>
            </div>
            <div className="p-3">
              <p className="font-display text-xs font-bold text-slate-100 light:text-slate-900 sm:text-sm">
                {img.title}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-400 light:text-slate-600">
                {img.source}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-slate-400 light:text-slate-600">
                {img.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN EXPORTED COMPONENT: Dosen2ModuleViewer
// ============================================================================
export function Dosen2ModuleViewer({
  data,
  initialTopic = 'kardiovaskuler',
  studiedIds,
  onToggleStudied,
  onStartTopicQuiz,
  onTopicChange,
}: Dosen2ModuleViewerProps) {
  const [activeTopic, setActiveTopic] = useState<Dosen2TopicId>(initialTopic);
  const [previewImage, setPreviewImage] = useState<ImagePreviewState | null>(
    null
  );

  useEffect(() => {
    setActiveTopic(initialTopic);
  }, [initialTopic]);

  const studiedSet = useMemo(() => new Set(studiedIds), [studiedIds]);
  const topicStudyId = `dosen2-${activeTopic}`;
  const isTopicStudied = studiedSet.has(topicStudyId);

  const topicMeta = useMemo(() => {
    if (activeTopic === 'kardiovaskuler') return data.kardiovaskuler;
    if (activeTopic === 'sistemik') return data.sistemik;
    if (activeTopic === 'limb-atas') return data.limbAtas;
    return data.sarafKranial;
  }, [activeTopic, data]);

  return (
    <section className="space-y-4">
      {/* 4 Sub-Module Tabs */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        {TOPIC_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTopic === tab.id;
          const done = studiedSet.has(`dosen2-${tab.id}`);

          return (
            <motion.button
              key={tab.id}
              type="button"
              whileTap={tapScale}
              onClick={() => {
                setActiveTopic(tab.id);
                onTopicChange?.(tab.id);
              }}
              className={cn(
                'relative inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl border px-3.5 text-xs font-bold transition sm:text-sm',
                active
                  ? 'border-cyan-400/60 text-slate-100 light:border-cyan-700 light:text-cyan-950'
                  : 'border-slate-800 bg-slate-900/75 text-slate-300 hover:border-slate-700 light:border-stone-300 light:bg-white light:text-slate-700'
              )}
            >
              {active && (
                <motion.span
                  layoutId="dosen2-topic-pill"
                  transition={tabIndicatorTransition}
                  className="absolute inset-0 rounded-xl bg-cyan-500/18 light:bg-cyan-500/15"
                />
              )}
              <Icon className="relative z-10 h-4 w-4 text-cyan-400 light:text-cyan-700" />
              <span className="relative z-10">{tab.shortLabel}</span>
              {done && (
                <CheckCircle2 className="relative z-10 h-3.5 w-3.5 text-emerald-400 light:text-emerald-600" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Topic Header Banner */}
      <div className="clinical-surface rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {topicMeta.sources.map((src, idx) => (
                <span
                  key={`src-${idx}`}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-950/60 px-2 py-0.5 font-mono text-[10px] text-slate-300 light:border-stone-300 light:bg-stone-100 light:text-slate-700"
                >
                  <FileText className="h-3 w-3 text-cyan-400 light:text-cyan-700" />
                  {src}
                </span>
              ))}
            </div>
            <h2 className="mt-2 font-display text-lg font-bold tracking-tight sm:text-2xl">
              {topicMeta.title}
            </h2>
            <p className="mt-0.5 text-xs text-slate-400 light:text-slate-600 sm:text-sm">
              {topicMeta.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={() => onToggleStudied(topicStudyId)}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3.5 text-xs font-bold transition',
                isTopicStudied
                  ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 light:border-emerald-600 light:bg-emerald-600 light:text-white'
                  : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-500/50 light:border-stone-300 light:bg-stone-100 light:text-slate-800'
              )}
            >
              {isTopicStudied ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Modul Dikuasai</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tandai Dikuasai</span>
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={() => onStartTopicQuiz(activeTopic)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-rose-500 px-4 text-xs font-bold text-slate-950 shadow-md transition hover:brightness-110"
            >
              <Zap className="h-4 w-4" />
              <span>Kuis Topik Ini</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Active Sub-Module Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTopic}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={springSnap}
        >
          {activeTopic === 'kardiovaskuler' && (
            <KardiovaskulerPanel
              data={data.kardiovaskuler}
              onPreviewImage={setPreviewImage}
            />
          )}
          {activeTopic === 'sistemik' && (
            <SistemikPanel
              data={data.sistemik}
              onPreviewImage={setPreviewImage}
            />
          )}
          {activeTopic === 'limb-atas' && (
            <LimbAtasPanel
              data={data.limbAtas}
              onPreviewImage={setPreviewImage}
            />
          )}
          {activeTopic === 'saraf-kranial' && (
            <SarafKranialPanel
              data={data.sarafKranial}
              onPreviewImage={setPreviewImage}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Image Modal (supports tap-outside & visible X button) */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={springSnap}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-2xl light:border-stone-300 light:bg-white light:text-slate-900"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 light:border-stone-200">
                <div className="min-w-0">
                  <h4 className="truncate font-display text-sm font-bold sm:text-base">
                    {previewImage.title}
                  </h4>
                  {previewImage.source && (
                    <p className="truncate font-mono text-[11px] text-slate-400 light:text-slate-600">
                      {previewImage.source}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  aria-label="Tutup pratinjau gambar"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 light:border-stone-300 light:bg-stone-100 light:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto bg-[#050811] p-2">
                <img
                  src={previewImage.imageUrl}
                  alt={previewImage.title}
                  className="mx-auto max-h-[68vh] w-auto object-contain"
                />
              </div>

              {previewImage.caption && (
                <div className="border-t border-slate-800 px-4 py-3 text-xs leading-relaxed text-slate-300 light:border-stone-200 light:text-slate-700">
                  {previewImage.caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Dosen2ModuleViewer;
