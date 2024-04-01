import { Component } from "react";

interface CardTitleProps {
  children?: React.ReactNode;
}

export default class CardTitle extends Component<CardTitleProps> {
  render() {
    const { children } = this.props;
    return <h2 className="card-title">{children && children}</h2>;
  }
}
