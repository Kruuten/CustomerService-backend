import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';


class ListCustomerComponent extends Component {
    constructor(props){
        super(props)

        this.state ={
            customers: []

        }
        this.addCustomer = this.addCustomer.bind(this);
    }

    componentDidMount(){
        CustomerService.getCustomers().then((res) =>{
            this.setState({customers: res.data});
        });

    }

    addCustomer(){
        this.customer.history.push('/add-customer');
    }

    render() {
        return (
            <div>
              <h2 className='text-center'>Customer List</h2> 
              <div className='row'>
                  <button className='btn-primary' onClick={() => this.addCustomer()}>Add</button>
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
                                this.state.customers.map(
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
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
              </div> 
            </div>
        );
    }
}

export default ListCustomerComponent;