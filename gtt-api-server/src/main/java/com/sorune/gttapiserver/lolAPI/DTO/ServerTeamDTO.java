package com.sorune.gttapiserver.lolAPI.DTO;

import lombok.*;

import java.util.List;

@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ServerTeamDTO {
    private Long id;
    private String teamName;
    private String image;
    private String location;            // 불필요 / 국적 필요 없는지
    private String rosterPhoto;         // 선택 ( 선수 단체 이미지 )
    private List<ServerPlayerDTO> serverPlayers;

}
