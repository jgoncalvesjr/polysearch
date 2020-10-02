import React, { useState } from "react";
import {AppBar, Toolbar, IconButton, Typography, Button, Drawer} from '@material-ui/core';
import { Menu, AccountCircle } from '@material-ui/icons';

export default function Navbar(props) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState('left');
  
  const handleDrawer = () => {
    setAnchor('left');
    setOpen(true);
  };

  const handleAccount = () => {
    setAnchor('bottom');
    setOpen(true);
  }

  const loginPageButton = () => {
    document.location.href = "/login";
  }

  const registerPageButton = () => {
    document.location.href = "/registration";
  }

  const logoButton = () => {
    document.location.href = "/";
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={handleDrawer} color='inherit' edge='start' aria-label='menu'>
            <Menu/>
          </IconButton>
          
          <Typography variant='h6' style={{ flexGrow :1 }}>
            <Button  color='inherit' onClick={logoButton}>
              
                PolySearch
              
            </Button>
          </Typography>
          <Button color='inherit' onClick={loginPageButton}>
            Login
          </Button>
          <Button color='inherit' onClick={registerPageButton}>
            Register
          </Button>
          <IconButton onClick={handleAccount} color='inherit'aria-label='account'>
            <AccountCircle/>
          </IconButton>


        </Toolbar>
      </AppBar>

      <Drawer 
      anchor={anchor}
      open={open}
      onClose={() => setOpen(false)}
      >
        <div style={{ height : "100%", padding : "20px"}}>
          { anchor === "left" ?
            <div>
              <h5> This is the left drawer</h5>
            </div>
            :
            <div>
              <h5>This is the bottom drawer</h5>
            </div>
        }
        </div>
      </Drawer>

    </div>
  )
}