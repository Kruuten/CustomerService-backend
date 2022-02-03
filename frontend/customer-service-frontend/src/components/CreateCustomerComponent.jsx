import React, { Component } from 'react';

class CreateCustomerComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                firstName: '',
                lastName: '',
                middleName: '',
        }
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Add New Customer</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>First Name</label>
                                        <input placeholder='First Name' name = 'firstName' className='form-control'
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        <label>Last Name</label>
                                        <input placeholder='Last Name' name = 'lastName' className='form-control'
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        <label>Middle Name</label>
                                        <input placeholder='Middle Name' name = 'middleName' className='form-control'
                                        value={this.state.middleName} onChange={this.changeMiddleNameHandler}/>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCustomerComponent;