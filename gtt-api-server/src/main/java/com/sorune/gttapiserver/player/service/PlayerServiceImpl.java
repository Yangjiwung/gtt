package com.sorune.gttapiserver.player.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;

import com.sorune.gttapiserver.player.DTO.PlayerDTO;
import com.sorune.gttapiserver.player.entity.Player;
import com.sorune.gttapiserver.player.repository.PlayerRepository;
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
public class PlayerServiceImpl implements PlayerService{

    private final ModelMapper modelMapper;
    private final PlayerRepository playerRepository;

    @Override
    public Long registerPlayer(PlayerDTO playerDTO) {
        Player player = modelMapper.map(playerDTO, Player.class);

        playerRepository.save(player);

        return player.getPno();
    }

    @Override
    public void modifyPlayer(PlayerDTO playerDTO) {
        Player player = playerRepository.getReferenceById(playerDTO.getPno());

        player.changeAge(playerDTO.getAge());
        player.changeNickName(playerDTO.getNickName());
        player.changeRealName(playerDTO.getRealName());
        player.changePosition(playerDTO.getPosition());
        player.changeBirthDate(playerDTO.getBirthDate());
        player.changeTeam(playerDTO.getTeamName());
        player.changePlayerImage(playerDTO.getPlayerImage());

        playerRepository.save(player);
    }

    @Override
    public void removePlayer(Long pno) {
        playerRepository.deleteById(pno);
    }

    @Override
    public PlayerDTO getById(Long pno) {
        Player news = playerRepository.findPlayerByPno(pno);

        PlayerDTO playerDTO = modelMapper.map(news, PlayerDTO.class);

        return playerDTO;
    }

    @Override
    public PageResponseDTO<PlayerDTO> getPlayerList(PageRequestDTO pageRequestDTO) {

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize() -1, Sort.by("pno").descending());
        Page<Player> result = playerRepository.findAllByPno(pageable);
        List<PlayerDTO> dtoList = result.stream().map(news -> modelMapper.map(news, PlayerDTO.class)).toList();

        long totalCount = result.getTotalElements();

        PageResponseDTO pageResponseDTO = PageResponseDTO.<PlayerDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

        return pageResponseDTO;
    }

    @Override
    public void updateGpa(Long pno, Double gpa) {
        playerRepository.setGpa(pno, gpa);
    }

}
