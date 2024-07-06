package com.sorune.gttapiserver.boardComment.controller;

import com.sorune.gttapiserver.boardComment.DTO.BoardCommentDTO;
import com.sorune.gttapiserver.boardComment.service.BoardCommentService;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/board/comment")
@Log4j2
@RequiredArgsConstructor
public class BoardCommentController {

    private final BoardCommentService service;

    @PostMapping("/{bno}/")
    public Map<String , Long> register(@PathVariable(name = "bno") Long bno ,@RequestBody BoardCommentDTO commentDTO){
        log.info("comment : "+commentDTO);

        Long comNo = service.register(bno,commentDTO);

        return Map.of("comNo", comNo);
    }

    @PutMapping("/{comNo}")
    public Map<String ,String >modify(@RequestBody BoardCommentDTO commentDTO){
        log.info(commentDTO);

        service.modify(commentDTO);

        return Map.of("result", "SUCCESS");
    }

    @DeleteMapping("{comNo}")
    public Map<String ,String > remove(@PathVariable(name = "comNo") Long comNo){

        service.remove(comNo);

        return Map.of("result", "SUCCESS");
    }

    @GetMapping("/list/{bno}")
    public PageResponseDTO<BoardCommentDTO> getList(PageRequestDTO pageRequestDTO, @PathVariable(name = "bno") long bno){
        log.info(pageRequestDTO);
        log.info("bno : "+bno);

        return service.list(pageRequestDTO, bno);
    }

}
