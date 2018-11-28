import React, { Component } from "react";
import Grid from "./Grid";
import { Dropdown } from "semantic-ui-react";

class App extends Component {
  state = {
    selectedDepartment: "marketing"
  };

  handleChange = (event, data) => {
    console.log(data.value);
    this.setState({ selectedDepartment: data.value });
  };

  render() {
    const occupations = [
      { key: "departmentTechnology", text: "Technology", value: "technology" },
      { key: "departmentMarketing", text: "Marketing", value: "marketing" },
      { key: "departmentHR", text: "Human Resources", value: "hr" },
      { key: "departmentOperations", text: "Operations", value: "operations" },
      { key: "departmentSales", text: "Sales", value: "sales" }
    ];

    return (
      <div className="App">
        <div className="wrapper">
          <div>
            <Dropdown
              className="dropdown_occupation"
              placeholder="Skills"
              fluid
              search
              selection
              options={occupations}
              value={this.state.selectedDepartment}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="ui text">
          <Grid department="technology" />
          <Grid department="marketing" />
        </div>
      </div>
    );
  }
}

export default App;
