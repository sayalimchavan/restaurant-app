import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom';
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
import { postLoginData } from '../../../actions/sign-up/sign-up-action';
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


class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      password: null,
      lastname: null,
      email: null
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postLoginData(this.state.firstname, this.state.lastname, this.state.email, this.state.password);

  }

  render() {
    if (this.props.userSignUp.data && this.props.userSignUp.data.success) {
      return <Redirect to='/sign-in' />;
    }
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form className={classes.form} noValidate >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstname"
                  autoComplete="fname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth

                  label="First Name"
                  autoFocus
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lname"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Register
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
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
  console.log("state", state);
  let data = { userSignUp: state.signUp, error: state.error };
  return data;
};

const mapDispatchToProps = dispatch => {
  const actions = { postLoginData };
  return bindActionCreators(actions, dispatch);
};

//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpComponent));

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(SignUpComponent))