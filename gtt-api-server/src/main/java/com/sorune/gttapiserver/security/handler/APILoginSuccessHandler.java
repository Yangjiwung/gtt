package com.sorune.gttapiserver.security.handler;

import com.google.gson.Gson;
import com.sorune.gttapiserver.member.DTO.MemberDTO;
import com.sorune.gttapiserver.security.jwt.JWTUtill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        MemberDTO memberDTO = (MemberDTO) authentication.getPrincipal();
        Map<String, Object> claims = memberDTO.getClaims();
        // JWT 인증서 유효기간 설정
        String accessToken = JWTUtill.generateToken(claims, 30); // 1분간 유효
        String refreshToken = JWTUtill.generateToken(claims,60); // 10분 유효

        claims.put("accessToken", accessToken);
        claims.put("refreshToken", refreshToken);
        claims.remove("password");
        claims.remove("pw");
        Gson gson = new Gson();

        String jsonStr = gson.toJson(claims);

        response.setContentType("application/json; charset=UTF-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.println(jsonStr);
        printWriter.close();
    }
}
