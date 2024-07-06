package com.sorune.gttapiserver.news.entity;

import com.sorune.gttapiserver.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@DynamicInsert
@DynamicUpdate
public class News extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsNo;    // 뉴스 번호 (자동생성)

    @Column(nullable = false)
    private String title;   // 제목

    @Column(nullable = false, length = 1000)
    private String content; // 내용

    @Column(nullable = false)
    private String writer;  // 작성자

    @Column(nullable = false)
    private String theTeam;  // 기사 작성 대상 팀

    @ColumnDefault("0")
    private Long hits;      // 조회수

    @ColumnDefault("0")
    private Long recomNo;   // 추천수




    public void changeTitle(String title){
        this.title = title;
    }           // 제목을 업데이트 할 때 사용

    public void changeContent(String content){
        this.content = content;
    }   // 내용을 업데이트 할 때 사용

}
