package com.kruten.serviceWithSearch.service;

import com.kruten.serviceWithSearch.entity.Address;
import com.kruten.serviceWithSearch.entity.Customer;
import com.kruten.serviceWithSearch.repository.AddressRep;
import com.kruten.serviceWithSearch.repository.CustomerRep;
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
        regAddress.setCreated(LocalDateTime.now());
        actAddress.setCreated(LocalDateTime.now());

        regAddress = searchAddressInDB(regAddress);
        actAddress = searchAddressInDB(actAddress);

         Customer checkCustomer = customerRep.findByFirstNameAndLastNameAndMiddleNameAndSexAndRegistredAddress_IdAndActualAddress_Id(
                 customer.getFirstName(),
                 customer.getLastName(),
                 customer.getMiddleName(),
                 customer.getSex(),
                 regAddress.getId(),
                 actAddress.getId());

        if (checkCustomer != null){
            throw new Exception("Customer already exist");
        }

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

    @Transactional
    public Customer changeAddress(int id, Address address){
        Optional<Customer> optional = customerRep.findById(id);
        Customer customer;
        if (optional.isPresent()){
            customer = optional.get();
        } else return null;

        int actAddressId = customer.getActualAddress().getId();

        Address changedAddress = new Address();
        changedAddress.setCreated(LocalDateTime.now());
        changedAddress = searchAddressInDB(address);

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
            return address;
        }
}
