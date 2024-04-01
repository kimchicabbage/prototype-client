import React, { Component } from "react";

interface CardHeaderProps {
  children?: React.ReactNode;
}

export default class CardHeader extends Component<CardHeaderProps> {
  render() {
    const { children } = this.props;
    return <div className="card-header">{children && children}</div>;
  }
}
