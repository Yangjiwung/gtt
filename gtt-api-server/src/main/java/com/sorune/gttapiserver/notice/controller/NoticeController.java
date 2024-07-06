package com.sorune.gttapiserver.notice.controller;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.notice.domain.NoticeDTO;
import com.sorune.gttapiserver.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping("/{notiNo}")
    public NoticeDTO get(@PathVariable(name="notiNo") Long notiNo){
        return noticeService.get(notiNo);
    }


    @GetMapping("/list")
    public PageResponseDTO<NoticeDTO> list(PageRequestDTO pageRequestDTO){

        log.info(pageRequestDTO);

        return noticeService.list(pageRequestDTO);
    }
    @GetMapping("/myPost/list")
    public PageResponseDTO<NoticeDTO> getMyPost(PageRequestDTO pageRequestDTO, String userId){
        log.info(pageRequestDTO);

        return noticeService.getMyPost(pageRequestDTO, userId);
    }

    @PostMapping("/")
    public Map<String , Long> register(@RequestBody NoticeDTO noticeDTO){
        log.info("NoticeDTO : " + noticeDTO);

        Long notiNo = noticeService.register(noticeDTO);

        return Map.of("notiNo", notiNo);
    }

    @PutMapping("/{notiNo}")
    public Map<String ,String > modify(@PathVariable(name="notiNo") Long notiNo, @RequestBody NoticeDTO noticeDTO){

        log.info(noticeDTO);
        noticeDTO.setNotiNo(notiNo); // 수정할 번호 세팅

        noticeService.modify(noticeDTO);

        return Map.of("result", "SUCCESS");
    }

    @DeleteMapping("/{notiNo}")
    public Map<String ,String > remove(@PathVariable(name = "notiNo") Long notiNo){
        noticeService.remove(notiNo);

        return Map.of("result", "SUCCESS");
    }
}
