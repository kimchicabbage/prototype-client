import { Component } from "../../Component";
import { LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { uuid } from "../../../utils/uuid";

export interface MapMarkerProps {
  position: LatLngTuple;
  title: string;
  description?: string;
  contents?: React.ReactNode;
}

export default class MapMarker extends Component<MapMarkerProps> {
  render() {
    const { position, title, description, contents } = this.props;
    return (
      <div className={this.getComponentClassName()} key={uuid()}>
        <Marker position={position} key={uuid()}>
          <Popup>
          <div className={`${this.getComponentClassName()}-title`}>{title}</div>
            {description && (
              <div className={`${this.getComponentClassName()}-description`}>{description}</div>
            )}
            {contents && contents}
          </Popup>
        </Marker>
      </div>
    );
  }
}
