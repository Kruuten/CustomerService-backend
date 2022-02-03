package com.kruten.service_with_search.service;

import com.kruten.service_with_search.entity.Address;
import com.kruten.service_with_search.entity.Customer;
import com.kruten.service_with_search.repository.AddressRep;
import com.kruten.service_with_search.repository.CustomerRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class CustomerService {
    @Autowired
    private AddressRep addressRep;

    @Autowired
    private CustomerRep customerRep;

    public List<Customer> getAllCustomers(){
        return  customerRep.findAll();
    }

    public List<Customer> findByNameAndLastName(String firstName, String lastName){
        return customerRep.findByFirstNameAndLastName(firstName, lastName);
    }

    public Customer createNewCustomer(Customer customer){
        Address regAddress = customer.getRegistredAddress();
        Address actAddress = customer.getActualAddress();
        regAddress.setCreated(LocalDateTime.now());
        actAddress.setCreated(LocalDateTime.now());

        regAddress = searchAddressInDB(regAddress);
        actAddress = searchAddressInDB(actAddress);

        if (regAddress.equals(actAddress)){
            return customerRep.save(new Customer(
                    regAddress,
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getMiddleName(),
                    customer.getSex()));
        }
        return customerRep.save(new Customer(
                    regAddress,
                    actAddress,
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getMiddleName(),
                    customer.getSex()));

    }

    public Customer changeAddress(int id, Address address){
        Optional<Customer> optional = customerRep.findById(id);
        Customer customer;
        if (optional.isPresent()){
            customer = optional.get();
        } else return null;

        int actAddressId = customer.getActualAddress().getId();

        Address changedAddress = searchAddressInDB(address);
        customer.setActualAddress(changedAddress);
        customerRep.save(customer);

        Address checkAddress = addressRep.findById(actAddressId).get();
        if (checkAddress.getActualCustomers().size() == 0 && checkAddress.getRegistredCustomers().size() ==0){
            addressRep.deleteById(actAddressId);
        }

        return customer;
    }



    private Address searchAddressInDB(Address address){
        Address checkAddress = addressRep.findByCountryAndRegionAndCityAndStreetAndHouseAndFlat(
                address.getCountry(),
                address.getRegion(),
                address.getCity(),
                address.getStreet(),
                address.getHouse(),
                address.getFlat());

        if (checkAddress != null) {
            checkAddress.setModified(LocalDateTime.now());
            return checkAddress;
        }

            address.setModified(LocalDateTime.now());
            return address;

    }
}
