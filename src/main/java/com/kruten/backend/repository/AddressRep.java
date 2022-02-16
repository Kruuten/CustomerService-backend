package com.kruten.backend.repository;

import com.kruten.backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRep extends JpaRepository<Address, Integer> {
    Address findByCountryAndRegionAndCityAndStreetAndHouseAndFlat(String country, String region, String city,
                                                                         String street, String house, String flat);
}
