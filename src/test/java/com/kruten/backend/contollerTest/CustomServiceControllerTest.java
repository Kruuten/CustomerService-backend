package com.kruten.backend.contollerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kruten.backend.entity.Address;
import com.kruten.backend.entity.Customer;
import com.kruten.backend.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;

@WebMvcTest
public class CustomServiceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    private Customer customer1;
    private Customer customer2;
    private Address address1Customer1;
    private Address address2Customer1;
    private Address address1Customer2;
    private Address address2Customer2;

    @BeforeEach
    public void setUp(){
        customer1 = new Customer();
        customer1.setId(1);
        customer1.setFirstName("Anton");
        customer1.setLastName("Kruten");
        customer1.setMiddleName("Nikolaevich");
        customer1.setSex("male");
        address1Customer1 = new Address();
        address1Customer1.setId(1);
        address1Customer1.setCountry("RU");
        address1Customer1.setRegion("MSK");
        address1Customer1.setCity("MSK");
        address1Customer1.setStreet("RED");
        address1Customer1.setHouse("2");
        address1Customer1.setFlat("1");
        address2Customer1 = address1Customer1;
        customer1.setRegistredAddress(address1Customer1);
        customer1.setActualAddress(address2Customer1);

        customer2 = new Customer();
        customer2.setId(1);
        customer2.setFirstName("Ivan");
        customer2.setLastName("Ivanov");
        customer2.setMiddleName("Ivanovich");
        customer2.setSex("male");
        address1Customer2 = new Address();
        address1Customer2.setId(2);
        address1Customer2.setCountry("RU");
        address1Customer2.setRegion("NSK");
        address1Customer2.setCity("NSK");
        address1Customer2.setStreet("RED");
        address1Customer2.setHouse("2");
        address1Customer2.setFlat("1");
        address2Customer2 = address1Customer2;
        customer1.setRegistredAddress(address1Customer1);
        customer1.setActualAddress(address2Customer1);
    }


    @Test
    void getAllcustomersTest() throws Exception {
        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        Mockito.when(customerService.getAllCustomers()).thenReturn(customers);

        mockMvc.perform(MockMvcRequestBuilders.get("/customers"))
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    void createNewCustomerTest() throws Exception{
        Mockito.when(customerService.createNewCustomer(customer1)).thenReturn(customer1);

        String json = new ObjectMapper().writeValueAsString(customer1);

        mockMvc.perform(MockMvcRequestBuilders.post("/customers").content(json)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void findByNameAndLastNameTest() throws Exception {
        Mockito.when(customerService.findByNameAndLastName("Ivan", "Ivanov"))
                .thenReturn(Collections.singletonList(customer2));

        String json = new ObjectMapper().writeValueAsString(customer2);

        mockMvc.perform(MockMvcRequestBuilders.get("/customers/search?name=Ivan&lastName=Ivanov")
                .content(json)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }
}
