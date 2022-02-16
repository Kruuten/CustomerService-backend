package com.kruten.backend.service;

import com.kruten.backend.entity.Address;
import com.kruten.backend.entity.Customer;
import com.kruten.backend.repository.AddressRep;
import com.kruten.backend.repository.CustomerRep;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
public class Service {
    @MockBean
    private CustomerRep customerRep;

    @MockBean
    private AddressRep addressRep;

    @InjectMocks
    private CustomerService customerService;

    private Customer customer1;
    private Customer customer2;

    @BeforeEach
    public void setUp(){
        customer1 = new Customer();
        customer1.setId(1);
        customer1.setFirstName("Anton");
        customer1.setLastName("Kruten");
        customer1.setMiddleName("Nikolaevich");
        customer1.setSex("male");
        Address customer1Address = new Address();
        customer1Address.setId(1);
        customer1Address.setCountry("RU");
        customer1Address.setRegion("MSK");
        customer1Address.setCity("MSK");
        customer1Address.setStreet("RED");
        customer1Address.setHouse("2");
        customer1Address.setFlat("1");
        customer1Address.setCreated(LocalDateTime.now());
        customer1Address.setModified(LocalDateTime.now());
        customer1Address.setActualCustomers(new ArrayList<>());
        customer1Address.setRegistredCustomers(new ArrayList<>());
        customer1.setRegistredAddress(customer1Address);
        customer1.setActualAddress(customer1Address);

        customer2 = new Customer();
        customer2.setId(1);
        customer2.setFirstName("Ivan");
        customer2.setLastName("Ivanov");
        customer2.setMiddleName("Ivanovich");
        customer2.setSex("male");
        Address customer2Address = new Address();
        customer2Address.setId(2);
        customer2Address.setCountry("RU");
        customer2Address.setRegion("NSK");
        customer2Address.setCity("NSK");
        customer2Address.setStreet("RED");
        customer2Address.setHouse("2");
        customer2Address.setFlat("1");
        customer2.setRegistredAddress(customer1Address);
        customer2.setActualAddress(customer2Address);
    }


    @Test
    void getAllCustomersTest(){
        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        Mockito.when(customerRep.findAll()).thenReturn(customers);
        Assertions.assertEquals(2, customerService.getAllCustomers().size());
    }

    @Test
    void getCustomerByIdTest(){
        int id = 1;
        Mockito.when(customerRep.findById(id)).thenReturn(Optional.ofNullable(customer1));
        Assertions.assertEquals(customer1, customerService.getCustomerById(id));
    }

    @Test
    void findByNameAndLastNameTest(){
        String name = "Anton";
        String lastName = "Kruten";
        Mockito.when(customerRep.findByFirstNameAndLastName(name, lastName))
                .thenReturn(Collections.singletonList(customer1));

        Assertions.assertEquals(customer1.getFirstName()
                , customerService.findByNameAndLastName(name, lastName)
                                 .get(0)
                                 .getFirstName());

        Assertions.assertEquals(customer1.getLastName()
                , customerService.findByNameAndLastName(name, lastName)
                                 .get(0)
                                 .getLastName());
    }

    @Test
    void createNewCustomerTest() throws Exception {
        Mockito.when(customerRep.save(customer1)).thenReturn(customer1);
        Assertions.assertEquals(customer1, customerService.createNewCustomer(customer1));
    }

    @Test
    void changeAddressTest(){
        int id = 1;
        Mockito.when(customerRep.findById(id)).thenReturn(Optional.ofNullable(customer1));
        Mockito.when(customerRep.save(customer1)).thenReturn(customer1);
        Mockito.when(addressRep.findById(id)).thenReturn(Optional.ofNullable(customer1.getActualAddress()));
        Assertions.assertEquals(customer1, customerService.changeAddress(id, customer1.getActualAddress()));
    }

}
