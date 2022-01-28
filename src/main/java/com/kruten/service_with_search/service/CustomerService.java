package com.kruten.service_with_search.service;

import com.kruten.service_with_search.entity.Customer;
import com.kruten.service_with_search.repository.AddressRep;
import com.kruten.service_with_search.repository.CustomerRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
}
