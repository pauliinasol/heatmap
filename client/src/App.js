import React, { Component } from "react";
import Grid from "./Grid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui text">
          <Grid department="technology" />
          <Grid department="marketing" />
        </div>
      </div>
    );
  }
}

export default App;
