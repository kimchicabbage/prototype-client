import React from "react";
import { uuid } from "../utils/uuid";

export class Component<P={}> extends React.Component<P> {
  protected getComponentClassName() {
    return this.constructor.name;
  }

  protected generateKey() {
    return `${this.constructor.name}-${uuid()}`;
  }
}
