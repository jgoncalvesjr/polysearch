// This will clear the current user data.
import React, { useState } from 'react';
import axios from "axios";

export default function Logout(props) {

  return (
    <div>
      <button onClick={props.logout}>Logout</button>
    </div>
  )
};