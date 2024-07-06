package com.sorune.gttapiserver.chat.service;

import com.sorune.gttapiserver.chat.DTO.ChatMessageDTO;
import com.sorune.gttapiserver.chat.DTO.ChatRoomDTO;

import java.util.List;

public interface ChatService {
    List<ChatMessageDTO> getChatMessages(ChatRoomDTO chatRoom);
}
