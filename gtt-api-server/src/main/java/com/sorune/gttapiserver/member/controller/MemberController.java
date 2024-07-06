package com.sorune.gttapiserver.member.controller;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.common.util.CustomFileUtil;
import com.sorune.gttapiserver.member.DTO.MemberDTO;
import com.sorune.gttapiserver.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final CustomFileUtil fileUtil;

    // 회원 전체 리스트
    // @GetMapping("/list")
    // public PageResponseDTO<MemberDTO> list(PageRequestDTO pageRequestDTO) {
    //     log.info(pageRequestDTO);
    //     return memberService.memberList(pageRequestDTO);
    // }

     //pageRequest 없는 회원 리스트
    @GetMapping("/members")
    public List<MemberDTO> getAllMembers() { return memberService.getAllMembers(); }

    // 한명의 회원 조회 ㅇ
    @GetMapping("/{num}")
    public MemberDTO search(@PathVariable("num") Long num) {
        return memberService.searchMember(num);
    }

    // 회원 가입 ㅇ
    @PostMapping("/register")
    public Map<String, Long> join(@RequestBody MemberDTO memberDTO) {
        log.info(memberDTO);
        log.info("member : " + memberDTO);
        memberDTO.setPassword(passwordEncoder.encode(memberDTO.getPassword()));
        Long num = memberService.joinMember(memberDTO);

        return Map.of("memBno", num);
    }

    // 회원 수정 ㅇ
    @PutMapping("/{num}")
    public Map<String, String> edit(@PathVariable("num") Long num, @RequestBody MemberDTO memberDTO) {

        memberDTO.setNum(num);
        memberService.editMember(memberDTO);

        return Map.of("result", "SUCCESS");
    }

    // 회원수정( 일부 : nick, birth, zonCode, address, addrSub)
    @PutMapping("/partModify/{num}")
    public Map<String, String> modify(@PathVariable("num") Long num, @RequestBody MemberDTO memberDTO) {
        log.info("member : " + memberDTO);
        memberDTO.setNum(num);

        memberService.partModifyMember(memberDTO);

        return Map.of("result", "SUCCESS");
    }

    // 회원 삭제
    @DeleteMapping("/{num}")
    public Map<String, String > remove(@PathVariable("num") Long num) {

        memberService.cencelMember(num);

        return Map.of("result", "SUCCESS");
    }

    // 회원 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody MemberDTO memberDTO) {
        log.info("Login attempt for ID: {}", memberDTO.getUserId());
        // Removed logging of password for security reasons

        boolean loginSuccess = memberService.isLogin(memberDTO.getUserId(), memberDTO.getPassword());

        if (loginSuccess) {
            return ResponseEntity.ok(Map.of("result", "SUCCESS", "message", "Login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("result", "FAILURE", "message", "Invalid credentials"));
        }
    }


    // 아이디 검증
    @GetMapping("/checkId/{userId}")
    public Map<String,Object> checkId(@PathVariable String userId) {
        log.info("checkId : " + userId);
        return Map.of("message",memberService.checkId(userId));
    }

    // 닉네임 검증
    @GetMapping("/checkNick/{nick}")
    public Map<String,Object> checkNick(@PathVariable String nick) {
        log.info("checkNick : " + nick);
        return Map.of("message",memberService.checkNick(nick));
    }

    // 이메일 검증
    @GetMapping("/checkEmail/{email}")
    public Map<String, Object>  checkEmail(@PathVariable String email) {
        log.info("checkNick : " + email);
        return Map.of("message",memberService.checkEmail(email));
    }

}
