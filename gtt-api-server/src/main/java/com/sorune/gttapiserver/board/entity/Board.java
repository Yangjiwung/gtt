package com.sorune.gttapiserver.board.entity;

import com.sorune.gttapiserver.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@DynamicInsert
@DynamicUpdate
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bno;
    private String title;
    private String content;
    private String writer;
    private String theTeam;

    @ColumnDefault("0")
    private Long hits;
    @ColumnDefault("0")
    private Long recomNo;

    public void changeTitle(String title){this.title=title;}
    public void changeContent(String content){this.content=content;}
    public void changeTheTeam(String theTeam){this.theTeam=theTeam;}

}
