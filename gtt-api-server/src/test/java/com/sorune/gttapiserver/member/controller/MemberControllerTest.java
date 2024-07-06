package com.sorune.gttapiserver.member.controller;

import com.sorune.gttapiserver.member.DTO.MemberDTO;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RequiredArgsConstructor
public class MemberControllerTest {

    @Autowired
    private final MemberController controller;

    @Test
    public void testSearchMember() {
        MemberDTO memberDTO = controller.search(20L);

        System.out.println("멤버 번호 : " + memberDTO.getNum()
                        + " 멤버 아이디 : " + memberDTO.getUserId()
                        + " 멤버 닉네임 : " + memberDTO.getNick()
                        + " 멤버 생일 : " + memberDTO.getBirth()
                        + " 멤버 우편번호 : " + memberDTO.getZoneCode()
                        + " 멤버 주소 : " + memberDTO.getAddress());
    }

}
