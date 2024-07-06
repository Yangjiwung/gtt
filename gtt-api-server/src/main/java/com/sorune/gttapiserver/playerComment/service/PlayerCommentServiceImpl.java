package com.sorune.gttapiserver.playerComment.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.player.DTO.PlayerDTO;
import com.sorune.gttapiserver.player.entity.Player;
import com.sorune.gttapiserver.playerComment.DTO.PlayerCommentDTO;
import com.sorune.gttapiserver.playerComment.entity.PlayerComment;
import com.sorune.gttapiserver.playerComment.repository.PlayerCommentRepository;
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
public class PlayerCommentServiceImpl implements PlayerCommentService {

    private final PlayerCommentRepository playerCommentRepository;
    private final ModelMapper modelMapper;


    @Override
    public Long addPlayerComment(PlayerCommentDTO dto) {
        PlayerComment pComment = modelMapper.map(dto, PlayerComment.class);

        playerCommentRepository.save(pComment);

        return pComment.getPlayerComNo();
    }

    @Override
    public void updatePlayerComment(PlayerCommentDTO dto) {
        PlayerComment pComment = playerCommentRepository.findById(dto.getPlayerComNo()).get();

        pComment.changeComment(dto.getComment());
        pComment.changeRecomNo(dto.getRecomNo());

        playerCommentRepository.save(pComment);
    }

    @Override
    public void deletePlayerComment(Long playerComNo) {
        playerCommentRepository.deleteById(playerComNo);
    }

    @Override
    public PlayerCommentDTO getPlayerComment(Long playerComNo) {
        PlayerComment pCommnet = playerCommentRepository.findById(playerComNo).get();

        PlayerCommentDTO dto = modelMapper.map(pCommnet, PlayerCommentDTO.class);

        return dto;
    }

//    @Override
//    public PageResponseDTO<PlayerCommentDTO> getPlayerCommentList1(PageRequestDTO pageRequestDTO, Long pno) {
//        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("playerComNo").descending());
//
//        Page<PlayerComment> result = playerCommentRepository.findAllByPnoOrderByPlayerComNo(pageable, pno);
//
//        List<PlayerCommentDTO> dtoList = result.stream().map(playerComment -> modelMapper.map(playerComment, PlayerCommentDTO.class)).toList();
//
//        long totalCount = result.getTotalElements();
//
//        PageResponseDTO pageResponseDTO = PageResponseDTO.<PlayerCommentDTO>withAll()
//                .dtoList(dtoList)
//                .pageRequestDTO(pageRequestDTO)
//                .totalCount(totalCount)
//                .build();
//
//        return pageResponseDTO;
//    }

    @Override
    public List<PlayerCommentDTO> getPlayerCommentList2(Long pno) {
        List<PlayerComment> result = playerCommentRepository.findAllByPnoOrderByPlayerComNo(pno);

        List<PlayerCommentDTO> dtoList = result.stream().map(playerComment -> modelMapper.map(playerComment, PlayerCommentDTO.class)).toList();

        return dtoList;
    }

    @Override
    public Double getPlayerCommentRecomNo(Long pno) {
        Double result = playerCommentRepository.meanOfRecomNoByPno(pno);

        return result;
    }

    @Override
    public boolean checkCommentduplicate(Long pno, String comWriter) {
        return playerCommentRepository.existsByPnoAndComWriter(pno, comWriter);
    }
}
