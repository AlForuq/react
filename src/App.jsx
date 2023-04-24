import React from "react";
import "./App.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      editName: "",
      editUserName: "",
      users: [],
      selection: "name",

      active: null,

      mode: false,
    };
  }

  render() {
    const callUsers = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({ org: res });
          this.setState({ users: res });
        });
    };

    const onChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value });
    };

    const onAdd = () => {
      let newUser = {
        id: Date.now(),
        name: this.state.name,
        username: this.state.username,
      };
      if (this.state.name && this.state.username) {
        this.setState({ users: [...this.state.users, newUser] });
        this.setState({ org: [...this.state.users, newUser] });
        this.setState({ name: "", username: "" });
      }
    };

    const onFilter = (e) => {
      let res = this.state.org?.filter((v) =>
        v[this.state.selection]
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      this.setState({ users: res });
    };

    const onDelete = (id) => {
      let res = this.state.org.filter((v) => v.id !== id);
      this.setState({ users: res });
      this.setState({ org: res });
    };

    const onSelect = (e) => {
      this.setState({ selection: e.target.value });
    };

    const onEdit = ({ id, name, username }) => {
      this.state.org.forEach((element) => {
        if (element.id === id) {
          this.setState({ active: { id, name, username } });
          this.setState({ editName: name, editUserName: username });
        }
      });
    };
    const onSave = (id) => {
      this.state.users.map((value) => {
        if (value.id === id) {
          value.name = this.state.editName;
          value.username = this.state.editUserName;
          return value;
        } else {
          return value;
        }
      });

      this.setState({ active: null });
    };
    const onCancel = () => {
      this.setState({ active: null });
    };

    const onEditChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value });
    };

    const GlobalStyle = createGlobalStyle`
      body{
        background-color: ${(props) => props.theme.bg};
        color: ${(props) => props.theme.cl};
        
      }

      table{
        border-color: ${(props) => props.theme.bc};
      }
    `;

    const theme = {
      bg: this.state.mode ? "white" : "#333",
      cl: this.state.mode ? "#333" : "white",
      bc: this.state.mode ? "blue" : "yellow",
    };

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <button onClick={() => this.setState({ mode: !this.state.mode })}>
          Mode
        </button>
        <hr />
        <input
          value={this.state.name}
          name="name"
          onChange={onChange}
          placeholder="name"
        />
        <input
          value={this.state.username}
          name="username"
          onChange={onChange}
          placeholder="username"
        />
        <button onClick={onAdd}> Add </button>

        <hr />

        <select onChange={onSelect}>
          <option value="name">Name</option>
          <option value="username">userName</option>
        </select>

        <input onChange={onFilter} placeholder="filter" />
        <button onClick={callUsers}> Click for users</button>
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>Name</th>
                <th>userName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users?.length || 0 ? (
                this.state.users?.map(({ id, name, username }) => {
                  return this.state.active?.id === id ? (
                    <tr key={id}>
                      <td>
                        <input
                          name="editName"
                          onChange={onEditChange}
                          value={this.state.editName}
                          type="text"
                        />
                      </td>
                      <td>
                        <input
                          name="editUserName"
                          onChange={onEditChange}
                          value={this.state.editUserName}
                          type="text"
                        />
                      </td>
                      <td>
                        <button onClick={() => onSave(id)}>Save</button>
                        <button onClick={() => onCancel()}>Cancel</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{username}</td>
                      <td>
                        <button onClick={() => onEdit({ id, name, username })}>
                          Edit
                        </button>
                        <button onClick={() => onDelete(id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th colSpan={3}>No Data</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
