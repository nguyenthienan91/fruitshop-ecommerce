package com.fruitshop.backend.repository;

import com.fruitshop.backend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<Account, Long> {
    //phone
    Account findAccountByPhone(String phone);
    //email
    Account findAccountByEmail(String email);
    //id
    Account findAccountById(long id);

}
