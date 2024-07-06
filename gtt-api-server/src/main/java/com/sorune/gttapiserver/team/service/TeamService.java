package com.sorune.gttapiserver.team.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.team.DTO.TeamDTO;

import java.util.List;

public interface TeamService {
    List<TeamDTO> getAllTeams();

    // 팀 생성
    Long registerTeam(TeamDTO teamDTO);

    // 팀 수정
    void modifyTeam(TeamDTO teamDTO);

    // 팀 삭제
    void removeTeam(Long teamNo);

    // 팀 한팀 조회
    TeamDTO getById(Long teamNo);

    // 팀 전체 조회
    PageResponseDTO<TeamDTO> getList(PageRequestDTO pageRequestDTO);

}
