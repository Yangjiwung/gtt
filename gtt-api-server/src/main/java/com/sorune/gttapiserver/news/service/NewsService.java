package com.sorune.gttapiserver.news.service;

import com.sorune.gttapiserver.news.DTO.NewsDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;

public interface NewsService {
    
    Long registerNews(NewsDTO newsDTO);

    void modifyNews(NewsDTO newsDTO);

    void removeNews(Long no);

    NewsDTO getById(Long no);

    PageResponseDTO<NewsDTO> getList(PageRequestDTO pageRequestDTO);

    PageResponseDTO<NewsDTO> getMyNews(PageRequestDTO pageRequestDTO, String userId);

}
