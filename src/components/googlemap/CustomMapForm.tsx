import React, { Component, FormEvent, CSSProperties } from "react";
import { IpropsCustomMap } from './CustomMap';
import { Marker } from './MapInterfaces';

interface IstateCustomMapForm extends IpropsCustomMap {
}

interface IpropsCustomMapForm {
  addMarkerEventHandler(
    event: FormEvent,
    marker: Marker,
  ): void;
}

class CustomMapForm extends Component<
  IpropsCustomMapForm,
  IstateCustomMapForm
> {
  constructor(props: IpropsCustomMapForm) {
    super(props);
    this.state = {
      text: "localization info",
      lat: 52,
      lng: 20
    };
  }

  mapOnChangeHandler = (event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    // lat and lng loosing type number todo
    this.setState({
      ...this.state,
      [event.currentTarget.name]:
        event.currentTarget.name === "text"
          ? event.currentTarget.value
          : parseInt(event.currentTarget.value)
    });
  };

  render() {
    const { text, lat, lng } = this.state;
    const inputStyles: CSSProperties = {
      marginLeft: "5px",
      marginRight: "5px",
      width: "150px"
    };
    return (
      <div className="container">
        <h1>Form</h1>
        <form action="post" className="form-inline">
          <div className="form-group">
            <label htmlFor="text" className="mr-2">
              Marker info:
            </label>
            <input
              style={inputStyles}
              value={text}
              onChange={this.mapOnChangeHandler}
              name="text"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="coord1">Latitude:</label>
            <input
              style={inputStyles}
              value={lat}
              onChange={this.mapOnChangeHandler}
              name="lat"
              type="number"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="coord2">Longitude:</label>
            <input
              style={inputStyles}
              value={lng}
              onChange={this.mapOnChangeHandler}
              name="lng"
              type="number"
              className="form-control"
            />
          </div>
          <div className="form-group text-right">
            <input
              type="submit"
              value="add"
              className="btn btn-primary float-right"
              onClick={event =>
                this.props.addMarkerEventHandler(event, {
                  text,
                  lat,
                  lng,
                })
              }
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CustomMapForm;
