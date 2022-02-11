package com.kruten.service_with_search.repository;

import com.kruten.service_with_search.entity.Address;
import com.kruten.service_with_search.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRep extends JpaRepository<Customer, Integer> {
    public List<Customer> findByFirstNameAndLastName(String firstName, String lastName);
    Customer findByFirstNameAndLastNameAndMiddleNameAndSexAndRegistredAddress_IdAndActualAddress_Id(String firstName,
                                                                                                    String lastName,
                                                                                                    String middleName,
                                                                                                    String sex,
                                                                                                    int reg_Id,
                                                                                                    int act_id);
}
