package com.fruitshop.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter

public class Account implements UserDetails {
    @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @NotEmpty(message="Name cannot be empty!")
    String name;

    @NotEmpty(message="Password cannot be empty!")
    String password;

    @NotEmpty(message="Email cannot be empty!")
    @Email(message="Email format is invalid!")
    String email;

    @NotEmpty(message="Phone cannot be empty!")
    @Pattern(
            regexp = "^(03|05|07|08|09|012|016|018|019)[0-9]{8}$",
            message = "Phone number is invalid!"
    )
    String phone;
    @NotEmpty(message="address cannot empty!")
    String address;
    String imageUrl;
    @Pattern(
            regexp="^(male|female)$",
            message="Gender must be male or female"
    )
    String gender;

    @Past(message="Date of birth must be in the past!")
    Date dateOfbirth;
    Date createdAt;
    Date updatedAt;
    Role role = Role.CUSTOMER;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // nói cho spring security phân biệt user đang ở role nào
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getUsername() {
        return this.getPhone();
    }
}
