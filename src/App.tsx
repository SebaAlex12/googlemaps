import React, { Component } from "react";
import CustomMap from "./components/googlemap/CustomMap";

class App extends Component {
  render() {
    return (
      <div>
        <CustomMap
          lat={52}
          lng={20}
          text="initial localization"
        />
      </div>
    );
  }
}

export default App;
