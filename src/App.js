import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import OrdersComponent from './components/orders';
import SignInComponent from './components/authentication/sign-in';
import SignUpComponent from './components/authentication/sign-up';
import MenuComponent from './components/menu';
import CartComponent from './components/cart';
import CheckoutComponent from './components/checkout';
import PaymentComponent from './components/payment';
import OrderReportComponent from './components/reports';
import InnerLayout  from './InnerLayout';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/sign-up" />
          </Route>
          <Route path="/sign-in" component={SignInComponent} />} />
          <Route path={'/sign-up'} component={SignUpComponent} />} />
          <InnerLayout path={'/orders'} component={OrdersComponent} />} />
          <InnerLayout path={'/menu'} component={MenuComponent} />} />
          <InnerLayout path={'/cart'} component={CartComponent} />} />
          <InnerLayout path={'/checkout'} component={CheckoutComponent} />} />
          <InnerLayout path={'/payment'} component={PaymentComponent} />} />
          <InnerLayout path={'/orderreport'} component={OrderReportComponent} />} />
    </Switch>
      </Router>
    );
  }


export default App;
