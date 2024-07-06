package com.sorune.gttapiserver.member.repository;

import com.sorune.gttapiserver.comment.entity.Comment;
import com.sorune.gttapiserver.member.DTO.MemberDTO;
import com.sorune.gttapiserver.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
@RequiredArgsConstructor
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test // 조회 태스트 - 1명
    public void testSearchMember() {
        log.info(memberRepository.findById(10L));
    }

    @Test // 회원 정보 수정 테스트 - 1명
    public void testEditMemberInfo(){

        Long memNo = 22L;

        Optional<Member> result = memberRepository.findById(memNo);
        Member member = result.orElseThrow();

        member.editMemId("user11");
        member.editMemPw("user11");
        member.editMemNick("이서준");
        member.editMemBirth(LocalDate.of(1991,3,17));
        member.editMemAddrNum("9999-9");
        member.editMemAddr("경기도 안산시 단원구");

        memberRepository.save(member);
    }

    @Test // 맴버등록 테스트 - 전체
    public void testInsertMember() {

        IntStream.rangeClosed(1, 100).forEach(i -> {

            Member member = Member.builder()
                    .userId("test" + i)
                    .password("pass" + i)
                    .nick("seojun" + i)
                    .address("오산시(" + i + ")동")
                    .zoneCode("123-" + i)
                    .birth(LocalDate.of(2021,11,18))
                    .build();

            memberRepository.save(member);
        });
    }

    @Test // 멤버 삭제 테스트 - 1명
    public void testRemoveMember() {

        Long memNo = 5L;

        memberRepository.deleteById(memNo);

    }

}
