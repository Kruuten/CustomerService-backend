package com.kruten.backend.controller;

import com.kruten.backend.entity.Address;
import com.kruten.backend.entity.Customer;
import com.kruten.backend.service.CustomerService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.UncheckedIOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(Main.class)
public class Controller {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    @InjectMocks
    Main controller;

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
    void getAllCustomersTest() throws Exception {

        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        Mockito.when(customerService.getAllCustomers()).thenReturn(customers);
        mockMvc.perform(get("/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[*].firstName", containsInAnyOrder("Anton", "Ivan")));
    }

    @Test
    void getAllCustomersThrowExceptionTest() throws Exception {
        Mockito.when(customerService.getAllCustomers()).thenThrow(new RuntimeException());
        mockMvc.perform(get("/customers"))
                .andExpect(status().isInternalServerError());
    }
}
