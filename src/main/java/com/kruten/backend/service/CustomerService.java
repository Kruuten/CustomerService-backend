package com.kruten.backend.service;

import com.kruten.backend.entity.Address;
import com.kruten.backend.entity.Customer;
import com.kruten.backend.exception.CustomerAlreadyExistsException;
import com.kruten.backend.exception.CustomerNotFoundException;
import com.kruten.backend.repository.AddressRep;
import com.kruten.backend.repository.CustomerRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class CustomerService {
    @Autowired
    private AddressRep addressRep;

    @Autowired
    private CustomerRep customerRep;

    @Transactional
    public List<Customer> getAllCustomers(){
        return  customerRep.findAll();
    }

    @Transactional
    public Customer getCustomerById(int id){
        Optional<Customer> optional = customerRep.findById(id);
        Customer customer = null;
        if (optional.isPresent()) {
            customer = optional.get();
        }
        return customer;
    }

    @Transactional
    public List<Customer> findByNameAndLastName(String firstName, String lastName){
        return customerRep.findByFirstNameAndLastName(firstName, lastName);
    }

    @Transactional
    public Customer createNewCustomer(Customer customer) throws Exception {
        Address regAddress = customer.getRegistredAddress();
        Address actAddress = customer.getActualAddress();

        Address commonAddress = searchAddressInDB(regAddress);

        if (regAddress.equals(actAddress)){
            customer.setRegistredAddress(searchAddressInDB(commonAddress));
            customer.setActualAddress(searchAddressInDB(commonAddress));
        } else {
            customer.setRegistredAddress(searchAddressInDB(commonAddress));
            customer.setActualAddress(searchAddressInDB(actAddress));
        }

        Customer checkCustomer = customerRep.findByFirstNameAndLastNameAndMiddleNameAndSexAndRegistredAddress_IdAndActualAddress_Id(
                 customer.getFirstName(),
                 customer.getLastName(),
                 customer.getMiddleName(),
                 customer.getSex(),
                 customer.getRegistredAddress().getId(),
                 customer.getActualAddress().getId());

        if (checkCustomer != null){
            throw new CustomerAlreadyExistsException("Customer already exists");
        }

        return customerRep.save(customer);
    }

    @Transactional
    public Customer changeAddress(int id, Address address) throws CustomerNotFoundException {
        Optional<Customer> optional = customerRep.findById(id);
        Customer customer;
        if (optional.isPresent()){
            customer = optional.get();
        } else {
            throw new CustomerNotFoundException("Customer not found");
        }

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
            address.setCreated(LocalDateTime.now());
            address.setModified(LocalDateTime.now());
            addressRep.save(address);
            return address;
        }
}
