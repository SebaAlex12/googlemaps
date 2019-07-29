import React, { Component, CSSProperties } from "react";
import { Marker } from './MapInterfaces';

interface IpropsMapMarker extends Marker {
  onRemoveMarkerHandler(id: number): void;
}

class MapMarker extends Component<IpropsMapMarker> {
  render() {
    const { onRemoveMarkerHandler, text, id } = this.props;
    const markerInlineStyles: CSSProperties = {
      backgroundColor: "red",
      padding: "10px",
      color: "#fff",
      width: "100px",
      position: "relative"
    };
    const deleteButtonStyles: CSSProperties = {
      backgroundColor: "red",
      marginLeft: "-40px"
    };
    return (
      <div style={markerInlineStyles}>
        <div
          style={deleteButtonStyles}
          className="btn"
          onClick={() => onRemoveMarkerHandler(id)}
        >
          X
        </div>
        {text}
      </div>
    );
  }
}

export default MapMarker;
