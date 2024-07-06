package com.sorune.gttapiserver.boardComment.entity;

import com.sorune.gttapiserver.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString//(exclude = {"news"})
@DynamicInsert
@DynamicUpdate
public class BoardComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long comNo; // 댓글번호 자동생성

    @Column(nullable = false)
    private String content;  // 댓글 내용

    @Column(nullable = false)
    private String  writer; // 작성자

    @ColumnDefault("0")
    private Long recomNo;   // 추천수

    private Long bno;    // news게시판 번호

    // 내용 수정용
    public void changeContent(String content){
        this.content=content;
    }

    // 수정일 수정용

}
