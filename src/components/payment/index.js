import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/sign-in/sign-in-action';
// import {clearCartData} from '../../actions/menu/menu-action';

class PaymentComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      orderConfirm:null
    };
  }
  componentDidMount() {
    if (this.props.userSignIn.data && this.props.userSignIn.data[0]) {
      this.setState({
        user: this.props.userSignIn.data
      });
    }
    if(this.props.userOrder.data && this.props.userOrder.data.success){
      this.setState({
        orderConfirm: "Order placed successfully."
      });
     // this.props.clearCartData()
    }
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();

  }

  render() {
    if (!this.props.userSignIn.data || !this.props.userSignIn.data[0]) {
      return <Redirect to='/sign-in' />;
    }
    
   
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
        {this.state.orderConfirm}
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
  const actions = { logout };
  return bindActionCreators(actions, dispatch);
};
export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(PaymentComponent));