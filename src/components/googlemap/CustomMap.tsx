import React, { Component, FormEvent, CSSProperties } from "react";
import GoogleMapReact from "google-map-react";
import CustomMapForm from "./CustomMapForm";
import MapMarker from "./MapMarker";
import { Coordinates, Marker, MarkerWithoutId } from "./MapInterfaces";

const GOOGLE_MAP_KEY: string = process.env.REACT_APP_GOOGLE_MAP_KEY || "";

export interface IpropsCustomMap extends MarkerWithoutId {}
interface IstateCustomMap {
  settings: {
    center: Coordinates;
    zoom: number;
  };
  markers: Marker[];
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
        zoom: 7
      },
      markers: [
        {
          id: 1,
          lat: props.lat,
          lng: props.lng,
          text: props.text
        }
      ]
    };
  }

  addMapMarker = (event: FormEvent<HTMLInputElement>, params: Marker): void => {
    const { markers } = this.state;
    event.preventDefault();
    // id from the cosmos :)
    const id = markers.length + 1;
    this.setState({
      markers: [
        ...markers,
        {
          id: id,
          lat: params.lat,
          lng: params.lng,
          text: params.text
        }
      ]
    });
    console.log("markers", markers);
  };

  removeMapMarker = (id: number): void => {
    const { markers } = this.state;
    const filter = markers.filter((marker: Marker) => marker.id !== id);

    console.log("filter:", filter);

    this.setState({
      // ...this.state,
      markers: markers.filter((marker: Marker) => marker.id !== id)
    });
  };

  render() {
    const { markers, settings } = this.state;
    const mapInlineStyles: CSSProperties = {
      width: "100%",
      height: "500px"
    };

    let markersContent;

    if (markers) {
      markersContent = markers.map((marker: Marker) => (
        <MapMarker
          key={marker.id}
          id={marker.id}
          lat={marker.lat}
          lng={marker.lng}
          text={marker.text}
          onRemoveMarkerHandler={this.removeMapMarker}
        />
      ));
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
              key: GOOGLE_MAP_KEY
            }}
            defaultCenter={settings.center}
            defaultZoom={settings.zoom}
          >
            {markersContent}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
export default CustomMap;
