import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';

class ListCustomerComponent extends Component {
    constructor(props){
        super(props)

        this.state ={
            customers: []

        }
    }

    componentDidMount(){
        CustomerService.getCustomers().then((res) =>{
            this.setState({customers: res.data});
        });
    }

    render() {
        return (
            <div>
              <h2 className='text-center'>Customer List</h2> 
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
                                        <td>{customer.regAddress}</td>
                                        <td>{customer.actAddress}</td>
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