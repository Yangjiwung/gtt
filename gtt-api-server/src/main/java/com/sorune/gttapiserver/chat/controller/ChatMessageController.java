package com.sorune.gttapiserver.chat.controller;

import com.sorune.gttapiserver.chat.DTO.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ChatMessageController {

    private final SimpMessagingTemplate template;

    @MessageMapping(value = "/api/chat/enter")
    public void enter(ChatMessageDTO message){
        message.setMessage(message.getSender()+"님이 채팅방에 참여하였습니다.");
        log.info(message);
        template.convertAndSend("/sub/api/chat/room/"+message.getId(), message);
    }

    @MessageMapping(value = "/api/chat/message")
    public void message(ChatMessageDTO message){
        log.info(message);
        template.convertAndSend("/sub/api/chat/room/"+message.getId(), message);
    }
}
