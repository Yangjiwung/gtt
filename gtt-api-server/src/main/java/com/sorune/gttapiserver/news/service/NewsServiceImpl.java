package com.sorune.gttapiserver.news.service;

import com.sorune.gttapiserver.news.DTO.NewsDTO;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.news.entity.News;
import com.sorune.gttapiserver.news.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class NewsServiceImpl implements NewsService {

    private final ModelMapper modelMapper;
    private final NewsRepository newsRepository;

    @Override
    public Long registerNews(NewsDTO newsDTO) {
        News news = modelMapper.map(newsDTO, News.class);

        newsRepository.save(news);

        return news.getNewsNo();
    }

    @Override
    public void modifyNews(NewsDTO newsDTO) {
        News news = newsRepository.getReferenceById(newsDTO.getNewsNo());

        news.changeTitle(newsDTO.getTitle());
        news.changeContent(newsDTO.getContent());

        newsRepository.save(news);
    }

    @Override
    public void removeNews(Long no) {
        newsRepository.deleteById(no);
    }

    @Override
    public NewsDTO getById(Long no) {
        News news = newsRepository.findByNewsNo(no);

        NewsDTO newsDTO = modelMapper.map(news, NewsDTO.class);
        newsDTO.setHits(news.getHits()+1);
        newsRepository.save(modelMapper.map(newsDTO, News.class));

        return newsDTO;
    }

    @Override
    public PageResponseDTO<NewsDTO> getList(PageRequestDTO pageRequestDTO) {

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("newsNo").descending());
        Page<News> result = newsRepository.findAll(pageable);
        List<NewsDTO> dtoList = result.stream().map(news -> modelMapper.map(news, NewsDTO.class)).toList();
        dtoList.forEach(dto -> log.info(dto));
        long totalCount = result.getTotalElements();

        PageResponseDTO pageResponseDTO = PageResponseDTO.<NewsDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

        return pageResponseDTO;
    }

    @Override
    public PageResponseDTO<NewsDTO> getMyNews(PageRequestDTO pageRequestDTO, String userId) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("newsNo").descending());
        Page<News> result = newsRepository.findAllByWriter(pageable, userId);
        List<NewsDTO> dtoList = result.stream().map(news -> modelMapper.map(news, NewsDTO.class)).toList();
        dtoList.forEach(dto -> log.info(dto));
        long totalCount = result.getTotalElements();

        PageResponseDTO pageResponseDTO = PageResponseDTO.<NewsDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
        return pageResponseDTO;
    }
}
