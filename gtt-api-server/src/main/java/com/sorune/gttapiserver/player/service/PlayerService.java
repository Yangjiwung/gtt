package com.sorune.gttapiserver.player.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.news.DTO.NewsDTO;
import com.sorune.gttapiserver.player.DTO.PlayerDTO;
import com.sorune.gttapiserver.player.entity.Player;

import java.util.List;

public interface PlayerService {

    Long registerPlayer(PlayerDTO playerDTO);

    void modifyPlayer(PlayerDTO playerDTO);

    void removePlayer(Long pno);

    PlayerDTO getById(Long pno);

    PageResponseDTO<PlayerDTO> getPlayerList(PageRequestDTO pageRequestDTO);

    void updateGpa(Long pno, Double gpa);
}
