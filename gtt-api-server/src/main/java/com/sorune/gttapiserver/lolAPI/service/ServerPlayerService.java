package com.sorune.gttapiserver.lolAPI.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.lolAPI.DTO.ServerPlayerDTO;
import com.sorune.gttapiserver.lolAPI.entity.ServerPlayer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ServerPlayerService {

    PageResponseDTO<ServerPlayerDTO> getPlayers(PageRequestDTO pageRequestDTO);

    PageResponseDTO<ServerPlayerDTO> getPlayersWithTeam(PageRequestDTO pageRequestDTO, String teamImg);

    ServerPlayerDTO getPlayer(Long id);

    void updateGpa(Long pno, Double gpa);

}
