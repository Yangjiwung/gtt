package com.sorune.gttapiserver.playerComment.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.playerComment.DTO.PlayerCommentDTO;

import java.util.List;

public interface PlayerCommentService {

    Long addPlayerComment(PlayerCommentDTO dto);

    void updatePlayerComment(PlayerCommentDTO dto);

    void deletePlayerComment(Long playerComNo);

    PlayerCommentDTO getPlayerComment(Long playerComNo);

//    PageResponseDTO<PlayerCommentDTO> getPlayerCommentList1(PageRequestDTO pageRequestDTO, Long pno);

    List<PlayerCommentDTO> getPlayerCommentList2(Long pno);

    Double getPlayerCommentRecomNo(Long pno);

    boolean checkCommentduplicate(Long pno, String comWriter);
}
