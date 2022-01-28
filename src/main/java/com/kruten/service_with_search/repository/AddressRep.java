package com.kruten.service_with_search.repository;

import com.kruten.service_with_search.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRep extends JpaRepository<Address, Integer> {
}
