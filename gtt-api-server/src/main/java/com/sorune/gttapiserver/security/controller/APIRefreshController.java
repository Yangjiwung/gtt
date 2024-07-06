package com.sorune.gttapiserver.security.controller;

import com.sorune.gttapiserver.security.jwt.CustomJWTException;
import com.sorune.gttapiserver.security.jwt.JWTUtill;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
public class APIRefreshController {

    @RequestMapping("/api/member/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken){
        if(refreshToken == null){
            throw new CustomJWTException("NULL_REFRESH_TOKEN");
        }

        if(authHeader == null||authHeader.length()<7){
            throw new CustomJWTException("INVALID_STRING");
        }

        String accessToken = authHeader.substring(7);
        if(checkExpiredToken(accessToken)==false){
            return Map.of("access_token", accessToken, "refresh_token", refreshToken);
        }

        Map<String, Object> claims = JWTUtill.parseToken(refreshToken);
        String newAccessToken = JWTUtill.generateToken(claims,10);
        String newRefreshToken = checkTime((Integer)claims.get("exp"))==true?JWTUtill.generateToken(claims,60*24):refreshToken;
        return Map.of("access_token", newAccessToken, "refresh_token", newRefreshToken);
    }

    private boolean checkTime(Integer exp) {
        Date expDate= new Date((long)exp*1000);
        long gap = expDate.getTime() - System.currentTimeMillis();
        long leftMin = gap/(1000*60);
        return leftMin<60;
    }

    private boolean checkExpiredToken(String accessToken) {
        try {
            JWTUtill.parseToken(accessToken);
        } catch (CustomJWTException e) {
            if(e.getMessage().equals("Expired")){
                return true;
            }
        }
        return false;
    }
}
