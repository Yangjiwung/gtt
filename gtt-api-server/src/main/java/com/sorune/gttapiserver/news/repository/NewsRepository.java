package com.sorune.gttapiserver.news.repository;

import com.sorune.gttapiserver.news.DTO.NewsDTO;
import com.sorune.gttapiserver.news.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface NewsRepository extends JpaRepository<News, Long>{

    @Query("SELECT n FROM News n  WHERE n.newsNo=:newsNo")
    News findByNewsNo(@Param("newsNo") Long newsNo);

    @Query("SELECT count(newsNo) FROM News WHERE newsNo > 0 ")
    Long countByNewsNo();

    Page<News> findAllByWriter(Pageable pageable, String userId);

}
