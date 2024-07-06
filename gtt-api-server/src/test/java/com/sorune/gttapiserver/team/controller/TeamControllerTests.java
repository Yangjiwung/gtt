package com.sorune.gttapiserver.team.controller;

import com.sorune.gttapiserver.team.DTO.TeamDTO;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RequiredArgsConstructor
public class TeamControllerTests {

    @Autowired
    private final TeamController controller;

    @Test // 한팀 검색 테스트
    public void testReadOneTeam() {
        TeamDTO teamDTO = controller.readOneTeam(10L);
        System.out.println(teamDTO.getTeamNo() + teamDTO.getTeamName() + teamDTO.getTeamImage());
    }

}
