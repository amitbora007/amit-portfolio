import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetErrorBoundary: this.handleReset,
        });
      }

      return (
        <div className="my-8 p-6 bg-slate-900/95 border border-rose-900/60 rounded-xl shadow-xl font-mono text-xs text-slate-300 max-w-2xl mx-auto backdrop-blur-sm select-text">
          <div className="flex items-center gap-2.5 text-rose-400 font-bold mb-3 border-b border-rose-900/40 pb-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />
            <span className="tracking-wide text-[11px] uppercase">
              [SYSTEM_ALERT: EXECUTION_HALTED]
            </span>
          </div>

          <p className="text-slate-400 mb-3 leading-relaxed font-sans text-sm">
            {this.props.sectionName
              ? `The ${this.props.sectionName} module encountered an unexpected runtime fault.`
              : 'A component encountered an unexpected runtime fault.'}
          </p>

          {this.state.error && (
            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-[11px] text-rose-300/80 mb-4 overflow-x-auto whitespace-pre-wrap font-mono">
              {this.state.error.message || String(this.state.error)}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-sans text-xs font-semibold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 min-h-[36px]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Module Execution
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-3.5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 font-sans text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 min-h-[36px]"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
