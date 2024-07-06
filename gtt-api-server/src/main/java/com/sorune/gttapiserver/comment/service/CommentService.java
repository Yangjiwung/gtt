package com.sorune.gttapiserver.comment.service;

import com.sorune.gttapiserver.comment.DTO.CommentDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.news.DTO.NewsDTO;
import com.sorune.gttapiserver.news.entity.News;

public interface CommentService {

    Long register(Long newNo, CommentDTO commentDTO); // 댓글 작성

    Long noticeRegister(Long notiNo, CommentDTO commentDTO);

    CommentDTO get(Long comNo);

    void modify(CommentDTO commentDTO);

    void remove(Long comNo);

    // 페이징 처리 된 List
    PageResponseDTO<CommentDTO> list(PageRequestDTO pageRequestDTO, Long newsNo);
    PageResponseDTO<CommentDTO> notiList(PageRequestDTO pageRequestDTO, Long notiNo);


}
