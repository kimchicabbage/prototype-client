import { Component } from "react";

interface CardContentProps {
  children: React.ReactNode;
}

export default class CardContent extends Component<CardContentProps> {
  render() {
    const { children } = this.props;
    return <div className="card-content">{children}</div>;
  }
}
