package com.kruten.service_with_search.serviceTest;


import com.kruten.service_with_search.entity.Address;
import com.kruten.service_with_search.entity.Customer;
import com.kruten.service_with_search.repository.AddressRep;
import com.kruten.service_with_search.repository.CustomerRep;
import com.kruten.service_with_search.service.CustomerService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class CustomerServiceTest {

    @Mock
    CustomerRep customerRep;

    @Mock
    AddressRep addressRep;

    @InjectMocks
    CustomerService customerService;

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
    }

    @Test
    public void getAllCustomers() throws Exception{
        List<Customer> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);
        Mockito.when(customerRep.findAll()).thenReturn(customers);
        Assertions.assertEquals(2, customerService.getAllCustomers().size());
    }
}
