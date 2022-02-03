import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListCustomerComponent from './components/ListCustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import TestComponent from './components/TestComponent';

function App() {
  return (
    <div>
      <HeaderComponent />
      <Router>
        <div className='container'>
            <div className="container">
              <Routes>
                <Route path = '/' exact element = {<ListCustomerComponent />}></Route>
                <Route path = '/customers'  element = {<ListCustomerComponent />}></Route>
                <Route path = '/add-customer'  element = {<CreateCustomerComponent />}></Route>
                <Route path = '/test'  element = {<TestComponent />}></Route>
              </Routes>
            </div>
        </div>
      </Router>
      <FooterComponent /> 
    </div>
  );
}

export default App;
