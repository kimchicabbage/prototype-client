import { LatLngTuple } from "leaflet";
import { MapContainer } from "react-leaflet";
import { MapTile } from "./MapTile";
import MapMarker, { MapMarkerProps } from "./MapMarker";
import { Component } from "../../Component";

interface MapProps {
  center?: LatLngTuple;
  zoom?: number;
  markers?: MapMarkerProps[];
}

export default class Map extends Component<MapProps> {
  render() {
    const { center: position, zoom, markers } = this.props;
    return (
      <div className={this.getComponentClassName()} key={this.generateKey()}>
        <MapContainer
          id="map"
          center={position}
          zoom={zoom}
          scrollWheelZoom={true}
        >
          <MapTile />
          {markers?.map(({ contents, ...markerProps }) => (
            <MapMarker
              {...markerProps}
              contents={contents}
              key={this.generateKey()}
            />
          ))}
        </MapContainer>
      </div>
    );
  }
}
