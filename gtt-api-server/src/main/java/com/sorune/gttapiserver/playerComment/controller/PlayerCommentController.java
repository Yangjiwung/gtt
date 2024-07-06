package com.sorune.gttapiserver.playerComment.controller;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.lolAPI.repository.ServerPlayerRepository;
import com.sorune.gttapiserver.lolAPI.service.ServerPlayerService;
import com.sorune.gttapiserver.player.DTO.PlayerDTO;
import com.sorune.gttapiserver.player.service.PlayerService;
import com.sorune.gttapiserver.playerComment.DTO.PlayerCommentDTO;
import com.sorune.gttapiserver.playerComment.service.PlayerCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playercomment")
public class PlayerCommentController {

    private final PlayerCommentService playerCommentService;
    private final ServerPlayerService playerService;

    @GetMapping("/{pno}/{comWriter}")
    public boolean getOneComment(@PathVariable("comWriter") String comWriter, @PathVariable("pno") Long pno) {
        return playerCommentService.checkCommentduplicate(pno, comWriter);
    }

//    @GetMapping("/list/{pno}")
//    public PageResponseDTO<PlayerCommentDTO> getCommentList(PageRequestDTO pageRequestDTO, @PathVariable("pno") Long pno){
//        pageRequestDTO.setPage(1); // 페이징 처리 관련 문제로 막아놓음
//        return playerCommentService.getPlayerCommentList(pageRequestDTO, pno);
//    }

    @GetMapping("/list/{pno}")
    public List<PlayerCommentDTO> getCommentList(@PathVariable("pno") Long pno){
        List<PlayerCommentDTO> dtoList = playerCommentService.getPlayerCommentList2(pno);

        Double avgRecomNo = playerCommentService.getPlayerCommentRecomNo(pno);
        if (avgRecomNo != null) {
            playerService.updateGpa(pno, avgRecomNo);
        } else if (avgRecomNo == null) {
            playerService.updateGpa(pno, 0.0);
        }

        return dtoList;
    }

    @PostMapping("/")
    public Long addComment(@RequestBody PlayerCommentDTO playerCommentDTO) {
        Long comNo = playerCommentService.addPlayerComment(playerCommentDTO);

        return comNo;
    }

    @PutMapping("/{playerComNo}")
    public Map<String, String> ModifyComment(@PathVariable("playerComNo") Long playerComNo, @RequestBody PlayerCommentDTO dto){
        dto.setPlayerComNo(playerComNo);
        playerCommentService.updatePlayerComment(dto);

        return Map.of("result", "success");
    }

    @DeleteMapping("/{playerComNo}")
    public Map<String, String> DeleteComment(@PathVariable("playerComNo") Long playerComNo) {
        playerCommentService.deletePlayerComment(playerComNo);

        return Map.of("result", "success");
    }
}
