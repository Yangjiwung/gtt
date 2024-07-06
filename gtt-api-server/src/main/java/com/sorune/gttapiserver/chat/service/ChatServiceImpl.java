package com.sorune.gttapiserver.chat.service;

import com.sorune.gttapiserver.chat.DTO.ChatMessageDTO;
import com.sorune.gttapiserver.chat.DTO.ChatRoomDTO;
import com.sorune.gttapiserver.chat.entity.ChatMessage;
import com.sorune.gttapiserver.chat.entity.ChatRoom;
import com.sorune.gttapiserver.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ChatServiceImpl implements ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<ChatMessageDTO> getChatMessages(ChatRoomDTO chatRoom) {
        List<ChatMessage> result = chatMessageRepository.findAllByRoom(modelMapper.map(chatRoom, ChatRoom.class));
        return result.stream().map(message->modelMapper.map(message,ChatMessageDTO.class)).toList();
    }
}
