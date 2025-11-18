package com.fruitshop.backend.controller;

import com.fruitshop.backend.entity.Account;
import com.fruitshop.backend.model.request.LoginRequest;
import com.fruitshop.backend.model.request.UpdatePasswordRequest;
import com.fruitshop.backend.model.response.AccountReponse;
import com.fruitshop.backend.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/api/account/current")
    public ResponseEntity getCurrentAccount() {
        Account account = authenticationService.getCurrentAccount();
        return ResponseEntity.ok(account);
    }

    @PostMapping("/api/update-password")
    public ResponseEntity updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        AccountReponse account = authenticationService.updatePassword(updatePasswordRequest);
        return ResponseEntity.ok(account);
    }

    @PostMapping("/api/logout")
    public ResponseEntity<Map<String, String>> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successfully");
        return ResponseEntity.ok(response);
    }
}
