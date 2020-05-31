import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/sign-in/sign-in-action';
import { ChartOptions, ChartData } from "./analysis-charts.js";
import './style.css'
import axios from 'axios';

class OrderReportComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      ChartOptions: ChartOptions,
      ChartData: ChartData,
      menuArr : []
    };
  }

  componentDidMount() {
    if (this.props.userSignIn.data && this.props.userSignIn.data[0]) {
      this.setState({
        user: this.props.userSignIn.data
      });
    }

    let menuArr =[]
    //get orders data
    axios.get("http://localhost:4000/order/getorders").then(response => {
      this.data = response.data;
      this.data.forEach((item) => {
        item.menuItems.forEach((menuitem) => {
          menuArr.push(menuitem)
        });
      });
      this.setState({
        menuArr: menuArr
      });
      console.log("menuArr", this.state.menuArr)
    });

    //add category field to menu array
    var result = this.state.menuArr.map(function (el) {
      var o = Object.assign({}, el);
      o.category = "";
      return o;
    });
    this.setState({
      menuArr: result
    });
    
    //get menu data
    axios.get("http://localhost:4000/menu/getmenu").then(response => {
      this.data = response.data;
      this.state.menuArr.forEach((mItem) => {
        let obj = this.data.find((me) => me._id == mItem.menuid);
        mItem.category = obj.category;
      });
     
    });

     
    
  }
  handleUpdate = (e) =>{
       //group by category
       const ourCount = {};
       let currArr = this.state.menuArr;
       this.state.menuArr.forEach(entry => {
           if(!ourCount[entry.category]){
           ourCount[entry.category] = 0;
           }
           ourCount[entry.category]+= entry.qtyOrdered;
         });
   
         //console.log("grouped",ourCount, "part", ourCount["Starters"])

         let ChartData = { ...this.state.ChartData }
      let datasetArr = ChartData.datasets;

      datasetArr[0].data = [ourCount["Starters"],ourCount["Main Course"],ourCount["Dessert"],ourCount["Drinks"]];
      this.setState(
        {
          ChartData
        }
      );
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
        {/* Chart */}
        <div className="chart-section">
                      <span><b>Category vs Orders report</b></span>
                      <Button color="primary" onClick={this.handleUpdate}>
                              Show data
                      </Button>
                          <Bar
                            data={this.state.ChartData}
                            options={this.state.ChartOptions}
                          />
                       
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
  const actions = { logout };
  return bindActionCreators(actions, dispatch);
};
export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(OrderReportComponent));