package com.fruitshop.backend.service;

import com.fruitshop.backend.entity.Account;
import com.fruitshop.backend.repository.AuthenticationRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class TokenService {

    private final String SECRET_KEY ="nguyenthienananannananananaanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    @Autowired
    private AuthenticationRepository authenticationRepository;

    public SecretKey getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Account account){
        String token = Jwts.builder()
                .subject(account.getId() + " ")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .signWith(getSignInKey())
                .compact();
        return token;
    }

    public Claims extractAllClaims(String token){
        return Jwts.parser().
                verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token).getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver){
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public Account extractToken(String token){
        String value = extractClaim(token, Claims::getSubject);
        long id = Long.parseLong(value.trim());
        return authenticationRepository.findAccountById(id);
    }


}
