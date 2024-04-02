import { Component } from "../../Component";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default class Header extends Component<HeaderProps> {
  render() {
    const { title, children } = this.props;

    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        <h1>{title}</h1>
        {children && children}
      </div>
    );
  }
}
