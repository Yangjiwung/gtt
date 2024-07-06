package com.sorune.gttapiserver.freeBoard.service;

import com.sorune.gttapiserver.board.DTO.BoardDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.freeBoard.DTO.FreeBoardDTO;

import java.util.List;

public interface FreeBoardService {
    Long registerFreeBoard(FreeBoardDTO freeBoardDTO);

    void modifyFreeBoard(FreeBoardDTO freeBoardDTO);

    void removeFreeBoard(Long no);

    FreeBoardDTO getById(Long no);

    PageResponseDTO<FreeBoardDTO> getList(PageRequestDTO pageRequestDTO);

    PageResponseDTO<FreeBoardDTO> getMyBoard(PageRequestDTO pageRequestDTO, String userId);

    List<FreeBoardDTO> hotPost();
}
