import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ["All plants", "Flowers", "Seeds", "Buckets"],
      clickedPlant: null,
    };
  }

  render() {
    // let target = null;
    // const onActive = (e) => {
    //   if (target) {
    //     target.classList.remove("active");
    //   }
    //   target = e.target;
    //   target.classList.add("active");
    // };

    return (
      <div className="div" style={{ display: "flex" }}>
        {this.state.active.map((value) => {
          return (
            <h1
              key={value}
              onClick={() => {
                this.setState({ clickedPlant: value });
              }}
              className={`link ${
                this.state.clickedPlant === value ? "active" : ""
              }`}
            >
              {value}
            </h1>
          );
        })}
      </div>
    );
  }
}

export default App;
