import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      avatar: "",
      registrationErrors: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const {
      email,
      password,
      username,
      avatar
    } = this.state;

    axios.post("http://localhost:3002/register", {
      
        email: email,
        password: password,
        username: username,
        avatar: avatar,
        multiplayerWins: 0
      
    }
    ).then(response => {
      console.log("registration response", response);
    })
    .catch(error => {
      console.log("registration error", error);
    })

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
          type="email"
          name="email" 
          placeholder="Email" 
          value={this.state.email} 
          onChange={this.handleChange} 
          required />

          <input 
          type="password"
          name="password" 
          placeholder="Password" 
          value={this.state.password} 
          onChange={this.handleChange} 
          required />

          <input 
          type="username"
          name="username" 
          placeholder="Username" 
          value={this.state.username} 
          onChange={this.handleChange} 
          required />

          <input 
          type="avatar"
          name="avatar" 
          placeholder="Avatar" 
          value={this.state.avatar} 
          onChange={this.handleChange}
          /> 

          <button type="submit">Register</button>

        </form>
      </div>
    )
    
  }
}