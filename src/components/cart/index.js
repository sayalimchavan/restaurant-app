import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/sign-in/sign-in-action';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const useStyles = theme => ({
  root: {
    minWidth: 275,
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class CartComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      cartItems: []
    };
  }
  componentDidMount() {
    if (this.props.userSignIn.data && this.props.userSignIn.data[0]) {
      this.setState({
        user: this.props.userSignIn.data
      });
    }

    if (this.props.userCart.cartItems && this.props.userCart.cartItems[0]) {
      this.setState({
        cartItems: this.props.userCart.cartItems
      });
    }
    console.log("cartitems", this.state.cartItems)
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout(this.state.email, this.state.password);

  }
  render() {
    if (!this.props.userSignIn.data || !this.props.userSignIn.data[0]) {
      return <Redirect to='/sign-in' />;
    }
    const classes = this.props;
    return (
      <div className="container-fluid">
        <div>
          {this.state.user.map(user => {
            return (
              <React.Fragment key={user._id}>
                <p>
                  {" "}
                 Logged-in user : {user.first_Name + ` ` + user.last_Name}
                </p>

              </React.Fragment>
            );
          })
          }
        </div>
        <div>
          <Button color="primary" onClick={this.handleLogout}>
            Logout
    </Button>
        </div>
        <Typography variant="h4" component="h2">
                       Cart
                      </Typography>
        <div>
          {/* menu */}
          <Grid container spacing={2}>
            {this.state.cartItems.map((menuitem) => {
              return (
                <Grid item xs={12} sm={3} key={menuitem._id}>
                  <Card className={classes.root} >
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {menuitem.category}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {menuitem.item}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {menuitem.cost}$
                  </Typography>
                      <Typography variant="body2" component="p">
                        {menuitem.description}
                      </Typography>

                    </CardContent>
                    <CardActions>
                      <Button id={menuitem._id} size="small" variant="outlined" onClick={this.handleClick}>Remove from cart</Button>
                      <Button id="qty" size="small">{menuitem.qty}</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.submit}
                component={Link} to="/checkout"
              >
                Checkout
          </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("state", state);
  let data = { userSignIn: state.signIn, error: state.error, userCart: state.cart };
  return data;
};
const mapDispatchToProps = dispatch => {
  const actions = { logout };
  return bindActionCreators(actions, dispatch);
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(CartComponent))