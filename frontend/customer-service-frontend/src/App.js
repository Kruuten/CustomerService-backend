import logo from './logo.svg';
import './App.css';
import ListCustomerComponent from './components/ListCustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div>
      <HeaderComponent />
    
        <div className="container">
          <ListCustomerComponent />
        </div>
        <FooterComponent />
    </div>
  );
}

export default App;
