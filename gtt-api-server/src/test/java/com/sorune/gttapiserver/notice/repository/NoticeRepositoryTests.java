package com.sorune.gttapiserver.notice.repository;

import com.sorune.gttapiserver.notice.entity.Notice;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

@Log4j2
@SpringBootTest
public class NoticeRepositoryTests {

    @Autowired
    private NoticeRepository noticeRepository;

    @Test
    public void test1(){
        log.info("-----------------------");
        log.info(noticeRepository);
    }

    @Test
    public void testInsert(){
        for (int i = 1; i <= 100; i++){
            Notice notice =Notice.builder()
                    .title("공지사항 제목 테스트.." + i)
                    .content("공지..." + i)
                    .writer("manager"+i)
                    .build();
            noticeRepository.save(notice);
        }
    }

    @Test
    public void testRead(){

        Long notiNo = 33L;
        Optional<Notice> result = noticeRepository.findById(notiNo);
        Notice notice = result.orElseThrow();

        log.info(notice);
    }

    @Test
    public void testModify(){
        Long notiNo = 33L;
        Optional<Notice> result = noticeRepository.findById(notiNo);

        Notice notice =result.orElseThrow();
        notice.changeTitle("수정 ~");
        notice.changeContent("내용수정~");

        noticeRepository.save(notice);
    }

    @Test
    public void testDelete(){
        Long notiNo = 1L;
        noticeRepository.deleteById(notiNo);
    }

    @Test
    public void testPaging(){

        Pageable pageable= PageRequest.of(0, 10, Sort.by("notiNo").descending());

        Page<Notice> result = noticeRepository.findAll(pageable);

        log.info(result.getTotalElements());

        result.getContent().stream().forEach(notice -> log.info(notice));

    }


}
