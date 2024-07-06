package com.sorune.gttapiserver.security.filter;

import com.google.gson.Gson;
import com.sorune.gttapiserver.member.DTO.MemberDTO;
import com.sorune.gttapiserver.member.entity.Member;
import com.sorune.gttapiserver.member.entity.MemberRole;
import com.sorune.gttapiserver.security.jwt.JWTUtill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        if(request.getMethod().equals("OPTIONS")) { return true; }

        String path = request.getRequestURI();

        if (path.startsWith("/api/member/")) { return true;}
        if (path.startsWith("/api/news/list")) { return true;}
        if (path.startsWith("/api/**/list/")) { return true;}

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeaderString = request.getHeader("Authorization");

        try {
            String accessToken = authHeaderString.substring(7);
            Map<String,Object> claims = JWTUtill.parseToken(accessToken);

            log.info("JWT.claims : "+claims);
            Long num = Long.parseLong(claims.get("num").toString());
            String email = (String) claims.get("email");
            String pw = (String) claims.get("pw");
            String nick = (String) claims.get("nick");
            boolean enabled = (boolean) claims.get("enabled");
            String phone = (String) claims.get("phone");
            String userId = (String) claims.get("userId");
            String zoneCode = (String) claims.get("zoneCode");
            String address = (String) claims.get("address");
            String addrSub = (String) claims.get("addrSub");
            LocalDate birth = LocalDate.parse((String)claims.get("birth"));
            log.info("JWT.claims.roles : "+claims.get("roles"));
            List<MemberRole> roles = ((List<String>) claims.get("roles")).stream().map(claim->Member.convertStringToMemberRole(claim)).filter(Objects::nonNull).collect(Collectors.toList());
            log.info(userId,pw,nick,enabled,roles,phone);
// MemberDTO 생성
            MemberDTO memberDTO = new MemberDTO(num,enabled, nick, userId, zoneCode, address, addrSub, email, phone, birth, pw, roles);
            log.info("memberDTO : " + memberDTO);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO,pw,memberDTO.getAuthorities());
            log.info("authenticationToken : "+authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            /*log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();*/

            filterChain.doFilter(request, response);
        }
    }
}
