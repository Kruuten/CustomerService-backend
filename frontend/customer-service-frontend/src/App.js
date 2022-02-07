import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListCustomerComponent from './components/ListCustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';

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
              </Switch>
            </div>
        </div>
      </Router>
      <FooterComponent /> 
    </div>
  );
}

export default App;
