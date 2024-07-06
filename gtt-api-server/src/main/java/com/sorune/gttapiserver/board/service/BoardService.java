package com.sorune.gttapiserver.board.service;

import com.sorune.gttapiserver.board.DTO.BoardDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;

public interface BoardService {
    Long registerBoard(BoardDTO boardDTO);

    void modifyBoard(BoardDTO boardDTO);

    void removeBoard(Long no);

    BoardDTO getById(Long no);

    PageResponseDTO<BoardDTO> getList(PageRequestDTO pageRequestDTO);

    PageResponseDTO<BoardDTO> getMyBoard(PageRequestDTO pageRequestDTO, String userId);

}
