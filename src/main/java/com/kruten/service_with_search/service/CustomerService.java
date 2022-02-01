package com.kruten.service_with_search.service;

import com.kruten.service_with_search.entity.Address;
import com.kruten.service_with_search.entity.Customer;
import com.kruten.service_with_search.repository.AddressRep;
import com.kruten.service_with_search.repository.CustomerRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


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
        regAddress.setModified(LocalDateTime.now());
        actAddress.setModified(LocalDateTime.now());
        Customer newCustomer;

        Address checkRegAddress = searchAddressInDB(regAddress);
        if (checkRegAddress != null){
            regAddress = checkRegAddress;
            regAddress.setModified(LocalDateTime.now());
        }

        Address checkActAddress = searchAddressInDB(actAddress);
        if (checkActAddress != null){
            actAddress = checkActAddress;
            actAddress.setModified(LocalDateTime.now());
        }


        if (regAddress.equals(actAddress)){
            newCustomer = customerRep.save(new Customer(
                    regAddress,
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getMiddleName(),
                    customer.getSex()));
        } else {
            newCustomer = customerRep.save(new Customer(
                    regAddress,
                    actAddress,
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getMiddleName(),
                    customer.getSex()
            ));
        }

        return newCustomer;
    }

    private Address searchAddressInDB(Address address){
        return addressRep.findByCountryAndRegionAndCityAndStreetAndHouseAndFlat(
                address.getCountry(),
                address.getRegion(),
                address.getCity(),
                address.getStreet(),
                address.getHouse(),
                address.getFlat());
    }
}
