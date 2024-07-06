package comment.controller;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import comment.DTO.CommentDTO;
import comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/comment")
@Log4j2
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    @PostMapping("/news/{newsNo}/")
    public Map<String , Long> register(@PathVariable(name = "newsNo") Long newsNo ,@RequestBody CommentDTO commentDTO){
        log.info("comment : "+commentDTO);

        Long comNo = service.register(newsNo,commentDTO);

        return Map.of("comNo", comNo);
    }
    @PostMapping("/notice/{notiNo}/")
    public Map<String, Long> registerNoticeComment(@PathVariable(name = "notiNo") Long notiNo, @RequestBody CommentDTO commentDTO) {
        log.info("New comment for notice {}: {}", notiNo, commentDTO);

        Long comNo = service.noticeRegister(notiNo, commentDTO);

        return Map.of("comNo", comNo);
    }

    @PutMapping("/{comNo}")
    public Map<String ,String >modify(@RequestBody CommentDTO commentDTO){
        log.info(commentDTO);

        service.modify(commentDTO);

        return Map.of("result", "SUCCESS");
    }

    @DeleteMapping("{comNo}")
    public Map<String ,String > remove(@PathVariable(name = "comNo") Long comNo){

        service.remove(comNo);

        return Map.of("result", "SUCCESS");
    }

    @GetMapping("/list/{newsNo}")
    public PageResponseDTO<CommentDTO> getList(PageRequestDTO pageRequestDTO, @PathVariable(name = "newsNo") long newsNo){
        log.info(pageRequestDTO);
        log.info("newsNo : "+newsNo);

        return service.list(pageRequestDTO, newsNo);
    }

    @GetMapping("/list/notice/{notiNo}")
    public PageResponseDTO<CommentDTO> getNoticeComments(PageRequestDTO pageRequestDTO, @PathVariable(name = "notiNo") Long notiNo){
    log.info(pageRequestDTO);

    return service.notiList(pageRequestDTO, notiNo);
    }

}
