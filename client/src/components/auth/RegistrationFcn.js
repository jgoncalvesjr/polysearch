import React, { useState } from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        PolySearch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegistrationFcn(props) {
  const classes = useStyles();


  const history = useHistory()

  // handleChange for email input field.
  const handleEmailInput = e => {
    props.setEmail(e.target.value);
  };
  // handleChange for password input field.
  const handlePasswordInput = e => {
    props.setPassword(e.target.value);
  };
  // handleChange for username input field.
  const handleUsernameInput = e => {
    props.setUsername(e.target.value);
  };
  // handleChange for avatar input field.
  const handleAvatarInput = e => {
    props.setAvatar(e.target.value);
  };

  // handling the submit button.
  const registerButton = (e) => {
    e.preventDefault()
    return axios.post("/register", {
      
        email: props.email,
        password: props.password,
        username: props.username,
        avatar: props.avatar,
        multiplayerWins: 0
      
    }
    ).then(response => {
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('userId', response.data.id); //added for the new game start button
      localStorage.setItem('avatar', props.avatar);
      localStorage.removeItem('guestuser');
      props.setLoggedUser(response.data.username)
      history.push('/')
    })
    .catch(error => {
      console.log("registration error", error);
    })
  }
  

  return (
    <div id="main-box">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={registerButton} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleUsernameInput} 
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleAvatarInput}
                variant="outlined"
                
                fullWidth
                id="lastName"
                label="Avatar"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleEmailInput}
                
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePasswordInput}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
};

