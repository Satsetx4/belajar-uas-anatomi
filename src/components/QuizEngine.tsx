import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Eye,
  EyeOff,
  Flag,
  Grid,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';
import type {
  ActiveQuizDraft,
  MaskZone,
  QuestionItem,
  QuestionTopic,
  QuizHistoryEntry,
} from '../types/anatomy';
import { cn, springSnap, tapScale } from '../lib/motion';

export interface QuizEngineProps {
  allQuestions: QuestionItem[];
  mode: 'belajar' | 'ujian' | 'simulasi-uas' | 'ulang-salah';
  topicFilter?: QuestionTopic | 'all';
  wrongQuestionIds: string[];
  activeDraft: ActiveQuizDraft | null;
  onSaveDraft: (draft: ActiveQuizDraft | null) => void;
  onCompleteQuiz: (
    entry: QuizHistoryEntry,
    wrongIds: string[],
    correctIds: string[]
  ) => void;
  onExit: () => void;
}

const TOPIC_LABELS: Record<QuestionTopic | 'all', string> = {
  all: 'Semua Topik',
  'crossec-head': 'Cross-Section Kepala',
  'crossec-thorax': 'Cross-Section Thorax',
  'crossec-abdomen': 'Cross-Section Abdomen',
  'tm-identifikasi': 'Identifikasi TM 1–5',
  kardiovaskuler: 'Kardiovaskuler',
  sistemik: 'Peredaran Darah Besar',
  'limb-atas': 'Limb Atas (Lengan)',
  'saraf-kranial': '12 Saraf Kranial',
};

const MODE_LABELS: Record<QuizEngineProps['mode'], string> = {
  belajar: 'Mode Belajar',
  ujian: 'Mode Ujian',
  'simulasi-uas': 'Simulasi UAS Resmi (28 Soal)',
  'ulang-salah': 'Ulang Soal Salah',
};

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTimer(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Picks N questions preferring distinct values of `keyFn(q)` before repeating.
 */
function pickDistinct<T>(
  pool: T[],
  count: number,
  keyFn: (item: T) => string
): T[] {
  const shuffled = shuffleArray(pool);
  const picked: T[] = [];
  const usedKeys = new Set<string>();
  const usedIdx = new Set<number>();

  // Pass 1: distinct keys
  shuffled.forEach((item, idx) => {
    if (picked.length >= count) return;
    const key = keyFn(item);
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      usedIdx.add(idx);
      picked.push(item);
    }
  });

  // Pass 2: fill any remainder if fewer distinct keys existed
  if (picked.length < count) {
    shuffled.forEach((item, idx) => {
      if (picked.length >= count) return;
      if (!usedIdx.has(idx)) {
        usedIdx.add(idx);
        picked.push(item);
      }
    });
  }

  return picked;
}

/**
 * Exact UAS Blueprint Generator:
 * - 1 Cross-Section Kepala (crossec-head)
 * - 1 Cross-Section Thorax (crossec-thorax)
 * - 2 Cross-Section Abdomen from distinct crossecId / slices (crossec-abdomen)
 * - 4 Identifikasi Gambar TM (tm-identifikasi)
 * - 20 Dosen 2: 5 kardiovaskuler, 5 sistemik, 5 limb-atas, 5 saraf-kranial
 * Total = 28 questions (Dosen 1 = 8, Dosen 2 = 20)
 */
function buildSimulasiUasQuestions(allQuestions: QuestionItem[]): QuestionItem[] {
  const byTopic = (topic: QuestionTopic) =>
    allQuestions.filter((q) => q.topic === topic);

  const head = shuffleArray(byTopic('crossec-head')).slice(0, 1);
  const thorax = shuffleArray(byTopic('crossec-thorax')).slice(0, 1);
  const abdomen = pickDistinct(
    byTopic('crossec-abdomen'),
    2,
    (q) => q.crossecId || q.imageUrl || q.id
  );
  const tm = pickDistinct(
    byTopic('tm-identifikasi'),
    4,
    (q) => q.imageUrl || q.subtopic || q.id
  );

  const kardio = shuffleArray(byTopic('kardiovaskuler')).slice(0, 5);
  const sistemik = shuffleArray(byTopic('sistemik')).slice(0, 5);
  const limbAtas = shuffleArray(byTopic('limb-atas')).slice(0, 5);
  const kranial = shuffleArray(byTopic('saraf-kranial')).slice(0, 5);

  const dosen1Section = [...head, ...thorax, ...abdomen, ...tm];
  const dosen2Section = shuffleArray([
    ...kardio,
    ...sistemik,
    ...limbAtas,
    ...kranial,
  ]);

  return [...dosen1Section, ...dosen2Section];
}

function buildQuestionSession(
  allQuestions: QuestionItem[],
  mode: QuizEngineProps['mode'],
  topicFilter: QuestionTopic | 'all',
  wrongQuestionIds: string[]
): QuestionItem[] {
  if (mode === 'simulasi-uas') {
    return buildSimulasiUasQuestions(allQuestions);
  }

  if (mode === 'ulang-salah') {
    const wrongSet = new Set(wrongQuestionIds);
    const pool = allQuestions.filter((q) => {
      if (!wrongSet.has(q.id)) return false;
      if (topicFilter !== 'all' && q.topic !== topicFilter) return false;
      return true;
    });
    return shuffleArray(pool);
  }

  const pool =
    topicFilter === 'all'
      ? allQuestions
      : allQuestions.filter((q) => q.topic === topicFilter);

  const shuffled = shuffleArray(pool);
  if (mode === 'ujian' && topicFilter === 'all' && shuffled.length > 30) {
    return shuffled.slice(0, 30);
  }
  return shuffled;
}

function MaskedQuestionImage({
  imageUrl,
  alt,
  maskZones,
  hideMask,
}: {
  imageUrl: string;
  alt: string;
  maskZones?: MaskZone[];
  hideMask: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#050811] light:border-stone-300">
      <div className="relative mx-auto w-full">
        <img
          src={imageUrl}
          alt={alt}
          className="block h-auto w-full select-none"
          draggable={false}
        />
        {!hideMask &&
          maskZones &&
          maskZones.map((zone, idx) => (
            <div
              key={`q-mask-${idx}`}
              aria-hidden="true"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.w}%`,
                height: `${zone.h}%`,
              }}
              className="absolute z-10 flex items-center justify-center rounded-md border border-cyan-400/50 bg-slate-950/88 backdrop-blur-md"
            >
              <span className="rounded bg-slate-900/90 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
                Label Ditutup
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export function QuizEngine({
  allQuestions,
  mode,
  topicFilter = 'all',
  wrongQuestionIds,
  activeDraft,
  onSaveDraft,
  onCompleteQuiz,
  onExit,
}: QuizEngineProps) {
  const topicKey = mode === 'simulasi-uas' ? 'simulasi-uas' : topicFilter;
  const isTimedMode = mode === 'ujian' || mode === 'simulasi-uas';
  const isImmediateMode = mode === 'belajar' || mode === 'ulang-salah';

  // Resolve initial session (from matching activeDraft or freshly generated)
  const initialSession = useMemo(() => {
    const questionById = new Map(allQuestions.map((q) => [q.id, q]));

    if (
      activeDraft &&
      activeDraft.mode === mode &&
      activeDraft.topicKey === topicKey
    ) {
      const restored = activeDraft.questionIds
        .map((id) => questionById.get(id))
        .filter((q): q is QuestionItem => Boolean(q));

      if (restored.length > 0) {
        const restoredDuration =
          activeDraft.durationSeconds ??
          (mode === 'simulasi-uas'
            ? 2400
            : Math.max(300, restored.length * 60));
        const elapsedSeconds = Math.floor(
          (Date.now() - activeDraft.startedAt) / 1000
        );
        const stillValidTime =
          !isTimedMode || elapsedSeconds < restoredDuration - 5;

        if (stillValidTime) {
          return {
            questions: restored,
            currentIndex: Math.min(
              activeDraft.currentIndex,
              restored.length - 1
            ),
            answers: activeDraft.answers,
            flaggedIds: activeDraft.flaggedIds,
            startedAt: activeDraft.startedAt,
            durationSeconds: restoredDuration,
            resumedFromDraft: true,
          };
        }
      }
    }

    const fresh = buildQuestionSession(
      allQuestions,
      mode,
      topicFilter,
      wrongQuestionIds
    );
    const defaultDuration =
      mode === 'simulasi-uas' ? 2400 : Math.max(300, fresh.length * 60);

    return {
      questions: fresh,
      currentIndex: 0,
      answers: {} as Record<string, number>,
      flaggedIds: [] as string[],
      startedAt: Date.now(),
      durationSeconds: defaultDuration,
      resumedFromDraft: false,
    };
    // Intentionally initialize once per mount/mode/topicKey switch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, topicKey]);

  const [questions, setQuestions] = useState<QuestionItem[]>(
    initialSession.questions
  );
  const [currentIndex, setCurrentIndex] = useState<number>(
    initialSession.currentIndex
  );
  const [answers, setAnswers] = useState<Record<string, number>>(
    initialSession.answers
  );
  const [flaggedIds, setFlaggedIds] = useState<string[]>(
    initialSession.flaggedIds
  );
  const [startedAt, setStartedAt] = useState<number>(initialSession.startedAt);
  const [durationSeconds, setDurationSeconds] = useState<number>(
    initialSession.durationSeconds
  );
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    const elapsed = Math.floor((Date.now() - initialSession.startedAt) / 1000);
    return Math.max(0, initialSession.durationSeconds - elapsed);
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gradedQuestions, setGradedQuestions] = useState<QuestionItem[] | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [revealMaskAfterAnswer, setRevealMaskAfterAnswer] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>(
    'all'
  );
  const [unmaskedReviewIds, setUnmaskedReviewIds] = useState<string[]>([]);

  const submittedRef = useRef(false);

  // Sync if mode or topicKey changes while mounted
  useEffect(() => {
    setQuestions(initialSession.questions);
    setCurrentIndex(initialSession.currentIndex);
    setAnswers(initialSession.answers);
    setFlaggedIds(initialSession.flaggedIds);
    setStartedAt(initialSession.startedAt);
    setDurationSeconds(initialSession.durationSeconds);
    const elapsed = Math.floor((Date.now() - initialSession.startedAt) / 1000);
    setSecondsLeft(Math.max(0, initialSession.durationSeconds - elapsed));
    setIsSubmitted(false);
    setGradedQuestions(null);
    submittedRef.current = false;
    setDrawerOpen(false);
    setConfirmSubmitOpen(false);
    setRevealMaskAfterAnswer(false);
    setReviewFilter('all');
    setUnmaskedReviewIds([]);
  }, [initialSession]);

  // Reset image mask reveal when navigating between questions
  useEffect(() => {
    setRevealMaskAfterAnswer(false);
  }, [currentIndex]);

  // Auto-save active draft while quiz is in progress
  useEffect(() => {
    if (isSubmitted || questions.length === 0) return;
    onSaveDraft({
      mode,
      topicKey,
      questionIds: questions.map((q) => q.id),
      currentIndex,
      answers,
      flaggedIds,
      startedAt,
      durationSeconds: isTimedMode ? durationSeconds : undefined,
    });
  }, [
    answers,
    currentIndex,
    durationSeconds,
    flaggedIds,
    isSubmitted,
    isTimedMode,
    mode,
    onSaveDraft,
    questions,
    startedAt,
    topicKey,
  ]);

  const finishAndGrade = useCallback(
    (onlyAnswered = false) => {
      if (submittedRef.current || questions.length === 0) return;
      const targetList = onlyAnswered
        ? questions.filter((q) => answers[q.id] !== undefined)
        : questions;
      const finalList = targetList.length > 0 ? targetList : questions;

      submittedRef.current = true;
      setGradedQuestions(finalList);
      setIsSubmitted(true);
      setConfirmSubmitOpen(false);
      setDrawerOpen(false);

      const wrongIds: string[] = [];
      const correctIds: string[] = [];
      let d1Correct = 0;
      let d1Total = 0;
      let d2Correct = 0;
      let d2Total = 0;

      for (const q of finalList) {
        const chosen = answers[q.id];
        const isCorrect = chosen === q.correctIndex;
        if (isCorrect) {
          correctIds.push(q.id);
        } else {
          wrongIds.push(q.id);
        }
        if (q.dosen === 1) {
          d1Total += 1;
          if (isCorrect) d1Correct += 1;
        } else {
          d2Total += 1;
          if (isCorrect) d2Correct += 1;
        }
      }

      const total = finalList.length;
      const score = correctIds.length;
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

      const entry: QuizHistoryEntry = {
        id: `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        mode,
        topicLabel:
          mode === 'simulasi-uas'
            ? 'Simulasi UAS (28 Soal)'
            : TOPIC_LABELS[topicFilter],
        score,
        total,
        percentage,
        ...(d1Total > 0
          ? { dosen1Score: { correct: d1Correct, total: d1Total } }
          : {}),
        ...(d2Total > 0
          ? { dosen2Score: { correct: d2Correct, total: d2Total } }
          : {}),
        timestamp: new Date().toISOString(),
      };

      onSaveDraft(null);
      onCompleteQuiz(entry, wrongIds, correctIds);
    },
    [answers, mode, onCompleteQuiz, onSaveDraft, questions, topicFilter]
  );

  // Countdown timer for timed exams
  useEffect(() => {
    if (!isTimedMode || isSubmitted || questions.length === 0) return;

    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = Math.max(0, durationSeconds - elapsed);
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(interval);
        finishAndGrade();
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [
    durationSeconds,
    finishAndGrade,
    isSubmitted,
    isTimedMode,
    questions.length,
    startedAt,
  ]);

  const handleRestartFresh = () => {
    const fresh = buildQuestionSession(
      allQuestions,
      mode,
      topicFilter,
      wrongQuestionIds
    );
    const dur =
      mode === 'simulasi-uas' ? 2400 : Math.max(300, fresh.length * 60);
    const now = Date.now();
    setQuestions(fresh);
    setCurrentIndex(0);
    setAnswers({});
    setFlaggedIds([]);
    setStartedAt(now);
    setDurationSeconds(dur);
    setSecondsLeft(dur);
    setIsSubmitted(false);
    setGradedQuestions(null);
    submittedRef.current = false;
    setRevealMaskAfterAnswer(false);
    setReviewFilter('all');
    setUnmaskedReviewIds([]);
    onSaveDraft(null);
  };

  // ======================== EMPTY STATE ========================
  if (questions.length === 0) {
    return (
      <div className="clinical-surface mx-auto max-w-xl rounded-2xl p-6 text-center sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/35 bg-emerald-500/15 text-emerald-400 light:text-emerald-700">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold">
          {mode === 'ulang-salah'
            ? 'Tidak Ada Soal Salah Tersisa!'
            : 'Belum Ada Soal untuk Filter Ini'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 light:text-slate-600">
          {mode === 'ulang-salah'
            ? 'Semua soal yang sebelumnya keliru sudah berhasil kamu kuasai, atau kamu belum memiliki riwayat jawaban salah.'
            : 'Silakan pilih topik lain atau jalankan Simulasi UAS untuk latihan lengkap.'}
        </p>
        <button
          type="button"
          onClick={() => {
            onSaveDraft(null);
            onExit();
          }}
          className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 text-sm font-bold text-slate-950 hover:bg-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Menu Ujian</span>
        </button>
      </div>
    );
  }

  // ======================== RESULT & REVIEW SCREEN ========================
  if (isSubmitted) {
    const resultList = gradedQuestions ?? questions;
    const answeredDetails = resultList.map((q) => {
      const chosen = answers[q.id];
      const isCorrect = chosen === q.correctIndex;
      return { q, chosen, isCorrect };
    });

    const total = answeredDetails.length;
    const correctCount = answeredDetails.filter((d) => d.isCorrect).length;
    const percentage = Math.round((correctCount / total) * 100);

    const d1Items = answeredDetails.filter((d) => d.q.dosen === 1);
    const d2Items = answeredDetails.filter((d) => d.q.dosen === 2);
    const d1Correct = d1Items.filter((d) => d.isCorrect).length;
    const d2Correct = d2Items.filter((d) => d.isCorrect).length;

    // Topic breakdown
    const topicStatsMap = new Map<
      QuestionTopic,
      { correct: number; total: number }
    >();
    for (const item of answeredDetails) {
      const prev = topicStatsMap.get(item.q.topic) ?? { correct: 0, total: 0 };
      topicStatsMap.set(item.q.topic, {
        correct: prev.correct + (item.isCorrect ? 1 : 0),
        total: prev.total + 1,
      });
    }

    const filteredReview = answeredDetails.filter((item) => {
      if (reviewFilter === 'wrong') return !item.isCorrect;
      if (reviewFilter === 'correct') return item.isCorrect;
      return true;
    });

    const readinessBadge =
      percentage >= 85
        ? {
            label: 'Siap Tempur UAS',
            cls: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 light:bg-emerald-100 light:text-emerald-800',
          }
        : percentage >= 65
          ? {
              label: 'Cukup Baik — Perkuat Topik Lemah',
              cls: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300 light:bg-cyan-100 light:text-cyan-800',
            }
          : {
              label: 'Perlu Pengulangan Intensif',
              cls: 'border-rose-500/40 bg-rose-500/15 text-rose-300 light:bg-rose-100 light:text-rose-800',
            };

    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springSnap}
        className="space-y-5"
      >
        {/* Summary Hero Card */}
        <div className="clinical-surface rounded-2xl p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
                <Award className="h-3.5 w-3.5" />
                Hasil {MODE_LABELS[mode]}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Skor: {correctCount} / {total}{' '}
                <span className="font-mono text-cyan-400 light:text-cyan-700">
                  ({percentage}%)
                </span>
              </h2>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-600 sm:text-sm">
                Topik: {mode === 'simulasi-uas' ? 'Kisi-kisi Lengkap UAS (28 Soal)' : TOPIC_LABELS[topicFilter]}
              </p>
            </div>

            <span
              className={cn(
                'rounded-xl border px-3 py-2 text-xs font-bold',
                readinessBadge.cls
              )}
            >
              {readinessBadge.label}
            </span>
          </div>

          {/* Separate Dosen 1 vs Dosen 2 Score Breakdown */}
          {(d1Items.length > 0 || d2Items.length > 0) && (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {d1Items.length > 0 && (
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/8 p-4 light:border-cyan-300 light:bg-cyan-50">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-cyan-300 light:text-cyan-800">
                      Dosen 1 (Cross-Section &amp; TM)
                    </span>
                    <span className="font-mono">
                      {d1Correct}/{d1Items.length} (
                      {Math.round((d1Correct / d1Items.length) * 100)}%)
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800 light:bg-stone-300">
                    <div
                      style={{
                        width: `${Math.round((d1Correct / d1Items.length) * 100)}%`,
                      }}
                      className="h-full rounded-full bg-cyan-400"
                    />
                  </div>
                </div>
              )}

              {d2Items.length > 0 && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/8 p-4 light:border-rose-300 light:bg-rose-50">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-rose-300 light:text-rose-800">
                      Dosen 2 (Kardio, Darah, Saraf XII)
                    </span>
                    <span className="font-mono">
                      {d2Correct}/{d2Items.length} (
                      {Math.round((d2Correct / d2Items.length) * 100)}%)
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800 light:bg-stone-300">
                    <div
                      style={{
                        width: `${Math.round((d2Correct / d2Items.length) * 100)}%`,
                      }}
                      className="h-full rounded-full bg-rose-400"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Per-Topic Inline Bars */}
          <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-4 light:border-stone-200">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-600">
              Rincian Skor per Topik
            </p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {Array.from(topicStatsMap.entries()).map(([topic, stat]) => {
                const pct = Math.round((stat.correct / stat.total) * 100);
                return (
                  <div
                    key={topic}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 light:border-stone-200 light:bg-stone-50"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{TOPIC_LABELS[topic]}</span>
                      <span className="font-mono text-cyan-300 light:text-cyan-800">
                        {stat.correct}/{stat.total} ({pct}%)
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800 light:bg-stone-200">
                      <div
                        style={{ width: `${pct}%` }}
                        className={cn(
                          'h-full rounded-full',
                          pct >= 75
                            ? 'bg-emerald-400'
                            : pct >= 50
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Result Action Buttons */}
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={handleRestartFresh}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 text-sm font-bold text-slate-950 hover:bg-cyan-400"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Ulangi Sesi Baru</span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={onExit}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm font-bold text-slate-100 hover:bg-slate-800 light:border-stone-300 light:bg-white light:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Menu</span>
            </motion.button>
          </div>
        </div>

        {/* Full Explanations Review Section */}
        <div className="clinical-surface rounded-2xl p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 font-display text-base font-bold sm:text-lg">
              <BookOpen className="h-4 w-4 text-cyan-400 light:text-cyan-700" />
              Tinjau Seluruh Pembahasan ({filteredReview.length})
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'all', label: `Semua (${total})` },
                  {
                    id: 'wrong',
                    label: `Salah (${total - correctCount})`,
                  },
                  { id: 'correct', label: `Benar (${correctCount})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReviewFilter(tab.id)}
                  className={cn(
                    'min-h-[38px] rounded-xl border px-3 text-xs font-bold transition',
                    reviewFilter === tab.id
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 light:border-cyan-700 light:bg-cyan-600 light:text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 light:border-stone-300 light:bg-stone-100 light:text-slate-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {filteredReview.map(({ q, chosen, isCorrect }) => {
              const originalNo =
                resultList.findIndex((item) => item.id === q.id) + 1;
              const isUnmasked = unmaskedReviewIds.includes(q.id);

              return (
                <div
                  key={`rev-${q.id}`}
                  className={cn(
                    'rounded-2xl border p-4',
                    isCorrect
                      ? 'border-emerald-500/35 bg-emerald-950/15 light:border-emerald-300 light:bg-emerald-50/50'
                      : 'border-rose-500/35 bg-rose-950/15 light:border-rose-300 light:bg-rose-50/50'
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-xs font-bold text-slate-200 light:bg-stone-200 light:text-slate-900">
                        Soal #{originalNo}
                      </span>
                      <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan-300 light:bg-cyan-100 light:text-cyan-800">
                        Dosen {q.dosen} • {TOPIC_LABELS[q.topic]}
                      </span>
                    </div>

                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold',
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300 light:bg-emerald-600 light:text-white'
                          : 'bg-rose-500/20 text-rose-300 light:bg-rose-600 light:text-white'
                      )}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" />
                      )}
                      {isCorrect ? 'Benar' : chosen === undefined ? 'Kosong' : 'Salah'}
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm font-semibold leading-relaxed text-slate-100 light:text-slate-900">
                    {q.question}
                  </p>

                  {q.imageUrl && (
                    <div className="mt-3 space-y-2">
                      <MaskedQuestionImage
                        imageUrl={q.imageUrl}
                        alt={q.subtopic}
                        maskZones={q.maskZones}
                        hideMask={isUnmasked}
                      />
                      {q.maskZones && q.maskZones.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setUnmaskedReviewIds((prev) =>
                              prev.includes(q.id)
                                ? prev.filter((id) => id !== q.id)
                                : [...prev, q.id]
                            )
                          }
                          className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-700 px-3 text-xs font-semibold text-cyan-300 hover:border-cyan-400 light:border-stone-300 light:text-cyan-800"
                        >
                          {isUnmasked ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                          {isUnmasked ? 'Tutup Label Lagi' : 'Intip Label Asli'}
                        </button>
                      )}
                    </div>
                  )}

                  <div className="mt-3 grid grid-cols-1 gap-1.5 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isRightOpt = oIdx === q.correctIndex;
                      const isUserOpt = oIdx === chosen;
                      return (
                        <div
                          key={`${q.id}-rev-opt-${oIdx}`}
                          className={cn(
                            'rounded-xl border px-3 py-2',
                            isRightOpt
                              ? 'border-emerald-500/50 bg-emerald-500/15 font-semibold text-emerald-200 light:border-emerald-500 light:bg-emerald-100 light:text-emerald-950'
                              : isUserOpt
                                ? 'border-rose-500/50 bg-rose-500/15 text-rose-200 light:border-rose-500 light:bg-rose-100 light:text-rose-950'
                                : 'border-slate-800/70 bg-slate-950/40 text-slate-400 light:border-stone-200 light:bg-white light:text-slate-600'
                          )}
                        >
                          <span className="mr-2 font-mono font-bold">
                            {OPTION_LETTERS[oIdx]}.
                          </span>
                          {opt}
                          {isRightOpt && (
                            <span className="ml-2 font-mono text-[10px] uppercase text-emerald-300 light:text-emerald-700">
                              (Kunci)
                            </span>
                          )}
                          {isUserOpt && !isRightOpt && (
                            <span className="ml-2 font-mono text-[10px] uppercase text-rose-300 light:text-rose-700">
                              (Pilihanmu)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/65 p-3 text-xs leading-relaxed text-slate-300 light:border-stone-200 light:bg-white light:text-slate-700">
                    <p>
                      <span className="font-bold text-cyan-300 light:text-cyan-800">
                        Pembahasan:
                      </span>{' '}
                      {q.explanation}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-slate-400 light:text-slate-500">
                      Sumber: {q.source}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    );
  }

  // ======================== ACTIVE QUESTION RUNNER ========================
  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion.id];
  const hasAnsweredCurrent = selectedOption !== undefined;
  const isFlagged = flaggedIds.includes(currentQuestion.id);
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;
  const unansweredCount = questions.length - answeredCount;
  const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleChooseOption = (optionIdx: number) => {
    if (isImmediateMode && hasAnsweredCurrent) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx,
    }));
  };

  const toggleFlagCurrent = () => {
    setFlaggedIds((prev) =>
      prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  const handleRequestSubmit = () => {
    if (isTimedMode && unansweredCount > 0) {
      setConfirmSubmitOpen(true);
      return;
    }
    finishAndGrade();
  };

  return (
    <section className="space-y-4">
      {/* Top Status & Timer Bar */}
      <div className="clinical-surface rounded-2xl p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-cyan-500/35 bg-cyan-500/12 px-2.5 py-1 font-mono text-xs font-bold text-cyan-300 light:border-cyan-600/30 light:bg-cyan-100 light:text-cyan-800">
              {MODE_LABELS[mode]}
            </span>
            <span className="font-mono text-xs font-bold text-slate-300 light:text-slate-700">
              Soal {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isTimedMode && (
              <span
                className={cn(
                  'inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border px-3 font-mono text-xs font-bold',
                  secondsLeft <= 120
                    ? 'animate-pulse border-rose-500/60 bg-rose-500/20 text-rose-300 light:bg-rose-100 light:text-rose-800'
                    : 'border-slate-700 bg-slate-950/70 text-cyan-300 light:border-stone-300 light:bg-stone-100 light:text-cyan-800'
                )}
              >
                <Clock className="h-3.5 w-3.5" />
                {formatTimer(secondsLeft)}
              </span>
            )}

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs font-semibold text-slate-200 hover:border-cyan-400 light:border-stone-300 light:bg-white light:text-slate-800"
            >
              <Grid className="h-4 w-4 text-cyan-400 light:text-cyan-700" />
              <span>Nomor</span>
            </button>
          </div>
        </div>

        {/* Question Progress Line */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800 light:bg-stone-200">
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={springSnap}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-rose-400"
            />
          </div>
          <span className="font-mono text-[11px] text-slate-400 light:text-slate-600">
            {answeredCount}/{questions.length} terjawab
          </span>
        </div>

        {initialSession.resumedFromDraft && (
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-[11px] text-cyan-200 light:border-cyan-400 light:bg-cyan-50 light:text-cyan-900">
            <span>Melanjutkan sesi tersimpan otomatis.</span>
            <button
              type="button"
              onClick={handleRestartFresh}
              className="inline-flex items-center gap-1 font-bold underline hover:opacity-80"
            >
              <RotateCcw className="h-3 w-3" />
              Mulai Acak Baru
            </button>
          </div>
        )}
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={springSnap}
          className="clinical-surface space-y-4 rounded-2xl p-4 sm:p-6"
        >
          {/* Question Topic & Flag Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  'rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold',
                  currentQuestion.dosen === 1
                    ? 'border-cyan-500/40 bg-cyan-500/12 text-cyan-300 light:border-cyan-600/30 light:bg-cyan-100 light:text-cyan-800'
                    : 'border-rose-500/40 bg-rose-500/12 text-rose-300 light:border-rose-600/30 light:bg-rose-100 light:text-rose-800'
                )}
              >
                Dosen {currentQuestion.dosen}
              </span>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300 light:bg-stone-200 light:text-slate-700">
                {TOPIC_LABELS[currentQuestion.topic]}
              </span>
              <span className="font-mono text-[11px] text-slate-400 light:text-slate-600">
                • {currentQuestion.subtopic}
              </span>
            </div>

            {isTimedMode && (
              <button
                type="button"
                onClick={toggleFlagCurrent}
                className={cn(
                  'inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border px-3 text-xs font-bold transition',
                  isFlagged
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200 light:border-amber-600 light:bg-amber-500 light:text-white'
                    : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-amber-400/50 light:border-stone-300 light:bg-stone-100 light:text-slate-700'
                )}
              >
                <Flag className="h-3.5 w-3.5" />
                <span>{isFlagged ? 'Ditandai Ragu' : 'Ragu-ragu'}</span>
              </button>
            )}
          </div>

          {/* Question Text */}
          <h3 className="font-display text-base font-bold leading-snug text-slate-100 light:text-slate-900 sm:text-lg">
            {currentQuestion.question}
          </h3>

          {/* Question Image with Exam Label Masking */}
          {currentQuestion.imageUrl && (
            <div className="space-y-2">
              <MaskedQuestionImage
                imageUrl={currentQuestion.imageUrl}
                alt={currentQuestion.subtopic}
                maskZones={currentQuestion.maskZones}
                hideMask={
                  isImmediateMode && hasAnsweredCurrent && revealMaskAfterAnswer
                }
              />

              {isImmediateMode &&
                hasAnsweredCurrent &&
                currentQuestion.maskZones &&
                currentQuestion.maskZones.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setRevealMaskAfterAnswer((prev) => !prev)}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-700 px-3 text-xs font-semibold text-cyan-300 hover:border-cyan-400 light:border-stone-300 light:text-cyan-800"
                  >
                    {revealMaskAfterAnswer ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    <span>
                      {revealMaskAfterAnswer
                        ? 'Tutup Label Kembali'
                        : 'Intip Label Asli pada Gambar'}
                    </span>
                  </button>
                )}
            </div>
          )}

          {/* Answer Options A - D */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;
              const showImmediateGrade = isImmediateMode && hasAnsweredCurrent;

              let optionClass =
                'border-slate-700/80 bg-slate-900/70 text-slate-100 hover:border-cyan-400/60 light:border-stone-300 light:bg-white light:text-slate-900';

              if (showImmediateGrade) {
                if (isCorrectOption) {
                  optionClass =
                    'border-emerald-500 bg-emerald-500/18 text-emerald-100 light:border-emerald-600 light:bg-emerald-50 light:text-emerald-950';
                } else if (isSelected) {
                  optionClass =
                    'border-rose-500 bg-rose-500/18 text-rose-100 light:border-rose-600 light:bg-rose-50 light:text-rose-950';
                } else {
                  optionClass =
                    'border-slate-800 bg-slate-950/50 text-slate-500 opacity-65 light:border-stone-200 light:bg-stone-100';
                }
              } else if (isSelected) {
                optionClass =
                  'border-cyan-400 bg-cyan-500/18 text-cyan-100 ring-2 ring-cyan-400/25 light:border-cyan-700 light:bg-cyan-50 light:text-cyan-950';
              }

              return (
                <motion.button
                  key={`${currentQuestion.id}-opt-${idx}`}
                  type="button"
                  whileTap={
                    isImmediateMode && hasAnsweredCurrent ? undefined : tapScale
                  }
                  onClick={() => handleChooseOption(idx)}
                  className={cn(
                    'flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition',
                    optionClass
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold',
                      showImmediateGrade && isCorrectOption
                        ? 'bg-emerald-500 text-slate-950'
                        : showImmediateGrade && isSelected && !isCorrectOption
                          ? 'bg-rose-500 text-white'
                          : isSelected
                            ? 'bg-cyan-400 text-slate-950'
                            : 'bg-slate-800 text-slate-300 light:bg-stone-200 light:text-slate-800'
                    )}
                  >
                    {OPTION_LETTERS[idx]}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                  {showImmediateGrade && isCorrectOption && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 light:text-emerald-600" />
                  )}
                  {showImmediateGrade && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 shrink-0 text-rose-400 light:text-rose-600" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Immediate Explanation in Belajar & Ulang-Salah Modes */}
          {isImmediateMode && hasAnsweredCurrent && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSnap}
              className={cn(
                'rounded-2xl border p-4',
                selectedOption === currentQuestion.correctIndex
                  ? 'border-emerald-500/40 bg-emerald-500/10 light:border-emerald-400 light:bg-emerald-50'
                  : 'border-rose-500/40 bg-rose-500/10 light:border-rose-400 light:bg-rose-50'
              )}
            >
              <div className="flex items-center gap-2 font-display text-sm font-bold">
                {selectedOption === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 light:text-emerald-700" />
                    <span className="text-emerald-300 light:text-emerald-900">
                      Jawaban Benar!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-400 light:text-rose-700" />
                    <span className="text-rose-300 light:text-rose-900">
                      Kurang Tepat — Kunci:{' '}
                      {OPTION_LETTERS[currentQuestion.correctIndex]}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-200 light:text-slate-800 sm:text-sm">
                {currentQuestion.explanation}
              </p>
              <p className="mt-2 font-mono text-[11px] text-slate-400 light:text-slate-600">
                Sumber: {currentQuestion.source}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 text-xs font-semibold text-slate-300 hover:border-rose-400/50 light:border-stone-300 light:bg-white light:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Keluar</span>
          </button>

          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 text-xs font-bold text-slate-200 disabled:opacity-40 light:border-stone-300 light:bg-white light:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Prev</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {currentIndex < questions.length - 1 ? (
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(questions.length - 1, prev + 1)
                )
              }
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-cyan-500 px-5 text-xs font-bold text-slate-950 hover:bg-cyan-400 sm:text-sm"
            >
              <span>{isImmediateMode && hasAnsweredCurrent ? 'Soal Berikutnya' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileTap={tapScale}
              onClick={handleRequestSubmit}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 text-xs font-bold text-slate-950 shadow-md hover:brightness-110 sm:text-sm"
            >
              <ClipboardCheck className="h-4 w-4" />
              <span>
                {isTimedMode ? 'Kumpulkan Jawaban' : 'Selesai & Lihat Skor'}
              </span>
            </motion.button>
          )}

          {isTimedMode && currentIndex < questions.length - 1 && (
            <button
              type="button"
              onClick={handleRequestSubmit}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-500/45 bg-emerald-500/15 px-3.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 light:border-emerald-600 light:bg-emerald-600 light:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Selesai</span>
            </button>
          )}

          {isImmediateMode &&
            currentIndex < questions.length - 1 &&
            answeredCount > 0 && (
              <button
                type="button"
                onClick={() => finishAndGrade(true)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-500/45 bg-emerald-500/15 px-3.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 light:border-emerald-600 light:bg-emerald-600 light:text-white"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Selesai ({answeredCount})</span>
              </button>
            )}
        </div>
      </div>

      {/* Question Number Drawer Modal */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={springSnap}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-4 text-slate-100 shadow-2xl light:border-stone-300 light:bg-white light:text-slate-900 sm:p-5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 light:border-stone-200">
                <div>
                  <h4 className="font-display text-base font-bold">
                    Navigasi Nomor Soal ({answeredCount}/{questions.length})
                  </h4>
                  <p className="text-xs text-slate-400 light:text-slate-600">
                    Ketuk nomor soal untuk langsung melompat.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Tutup navigasi nomor soal"
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 light:border-stone-300 light:bg-stone-100 light:text-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid max-h-[50vh] grid-cols-5 gap-2 overflow-y-auto sm:grid-cols-7">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = answers[q.id] !== undefined;
                  const flagged = flaggedIds.includes(q.id);

                  return (
                    <button
                      key={`nav-q-${q.id}`}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(idx);
                        setDrawerOpen(false);
                      }}
                      className={cn(
                        'relative flex min-h-[44px] items-center justify-center rounded-xl border font-mono text-xs font-bold transition',
                        isCurrent && 'ring-2 ring-white light:ring-slate-900',
                        flagged
                          ? 'border-amber-400 bg-amber-500/20 text-amber-200 light:bg-amber-100 light:text-amber-900'
                          : isAnswered
                            ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-200 light:border-cyan-600 light:bg-cyan-100 light:text-cyan-900'
                            : 'border-slate-800 bg-slate-900/70 text-slate-400 light:border-stone-300 light:bg-stone-100 light:text-slate-700'
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-[11px] light:border-stone-200">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-cyan-500/40 border border-cyan-400" />
                    Terjawab
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-amber-500/40 border border-amber-400" />
                    Ragu-ragu
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-slate-800 border border-slate-700 light:bg-stone-200" />
                    Belum
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    handleRequestSubmit();
                  }}
                  className="min-h-[40px] rounded-xl bg-emerald-500 px-3.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                >
                  Kumpulkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Submit Modal (when unanswered questions remain in timed exam) */}
      <AnimatePresence>
        {confirmSubmitOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmSubmitOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={springSnap}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-5 text-slate-100 shadow-2xl light:border-stone-300 light:bg-white light:text-slate-900"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 text-amber-400 light:text-amber-700">
                  <AlertCircle className="h-5 w-5" />
                  <h4 className="font-display text-base font-bold">
                    Konfirmasi Pengumpulan Ujian
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmSubmitOpen(false)}
                  aria-label="Tutup konfirmasi"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 light:hover:bg-stone-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300 light:text-slate-700">
                Masih ada{' '}
                <span className="font-mono font-bold text-amber-300 light:text-amber-800">
                  {unansweredCount} soal
                </span>{' '}
                yang belum kamu jawab
                {flaggedIds.length > 0
                  ? ` (dan ${flaggedIds.length} soal ditandai ragu-ragu)`
                  : ''}
                . Yakin ingin mengumpulkan sekarang?
              </p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setConfirmSubmitOpen(false)}
                  className="min-h-[44px] flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 text-xs font-bold text-slate-200 light:border-stone-300 light:bg-stone-100 light:text-slate-900"
                >
                  Batal / Periksa Lagi
                </button>
                <button
                  type="button"
                  onClick={() => finishAndGrade()}
                  className="min-h-[44px] flex-1 rounded-xl bg-emerald-500 px-4 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                >
                  Ya, Kumpulkan Sekarang
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default QuizEngine;
