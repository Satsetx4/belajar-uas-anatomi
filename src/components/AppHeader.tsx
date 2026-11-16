import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Activity,
  ArrowLeft,
  ChevronRight,
  Moon,
  RotateCcw,
  Sun,
} from 'lucide-react';
import { cn, springSnap, tapScale } from '../lib/motion';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  breadcrumbs?: BreadcrumbItem[];
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenReset?: () => void;
}

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  breadcrumbs,
  theme,
  onToggleTheme,
  onOpenReset,
}: AppHeaderProps) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  const isDark = theme === 'dark';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-200',
        isDark
          ? 'bg-[#090d16]/88 border-slate-800/80 text-slate-100'
          : 'bg-[#f4f1ea]/90 border-stone-300/80 text-slate-900'
      )}
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex min-h-[60px] items-center justify-between gap-2 py-2">
          {/* Left: Back button or Studio Emblem + Page Title */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {showBack && onBack ? (
              <motion.button
                type="button"
                onClick={onBack}
                whileTap={tapScale}
                transition={springSnap}
                aria-label="Kembali ke halaman sebelumnya"
                className={cn(
                  'inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition-colors',
                  isDark
                    ? 'border-slate-700/80 bg-slate-900/90 text-slate-100 hover:border-cyan-500/50 hover:bg-slate-800'
                    : 'border-stone-300 bg-white/90 text-slate-800 hover:border-cyan-600/50 hover:bg-white shadow-xs'
                )}
              >
                <ArrowLeft className="h-4 w-4 text-cyan-500" />
                <span className="hidden xs:inline sm:inline">Kembali</span>
              </motion.button>
            ) : (
              <div
                aria-hidden="true"
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
                  isDark
                    ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
                    : 'border-cyan-600/25 bg-cyan-600/10 text-cyan-700'
                )}
              >
                <Activity className="h-5 w-5" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1
                  className={cn(
                    'truncate font-display text-base font-bold tracking-tight sm:text-lg',
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  )}
                >
                  {title}
                </h1>
              </div>
              {subtitle && (
                <p
                  className={cn(
                    'truncate text-[11px] sm:text-xs',
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  )}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {onOpenReset && (
              <motion.button
                type="button"
                onClick={onOpenReset}
                whileTap={tapScale}
                transition={springSnap}
                aria-label="Reset data belajar"
                title="Reset data progres"
                className={cn(
                  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border px-2.5 text-xs font-medium transition-colors',
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-rose-500/40 hover:text-rose-300'
                    : 'border-stone-300 bg-white/80 text-slate-700 hover:border-rose-500/40 hover:text-rose-700'
                )}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="ml-1.5 hidden md:inline">Reset</span>
              </motion.button>
            )}

            <motion.button
              type="button"
              onClick={onToggleTheme}
              whileTap={tapScale}
              transition={springSnap}
              aria-label={
                isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'
              }
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
              className={cn(
                'inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-xl border px-2.5 text-xs font-semibold transition-colors',
                isDark
                  ? 'border-slate-700/80 bg-slate-900/90 text-amber-300 hover:border-amber-400/40 hover:bg-slate-800'
                  : 'border-stone-300 bg-white/95 text-slate-800 hover:border-cyan-600/40 hover:bg-white shadow-xs'
              )}
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline text-slate-200">Terang</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-cyan-700" />
                  <span className="hidden sm:inline text-slate-800">Gelap</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Breadcrumbs Bar */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={cn(
              'no-scrollbar flex items-center gap-1 overflow-x-auto border-t py-1.5 text-xs',
              isDark ? 'border-slate-800/60' : 'border-stone-300/60'
            )}
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div
                  key={`${crumb.label}-${idx}`}
                  className="flex shrink-0 items-center gap-1"
                >
                  {idx > 0 && (
                    <ChevronRight
                      className={cn(
                        'h-3.5 w-3.5 shrink-0',
                        isDark ? 'text-slate-600' : 'text-stone-400'
                      )}
                    />
                  )}
                  {crumb.onClick && !isLast ? (
                    <button
                      type="button"
                      onClick={crumb.onClick}
                      className={cn(
                        'min-h-[30px] rounded-md px-1.5 font-medium transition-colors',
                        isDark
                          ? 'text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300'
                          : 'text-cyan-700 hover:bg-cyan-600/10 hover:text-cyan-800'
                      )}
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span
                      className={cn(
                        'px-1.5 font-medium',
                        isLast
                          ? isDark
                            ? 'text-slate-200'
                            : 'text-slate-900'
                          : isDark
                            ? 'text-slate-400'
                            : 'text-slate-600'
                      )}
                    >
                      {crumb.label}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* Scroll-linked diagnostic progress indicator */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
        className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-rose-400"
      />
    </header>
  );
}

export default AppHeader;
