
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-surface p-4 text-center">
          <div className="max-w-md space-y-6">
            <div className="text-6xl">🍯</div>
            <h1 className="text-3xl font-bold text-main">Oops! Something went wrong.</h1>
            <p className="text-muted">
              We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[#d4af37] text-black font-bold rounded-xl shadow-lg"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
