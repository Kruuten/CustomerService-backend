import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListCustomerComponent from './components/ListCustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import UpdateCustomerAddressComponent from './components/UpdateCustomerAddressComponent';
import ViewInfoComponent from './components/ViewInfoComponent';

function App() {
  
  return (
    <div>
      <HeaderComponent />
      <Router>
        <div className='container'>
            <div className="container">
              <Switch>
                <Route path = '/' exact component= {ListCustomerComponent}></Route>
                <Route path = '/customers'  component = {ListCustomerComponent}></Route>
                <Route path = '/add-customer'  component = {CreateCustomerComponent}></Route>
                <Route path = '/update-address/:id'  component = {UpdateCustomerAddressComponent}></Route>
                <Route path = '/showinfo/:id'  component = {ViewInfoComponent}></Route>
              </Switch>
            </div>
        </div>
      </Router>
      <FooterComponent /> 
    </div>
  );
}

export default App;
