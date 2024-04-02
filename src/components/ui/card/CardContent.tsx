import { Component } from "../../Component";

interface CardContentProps {
  children: React.ReactNode;
}

export default class CardContent extends Component<CardContentProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        {children}
      </div>
    );
  }
}
