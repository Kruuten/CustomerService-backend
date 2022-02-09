import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';

class ViewInfoComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                id: this.props.match.params.id,
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
        this.updateCustomer = this.updateCustomer.bind(this);
    }

    componentDidMount(){
        CustomerService.getCustomerById(this.state.id).then((res) => {
            let customer = res.data;
            this.setState({
                    firstName: customer.firstName,
                    lastName : customer.lastName,
                    middleName : customer.middleName,
                    sex : customer.sex,
                    registredCountry: customer.registredAddress.country,
                    registredRegion: customer.registredAddress.region,
                    registredCity:customer.registredAddress.city,
                    registredStreet: customer.registredAddress.street,
                    registredHouse: customer.registredAddress.house,
                    registredFlat: customer.registredAddress.flat,
                    actualCountry: customer.actualAddress.country,
                    actualRegion: customer.actualAddress.region,
                    actualCity:customer.actualAddress.city,
                    actualStreet: customer.actualAddress.street,
                    actualHouse: customer.actualAddress.house,
                    actualFlat: customer.actualAddress.flat,
            });
        });
    }

    updateCustomer = (e) => {
        e.preventDefault();
        let actualAddress = {
                        id : this.state.id,
                        country: this.state.actualCountry,
                        region: this.state.actualRegion,
                        city: this.state.actualCity,
                        street: this.state.actualStreet,
                        house: this.state.actualHouse,
                        flat: this.state.actualFlat
        };
        
        console.log('actualAddress => ' + JSON.stringify(actualAddress));
        CustomerService.updateCustomerAddress(actualAddress, this.state.id).then(res => {
            this.props.history.push('/customers');
        });

        
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
                            <div className='card-body'>
                                <form>
                                <h4 className='text-center'> Customer Bio</h4>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>First name:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.firstName}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Last Name:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.lastName}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Middle Name:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.middleName}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Middle Name:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.sex}/> 
                                        </div>
                                    </div>
                                    <br></br>
                                        <h4 className='text-center'> Registred Address</h4>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Country:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.registredCountry}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Region:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.registredRegion}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>City:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.registredCity}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Street:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.registredStreet}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>House:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.registredHouse}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Flat:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.registredFlat}/> 
                                        </div>
                                    </div>
                                    <br></br>
                                    <h4 className='text-center'> Actual Address</h4>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Country:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.actualCountry}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Region:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.actualRegion}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>City:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.actualCity}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Street:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.actualStreet}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>House:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.actualHouse}/> 
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label className='col-sm-9 col-form-label'>Flat:</label>
                                        <div className='col-sm-3'>
                                        <input type="text" readOnly className="form-control-plaintext" value={this.state.actualFlat}/> 
                                        </div>
                                    </div>
                                    <br></br>
                                    <button className='btn btn-success' onClick={this.cancel.bind(this)} style = {{marginLeft: '10px'}}>Back</button>

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

export default ViewInfoComponent;