package com.sorune.gttapiserver.chat.controller;

import com.sorune.gttapiserver.chat.DTO.ChatMessageDTO;
import com.sorune.gttapiserver.chat.DTO.ChatRoomDTO;
import com.sorune.gttapiserver.chat.service.ChatRoomService;
import com.sorune.gttapiserver.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/")
@Log4j2
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    @GetMapping("rooms")
    public Map<String, List<ChatRoomDTO>> getRooms(){
        return Map.of("rooms",chatRoomService.findAll());
    }

    @PostMapping(value = "room")
    public Map<String, Long> createRoom(@RequestBody ChatRoomDTO chatRoomDTO){
        log.info("Creating room {}", chatRoomDTO);
        return Map.of("roomId",chatRoomService.save(chatRoomDTO));
    }

    @GetMapping(value = "room/{roomId}")
    public Map<String, Object> getRoom(@PathVariable("roomId") Long roomId){
        log.info("Getting room {}", roomId);
        return Map.of("room",chatRoomService.findById(roomId),"roomMessages",chatService.getChatMessages(chatRoomService.findById(roomId)));
    }

    @DeleteMapping(value = "room")
    public Map<String, String> deleteRoom(@RequestParam("roomId") Long roomId){
        log.info("Deleting room {}", roomId);
        if(chatRoomService.delete(roomId)>0){
            return Map.of("result","SUCCESS");
        }
        return Map.of("result","FAIL");
    }
}
