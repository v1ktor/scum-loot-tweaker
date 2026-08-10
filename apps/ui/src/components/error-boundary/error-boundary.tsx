import { TriangleAlert } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button.tsx';

interface Props {
    children: ReactNode;
    resetKey?: string;
}

interface State {
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // biome-ignore lint/suspicious/noConsole: needed to report a crash that is otherwise hidden
        console.error('Unhandled render error:', error, info.componentStack);
    }

    componentDidUpdate(prev: Props) {
        if (prev.resetKey !== this.props.resetKey && this.state.error) {
            this.setState({ error: null });
        }
    }

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        return (
            <div className="mx-auto w-full max-w-3xl px-6 py-16">
                <div className="flex flex-col items-start gap-4 rounded-lg border border-destructive/40 bg-destructive/10 p-6">
                    <div className="flex items-center gap-3">
                        <TriangleAlert className="h-6 w-6 shrink-0 text-destructive" />
                        <h1 className="text-xl font-semibold text-destructive">This page hit an error</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Your saved spawners and quests are untouched. If this page keeps failing, the data it is reading
                        may be malformed — try removing the item you last opened.
                    </p>
                    <pre className="max-w-full overflow-x-auto rounded-md bg-muted/60 p-3 font-mono text-xs">
                        {error.message}
                    </pre>
                    <div className="flex gap-2">
                        <Button onClick={() => this.setState({ error: null })}>Try again</Button>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Reload page
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
