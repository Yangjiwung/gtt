package com.sorune.gttapiserver.lolAPI.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.lolAPI.DTO.ServerPlayerDTO;
import com.sorune.gttapiserver.lolAPI.entity.ServerPlayer;
import com.sorune.gttapiserver.lolAPI.repository.ServerPlayerRepository;
import com.sorune.gttapiserver.lolAPI.repository.ServerTeamRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ServerPlayerServiceImpl implements ServerPlayerService {

    private final ServerPlayerRepository playerRepository;
    private final ServerTeamRepository teamRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<ServerPlayerDTO> getPlayers(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize() -1, Sort.by("id").descending());
        Page<ServerPlayer> result = playerRepository.getAllPlayerWithAll(pageable);
        List<ServerPlayerDTO> dtoList = result.stream().map(serverPlayer -> modelMapper.map(serverPlayer, ServerPlayerDTO.class)).toList();

        long totalCount = result.getTotalElements();

        PageResponseDTO pageResponseDTO = PageResponseDTO.<ServerPlayerDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

        System.out.println(pageResponseDTO);

        return pageResponseDTO;
    }

    @Override
    public PageResponseDTO<ServerPlayerDTO> getPlayersWithTeam(PageRequestDTO pageRequestDTO, String teamImg) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize() -1, Sort.by("id").descending());
        Page<ServerPlayer> result = playerRepository.getAllPlayerWithTeam(pageable, teamImg);
        List<ServerPlayerDTO> dtoList = result.stream().map(serverPlayer -> modelMapper.map(serverPlayer, ServerPlayerDTO.class)).toList();

        long totalCount = result.getTotalElements();

        PageResponseDTO pageResponseDTO = PageResponseDTO.<ServerPlayerDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

        System.out.println(pageResponseDTO);

        return pageResponseDTO;
    }

    @Override
    public ServerPlayerDTO getPlayer(Long id) {
        ServerPlayer serverPlayer = playerRepository.findById(id).get();
        ServerPlayerDTO dto = modelMapper.map(serverPlayer, ServerPlayerDTO.class);

        return dto;
    }

    @Override
    public void updateGpa(Long id, Double gpa) {
        playerRepository.setGpa(id, gpa);
    }
}
