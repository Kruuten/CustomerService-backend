import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';

class UpdateCustomerAddressComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                    id: this.props.match.params.id,
                    fields:{
                    actualCountry: '',
                    actualRegion: '',
                    actualCity: '',
                    actualStreet: '',
                    actualHouse: '',
                    actualFlat: '',
            },
            errors:{}    
        }
        this.updateCustomer = this.updateCustomer.bind(this);
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    

        //ActualAddress
        if (typeof fields["actualCountry"] !== "undefined") {
            if (!fields["actualCountry"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["actualCountry"] = "Only letters and can not be empty";
            }

        }

      
        if (typeof fields["actualRegion"] !== "undefined") {
            if (!fields["actualRegion"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["actualRegion"] = "Only letters and can not be empty";
            }
        }
        

        if (typeof fields["actualCity"] !== "undefined") {
            if (!fields["actualCity"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["actualCity"] = "Only letters and can not be empty";
            }
        }

        if (!fields["actualStreet"]) {
            formIsValid = false;
            errors["actualStreet"] = "Cannot be empty";
        }

        if (!fields["actualHouse"]) {
            formIsValid = false;
            errors["actualHouse"] = "Cannot be empty";
        }

        if (!fields["actualFlat"]) {
            formIsValid = false;
            errors["actualFlat"] = "Cannot be empty";
        }


    //////////////////////
        this.setState({ errors: errors });
        return formIsValid;
      }
    
      contactSubmit(e) {
        e.preventDefault();
    
        if (this.handleValidation()) {
            this.updateCustomer(e);
        } else {
          alert("Form has errors.");
        }
      }
    
      handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
      }

    componentDidMount(){
        CustomerService.getCustomerById(this.state.id).then((res) => {
            let customer = res.data;
            this.setState({ fields : {
                    actualCountry: customer.actualAddress.country,
                    actualRegion: customer.actualAddress.region,
                    actualCity:customer.actualAddress.city,
                    actualStreet: customer.actualAddress.street,
                    actualHouse: customer.actualAddress.house,
                    actualFlat: customer.actualAddress.flat,
            }
            });
        });
    }

    updateCustomer = (e) => {
        e.preventDefault();
        let actualAddress = {
                        country: this.state.fields.actualCountry,
                        region: this.state.fields.actualRegion,
                        city: this.state.fields.actualCity,
                        street: this.state.fields.actualStreet,
                        house: this.state.fields.actualHouse,
                        flat: this.state.fields.actualFlat
        };
        
        console.log('actualAddress => ' + JSON.stringify(actualAddress));
        CustomerService.updateCustomerAddress(actualAddress, this.state.id).then(res => {
            this.props.history.push('/customers');
        });

        
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
                                <form onSubmit={this.contactSubmit.bind(this)}>
                                    <br></br>
                                    <h4 className='text-center'> Actual Address</h4>
                                    <div className='form-group'> 
                                        <label>Country</label>
                                        <input placeholder='Country' name = 'actualCountry' className='form-control'
                                        value={this.state.fields.actualCountry} onChange={this.handleChange.bind(this, 'actualCountry')}/>
                                        <span className="error">{this.state.errors["actualCountry"]}</span>
                                    </div>
                                        <label>Region</label>
                                        <input placeholder='Region' name = 'actualRegion' className='form-control'
                                        value={this.state.fields.actualRegion} onChange={this.handleChange.bind(this, 'actualRegion')}/>
                                        <span className="error">{this.state.errors["actualRegion"]}</span>
                                    <div className='form-group'> 
                                        <label>City</label>
                                        <input placeholder='City' name = 'actualCity' className='form-control'
                                        value={this.state.fields.actualCity} onChange={this.handleChange.bind(this, 'actualCity')}/>
                                        <span className="error">{this.state.errors["actualCity"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Street</label>
                                        <input placeholder='Street' name = 'actualStreet' className='form-control'
                                        value={this.state.fields.actualStreet} onChange={this.handleChange.bind(this, 'actualStreet')}/>
                                        <span className="error">{this.state.errors["actualStreet"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>House</label>
                                        <input placeholder='House' name = 'actualHouse' className='form-control'
                                        value={this.state.fields.actualHouse} onChange={this.handleChange.bind(this, 'actualHouse')}/>
                                        <span className="error">{this.state.errors["actualHouse"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Flat</label>
                                        <input placeholder='Flat' name = 'actualFlat' className='form-control'
                                        value={this.state.fields.actualFlat} onChange={this.handleChange.bind(this, 'actualFlat')}/>
                                        <span className="error">{this.state.errors["actualFlat"]}</span>
                                    </div>
                                    <br></br>
                                    <button className='btn btn-success' value='Submit'>Save</button>
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