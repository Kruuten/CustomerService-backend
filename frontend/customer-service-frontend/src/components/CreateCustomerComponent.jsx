import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';

class CreateCustomerComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                fields: {
                    firstName :undefined,
                    lastName : undefined,
                    middleName: undefined,
                    sex : 'male',
                    registredCountry : undefined,
                    registredRegion : undefined,
                    registredCity : undefined,
                    registredStreet :undefined,
                    registredHouse : undefined,
                    registredFlat : undefined,
                    actualCountry : undefined,
                    actualRegion : undefined,
                    actualCity : undefined,
                    actualStreet : undefined,
                    actualHouse : undefined,
                    actualFlat : undefined,
                },
                errors:{},
        }

        this.saveCustomer = this.saveCustomer.bind(this);
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //Name
        if (!fields["firstName"]) {
          formIsValid = false;
          errors["firstName"] = "Cannot be empty";
         }
    
            if (typeof fields["firstName"] !== "undefined") {
          if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["firstName"] = "Only letters";
          }
        }

        //LastName
        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "Cannot be empty";
          }
      
          if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["lastName"] = "Only letters";
            }
        }

        //MiddleName
        if (!fields["middleName"]) {
            formIsValid = false;
            errors["middleName"] = "Cannot be empty";
          }
      
          if (typeof fields["middleName"] !== "undefined") {
            if (!fields["middleName"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["middleName"] = "Only letters";
            }
        }

        //Sex
        if (!fields["sex"]) {
            formIsValid = false;
            errors["sex"] = "Cannot be empty";
        }


        //Registred Address
        if (!fields["registredCountry"]) {
            formIsValid = false;
            errors["registredCountry"] = "Cannot be empty";
          }
      
          if (typeof fields["registredCountry"] !== "undefined") {
            if (!fields["registredCountry"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["registredCountry"] = "Only letters";
            }
        }


        if (!fields["registredRegion"]) {
            formIsValid = false;
            errors["registredRegion"] = "Cannot be empty";
          }
      
          if (typeof fields["registredRegion"] !== "undefined") {
            if (!fields["registredRegion"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["registredRegion"] = "Only letters";
            }
        }
        
        if (!fields["registredCity"]) {
            formIsValid = false;
            errors["registredCity"] = "Cannot be empty";
          }
      
          if (typeof fields["registredCity"] !== "undefined") {
            if (!fields["registredCity"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["registredCity"] = "Only letters";
            }
        }


        if (!fields["registredStreet"]) {
            formIsValid = false;
            errors["registredStreet"] = "Cannot be empty";
        }

        
        if (!fields["registredHouse"]) {
            formIsValid = false;
            errors["registredHouse"] = "Cannot be empty";
        }

        if (!fields["registredFlat"]) {
            formIsValid = false;
            errors["registredFlat"] = "Cannot be empty";
        }


        //ActualAddress
        if (!fields["actualCountry"]) {
            formIsValid = false;
            errors["actualCountry"] = "Cannot be empty";
          }
      
          if (typeof fields["actualCountry"] !== "undefined") {
            if (!fields["actualCountry"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["actualCountry"] = "Only letters";
            }
        }


        if (!fields["actualRegion"]) {
            formIsValid = false;
            errors["actualRegion"] = "Cannot be empty";
          }
      
          if (typeof fields["actualRegion"] !== "undefined") {
            if (!fields["actualRegion"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["actualRegion"] = "Only letters";
            }
        }
        
        if (!fields["actualCity"]) {
            formIsValid = false;
            errors["actualCity"] = "Cannot be empty";
          }
      
          if (typeof fields["actualCity"] !== "undefined") {
            if (!fields["actualCity"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["actualCity"] = "Only letters";
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
            this.saveCustomer(e);
        } else {
          alert("Form has errors.");
        }
      }
    
      handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
      }

    saveCustomer = (e) => {
        e.preventDefault();
        let customer = {
            registredAddress:{
                        country: this.state.fields.registredCountry,
                        region: this.state.fields.registredRegion,
                        city: this.state.fields.registredCity,
                        street: this.state.fields.registredStreet,
                        house: this.state.fields.registredHouse,
                        flat: this.state.fields.registredFlat,
                        },
            actualAddress:{
                        country: this.state.fields.actualCountry,
                        region: this.state.fields.actualRegion,
                        city: this.state.fields.actualCity,
                        street: this.state.fields.actualStreet,
                        house: this.state.fields.actualHouse,
                        flat: this.state.fields.actualFlat
                        },
            firstName: this.state.fields.firstName,
            lastName: this.state.fields.lastName,
            middleName: this.state.fields.middleName,
            sex: this.state.fields.sex,
        };
        
        console.log('customer => ' + JSON.stringify(customer));

        CustomerService.createCustomer(customer).then(res => {
            this.props.history.push('/customers')
        })
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
                                <form onSubmit={this.contactSubmit.bind(this)}>
                                    <div className='form-group'>
                                        <label>First Name</label>
                                        <input placeholder='First Name' name = 'firstName' className='form-control'
                                        value={this.state.fields['firstName']} onChange={this.handleChange.bind(this, 'firstName')}/>
                                         <span className="error">{this.state.errors["firstName"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Last Name</label>
                                        <input placeholder='Last Name' name = 'lastName' className='form-control'
                                        value={this.state.fields['lastName']} onChange={this.handleChange.bind(this, 'lastName')}/>
                                        <span className="error">{this.state.errors["lastName"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Middle Name</label>
                                        <input placeholder='Middle Name' name = 'middleName' className='form-control'
                                        value={this.state.fields['middleName']} onChange={this.handleChange.bind(this, 'middleName')}/>
                                        <span className="error">{this.state.errors["middleName"]}</span>
                                    </div>
                                    
                                    <div className='form-group' name='sex'>   
                                        <label>Sex</label>
                                        <div className='checkform'>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="male" defaultChecked/>
                                            <label className="form-check-label" htmlFor="sex">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline" onChange={this.handleChange.bind(this, 'sex')}>
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female"/>
                                            <label className="form-check-label" htmlFor="sex">Female</label>
                                        </div>
                                        </div>
                                    </div>
                                    <br></br>
                                        <h4 className='text-center'> Registred Address</h4>
                                    <div className='form-group'> 
                                        <label>Country</label>
                                        <input placeholder='Country' name = 'registredCountry' className='form-control'
                                        value={this.state.fields['registredCountry']} onChange={this.handleChange.bind(this, 'registredCountry')}/>
                                        <span className="error">{this.state.errors["registredCountry"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Region</label>
                                        <input placeholder='Region' name = 'registredRegion' className='form-control'
                                        value={this.state.fields['registredRegion']} onChange={this.handleChange.bind(this, 'registredRegion')}/>
                                        <span className="error">{this.state.errors["registredRegion"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>City</label>
                                        <input placeholder='City' name = 'registredCity' className='form-control'
                                        value={this.state.fields['registredCity']} onChange={this.handleChange.bind(this, 'registredCity')}/>
                                        <span className="error">{this.state.errors["registredCity"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Street</label>
                                        <input placeholder='Street' name = 'registredStreet' className='form-control'
                                        value={this.state.fields['registredStreet']} onChange={this.handleChange.bind(this, 'registredStreet')}/>
                                        <span className="error">{this.state.errors["registredStreet"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>House</label>
                                        <input placeholder='House' name = 'registredHouse' className='form-control'
                                        value={this.state.fields['registredHouse']} onChange={this.handleChange.bind(this, 'registredHouse')}/>
                                        <span className="error">{this.state.errors["registredHouse"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Flat</label>
                                        <input placeholder='Flat' name = 'registredFlat' className='form-control'
                                        value={this.state.fields['registredFlat']} onChange={this.handleChange.bind(this, 'registredFlat')}/>
                                        <span className="error">{this.state.errors["registredFlat"]}</span>
                                    </div>
                                    <br></br>
                                    <h4 className='text-center'> Actual Address</h4>
                                    <div className='form-group'> 
                                        <label>Country</label>
                                        <input placeholder='Country' name = 'actualCountry' className='form-control'
                                        value={this.state.fields['actualCountry']} onChange={this.handleChange.bind(this, 'actualCountry')}/>
                                        <span className="error">{this.state.errors["actualCountry"]}</span>
                                    </div>
                                        <label>Region</label>
                                        <input placeholder='Region' name = 'actualRegion' className='form-control'
                                        value={this.state.fields['actualRegion']} onChange={this.handleChange.bind(this, 'actualRegion')}/>
                                        <span className="error">{this.state.errors["actualRegion"]}</span>
                                    <div className='form-group'> 
                                        <label>City</label>
                                        <input placeholder='City' name = 'actualCity' className='form-control'
                                        value={this.state.fields['actualCity']} onChange={this.handleChange.bind(this, 'actualCity')}/>
                                        <span className="error">{this.state.errors["actualCity"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Street</label>
                                        <input placeholder='Street' name = 'actualStreet' className='form-control'
                                        value={this.state.fields['actualStreet']} onChange={this.handleChange.bind(this, 'actualStreet')}/>
                                        <span className="error">{this.state.errors["actualStreet"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>House</label>
                                        <input placeholder='House' name = 'actualHouse' className='form-control'
                                        value={this.state.fields['actualHouse']} onChange={this.handleChange.bind(this, 'actualHouse')}/>
                                        <span className="error">{this.state.errors["actualHouse"]}</span>
                                    </div>
                                    <div className='form-group'> 
                                        <label>Flat</label>
                                        <input placeholder='Flat' name = 'actualFlat' className='form-control'
                                        value={this.state.fields['actualFlat']} onChange={this.handleChange.bind(this, 'actualFlat')}/>
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

export default CreateCustomerComponent;