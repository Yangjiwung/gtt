package com.sorune.gttapiserver.freeBoard.controller;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.freeBoard.DTO.FreeBoardDTO;
import com.sorune.gttapiserver.freeBoard.service.FreeBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/free")
@RequiredArgsConstructor
@Log4j2
@PreAuthorize("permitAll()")
public class FreeBoardController {
    private final FreeBoardService boardService;
    
    @GetMapping("/list")
    public PageResponseDTO<FreeBoardDTO> list(PageRequestDTO pageRequestDTO) {
        log.info(pageRequestDTO);
        return boardService.getList(pageRequestDTO);
    }

    @GetMapping("/myPost/list")
    public PageResponseDTO<FreeBoardDTO> listMyPost(PageRequestDTO pageRequestDTO, String userId) {
        log.info(pageRequestDTO);
        return  boardService.getMyBoard(pageRequestDTO, userId);
    }

    @GetMapping("/hotPost")
    public List<FreeBoardDTO> hotPost() {
        return boardService.hotPost();
    }

    @GetMapping("/{fno}")
    public FreeBoardDTO getBoard(@PathVariable("fno") Long fno) {
        return boardService.getById(fno);
    }

    @PostMapping("/")
    public Map<String,Long> registerBoard(@RequestBody FreeBoardDTO FreeBoardDTO) {
        log.info(FreeBoardDTO);

        Long fno = boardService.registerFreeBoard(FreeBoardDTO);
        return Map.of("fno", fno);
    }

    @PutMapping("/{fno}")
    public Map<String,String> updateBoard(@PathVariable("fno") Long fno, @RequestBody FreeBoardDTO FreeBoardDTO) {
        log.info(FreeBoardDTO);
        FreeBoardDTO.setFno(fno);
        boardService.modifyFreeBoard(FreeBoardDTO);
        return Map.of("result", "SUCCESS");
    }

    @DeleteMapping("/{fno}")
    public Map<String,String> deleteBoard(@PathVariable("fno") Long fno) {
        log.info(fno);
        boardService.removeFreeBoard(fno);
        return Map.of("result", "SUCCESS");
    }
}
