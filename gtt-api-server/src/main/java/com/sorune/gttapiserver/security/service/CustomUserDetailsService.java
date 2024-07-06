package com.sorune.gttapiserver.security.service;

import com.sorune.gttapiserver.member.DTO.MemberDTO;
import com.sorune.gttapiserver.member.entity.Member;
import com.sorune.gttapiserver.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        log.info("loadUserByUsername : " + userId );
        Member member = memberRepository.getWithRoles(userId);
        log.info("loadUserByUsername:{}", member);
        if (member == null) {
            throw new UsernameNotFoundException(userId);
        }
        MemberDTO memberDTO = new MemberDTO(
                member.getNum(),
                member.isEnabled(),
                member.getNick(),
                member.getUserId(),
                member.getZoneCode(),
                member.getAddress(),
                member.getAddrSub(),
                member.getEmail(),
                member.getPhone(),
                member.getBirth(),
                member.getPassword(),
                member.getRoles()
        );
        log.info("loadUserByUsername:{}", memberDTO);
        return memberDTO;
    }
}
