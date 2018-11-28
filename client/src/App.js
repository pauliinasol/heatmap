import React, { Component } from "react";
import Grid from "./Grid";
import { Dropdown, Loader } from "semantic-ui-react";
import Client from "./Client";

class App extends Component {
  state = {
    selectedDepartment: "",
    users: []
  };

  handleChange = (event, data) => {
    this.setState({ selectedDepartment: data.value, loading: true });
    // console.log(data.value);
    Client.search(data.value, users => {
      this.setState({
        users,
        loading: false
      });
    });
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
          {!this.state.loading && <Grid users={this.state.users} />}
          <Loader active={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
