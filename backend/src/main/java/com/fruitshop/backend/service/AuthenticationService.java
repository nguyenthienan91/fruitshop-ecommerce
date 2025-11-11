package com.fruitshop.backend.service;

import com.fruitshop.backend.entity.Account;
import com.fruitshop.backend.model.request.LoginRequest;
import com.fruitshop.backend.model.response.AccountReponse;
import com.fruitshop.backend.repository.AuthenticationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private TokenService tokenService;


    public Account register(Account account){
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return authenticationRepository.save(account);
    }

    public AccountReponse login(LoginRequest loginRequest){
        Authentication authentication = null;
        authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getPhone(), loginRequest.getPassword()));
        Account account = (Account) authentication.getPrincipal();
        AccountReponse accountReponse = modelMapper.map(account, AccountReponse.class);
        String token = tokenService.generateToken(account);
        accountReponse.setToken(token);
        return accountReponse;
    }

    public List<Account> getAllAccount(){
        List<Account> accounts = authenticationRepository.findAll();
        return accounts;
    }

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        return authenticationRepository.findAccountByPhone(phone);
    }
}
