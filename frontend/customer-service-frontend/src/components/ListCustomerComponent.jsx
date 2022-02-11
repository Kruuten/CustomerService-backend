import React, {Component} from 'react';
import CustomerService from '../services/CustomerService';


class ListCustomerComponent extends Component {
    constructor(props){
        super(props)

        this.state ={
            customers: [],
            filter:'',

        }
        this.addCustomer = this.addCustomer.bind(this);
        this.editCustomerAddress = this.editCustomerAddress.bind(this);

    }

    componentDidMount(){
        CustomerService.getCustomers().then((res) =>{
            this.setState({customers: res.data});
        });

    }

    addCustomer(){
        this.props.history.push('/add-customer');
    }

    editCustomerAddress(id){
        this.props.history.push(`/update-address/${id}`)
    }

    showInfo(id){
        this.props.history.push(`/showinfo/${id}`)
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
      };

    render() {
        const {filter} = this.state;
        const filtered = this.state.customers.filter((item) => {
            const  concatenatedNames = `${item.firstName} ${item.lastName} ${item.middleName}`;
      
            return item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
                  item.lastName.toLowerCase().includes(filter.toLowerCase()) ||
                  item.middleName.toLowerCase().includes(filter.toLowerCase()) ||
            concatenatedNames.toLowerCase().includes(filter.toLowerCase())
          });

        return (
            <div>
                <br></br>
                <h2 className='text-center'>Customer List</h2> 
                <div className='input-group'>
                <button className='btn-primary' onClick={this.addCustomer}>Add New Customer</button>
                    <input type='text' className='form-control' placeholder='Customer filter'
                     value={filter} onChange={this.handleChange}/>
                </div>
            
              <div className='row'>
                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Middle Name</th>
                                <th>Sex</th>
                                <th>Registred Address</th>
                                <th>Actual Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                               filtered.map(
                                    customer =>
                                    <tr key = {customer.id}>
                                        <td>{customer.firstName}</td>
                                        <td>{customer.lastName}</td>
                                        <td>{customer.middleName}</td>
                                        <td>{customer.sex}</td>
                                        <td className='breaking-line'>
                                          {'Country: ' + customer.registredAddress.country + '\n'
                                         + 'Region: ' + customer.registredAddress.region + '\n'
                                         + 'City: ' + customer.registredAddress.city + '\n'
                                         + 'Street: ' + customer.registredAddress.street + '\n'
                                         + 'House: ' + customer.registredAddress.house + '\n'
                                         + 'Flat: ' + customer.registredAddress.flat + '\n'}
                                        </td> 
                                        <td className='breaking-line'>
                                          {'Country: ' + customer.actualAddress.country + '\n'
                                         + 'Region: ' + customer.actualAddress.region + '\n' 
                                         + 'City: ' + customer.actualAddress.city + '\n' 
                                         + 'Street: ' + customer.actualAddress.street + '\n' 
                                         + 'House: ' + customer.actualAddress.house + '\n' 
                                         + 'Flat ' + customer.actualAddress.flat + '\n'}
                                        </td>
                                        <td>
                                            <button onClick = {() => this.editCustomerAddress(customer.id)}
                                             className = 'btn btn-info'>Change Address</button>
                                             <br></br>
                                             <br></br>
                                             <button onClick = {() => this.showInfo(customer.id)}
                                             className = 'btn btn-info'>View Info</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
              </div> 
              <br></br>
            </div>
        );
    }
}

export default ListCustomerComponent;