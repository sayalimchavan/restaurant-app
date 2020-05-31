import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/sign-in/sign-in-action';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { postOrderData } from '../../actions/checkout/checkout-action';
import axios from 'axios';
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

class CheckoutComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      cartItems: [],
      address: null,
      phone: null
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

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  costCount = () => {
    const content = this.state.cartItems;

    if (content) {
      return content.reduce(function (prev, current) {
        return prev + +current.cost*current.qty
      }, 0);
    } else {
      return false;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let orderItems = []
    let menuUpdate = []
    this.state.cartItems.forEach((item) => {
       
        orderItems.push({"menuid":item._id, "qtyOrdered":item.qty});
        menuUpdate.push({"menuid":item._id, "newQty": item.quantity - item.qty});
      });
      console.log("order",orderItems)
    this.props.postOrderData(this.state.user[0]._id,orderItems, this.costCount(),this.state.address, this.state.phone);

    //update actual quantity of each menu item ordered
    menuUpdate.forEach((ord) => {
      axios.post("http://localhost:4000/menu/update/"+ord.menuid,{
      quantity : ord.newQty
    }).then(response => {
    console.log("response",response)
  });
    });
  }
  render() {
    if (!this.props.userSignIn.data || !this.props.userSignIn.data[0]) {
      return <Redirect to='/sign-in' />;
    }
    if(this.props.userOrder.data && this.props.userOrder.data.success){
      return <Redirect to='/payment' />;
    }
    const classes = this.props;
    const totalCost = this.costCount()

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
                       Checkout
                      </Typography>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField id="address" label="Address" variant="outlined" onChange={this.handleChange} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField id="phone" label="Phone" variant="outlined" onChange={this.handleChange} />
            </Grid>
          </Grid>
         
          <Grid container spacing={2}>
           
            {this.state.cartItems.map((menuitem) => {
              return (
                <Grid item xs={12} sm={3} key={menuitem._id}>

                  <Typography className={classes.title} color="textSecondary">
                    {menuitem.item}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {menuitem.cost}$
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {menuitem.qty} Nos
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Button

                variant="outlined"
                color="primary"
              >
                Total cost: $ {totalCost}
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                Place Order
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
  let data = { userSignIn: state.signIn, error: state.error, userCart: state.cart, userOrder: state.order };
  return data;
};
const mapDispatchToProps = dispatch => {
  const actions = {postOrderData, logout };
  return bindActionCreators(actions, dispatch);
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(CheckoutComponent))