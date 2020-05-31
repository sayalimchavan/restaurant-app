import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/sign-in/sign-in-action';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { fetchCartData } from '../../actions/menu/menu-action';
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
});


class MenuComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      menu: [],
      cartItems: []
    };
  }
  componentDidMount() {
    if (this.props.userSignIn.data && this.props.userSignIn.data[0]) {
      this.setState({
        user: this.props.userSignIn.data
      });
    }
    axios.get("http://localhost:4000/menu/getmenu").then(response => {
      this.data = response.data;
      // this.data.forEach((item) => {
      //   // console.log("found: ", item)
      //   // console.log("found id: ", item._id)

      // });
      var result = this.data.map(function (el) {
        var o = Object.assign({}, el);
        o.qty = 0;
        return o;
      });
      this.setState({
        menu: result
      });
      console.log("menu", this.state.menu)
    })
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout(this.state.email, this.state.password);

  }
  handleChange = (e) => {

    const index = this.state.menu.findIndex((me) => me._id == e.target.id),
    menu = [...this.state.menu]
    menu[index].qty = parseInt(e.target.value);
    this.setState({ menu });
    console.log("menuupdate", this.state.menu)
  }

  handleClick = (e) => {
    let obj = this.state.menu.find(me => me._id == e.currentTarget.id);
    if(obj.quantity - obj.qty < 0 )
        {
          obj.qty = obj.quantity
        }

    this.props.fetchCartData(obj);
  }

  
  handleQtyChange = (e) => {
    const index = this.state.menu.findIndex((me) => me._id == e.target.id),
    menu = [...this.state.menu]
    menu[index].quantity = parseInt(e.target.value);
    this.setState({ menu });
    
  }

  handleQtyClick = (e) => {
    let obj = this.state.menu.find(me => me._id == e.currentTarget.id);

    axios.post("http://localhost:4000/menu/update/"+e.currentTarget.id,{
      quantity : obj.quantity
    }).then(response => {
    console.log("response",response)
  });
  }

  render() {
    if (!this.props.userSignIn.data || !this.props.userSignIn.data[0]) {
      return <Redirect to='/sign-in' />;
    }
    const {classes} = this.props;
    let role = this.props.userSignIn.data[0].role;
    return (
      <div>
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
                       Menu
                      </Typography>
        <div>
          {/* menu */}
          <Grid container spacing={5}>
            {this.state.menu.map((menuitem) => {
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
                    
                     { role =="owner" ? 
                   <CardActions>
                      <Button id={menuitem._id} size="small" variant="outlined" onClick={this.handleQtyClick}>Update Quantity</Button>
                      <TextField id={menuitem._id} label="Quantity" variant="outlined" onChange={this.handleQtyChange} defaultValue={menuitem.quantity} />
                      </CardActions>
                    :
                    <CardActions>
                      {
                        menuitem.quantity > 0 ?
                        <Button id={menuitem._id} size="small" variant="outlined" onClick={this.handleClick}>Add to cart</Button>
                        :
                        <Button size="small" variant="outlined">Out of stock</Button>
                      }
                     
                      <TextField id={menuitem._id} label="Quantity" variant="outlined" onChange={this.handleChange} />
                      </CardActions>
                    }
                      
                    
                  </Card>
                </Grid>
              );
            })}
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
  const actions = { fetchCartData, logout };
  return bindActionCreators(actions, dispatch);
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(MenuComponent))