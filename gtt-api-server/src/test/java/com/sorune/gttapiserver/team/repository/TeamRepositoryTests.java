package com.sorune.gttapiserver.team.repository;

import com.sorune.gttapiserver.team.entity.Team;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class TeamRepositoryTests {

    @Autowired
    private TeamRepository teamRepository;

    @Test // 팀 생성(한 팀)
    public void insertOneTeam() {
        Team team = Team.builder()
                .teamName("한개의팀2")
                .teamImage("testImage2.jpg")
                .build();
        teamRepository.save(team);
    }

    @Test // 팀 생성(여러 개)
    public void insertTeams() {
        IntStream.rangeClosed(1, 30).forEach(i->{
            Team team = Team.builder()
                    .teamName("team name : " + i)
                    .teamImage("testImage.jpg")
                    .build();
            teamRepository.save(team);
        });
    }

    @Test // 1개의 팀 가져오기
    public void testGetTeam() {
        Long teamNo = 30L;
        Optional<Team> result = teamRepository.findById(teamNo);
        Team team = result.orElseThrow();
        log.info(team);
    }

    @Test // 30개의 팀 정보 가져오기
    public void testTeamList() {
        Pageable pageable = PageRequest.of(0, 30, Sort.by("teamNo").descending());
        Page<Team> result = teamRepository.findAll(pageable);
        log.info(result.getTotalElements());
        result.getContent().stream().forEach(team -> log.info(team));
    }

    @Test // 1개의 팀 수정하기
    public void testModifyTeam() {
        Long teamNo = 27L;
        Optional<Team> result = teamRepository.findById(teamNo);
        Team team = result.orElseThrow();
        team.changeTeamName("수정된 팀이름");
        team.changeTeamImage("수정된이미지.jpg");
        teamRepository.save(team);
    }

    @Test // 1개의 팀 삭제하기
    public void testDeleteTeam() {
        Long teamNo = 5L;
        teamRepository.deleteById(teamNo);
    }

}
