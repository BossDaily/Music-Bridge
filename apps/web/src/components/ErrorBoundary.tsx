import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; errorInfo: React.ErrorInfo }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent 
            error={this.state.error!} 
            errorInfo={this.state.errorInfo!} 
          />
        );
      }

      return (
        <div className="p-8 border border-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <details className="mb-4">
            <summary className="cursor-pointer text-red-600 dark:text-red-400 font-medium">
              Error Details
            </summary>
            <pre className="mt-2 text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-auto">
              {this.state.error?.toString()}
            </pre>
          </details>
          <details>
            <summary className="cursor-pointer text-red-600 dark:text-red-400 font-medium">
              Component Stack
            </summary>
            <pre className="mt-2 text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-auto">
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
