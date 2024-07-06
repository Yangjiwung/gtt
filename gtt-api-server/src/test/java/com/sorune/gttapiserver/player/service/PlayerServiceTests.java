package com.sorune.gttapiserver.player.service;

import com.sorune.gttapiserver.player.DTO.PlayerDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PlayerServiceTests {

    @Autowired
    private PlayerService playerService;

    @Test
    public void playerInsertTest(){
        PlayerDTO dto = PlayerDTO.builder()
                .age(27)
                //.birthDate(LocalDateTime.of(2024, 4, 25, 0, 0))
                .nickName("dummies")
                .teamName("T1")
                .position("MID")
                .realName("DUMMIES")
                .build();

        Long pno = playerService.registerPlayer(dto);
        System.out.println(pno);
    }
}
