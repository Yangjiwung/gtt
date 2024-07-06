package com.sorune.gttapiserver.lolAPI.service;

import com.sorune.gttapiserver.lolAPI.DTO.ServerTournamentDTO;
import com.sorune.gttapiserver.lolAPI.entity.ServerTournament;

public interface TournamentService {
    ServerTournamentDTO getServerTournament(Long id);
}
