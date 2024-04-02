import { Component } from "../../Component";

interface CardDescriptionProps {
  children: React.ReactNode;
}

export default class CardDescription extends Component<CardDescriptionProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        <p>{children}</p>
      </div>
    );
  }
}
