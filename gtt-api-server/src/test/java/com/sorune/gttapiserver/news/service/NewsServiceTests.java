package com.sorune.gttapiserver.news.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.news.DTO.NewsDTO;
import com.sorune.gttapiserver.notice.domain.NoticeDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class NewsServiceTests {

    @Autowired
    NewsService newsService;
    @Test
    public void testMyNews(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(1).size(10).build();

        PageResponseDTO<NewsDTO> responseDTO = newsService.getMyNews(pageRequestDTO, "ozo");
        log.info(responseDTO);
    }
}
