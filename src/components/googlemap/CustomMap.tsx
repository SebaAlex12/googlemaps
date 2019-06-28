import React, { Component, FormEvent, CSSProperties } from "react";
import GoogleMapReact from "google-map-react";
import CustomMapForm from "./CustomMapForm";
import MapMarker from "./MapMarker";

interface IpropsCustomMap {
  lat: number;
  lng: number;
  text: string;
}

interface IstateCustomMap {
  settings: {
    center: {
      lat: number;
      lng: number;
    };
    zoom: number;
  };
  markers: {
    id: number;
    lat: number;
    lng: number;
    text: string;
  }[];
}

class CustomMap extends Component<IpropsCustomMap, IstateCustomMap> {
  constructor(props: IpropsCustomMap) {
    super(props);
    this.state = {
      settings: {
        center: {
          lat: 52,
          lng: 20
        },
        zoom: 6
      },
      markers: [{ id: 1, lat: props.lat, lng: props.lng, text: props.text }]
    };
  }

  addMapMarker = (
    event: FormEvent<HTMLInputElement>,
    params: { id: number; lat: number; lng: number; text: string }
  ): void => {
    event.preventDefault();
    // id from the cosmos :)
    const id = this.state.markers.length + 1;
    this.setState({
      markers: [
        ...this.state.markers,
        { id: id, lat: params.lat, lng: params.lng, text: params.text }
      ]
    });
    console.log("markers", this.state.markers);
  };

  removeMapMarker = (id: number): void => {
    const filter = this.state.markers.filter(marker => marker.id !== id);

    console.log("filter:", filter);

    this.setState({
      // ...this.state,
      markers: this.state.markers.filter(marker => marker.id !== id)
    });
  };

  render() {
    const mapInlineStyles: CSSProperties = {
      width: "100%",
      height: "500px"
    };

    let markersContent;

    if (this.state.markers) {
      markersContent = this.state.markers.map(marker => {
        return (
          <MapMarker
            key={marker.id}
            id={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            text={marker.text}
            onRemoveMarkerHandler={this.removeMapMarker}
          />
        );
      });
    } else {
      markersContent = "spinner";
    }

    return (
      <div>
        <CustomMapForm addMarkerEventHandler={this.addMapMarker} />
        <h2 className="container">Localizations</h2>
        <div style={mapInlineStyles}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAl6Fg23N7K6UdHwgWVVf8DCsT8FUhQyh4"
            }}
            defaultCenter={this.state.settings.center}
            defaultZoom={this.state.settings.zoom}
          >
            {markersContent}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
export default CustomMap;
