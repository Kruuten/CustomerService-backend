import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';

class CreateCustomerComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                firstName: '',
                lastName: '',
                middleName: '',
                sex: '',
                registredCountry: '',
                registredRegion: '',
                registredCity: '',
                registredStreet: '',
                registredHouse: '',
                registredFlat: '',
                actualCountry: '',
                actualRegion: '',
                actualCity: '',
                actualStreet: '',
                actualHouse: '',
                actualFlat: '',
                onError: false,
                errorBody: [],
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeMiddleNameHandler = this.changeMiddleNameHandler.bind(this);

        this.changeRegistredCountryHandler = this.changeRegistredCountryHandler.bind(this);
        this.changeRegistredRegionHandler = this.changeRegistredRegionHandler.bind(this);
        this.changeRegistredCityHandler = this.changeRegistredCityHandler.bind(this);
        this.changeRegistredStreetHandler = this.changeRegistredStreetHandler.bind(this);
        this.changeRegistredHouseHandler = this.changeRegistredHouseHandler.bind(this);
        this.changeRegistredFlatHandler = this.changeRegistredFlatHandler.bind(this);

        this.changeActualCountryHandler = this.changeActualCountryHandler.bind(this);
        this.changeActualRegionHandler = this.changeActualRegionHandler.bind(this);
        this.changeActualCityHandler = this.changeActualCityHandler.bind(this);
        this.changeActualStreetHandler = this.changeActualStreetHandler.bind(this);
        this.changeActualHouseHandler = this.changeActualHouseHandler.bind(this);
        this.changeActualFlatHandler = this.changeActualFlatHandler.bind(this);
        this.saveCustomer = this.saveCustomer.bind(this);
    }

    saveCustomer = (e) => {
        e.preventDefault();
        let customer = {
            registredAddress:{
                        country: this.state.registredCountry,
                        region: this.state.registredRegion,
                        city: this.state.registredCity,
                        street: this.state.registredStreet,
                        house: this.state.registredHouse,
                        flat: this.state.registredFlat,
                        },
            actualAddress:{
                        country: this.state.actualCountry,
                        region: this.state.actualRegion,
                        city: this.state.actualCity,
                        street: this.state.actualStreet,
                        house: this.state.actualHouse,
                        flat: this.state.actualFlat
                        },
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            middleName: this.state.middleName,
            sex: this.state.sex,
        };
        
        console.log('customer => ' + JSON.stringify(customer));

        CustomerService.createCustomer(customer).then(res => {
            this.props.history.push('/customers')
        })
        .catch(e => {this.errorHandle(e)})
    }

    errorHandle(e){
        this.setState({
            onError: true
        })
        if (e.response && e.response.data){
            this.setState({
                errorBody: e.response.data.violations
            })
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeMiddleNameHandler = (event) => {
        this.setState({middleName: event.target.value});
    }

    changeSexHandler = (event) => {
        this.setState({sex: event.target.value});
    }

    changeRegistredCountryHandler = (event) => {
        this.setState({registredCountry: event.target.value});
    }

    changeRegistredRegionHandler = (event) => {
        this.setState({registredRegion: event.target.value});
    }

    changeRegistredCityHandler = (event) => {
        this.setState({registredCity: event.target.value});
    }

    changeRegistredStreetHandler = (event) => {
        this.setState({registredStreet: event.target.value});
    }

    changeRegistredHouseHandler = (event) => {
        this.setState({registredHouse: event.target.value});
    }

    changeRegistredFlatHandler = (event) => {
        this.setState({registredFlat: event.target.value});
    }

    changeActualCountryHandler = (event) => {
        this.setState({actualCountry: event.target.value});
    }

    changeActualRegionHandler = (event) => {
        this.setState({actualRegion: event.target.value});
    }

    changeActualCityHandler = (event) => {
        this.setState({actualCity: event.target.value});
    }

    changeActualStreetHandler = (event) => {
        this.setState({actualStreet: event.target.value});
    }

    changeActualHouseHandler = (event) => {
        this.setState({actualHouse: event.target.value});
    }

    changeActualFlatHandler = (event) => {
        this.setState({actualFlat: event.target.value});
    }

    cancel(){
        this.props.history.push('/customers');
    }


    render() {
        return (
            <div>
                <br></br>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <br></br>
                            <h3 className='text-center'> Add New Customer</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>First Name</label>
                                        <input placeholder='First Name' name = 'firstName' className='form-control'
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Last Name</label>
                                        <input placeholder='Last Name' name = 'lastName' className='form-control'
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Middle Name</label>
                                        <input placeholder='Middle Name' name = 'middleName' className='form-control'
                                        value={this.state.middleName} onChange={this.changeMiddleNameHandler}/>
                                    </div>
                                    <div className='form-group'>   
                                        <label>Sex</label>
                                        <input placeholder='Sex' name = 'sex' className='form-control'
                                        value={this.state.sex} onChange={this.changeSexHandler}/>
                                    </div>
                                    <br></br>
                                        <h4 className='text-center'> Registred Address</h4>
                                    <div className='form-group'> 
                                        <label>Country</label>
                                        <input placeholder='Country' name = 'registredCountry' className='form-control'
                                        value={this.state.registredCountry} onChange={this.changeRegistredCountryHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Region</label>
                                        <input placeholder='Region' name = 'registredRegion' className='form-control'
                                        value={this.state.registredRegion} onChange={this.changeRegistredRegionHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>City</label>
                                        <input placeholder='City' name = 'registredCity' className='form-control'
                                        value={this.state.registredCity} onChange={this.changeRegistredCityHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Street</label>
                                        <input placeholder='Street' name = 'registredStreet' className='form-control'
                                        value={this.state.registredStreet} onChange={this.changeRegistredStreetHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>House</label>
                                        <input placeholder='House' name = 'registredHouse' className='form-control'
                                        value={this.state.registredHouse} onChange={this.changeRegistredHouseHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Flat</label>
                                        <input placeholder='Flat' name = 'registredFlat' className='form-control'
                                        value={this.state.registredFlat} onChange={this.changeRegistredFlatHandler}/>
                                    </div>
                                    <br></br>
                                    <h4 className='text-center'> Actual Address</h4>
                                    <div className='form-group'> 
                                        <label>Country</label>
                                        <input placeholder='Country' name = 'actualCountry' className='form-control'
                                        value={this.state.actualCountry} onChange={this.changeActualCountryHandler}/>
                                    </div>
                                        <label>Region</label>
                                        <input placeholder='Region' name = 'actualRegion' className='form-control'
                                        value={this.state.actualRegion} onChange={this.changeActualRegionHandler}/>
                                    <div className='form-group'> 
                                        <label>City</label>
                                        <input placeholder='City' name = 'actualCity' className='form-control'
                                        value={this.state.actualCity} onChange={this.changeActualCityHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Street</label>
                                        <input placeholder='Street' name = 'actualStreet' className='form-control'
                                        value={this.state.actualStreet} onChange={this.changeActualStreetHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>House</label>
                                        <input placeholder='House' name = 'actualHouse' className='form-control'
                                        value={this.state.actualHouse} onChange={this.changeActualHouseHandler}/>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Flat</label>
                                        <input placeholder='Flat' name = 'actualFlat' className='form-control'
                                        value={this.state.actualFlat} onChange={this.changeActualFlatHandler}/>
                                    </div>
                                    <br></br>
                                    <button className='btn btn-success' onClick={this.saveCustomer}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style = {{marginLeft: '10px'}}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
              <br></br>
              <br></br>
            </div>
        );
    }
}

export default CreateCustomerComponent;