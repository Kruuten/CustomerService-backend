package com.kruten.serviceWithSearch.controller;

import com.kruten.serviceWithSearch.entity.Address;
import com.kruten.serviceWithSearch.entity.Customer;
import com.kruten.serviceWithSearch.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Customer>> getAllCustomers(){
        try {
            return new ResponseEntity<>(customerService.getAllCustomers(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer>getCustomerByID(@PathVariable int id){
        try{
            return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/customers/search")
    public ResponseEntity<List<Customer>> findByNameAndLastName(@RequestParam String name, @RequestParam String lastName){
        try {
            return new ResponseEntity<>(customerService.findByNameAndLastName(name, lastName), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/customers")
    public ResponseEntity<Customer> addNewCustomer(@Valid @RequestBody Customer customer){
        try {
            return new ResponseEntity<>(customerService.createNewCustomer(customer), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer> changeAddress(@PathVariable int id, @Valid @RequestBody  Address address){
        try {
            return new ResponseEntity<>(customerService.changeAddress(id, address), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}