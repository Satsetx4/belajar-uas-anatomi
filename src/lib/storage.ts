import type {
  ActiveQuizDraft,
  QuizHistoryEntry,
  UserProgressState,
} from '../types/anatomy';

export const STORAGE_KEY = 'uas_anatomi_state_v1';
export const THEME_STORAGE_KEY = 'uas_anatomi_theme';

export function createDefaultProgressState(): UserProgressState {
  return {
    userName: '',
    theme: 'dark',
    studiedItemIds: [],
    lastVisitedPath: '/',
    lastVisitedLabel: 'Beranda',
    quizHistory: [],
    wrongQuestionIds: [],
    masteredQuestionIds: [],
    activeQuizDraft: null,
  };
}

export const DEFAULT_PROGRESS_STATE: UserProgressState = createDefaultProgressState();

function uniqueStrings(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of values) {
    if (typeof item === 'string' && item.trim().length > 0 && !seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

function sanitizeDraft(raw: unknown): ActiveQuizDraft | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const validModes = ['belajar', 'ujian', 'simulasi-uas', 'ulang-salah'];
  if (
    typeof obj.mode !== 'string' ||
    !validModes.includes(obj.mode) ||
    typeof obj.topicKey !== 'string' ||
    !Array.isArray(obj.questionIds)
  ) {
    return null;
  }

  const questionIds = uniqueStrings(obj.questionIds);
  if (questionIds.length === 0) return null;

  const answers: Record<string, number> = {};
  if (obj.answers && typeof obj.answers === 'object') {
    for (const [k, v] of Object.entries(obj.answers as Record<string, unknown>)) {
      if (typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 3) {
        answers[k] = v;
      }
    }
  }

  const rawIndex = typeof obj.currentIndex === 'number' ? obj.currentIndex : 0;
  const safeIndex = Math.max(0, Math.min(questionIds.length - 1, Math.floor(rawIndex)));

  return {
    mode: obj.mode as ActiveQuizDraft['mode'],
    topicKey: obj.topicKey,
    questionIds,
    currentIndex: safeIndex,
    answers,
    flaggedIds: uniqueStrings(obj.flaggedIds),
    startedAt: typeof obj.startedAt === 'number' ? obj.startedAt : Date.now(),
    durationSeconds:
      typeof obj.durationSeconds === 'number' && obj.durationSeconds > 0
        ? obj.durationSeconds
        : undefined,
  };
}

function sanitizeQuizHistory(raw: unknown): QuizHistoryEntry[] {
  if (!Array.isArray(raw)) return [];
  const validModes = ['belajar', 'ujian', 'simulasi-uas', 'ulang-salah'];
  const entries: QuizHistoryEntry[] = [];

  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const obj = item as Record<string, unknown>;
    if (
      typeof obj.id !== 'string' ||
      typeof obj.mode !== 'string' ||
      !validModes.includes(obj.mode) ||
      typeof obj.topicLabel !== 'string' ||
      typeof obj.score !== 'number' ||
      typeof obj.total !== 'number' ||
      typeof obj.percentage !== 'number' ||
      typeof obj.timestamp !== 'string'
    ) {
      continue;
    }

    const entry: QuizHistoryEntry = {
      id: obj.id,
      mode: obj.mode as QuizHistoryEntry['mode'],
      topicLabel: obj.topicLabel,
      score: obj.score,
      total: obj.total,
      percentage: obj.percentage,
      timestamp: obj.timestamp,
    };

    if (
      obj.dosen1Score &&
      typeof obj.dosen1Score === 'object' &&
      typeof (obj.dosen1Score as Record<string, unknown>).correct === 'number' &&
      typeof (obj.dosen1Score as Record<string, unknown>).total === 'number'
    ) {
      entry.dosen1Score = obj.dosen1Score as { correct: number; total: number };
    }

    if (
      obj.dosen2Score &&
      typeof obj.dosen2Score === 'object' &&
      typeof (obj.dosen2Score as Record<string, unknown>).correct === 'number' &&
      typeof (obj.dosen2Score as Record<string, unknown>).total === 'number'
    ) {
      entry.dosen2Score = obj.dosen2Score as { correct: number; total: number };
    }

    entries.push(entry);
  }

  return entries.slice(0, 60);
}

export function applyDocumentTheme(theme: 'dark' | 'light'): void {
  if (typeof document === 'undefined') return;
  try {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#090d16' : '#f4f1ea');
    }
  } catch {
    // Ignore DOM access errors in restricted environments
  }
}

export function loadProgressState(): UserProgressState {
  const fallback = createDefaultProgressState();
  if (typeof window === 'undefined') return fallback;

  let themeFromKey: 'dark' | 'light' | null = null;
  try {
    const rawTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (rawTheme === 'dark' || rawTheme === 'light') {
      themeFromKey = rawTheme;
    }
  } catch {
    // Storage access blocked (private browsing / security policy)
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      if (themeFromKey) fallback.theme = themeFromKey;
      return fallback;
    }

    const parsed = JSON.parse(raw) as Partial<UserProgressState> | null;
    if (!parsed || typeof parsed !== 'object') {
      if (themeFromKey) fallback.theme = themeFromKey;
      return fallback;
    }

    const resolvedTheme: 'dark' | 'light' =
      parsed.theme === 'light' || parsed.theme === 'dark'
        ? parsed.theme
        : themeFromKey ?? 'dark';

    return {
      userName: typeof parsed.userName === 'string' ? parsed.userName : '',
      theme: resolvedTheme,
      studiedItemIds: uniqueStrings(parsed.studiedItemIds),
      lastVisitedPath:
        typeof parsed.lastVisitedPath === 'string' && parsed.lastVisitedPath.length > 0
          ? parsed.lastVisitedPath
          : '/',
      lastVisitedLabel:
        typeof parsed.lastVisitedLabel === 'string' && parsed.lastVisitedLabel.length > 0
          ? parsed.lastVisitedLabel
          : 'Beranda',
      quizHistory: sanitizeQuizHistory(parsed.quizHistory),
      wrongQuestionIds: uniqueStrings(parsed.wrongQuestionIds),
      masteredQuestionIds: uniqueStrings(parsed.masteredQuestionIds),
      activeQuizDraft: sanitizeDraft(parsed.activeQuizDraft),
    };
  } catch {
    if (themeFromKey) fallback.theme = themeFromKey;
    return fallback;
  }
}

export function saveProgressState(state: UserProgressState): UserProgressState {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota / incognito storage errors safely
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
    } catch {
      // Ignore theme storage errors safely
    }
  }
  applyDocumentTheme(state.theme);
  return state;
}

export function resetProgressState(): UserProgressState {
  const fresh = createDefaultProgressState();
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore removal error
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, fresh.theme);
    } catch {
      // Ignore theme reset error
    }
  }
  applyDocumentTheme(fresh.theme);
  return fresh;
}

export function toggleStudiedItem(
  id: string,
  currentState?: UserProgressState
): UserProgressState {
  const base = currentState ?? loadProgressState();
  const exists = base.studiedItemIds.includes(id);
  const nextStudied = exists
    ? base.studiedItemIds.filter((item) => item !== id)
    : [...base.studiedItemIds, id];

  const nextState: UserProgressState = {
    ...base,
    studiedItemIds: nextStudied,
  };
  return saveProgressState(nextState);
}

export function recordQuizResult(
  entry: QuizHistoryEntry,
  wrongIds: string[],
  correctIds: string[],
  currentState?: UserProgressState
): UserProgressState {
  const base = currentState ?? loadProgressState();

  const wrongSet = new Set(base.wrongQuestionIds);
  const masteredSet = new Set(base.masteredQuestionIds);

  for (const cid of correctIds) {
    wrongSet.delete(cid);
    masteredSet.add(cid);
  }
  for (const wid of wrongIds) {
    wrongSet.add(wid);
    masteredSet.delete(wid);
  }

  const nextState: UserProgressState = {
    ...base,
    quizHistory: [entry, ...base.quizHistory].slice(0, 60),
    wrongQuestionIds: Array.from(wrongSet),
    masteredQuestionIds: Array.from(masteredSet),
    activeQuizDraft: null,
  };
  return saveProgressState(nextState);
}

export function saveActiveQuizDraft(
  draft: ActiveQuizDraft | null,
  currentState?: UserProgressState
): UserProgressState {
  const base = currentState ?? loadProgressState();
  const nextState: UserProgressState = {
    ...base,
    activeQuizDraft: draft,
  };
  return saveProgressState(nextState);
}
