package com.sorune.gttapiserver.lolAPI.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString(exclude = {"roles","favChamps"})
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "server_player")
@DynamicUpdate
@DynamicInsert
public class ServerPlayer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String nickName;
    private String name;
    private String nameFull;
    private String country;
    private String teamImg;
    @Column
    private Integer age;
    private LocalDate birthDate;
    @ColumnDefault("0.0")
    private double gpa;

    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<Role> roles;
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> favChamps;


}
