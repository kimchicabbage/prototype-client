import { Component } from "../../Component";

interface CardHeaderProps {
  children?: React.ReactNode;
}

export default class CardHeader extends Component<CardHeaderProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        {children && children}
      </div>
    );
  }
}
