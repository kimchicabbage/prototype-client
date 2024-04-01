import { Component } from "react";

interface HeaderProps {
  title: string;
}

export default class Header extends Component<HeaderProps> {
  render() {
    const { title } = this.props;

    return <div className="header">{title}</div>;
  }
}
