package com.sorune.gttapiserver.chat.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatRoom_id")
    private Long id;
    private String name;

    @Column
    private String creator;
    @Builder
    public ChatRoom(String name, String creator) {
        this.name = name;
        this.creator = creator;
    }

    public static ChatRoom createRoom(String name , String creator) {
        return ChatRoom.builder().name(name).creator(creator).build();
    }
}
