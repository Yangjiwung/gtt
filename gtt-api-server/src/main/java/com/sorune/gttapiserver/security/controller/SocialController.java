package com.sorune.gttapiserver.security.controller;

import com.sorune.gttapiserver.member.DTO.MemberDTO;
import com.sorune.gttapiserver.member.service.MemberService;
import com.sorune.gttapiserver.security.jwt.JWTUtill;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {
    private final MemberService memberService;

    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken){
        log.info(accessToken);
        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);

        Map<String,Object> claims = memberDTO.getClaims();

        String jwtAcessToken = JWTUtill.generateToken(claims,10);
        String jwtRefreshToken = JWTUtill.generateToken(claims,60*24);

        claims.put("accessToken",jwtAcessToken);
        claims.put("refreshToken",jwtRefreshToken);
        return claims;
    }
}
