import  { Component, type ErrorInfo, type ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong."
          subTitle="Please try again later."
          extra={[
            <Button type="primary" key="console" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
