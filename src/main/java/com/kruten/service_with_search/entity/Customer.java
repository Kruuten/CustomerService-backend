package com.kruten.service_with_search.entity;

import javax.persistence.*;
import javax.validation.constraints.*;


@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.PERSIST,
            CascadeType.REFRESH, CascadeType.REMOVE, CascadeType.MERGE})
    @JoinColumn(name = "registred_address_id")
    private Address registredAddress;

    @NotNull
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.PERSIST,
            CascadeType.REFRESH, CascadeType.REMOVE, CascadeType.MERGE})
    @JoinColumn(name = "actual_address_id")
    private Address actualAddress;

    @Size(max = 255)
    @Column(name = "first_name")
    @NotBlank
    private String firstName;

    @Size(max = 255)
    @Column(name = "last_name")
    @NotBlank
    private String lastName;

    @Size(max = 255)
    @Column(name = "middle_name")
    @NotBlank
    private String middleName;

    @Size(max = 6)
    @Pattern(regexp = "^(?:male|female)$")
    @Column(name = "sex")
    private String sex;

    public Customer() {
    }

    public Customer(Address address, String firstName, String lastName, String middleName, String sex) {
        this.actualAddress = address;
        this.registredAddress = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.sex = sex;
    }

    public Customer(Address registredAddress, Address actualAddress,
                    String firstName, String lastName, String middleName, String sex) {
        this.registredAddress = registredAddress;
        this.actualAddress = actualAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.sex = sex;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Address getRegistredAddress() {
        return registredAddress;
    }

    public void setRegistredAddress(Address registredAddress) {
        this.registredAddress = registredAddress;
    }

    public Address getActualAddress() {
        return actualAddress;
    }

    public void setActualAddress(Address actualAddress) {
        this.actualAddress = actualAddress;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

}
