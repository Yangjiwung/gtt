package com.sorune.gttapiserver.chat.service;

import com.sorune.gttapiserver.chat.DTO.ChatRoomDTO;
import com.sorune.gttapiserver.chat.entity.ChatRoom;
import com.sorune.gttapiserver.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ChatRoomServiceImpl implements ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ModelMapper modelMapper;

    @Override
    public ChatRoomDTO findById(Long id) {
        ChatRoom chatRoom = chatRoomRepository.findById(id).orElseThrow(
                ()->new IllegalArgumentException("해당 채팅방이 없습니다. id = "+id));
        return modelMapper.map(chatRoom, ChatRoomDTO.class);
    }

    @Override
    public ChatRoomDTO findByName(String name) {
        return modelMapper.map(chatRoomRepository.findByName(name), ChatRoomDTO.class);
    }

    @Override
    public Long save(ChatRoomDTO chatRoomDTO) {
        return chatRoomRepository.save(modelMapper.map(chatRoomDTO, ChatRoom.class)).getId();
    }

    @Override
    public Long update(ChatRoomDTO chatRoomDTO) {
        return chatRoomRepository.save(modelMapper.map(chatRoomDTO, ChatRoom.class)).getId();
    }

    @Override
    public Long delete(Long id) {
        chatRoomRepository.deleteById(id);
        return id;
    }

    @Override
    public List<ChatRoomDTO> findAll() {
        return chatRoomRepository.findAll().stream().map(chatRoom -> modelMapper.map(chatRoom, ChatRoomDTO.class)).toList();
    }
}
