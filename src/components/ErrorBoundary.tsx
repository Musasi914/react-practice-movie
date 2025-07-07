import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary bg-red-900/20 border border-red-500 rounded-lg p-6 m-4">
          <h2 className="text-red-400 text-xl font-bold mb-2">エラーが発生しました</h2>
          <p className="text-red-300 mb-4">申し訳ございませんが、予期しないエラーが発生しました。</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            ページを再読み込み
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
