package com.sorune.gttapiserver.playerComment.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@SpringBootTest
@Log4j2
public class PlayerCommentRepositoryTests {

    @Autowired
    private PlayerCommentRepository playerCommentRepository;

    @Test
    public void selectTest(){
        Pageable pageable =
                PageRequest.of(0,10, Sort.by("playerComNo").descending());

        //Page<PlayerComment> result = playerCommentRepository.findAllByPno(pageable, 1l);

        //result.getContent().stream().forEach(comment -> log.info(comment));
    }
}
