package com.sorune.gttapiserver.player.controller;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.player.DTO.PlayerDTO;
import com.sorune.gttapiserver.player.service.PlayerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/player")
@Log4j2
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/{pno}")
    public PlayerDTO getPlayer(@PathVariable("pno") Long pno) {
        PlayerDTO playerDTO = playerService.getById(pno);
        log.info(playerDTO.getBirthDate());

        return playerDTO;
    }

    @GetMapping("/list")
    public PageResponseDTO<PlayerDTO> list(PageRequestDTO pageRequestDTO) {
        return playerService.getPlayerList(pageRequestDTO);
    }

    @PostMapping("/")
    public Map<String, Long> register(@RequestBody PlayerDTO playerDTO) {
        Long pno = playerService.registerPlayer(playerDTO);

        return Map.of("pno", pno);
    }

    @PutMapping("/{pno}")
    public Map<String, String> modify(@PathVariable("pno") Long pno, @RequestBody PlayerDTO playerDTO) {
        playerDTO.setPno(pno);

        playerService.modifyPlayer(playerDTO);

        return Map.of("result", "SUCCESS");
    }

    @DeleteMapping("/{pno}")
    public Map<String, String> remove(@PathVariable("pno") Long pno) {
        playerService.removePlayer(pno);

        return Map.of("result", "SUCCESS");
    }
}
