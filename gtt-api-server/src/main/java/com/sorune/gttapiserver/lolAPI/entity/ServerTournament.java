package com.sorune.gttapiserver.lolAPI.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"serverMatches"})
@Table(name = "server_tournament")
@DynamicUpdate
@DynamicInsert
public class ServerTournament {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;
    private String region;
    private String country;
    private String league;
    private String challenger;

    @Column(nullable = false)
    private LocalDate startDate;
    private LocalDate endDate;

    @OneToMany
    private List<ServerMatch> serverMatches;
}
