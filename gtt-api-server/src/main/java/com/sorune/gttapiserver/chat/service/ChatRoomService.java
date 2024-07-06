package com.sorune.gttapiserver.chat.service;

import com.sorune.gttapiserver.chat.DTO.ChatRoomDTO;

import java.util.List;

public interface ChatRoomService{

    public ChatRoomDTO findById(Long id);
    public ChatRoomDTO findByName(String name);
    public Long save(ChatRoomDTO chatRoomDTO);
    public Long update(ChatRoomDTO chatRoomDTO);
    public Long delete(Long id);
    public List<ChatRoomDTO> findAll();
}
