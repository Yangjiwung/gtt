package com.sorune.gttapiserver.lolAPI.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.lolAPI.DTO.ServerPlayerDTO;
import com.sorune.gttapiserver.lolAPI.DTO.ServerTeamDTO;

import java.util.List;

public interface ServerTeamService {
    List<ServerTeamDTO> getServerTeams();

    ServerTeamDTO getServerTeamById(Long id);

    ServerTeamDTO getLatestWinnerTeam();

    PageResponseDTO<ServerPlayerDTO> getPlayersWithTeam(PageRequestDTO pageRequestDTO, String teamName);
  
    List<ServerTeamDTO> getTeamsWithOutPlayers();

    ServerTeamDTO getOneTeamByName(String teamName);
}
