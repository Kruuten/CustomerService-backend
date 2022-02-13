package com.kruten.service_with_search.controller;

import com.kruten.service_with_search.entity.Address;
import com.kruten.service_with_search.entity.Customer;
import com.kruten.service_with_search.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/")
public class CustomServiceController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/customers")
    public List<Customer> getAllCustomers(){
            return customerService.getAllCustomers();

    }

    @GetMapping("/customers/{id}")
    public Customer getCustomerByID(@PathVariable int id){
            return customerService.getCustomerById(id);

    }

    @GetMapping("/customers/search")
    public List<Customer> findByNameAndLastName(@RequestParam String name, @RequestParam String lastName){

            return customerService.findByNameAndLastName(name, lastName);

    }

    @PostMapping("/customers")
    public Customer addNewCustomer(@Valid @RequestBody Customer customer) throws Exception {
            return customerService.createNewCustomer(customer);

    }

    @PutMapping("/customers/{id}")
    public Customer changeAddress(@PathVariable int id, @Valid @RequestBody  Address address){
            return customerService.changeAddress(id, address);

    }
}
