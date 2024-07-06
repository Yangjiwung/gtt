package com.sorune.gttapiserver.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.springframework.data.util.Lazy.of;

@SpringBootTest
@RequiredArgsConstructor
@Log4j2
public class MemberServiceTest {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private MemberService memberService;

    /*@Test // 한명의 회원정보 등록
    public void testMemberInsert(){
        MemberDTO memberDTO = new MemberDTO(true,"testUser","test1234","1","1","1","test@gmail.com","010-1234-5678",LocalDate.now(),encoder.encode("1234"),Set.of(MemberRole.ROLE_USER));
        log.info(memberDTO.toString());
        Long memNum = memberService.joinMember(memberDTO);
        System.out.println(memNum);
    }*/

    /*@Test // 한명의 회원정보 수정
    public void testMemberModify() {
        MemberDTO memberDTO = MemberDTO.builder()
                .num(1L)
                .userId("dddd")
                .pw("dddd")
                .zoneCode("123456")
                .address("mem12345")
                .nick("user1Nick")
                .birth(LocalDate.of(1881,9,9))
                .build();
        Long memNum = memberService.editMember(memberDTO);
        System.out.println(memNum);
    }

    @Test // 한명의 회원정보 삭제
    public void testMemberRemove() {
        Long memNo = 6L;
        memberService.cencelMember(memNo);
    }

    @Test // 한명의 회원정보 조회
    public void testMemberSearch() {
        Long memNo = 99L;
        log.info(memberService.searchMember(memNo));
    }*/
}
