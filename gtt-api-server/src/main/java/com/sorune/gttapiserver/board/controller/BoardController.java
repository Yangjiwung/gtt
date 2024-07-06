package com.sorune.gttapiserver.board.controller;

import com.sorune.gttapiserver.board.DTO.BoardDTO;
import com.sorune.gttapiserver.board.service.BoardService;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.common.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/board/")
@RequiredArgsConstructor
@Log4j2
public class BoardController {
    private final BoardService boardService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/list")
    public PageResponseDTO<BoardDTO> list(PageRequestDTO pageRequestDTO) {
        log.info(pageRequestDTO);
        return boardService.getList(pageRequestDTO);
    }

    @GetMapping("/myPost/list")
    public PageResponseDTO<BoardDTO> listMyPost(PageRequestDTO pageRequestDTO, String userId) {
        log.info(pageRequestDTO);
        return  boardService.getMyBoard(pageRequestDTO, userId);
    }

    @GetMapping("/{bno}")
    public BoardDTO getBoard(@PathVariable("bno") Long bno) {
        return boardService.getById(bno);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_MANAGER','ROLE_ADMIN')")
    @PostMapping("/")
    public Map<String,Long> registerBoard(@RequestBody BoardDTO boardDTO) {
        log.info(boardDTO);

        Long bno = boardService.registerBoard(boardDTO);
        return Map.of("bno", bno);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_MANAGER','ROLE_ADMIN')")
    @PutMapping("/{bno}")
    public Map<String,String> updateBoard(@PathVariable("bno") Long bno, @RequestBody BoardDTO boardDTO) {
        log.info(boardDTO);
        boardDTO.setBno(bno);
        boardService.modifyBoard(boardDTO);
        return Map.of("result", "SUCCESS");
    }

    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_MANAGER','ROLE_ADMIN')")
    @DeleteMapping("/{bno}")
    public Map<String,String> deleteBoard(@PathVariable("bno") Long bno) {
        log.info(bno);
        boardService.removeBoard(bno);
        return Map.of("result", "SUCCESS");
    }
}
