import React, { Component } from "react";
import $ from "jquery";
import Users from "./Components/Users";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userList: [],
      filteredUsers: [],
      query: "",
    };

    this.filterUserList = this.filterUserList.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const query = event.target.value.toLowerCase();
    this.setState({ query }, () => this.filterUserList());
  }

  // For filtering the user object w.r.t name
  filterUserList() {
    let users = this.state.userList;
    let query = this.state.query;

    users = users.filter(function (user) {
      return user.name.toLowerCase().indexOf(query) !== -1; // returns true or false
    });
    this.setState({ filteredUsers: users });
  }

  // AJAX request to get all the users
  getAllUsers() {
    $.ajax({
      url: "http://localhost:8900/users",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ userList: data }, function () {
          this.setState({ loading: false });
          this.setState({ filteredUsers: data });
          // Logging the response
          console.log(this.state);
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      },
    });
  }

  componentWillMount() {
    this.getAllUsers();
  }

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    if (this.state.loading) {
      return <div className="Loader"></div>;
    }

    return (
      <div>
        <h1 className="App">Get All the Users in The Database </h1>
        <span className="App">
          <input
            type="text"
            className="FilterTextBox"
            onChange={this.onChange}
            placeholder="Search the Name"
          />
        </span>
        <Users userList={this.state.filteredUsers} />
      </div>
    );
  }
}

export default App;
