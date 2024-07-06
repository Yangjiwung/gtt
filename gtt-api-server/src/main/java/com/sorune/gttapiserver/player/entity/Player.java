package com.sorune.gttapiserver.player.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pno;
    private int age;
    private String nickName, realName, teamName, position, playerImage;
    private Date birthDate;
    private Double gpa;


    public void changeBirthDate(Date birthDate){
        this.birthDate = birthDate;
    }
    public void changeAge(int age){
        this.age = age;
    }
    public void changeRealName(String realName){
        this.realName = realName;
    }
    public void changeNickName(String nickName){
        this.nickName = nickName;
    }
    public void changeTeam(String teamName){
        this.teamName = teamName;
    }
    public void changePosition(String position){
        this.position = position;
    }
    public void changePlayerImage(String playerImage){this.playerImage = playerImage;}
    public void changeGpa(Double gpa){this.gpa = gpa;}

}
