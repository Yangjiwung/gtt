package com.sorune.gttapiserver.lolAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sorune.gttapiserver.lolAPI.entity.ServerTeam;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ServerMatchDTO {
    private Long matchId;
    private ServerTeamDTO serverTeam1;
    private ServerTeamDTO serverTeam2;
    private String league;
    private Long team1Score;
    private Long team2Score;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime matchDate;
}
