import React, { Component } from "react";

interface CardDescriptionProps {
    children: React.ReactNode;
}

export default class CardDescription extends Component<CardDescriptionProps> {
  render() {
    const { children } = this.props;
    return <p className="card-description">{children}</p>;
  }
}
