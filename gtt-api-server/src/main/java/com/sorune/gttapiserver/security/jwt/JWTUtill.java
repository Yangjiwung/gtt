package com.sorune.gttapiserver.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sorune.gttapiserver.member.entity.MemberRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@Component
public class JWTUtill {
    private static String key ="123456789123456789412345678941234597891234567891232465498";
    private static ObjectMapper objectMapper;

    @Autowired
    public JWTUtill(ObjectMapper objectMapper) {
        JWTUtill.objectMapper = objectMapper;
    }

    public static String generateToken(Map<String, Object> claims,int min) {
        SecretKey key = null;

        try {
            key = Keys.hmacShaKeyFor(JWTUtill.key.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e.getMessage());
        }
        log.info("claims:" + claims);
        // LocalDate를 문자열로 변환하여 claims 맵에 추가
        if(claims.get("birth")!=null){
            String birthDateStr = claims.get("birth").toString();
            claims.put("birth", birthDateStr);
        }
        /*Set<MemberRole> roles = (Set<MemberRole>)claims.get("roles");
        Set<String> roleStrings = roles.stream()
                .map(MemberRole::name)
                .collect(Collectors.toSet());
        claims.put("roles", roleStrings);*/
        return Jwts.builder()
                .setHeader(Map.of("type","JWT"))
                .setClaims(claims)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(key)
                .compact();
    }

    public static Map<String, Object> parseToken(String token) {
        Map<String, Object> claims = new HashMap<>();

        SecretKey key = null;
        try {
            key = Keys.hmacShaKeyFor(JWTUtill.key.getBytes("UTF-8"));
            claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (MalformedJwtException e) {
            throw new CustomJWTException("MalFormed");
        } catch (ExpiredJwtException e) {
            throw new CustomJWTException("Expired");
        } catch (InvalidClaimException e) {
            throw new CustomJWTException("Invalid");
        } catch (JwtException e) {
            throw new CustomJWTException("JwtException");
        } catch (Exception e){
            throw new CustomJWTException("Error");
        }

        return claims;
    }

    public static Claims getClaimsFromAccessToken(String accessToken) {
        return null;
    }
}
