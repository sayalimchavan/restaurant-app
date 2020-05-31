import React, { Component } from "react";
import {Redirect, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchLoginData } from '../../../actions/sign-in/sign-in-action';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const useStyles = theme => ({
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignInComponent extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchLoginData(this.state.email, this.state.password);

  }
  render() {
    if(this.props.userSignIn.data && this.props.userSignIn.data[0]){
       return <Redirect to='/menu' />;
    }
    const {classes} = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign In
          </Button>
            <Grid container>
              
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("state",state);
  let data = {userSignIn: state.signIn, error: state.error};
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { fetchLoginData };
  return bindActionCreators(actions, dispatch);
};

//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInComponent));
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(SignInComponent))