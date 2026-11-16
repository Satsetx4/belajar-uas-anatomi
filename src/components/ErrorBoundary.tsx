import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  onGoHome?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'Terjadi kendala saat menampilkan halaman.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('ErrorBoundary caught error:', error, info);
  }

  private handleReload = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleGoHome = (): void => {
    this.setState({ hasError: false, errorMessage: '' });
    if (this.props.onGoHome) {
      this.props.onGoHome();
      return;
    }
    if (typeof window !== 'undefined') {
      window.location.assign('/');
    }
  };

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-[75vh] w-full items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-slate-900/95 p-6 text-slate-100 shadow-2xl light:border-rose-300 light:bg-white light:text-slate-900">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-400 light:text-rose-600">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <h2 className="font-display text-xl font-bold tracking-tight">
            Tampilan Mengalami Gangguan
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 light:text-slate-600">
            Tenang, progres belajarmu yang sudah tersimpan tetap aman. Kamu bisa
            muat ulang halaman ini atau langsung kembali ke Beranda.
          </p>

          {this.state.errorMessage && (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 font-mono text-xs text-rose-300 light:border-stone-200 light:bg-stone-100 light:text-rose-700">
              {this.state.errorMessage}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Muat Ulang</span>
            </button>

            <button
              type="button"
              onClick={this.handleGoHome}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 active:scale-[0.98] light:border-stone-300 light:bg-stone-100 light:text-slate-900 light:hover:bg-stone-200"
            >
              <Home className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
