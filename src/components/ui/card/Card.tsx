import React, { Component } from "react";

interface CardProps {
  children?: React.ReactNode;
}

export default class Card extends Component<CardProps> {
  render() {
    const { children } = this.props;
    return <div className="card">{children && children}</div>;
  }
}
