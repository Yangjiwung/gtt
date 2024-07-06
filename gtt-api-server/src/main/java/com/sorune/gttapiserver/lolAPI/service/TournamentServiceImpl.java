package com.sorune.gttapiserver.lolAPI.service;

import com.sorune.gttapiserver.lolAPI.DTO.ServerTournamentDTO;
import com.sorune.gttapiserver.lolAPI.entity.ServerTournament;
import com.sorune.gttapiserver.lolAPI.repository.ServerTournamentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TournamentServiceImpl implements TournamentService {
    private final ModelMapper modelMapper;
    private final ServerTournamentRepository serverTournamentRepository;
    @Override
    public ServerTournamentDTO getServerTournament(Long id) {
        return modelMapper.map(serverTournamentRepository.findById(id).get(), ServerTournamentDTO.class);
    }
}
