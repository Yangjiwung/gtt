package com.sorune.gttapiserver.lolAPI.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Getter
@ToString(exclude = {"serverTeam1","serverTeam2"})
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "server_match")
@DynamicUpdate
@DynamicInsert
public class ServerMatch {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long matchId;

    @ManyToOne(fetch = FetchType.LAZY)
    private ServerTeam serverTeam1;
    @ManyToOne(fetch = FetchType.LAZY)
    private ServerTeam serverTeam2;

    @Column
    private String league;
    @Column
    @ColumnDefault(value = "0")
    private Long team1Score;
    @Column
    @ColumnDefault(value = "0")
    private Long team2Score;

    @Column
    private LocalDateTime matchDate;
}
