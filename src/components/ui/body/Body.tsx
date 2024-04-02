import { Component } from "../../Component";

interface BodyProps {
  children?: React.ReactNode;
}

export default class Body extends Component<BodyProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        {children && children}
      </div>
    );
  }
}
