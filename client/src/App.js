import React from 'react';
import logo from './logo.svg';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

function App() {
  const { state, dispatch } = useApplicationData();

  const userList = state.users.map(user => (
    <li key={user.id}>
      {user.username} {user.avatar} {user.email}
    </li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         <h1>Users</h1>

      {state.loading && <h3>Loading...</h3>}

      <ul>{!state.loading && userList}</ul>
      </header>
    </div>
  );
}

export default App;
