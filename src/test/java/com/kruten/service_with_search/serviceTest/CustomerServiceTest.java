package com.kruten.service_with_search.serviceTest;


import com.kruten.service_with_search.entity.Address;
import com.kruten.service_with_search.entity.Customer;
import com.kruten.service_with_search.repository.AddressRep;
import com.kruten.service_with_search.repository.CustomerRep;
import com.kruten.service_with_search.service.CustomerService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;


import java.util.Arrays;
import java.util.List;

public class CustomerServiceTest {
    @TestConfiguration
    static class CustomerServiceTestContextConfiguration{
        @Bean
        public CustomerService customerService(){
            return new CustomerService();
        }
    }

    @Autowired
    private CustomerService customerService;

    @MockBean
    private CustomerRep customerRep;
    @MockBean
    private AddressRep addressRep;

    private Customer customer1;
    private Customer customer2;
    private Address address1;
    private Address address2;

    @BeforeEach
    public void setup(){
        address1 = new Address();
        address2 = new Address();
        address1.setId(1);
        address2.setId(2);

        customer1 = new Customer();
        customer2 = new Customer();

        customer1.setId(1);
        customer1.setFirstName("Anton");
        customer1.setLastName("Kruten");
        customer1.setMiddleName("Nikolaevich");
        customer1.setSex("male");
        customer1.setRegistredAddress(address1);
        customer1.setActualAddress(address1);

        customer2.setId(2);
        customer2.setFirstName("Anna");
        customer2.setLastName("Kruten");
        customer2.setMiddleName("Olegovna");
        customer2.setSex("female");
        customer2.setRegistredAddress(address2);
        customer2.setActualAddress(address2);

        Mockito.when(customerRep.findAll()).thenReturn(Arrays.asList(customer1, customer2));
    }

    @Test
    public void getAllCustomers() throws Exception{
        List<Customer> expected = Arrays.asList(customer1, customer2);
        List<Customer> result = customerService.getAllCustomers();
        Assertions.assertThat(result).isEqualTo(expected);
    }
}
