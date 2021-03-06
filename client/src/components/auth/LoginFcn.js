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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function LoginFcn(props) {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginErrors, setLoginErrors] = useState('');

  const classes = useStyles();




  // handleChange for email input field.
  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  // handleChange for password input field.
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  // handling the submit button.
  const loginButton = (e) => {
    e.preventDefault()
    return axios.post("/login",{
      email: email,
      password: password
      }
      ).then(response => {
        localStorage.setItem('username', response.data.result.username)
        localStorage.setItem('userId', response.data.result.id) ////added for the new game start button
        localStorage.setItem('avatar', response.data.result.avatar);
        localStorage.removeItem('guestuser');
        props.setLoggedUser(response.data.result.username)
        history.push('/')
      })
      .catch(error => {
        console.log("login error", error);
        alert("You entered the wrong email/password combination!")
      });
  };
  

  return (
    <div id="main-box">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={email} 
            onChange={handleEmailInput} 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password} 
            onChange={handlePasswordInput} 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginButton}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/registration"  variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  )
};

