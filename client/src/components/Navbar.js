import React from "react";
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export default function Navbar() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' aria-label='menu'>
            <Menu/>
          </IconButton>
        </Toolbar>
      </AppBar>

    </div>
  )
}