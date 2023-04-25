import React from "react";
import "./App.css";

import LogOut from "./logout";
import Login from "./login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
  }
  render() {
    const onHandle = (boolean) => {
      this.setState({ active: boolean });
    };

   ;
    return this.state.active ? (
      <Login onHandleClick={onHandle} />
    ) : (
      <LogOut onHandleClick={onHandle} />
    );
  }
}

export default App;
