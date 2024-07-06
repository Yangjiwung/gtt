package com.sorune.gttapiserver.chat.repository;

import com.sorune.gttapiserver.chat.entity.ChatMessage;
import com.sorune.gttapiserver.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findAllByRoom(ChatRoom room);
    List<ChatMessage> findAllByMessageContaining(String message);
}
