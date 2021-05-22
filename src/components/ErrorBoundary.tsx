import React, { Component } from "react";
import '../styles/errorbound.css';

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: any) {
    return { hasError: true };
  }

  componentDidCatch(err: any, errInfo: any) {
    console.log(err, errInfo);
  }

  render() {
    const { hasError }: any = this.state;
    if (hasError) {
      return (
        <div
          className="info"
          style={{
            margin: "2rem 7rem 3rem 21rem",
            background: "#ffffff",
          }}
        >
          <h1>Sorry Something went wrong</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary