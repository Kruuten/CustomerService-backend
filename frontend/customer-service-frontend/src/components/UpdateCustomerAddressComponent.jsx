import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';

class UpdateCustomerAddressComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                id: this.props.match.params.id,
                actualCountry: '',
                actualRegion: '',
                actualCity: '',
                actualStreet: '',
                actualHouse: '',
                actualFlat: '',
                
        }

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
                                    <button className='btn btn-success' onClick={this.updateCustomer}>Save</button>
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

export default UpdateCustomerAddressComponent;