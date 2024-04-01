import { LatLngTuple } from "leaflet";
import { Component } from "react";
import { Marker, Popup } from "react-leaflet";

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
      <div className="map-marker">
        <Marker position={position}>
          <Popup>
            <div className="map-marker-title">{title}</div>
            {description && (
              <div className="map-marker-description">{description}</div>
            )}
            {contents && contents}
          </Popup>
        </Marker>
      </div>
    );
  }
}
