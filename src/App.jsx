import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "?",
      surname: "?",
      users: [],
    };
  }

  render() {
    const onChange = ({ target: { name ,value} }) => {
      this.setState({ [name]: value });
    };

    const callUsers = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          this.setState({ org: res });
          this.setState({ users: res });
        });
    };

    const onFilter = (e) => {
      let res = this.state.org?.filter((v) => v.name.includes(e.target.value));
      this.setState({ users: res });
    };

    

    return (
      <div>
        <h1> Name: {this.state.name}</h1>
        <h1> SurName: {this.state.surname}</h1>

        <input name="name" onChange={onChange} placeholder="name" />
        <input name="surname" onChange={onChange} placeholder="surName" />
        <hr />

        <input onChange={onFilter} placeholder="filter" />
        <button onClick={callUsers}> Click for users</button>
        <div>
          {this.state.users?.map((v) => {
            return (
              <h2 key={v.id}>
                {" "}
                {v.id} {v.name}
              </h2>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
