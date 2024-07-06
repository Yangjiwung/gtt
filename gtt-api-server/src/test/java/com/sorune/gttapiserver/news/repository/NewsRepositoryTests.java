package com.sorune.gttapiserver.news.repository;

import com.sorune.gttapiserver.news.entity.News;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class NewsRepositoryTests {

    @Autowired
    private NewsRepository newsRepository;

    @Test
    public void newsSelectTests(){
        News news = newsRepository.findByNewsNo(201L);

        System.out.println(news);
    }

    @Test
    public void newsInsertTests() {
        News news = News.builder().title("testTest").content("testTest").theTeam("T1").writer("Test").build();

        newsRepository.save(news);
    }

    @Test
    public void getTest(){
        Optional<News> result = newsRepository.findById(1L);

        News news = result.get();

        System.out.println(news);
    }
}
