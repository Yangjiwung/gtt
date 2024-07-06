package com.sorune.gttapiserver.boardComment.service;

import com.sorune.gttapiserver.boardComment.DTO.BoardCommentDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;

public interface BoardCommentService {

    Long register(Long bno, BoardCommentDTO commentDTO); // 댓글 작성

    BoardCommentDTO get(Long comNo);

    void modify(BoardCommentDTO commentDTO);

    void remove(Long comNo);

    // 페이징 처리 된 List
    PageResponseDTO<BoardCommentDTO> list(PageRequestDTO pageRequestDTO, Long bno);
}
