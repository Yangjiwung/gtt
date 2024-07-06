package com.sorune.gttapiserver.player.repository;

import com.sorune.gttapiserver.player.entity.Player;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PlayerRepositoryTests {

    @Autowired
    private PlayerRepository playerRepository;

    @Test
    public void testInsertPlayer() {
        Player player = Player.builder()
                .age(27)
//                .birthDate(2000/02/14)
                .nickName("dummies")
                .teamName("T1")
                .position("MID")
                .realName("DUMMIES")
                .build();

        playerRepository.save(player);
    }

    @Test
    public void testSelectPlayer() {
        Player player = playerRepository.findById(1L).get();

        System.out.println(player);
    }
}
