import React, { Component, CSSProperties } from "react";

interface IpropsMapMarker {
  id: number;
  lat: number;
  lng: number;
  text: string;
  onRemoveMarkerHandler(id: number): void;
}

class MapMarker extends Component<IpropsMapMarker> {
  render() {
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
          onClick={() => this.props.onRemoveMarkerHandler(this.props.id)}
        >
          X
        </div>
        {this.props.text}
      </div>
    );
  }
}

export default MapMarker;
