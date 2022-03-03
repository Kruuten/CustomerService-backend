package com.kruten.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kruten.backend.entity.Address;
import com.kruten.backend.entity.Customer;
import com.kruten.backend.exception.CustomerNotFoundException;
import com.kruten.backend.service.CustomerService;
import com.sun.jdi.InternalException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(Main.class)
public class ControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
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

    @Test
    void getCustomerByIdTest() throws Exception {
        Mockito.when(customerService.getCustomerById(1)).thenReturn(customer1);
        mockMvc.perform(get("/customers/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName", hasToString("Anton")));
    }

    @Test
    void getCustomerByIdThrowExceptionTest() throws Exception {
        Mockito.when(customerService.getCustomerById(1)).thenThrow(new RuntimeException());
        mockMvc.perform(get("/customers/1"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void addNewCustomerTest() throws Exception {
        Mockito.when(customerService.createNewCustomer(customer1)).thenReturn(customer1);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        String json = objectMapper.writeValueAsString(customer1);
        mockMvc.perform(post("/customers")
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isCreated());
    }

//    @Test
//    void addNewCustomerThrowExceptionTest() throws Exception {
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.findAndRegisterModules();
//        String json = objectMapper.writeValueAsString(customer1);
//        Mockito.when(customerService.createNewCustomer(customer1)).thenThrow(new InternalException());
//        mockMvc.perform(post("/customers")
//                .content(json)
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isBadRequest());
//    }

    @Test
    void changeAddressTest() throws Exception {
        String json = new ObjectMapper().findAndRegisterModules().writeValueAsString(customer1.getActualAddress());
        Mockito.when(customerService.changeAddress(1, customer1.getActualAddress())).thenReturn(customer1);
        mockMvc.perform(put("/customers/1")
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    void changeAddressThrowExceptionTest() throws Exception {
        Mockito.when(customerService.changeAddress(1, customer1.getActualAddress())).thenThrow(new CustomerNotFoundException());
        mockMvc.perform(put("/customers/1")).andExpect(status().isBadRequest());
    }

    @Test
    void findByNameAndLastNameTest() throws Exception {
        String firstName = "Anton";
        String lastName = "Kruten";
        Mockito.when(customerService.findByNameAndLastName(firstName, lastName)).thenReturn(Collections.singletonList(customer1));

        mockMvc.perform(get("/customers/search?name=Anton&lastName=Kruten"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].firstName", contains("Anton")))
                .andExpect(jsonPath("$[*].lastName", contains("Kruten")));
    }

    @Test
    void findByNameAndLastNameThrowExceptionTest() throws Exception {
        String firstName = "Anton";
        String lastName = "Kruten";
        Mockito.when(customerService.findByNameAndLastName(firstName, lastName)).thenThrow(new CustomerNotFoundException());
        mockMvc.perform(put("/customers/search?name=Anton&lastName=Kruten")).andExpect(status().isBadRequest());
    }
}
