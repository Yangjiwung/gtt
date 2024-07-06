package com.sorune.gttapiserver.freeBoardComment.controller;

import com.sorune.gttapiserver.comment.DTO.CommentDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.freeBoardComment.DTO.FreeBoardCommentDTO;
import com.sorune.gttapiserver.freeBoardComment.service.FreeBoardCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/free/comment")
@Log4j2
@RequiredArgsConstructor
public class FreeBoardCommentController {

    private final FreeBoardCommentService service;

    @PostMapping("/{fno}/")
    public Map<String , Long> register(@PathVariable(name = "fno") Long fno ,@RequestBody FreeBoardCommentDTO commentDTO){
        log.info("comment : "+commentDTO);

        Long comNo = service.register(fno,commentDTO);

        return Map.of("comNo", comNo);
    }

    @PutMapping("/{comNo}")
    public Map<String ,String >modify(@RequestBody FreeBoardCommentDTO commentDTO){
        log.info(commentDTO);

        service.modify(commentDTO);

        return Map.of("result", "SUCCESS");
    }

    @DeleteMapping("{comNo}")
    public Map<String ,String > remove(@PathVariable(name = "comNo") Long comNo){

        service.remove(comNo);

        return Map.of("result", "SUCCESS");
    }

    @GetMapping("/list/{fno}")
    public PageResponseDTO<FreeBoardCommentDTO> getList(PageRequestDTO pageRequestDTO, @PathVariable(name = "fno") long fno){
        log.info(pageRequestDTO);
        log.info("fno : "+fno);

        return service.list(pageRequestDTO, fno);
    }

}
