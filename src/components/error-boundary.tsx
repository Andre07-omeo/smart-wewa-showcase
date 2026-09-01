import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null 
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true, 
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null 
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-xl">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-100 p-4">
                <svg className="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Quelque chose s'est mal passé</h2>
            <p className="mb-4 text-sm text-gray-600">
              {this.state.error?.message || 'Une erreur inattendue est survenue.'}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReset}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Rafraîchir la page
              </button>
              <a
                href="/"
                className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}