import { Component, type ReactNode } from 'react';
import { Button } from '../../components/Button';

interface Props {
  children: ReactNode;
  /** chave para resetar quando a rota muda */
  resetKey?: string;
}

interface State {
  error: Error | null;
}

/** Error boundary genérico de feature (REACT.md regra 7). */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="mx-auto my-12 max-w-md rounded-xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900 dark:bg-rose-950/40">
          <p className="text-3xl" aria-hidden="true">😵</p>
          <h2 className="mt-2 text-lg font-semibold text-rose-800 dark:text-rose-200">Algo deu errado</h2>
          <p className="mt-1 text-sm text-rose-700/80 dark:text-rose-300/80">{this.state.error.message}</p>
          <Button variant="danger" size="sm" className="mt-4" onClick={() => this.setState({ error: null })}>
            Tentar novamente
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
