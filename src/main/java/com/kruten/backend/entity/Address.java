package com.kruten.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Size(max = 255)
    @Column(name = "country")
    @NotBlank
    private String country;

    @Size(max = 255)
    @Column(name = "region")
    @NotBlank
    private String region;

    @Size(max = 255)
    @Column(name = "city")
    @NotBlank
    private String city;

    @Size(max = 255)
    @Column(name = "street")
    @NotBlank
    private String street;

    @Size(max = 255)
    @Column(name = "house")
    @NotBlank
    private String house;

    @Size(max = 255)
    @Column(name = "flat")
    @NotBlank
    private String flat;

    @Column(name = "created")
    private LocalDateTime created;

    @Column(name = "modified")
    private LocalDateTime modified;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH},
    mappedBy = "registredAddress")
    private List<Customer> registredCustomers;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH},
            mappedBy = "actualAddress")
    private List<Customer> actualCustomers;

    public Address() {
    }

    public Address(String country, String region,
                   String city, String street,
                   String house, String flat, LocalDateTime created, LocalDateTime modified) {
        this.country = country;
        this.region = region;
        this.city = city;
        this.street = street;
        this.house = house;
        this.flat = flat;
        this.created = created;
        this.modified = modified;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    public String getFlat() {
        return flat;
    }

    public void setFlat(String flat) {
        this.flat = flat;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getModified() {
        return modified;
    }

    public void setModified(LocalDateTime modified) {
        this.modified = modified;
    }

    public List<Customer> getRegistredCustomers() {
        return registredCustomers;
    }

    public void setRegistredCustomers(List<Customer> registredCustomers) {
        this.registredCustomers = registredCustomers;
    }

    public List<Customer> getActualCustomers() {
        return actualCustomers;
    }

    public void setActualCustomers(List<Customer> actualCustomers) {
        this.actualCustomers = actualCustomers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(country, address.country) && Objects.equals(region, address.region) && Objects.equals(city, address.city) && Objects.equals(street, address.street) && Objects.equals(house, address.house) && Objects.equals(flat, address.flat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(country, region, city, street, house, flat);
    }
}
