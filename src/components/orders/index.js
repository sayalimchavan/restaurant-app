import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import {Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/sign-in/sign-in-action';

class OrdersComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
    };
  }
  componentDidMount() {
    if(this.props.userSignIn.data && this.props.userSignIn.data[0]){
      this.setState({
        user: this.props.userSignIn.data
      });
    }
    
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout(this.state.email, this.state.password);

  }
  render() {
    if(!this.props.userSignIn.data || !this.props.userSignIn.data[0]){
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
                 Logged-in user : {user.first_Name + ` `+ user.last_Name}
                </p>
                
              </React.Fragment>
            );
          })
          }
        </div>
        <div>
          <Button  color="primary" onClick={this.handleLogout}>
            Logout
    </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("state",state);
  let data = {userSignIn: state.signIn, error: state.error};
  return data;
};
const mapDispatchToProps = dispatch => {
  const actions = { logout };
  return bindActionCreators(actions, dispatch);
};
export default connect(
  mapStateToProps,mapDispatchToProps
)(withRouter(OrdersComponent));