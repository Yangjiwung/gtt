package com.sorune.gttapiserver.news.controller;

import com.sorune.gttapiserver.common.util.CustomFileUtil;
import com.sorune.gttapiserver.files.DTO.FilesDTO;
import com.sorune.gttapiserver.news.DTO.NewsDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.news.service.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@Log4j2
public class NewsController {
    private final NewsService newsService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/list")
    public PageResponseDTO<NewsDTO> list(PageRequestDTO pageRequestDTO) {
       log.info(pageRequestDTO);
        return newsService.getList(pageRequestDTO);
    }

    @GetMapping("/myPost/list")
    public PageResponseDTO<NewsDTO> getMyNews(PageRequestDTO pageRequestDTO, String userId){
        log.info(pageRequestDTO);
        return newsService.getMyNews(pageRequestDTO, userId);
    }

    @GetMapping("/{newsno}")
    public NewsDTO getNews(@PathVariable("newsno") Long newsNo) { // 한 개의 게시물을 조화

        return newsService.getById(newsNo);
    }


    @PostMapping("/")
    public Map<String, Long> register(@RequestBody NewsDTO newsDTO) {
        log.info(newsDTO);

        List<MultipartFile> files = newsDTO.getFiles();             // NewsDTO에 있는 파일의 내용을 받아옴
        List<String> uploadFileNames = fileUtil.saveFiles(files);   // 파일의 내용 중 파일의 이름을 통해 저장한 파일의 이름을 받음
        newsDTO.setFileDTOList(uploadFileNames);                    // 파일의 이름을 다시 NewsDTO에 넣음

        Long newsNo = newsService.registerNews(newsDTO);

        return Map.of("newsNo", newsNo);
    }

    @PutMapping("/{newsNo}")
    public Map<String, String> modify(@PathVariable("newsNo") Long newsNo, @RequestBody NewsDTO newsDTO) {
        // 제목, 내용 중 하나의 값만 보내면 오류 발생

        newsDTO.setNewsNo(newsNo);

        newsService.modifyNews(newsDTO);

        return Map.of("result", "SUCCESS");
    }

    @DeleteMapping("/{newsNo}")
    public Map<String,  String> remove(@PathVariable("newsNo") Long newsNo) {
        newsService.removeNews(newsNo);

        return Map.of("result", "SUCCESS");
    }


}
