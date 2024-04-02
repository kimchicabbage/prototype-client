import { Component } from "../../Component";

interface FooterProps {
  children?: React.ReactNode;
}

export default class Footer extends Component<FooterProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        {children && children}
      </div>
    );
  }
}
