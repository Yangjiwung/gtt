package com.sorune.gttapiserver.chat.DTO;

import com.sorune.gttapiserver.chat.entity.MessageType;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageDTO {
    private Long id;
    private ChatRoomDTO room;
    private MessageType messageType;
    private String message;
    private String chatRoomId;
    private String sender;
    private String senderEmail;

}
