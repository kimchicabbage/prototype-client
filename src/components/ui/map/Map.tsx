import { LatLngTuple } from "leaflet";
import { Component } from "react";
import { MapContainer } from "react-leaflet";
import { MapTile } from "./MapTile";
import MapMarker, { MapMarkerProps } from "./MapMarker";
import { Card } from "../card";

const parkOne2Position: LatLngTuple = [37.526896, 126.9274189];

interface MapProps {
  center?: LatLngTuple;
  zoom?: number;
  markers?: MapMarkerProps[];
}

export default class Map extends Component<MapProps> {
  render() {
    const {
      center: position = parkOne2Position,
      zoom = 20,
      markers,
    } = this.props;
    return (
      <div className="map">
        <MapContainer
          id="map"
          center={position}
          zoom={zoom}
          scrollWheelZoom={true}
        >
          <MapTile />
          {markers?.map(({ contents, ...markerProps }) => (
            <MapMarker {...markerProps}>{contents && contents}</MapMarker>
          ))}
        </MapContainer>
      </div>
    );
  }
}
