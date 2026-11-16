import { motion } from 'framer-motion';
import {
  BarChart3,
  ClipboardCheck,
  HeartPulse,
  Home,
  ScanLine,
  type LucideIcon,
} from 'lucide-react';
import { cn, tabIndicatorTransition, tapScale } from '../lib/motion';

export type NavTabId = 'home' | 'dosen1' | 'dosen2' | 'ujian' | 'progres';

export interface MobileBottomNavProps {
  activeTab: NavTabId;
  onNavigate: (tab: NavTabId) => void;
  wrongCount: number;
}

interface NavTabConfig {
  id: NavTabId;
  label: string;
  icon: LucideIcon;
}

const NAV_TABS: NavTabConfig[] = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'dosen1', label: 'Dosen 1', icon: ScanLine },
  { id: 'dosen2', label: 'Dosen 2', icon: HeartPulse },
  { id: 'ujian', label: 'Ujian', icon: ClipboardCheck },
  { id: 'progres', label: 'Progres', icon: BarChart3 },
];

export function MobileBottomNav({
  activeTab,
  onNavigate,
  wrongCount,
}: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Navigasi Utama"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-colors duration-200',
        'bg-[#0b1120]/92 border-slate-800/90 text-slate-300',
        'light:bg-[#fbfaf7]/92 light:border-stone-300/90 light:text-slate-600',
        'md:inset-x-auto md:bottom-4 md:left-1/2 md:w-auto md:min-w-[540px] md:max-w-[660px] md:-translate-x-1/2 md:rounded-2xl md:border md:px-2 md:pb-0 md:shadow-2xl'
      )}
    >
      <div className="mx-auto grid max-w-xl grid-cols-5 items-stretch gap-0.5 px-1.5 py-1 md:gap-1.5 md:px-1 md:py-1.5">
        {NAV_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const showWrongBadge = tab.id === 'ujian' && wrongCount > 0;

          return (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              whileTap={tapScale}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative flex min-h-[56px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[11px] font-semibold transition-colors sm:px-3 sm:text-xs',
                isActive
                  ? 'text-cyan-300 light:text-cyan-800'
                  : 'text-slate-400 hover:text-slate-100 light:text-slate-600 light:hover:text-slate-900'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-bottom-nav-pill"
                  transition={tabIndicatorTransition}
                  className={cn(
                    'absolute inset-0.5 rounded-xl border',
                    'border-cyan-500/35 bg-cyan-500/12 shadow-[inset_0_1px_0_rgba(34,211,238,0.18)]',
                    'light:border-cyan-600/30 light:bg-cyan-600/10'
                  )}
                />
              )}

              <span className="relative z-10 flex items-center justify-center">
                <Icon
                  className={cn(
                    'h-5 w-5 transition-transform duration-150',
                    isActive ? 'scale-105' : 'scale-100'
                  )}
                />
                {showWrongBadge && (
                  <span
                    aria-label={`${wrongCount} soal perlu diulang`}
                    className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 font-mono text-[10px] font-bold text-white shadow-sm"
                  >
                    {wrongCount > 99 ? '99+' : wrongCount}
                  </span>
                )}
              </span>

              <span className="relative z-10 leading-none tracking-tight">
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
