import { Component } from "../../Component";

interface CardProps {
  children?: React.ReactNode;
}

export default class Card extends Component<CardProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        {children && children}
      </div>
    );
  }
}
