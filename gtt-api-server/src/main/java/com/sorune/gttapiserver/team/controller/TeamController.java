package com.sorune.gttapiserver.team.controller;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.common.util.CustomFileUtil;
import com.sorune.gttapiserver.files.Entity.Files;
import com.sorune.gttapiserver.team.DTO.TeamDTO;
import com.sorune.gttapiserver.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController  // REST API 처리 컨트롤러로 사용
@RequestMapping("/api/team")  // 이 컨트롤러의 모든 요청 URL은 '/api/team'으로 시작
@RequiredArgsConstructor  // 필요한 의존성 주입을 위한 생성자를 자동으로 만들어줌
@Log4j2  // 로깅을 위한 준비 log4j2 사용
public class TeamController {

    private final TeamService teamService;  // 팀 서비스 의존성 주입
    private final CustomFileUtil fileUtil;  // 파일 유틸리티 의존성 주입

    // 팀 생성 ㅇ
    @PostMapping("/")
    public Map<String, Long> createTeam(@RequestBody TeamDTO teamDTO) {
        log.info(teamDTO);  // 받아온 TeamDTO를 로그에 기록
        Long teamNo = teamService.registerTeam(teamDTO);  // 팀 등록하고 팀 번호 받아옴
        return Map.of("result", teamNo);               // 팀 번호를 결과로 반환
    }

    // 팀 조회 - 한 팀 ㅇ
    @GetMapping("/{teamNo}")
    public TeamDTO readOneTeam(@PathVariable("teamNo") Long teamNo) {
        return teamService.getById(teamNo);  // teamNo를 이용해 팀 정보 조회하고 결과 반환
    }

    // 팀 조회 - 전체 ㅇ
    @GetMapping("/list")
    public PageResponseDTO<TeamDTO> readAllTeam(PageRequestDTO pageRequestDTO) {
        log.info(pageRequestDTO);  // 받아온 페이지 요청 정보를 로그에 기록
        return teamService.getList(pageRequestDTO);  // 전체 팀 목록 페이지로 조회해서 반환
    }

    // 팀 수정 - 한 팀 ㅇ
    @PutMapping("/{teamNo}")
    public Map<String, String> updateTeam(@PathVariable("teamNo") Long teamNo, @RequestBody TeamDTO teamDTO) {
        teamDTO.setTeamNo(teamNo);          // URL에서 받아온 팀 번호를 DTO에 설정
        teamService.modifyTeam(teamDTO);    // 팀 정보 수정
        return Map.of("result", "SUCCESS");  // 수정 성공 메시지 반환
    }

    // 팀 삭제 - 한 팀 ㅇ
    @DeleteMapping("/{teamNo}")
    public Map<String, String> deleteTeam(@PathVariable("teamNo") Long teamNo) {
        teamService.removeTeam(teamNo);  // 주어진 팀 번호로 팀 삭제
        return Map.of("result", "SUCCESS");  // 삭제 성공 메시지 반환
    }

    @GetMapping("/teams")
    public List<TeamDTO> readAllTeams() {
        return teamService.getAllTeams();
    }
}
