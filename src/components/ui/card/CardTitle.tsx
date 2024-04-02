import { Component } from "../../Component";

interface CardTitleProps {
  children?: React.ReactNode;
}

export default class CardTitle extends Component<CardTitleProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        <h2 className="card-title">{children && children}</h2>
      </div>
    );
  }
}
