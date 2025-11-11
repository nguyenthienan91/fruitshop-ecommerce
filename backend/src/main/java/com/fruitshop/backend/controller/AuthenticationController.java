package com.fruitshop.backend.controller;

import com.fruitshop.backend.entity.Account;
import com.fruitshop.backend.model.request.LoginRequest;
import com.fruitshop.backend.model.response.AccountReponse;
import com.fruitshop.backend.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@SecurityRequirement(name="api")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/api/register")
    public ResponseEntity registerUser(@Valid @RequestBody Account account) {
        Account newAccount = authenticationService.register(account);
        return ResponseEntity.ok(newAccount);
    }

    @PostMapping("/api/login")
    public ResponseEntity loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        AccountReponse accountReponse = authenticationService.login(loginRequest);
        return ResponseEntity.ok(accountReponse);
    }

    @GetMapping("/api/accounts")
    public ResponseEntity getAccounts() {
        List<Account> accounts = authenticationService.getAllAccount();
        return ResponseEntity.ok(accounts);
    }



}
