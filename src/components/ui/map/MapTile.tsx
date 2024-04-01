import { Component } from "react";
import { TileLayer } from "react-leaflet";

interface MapTileProps {
  attribution?: string;
  url?: string;
}

export class MapTile extends Component<MapTileProps> {
  render() {
    const {
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    } = this.props;
    return (
      <div className="map-tile">
        <TileLayer attribution={attribution} url={url} />
      </div>
    );
  }
}
