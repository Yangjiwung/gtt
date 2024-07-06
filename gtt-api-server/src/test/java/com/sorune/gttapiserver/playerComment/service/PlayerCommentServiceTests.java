package com.sorune.gttapiserver.playerComment.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.playerComment.DTO.PlayerCommentDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class PlayerCommentServiceTests {

    @Autowired
    private PlayerCommentService pCService;

    @Test
    public void commentInsertTest(){
        PlayerCommentDTO dto = PlayerCommentDTO.builder()
                .pno(1l)
                .comment("최고상혁")
                .recomNo(4l)
                .comWriter("user100")
                .build();

        Long pno = pCService.addPlayerComment(dto);
        System.out.println(pno);
    }

    @Test
    public void commentSelectTests(){
        PageRequestDTO req = PageRequestDTO.builder().page(1).size(10).build();

        //PageResponseDTO<PlayerCommentDTO> dto = pCService.getPlayerCommentList1(req, 1l);

        //log.info(dto.toString());
    }

    @Test
    public void commentOneSelectTests () {
        PlayerCommentDTO dto = pCService.getPlayerComment(1l);

        log.info(dto.toString());
    }
}
