package com.sorune.gttapiserver.lolAPI.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "serverPlayers")
@Table(name = "server_team")
@DynamicUpdate
@DynamicInsert
public class ServerTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String teamName;
    private String location;

    @Column
    private String image;
    private String rosterPhoto;

    @OneToMany
    private List<ServerPlayer> serverPlayers;
}
