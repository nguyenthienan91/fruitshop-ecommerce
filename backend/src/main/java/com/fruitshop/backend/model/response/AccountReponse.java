package com.fruitshop.backend.model.response;

import com.fruitshop.backend.entity.Role;
import lombok.Data;

@Data
public class AccountReponse {
    long id;
    String name;
    String email;
    String gender;
    String password;
    String phone;
    String token;
    Role role;
}
