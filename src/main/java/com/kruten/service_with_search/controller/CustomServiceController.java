package com.kruten.service_with_search.controller;

import com.kruten.service_with_search.entity.Customer;
import com.kruten.service_with_search.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class CustomServiceController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/customers")
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @GetMapping("/customers/search")
    public List<Customer> findByNameAndLastName(@RequestParam String name, @RequestParam String lastName){
        return customerService.findByNameAndLastName(name, lastName);
    }

}
