package com.sorune.gttapiserver.freeBoardComment.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.freeBoardComment.DTO.FreeBoardCommentDTO;

public interface FreeBoardCommentService {

    Long register(Long fno, FreeBoardCommentDTO commentDTO); // 댓글 작성

    FreeBoardCommentDTO get(Long comNo);

    void modify(FreeBoardCommentDTO commentDTO);

    void remove(Long comNo);

    // 페이징 처리 된 List
    PageResponseDTO<FreeBoardCommentDTO> list(PageRequestDTO pageRequestDTO, Long fno);
}
