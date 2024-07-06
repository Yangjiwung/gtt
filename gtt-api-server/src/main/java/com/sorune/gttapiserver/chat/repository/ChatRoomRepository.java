package com.sorune.gttapiserver.chat.repository;

import com.sorune.gttapiserver.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    ChatRoom findByName(String name);
    List<ChatRoom> findAllByName(String name);
    List<ChatRoom> findAllByNameContaining(String name);
}
