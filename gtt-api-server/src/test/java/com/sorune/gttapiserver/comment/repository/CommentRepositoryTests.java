package com.sorune.gttapiserver.comment.repository;

import com.sorune.gttapiserver.comment.entity.Comment;
import com.sorune.gttapiserver.news.entity.News;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class CommentRepositoryTests {

    @Autowired
    private CommentRepository commentRepository;

    @Test
    public void insertComment(){

        IntStream.rangeClosed(1,30).forEach(i->{

            long newsNo = 35;
            News news = News.builder().newsNo(newsNo).build();

            Comment comment = Comment.builder()
                    .content("comment test.....")
                    .writer("user00")
                    .newsNo(news.getNewsNo())
                    .build();
            commentRepository.save(comment);


        });

    }


    @Test // 1개의 코멘트 가져오기 테스트
    public void testReadComment(){

        Long newNo = 33L;

        Optional<Comment> result = commentRepository.findById(newNo);

        Comment comment = result.orElseThrow();

        log.info(comment);
    }

    @Test
    public void testModifyComment(){

        Long comNo = 33L;

        Optional<Comment> result = commentRepository.findById(comNo);
        Comment comment = result.orElseThrow();

        comment.changeContent("수정한 코멘트...");

        commentRepository.save(comment);
    }

    @Test
    public void deleteComment(){

        Long comNo = 1L;

        commentRepository.deleteById(comNo);
    }

    @Test
    public void testPaging(){

        Pageable pageable =
                PageRequest.of(0,10, Sort.by("comNo").descending());

        Page<Comment> result = commentRepository.findAll(pageable);
        log.info(result.getTotalElements());

        result.getContent().stream().forEach(comment -> log.info(comment));
    }


}
