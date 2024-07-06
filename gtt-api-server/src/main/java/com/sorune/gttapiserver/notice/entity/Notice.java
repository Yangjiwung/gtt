package com.sorune.gttapiserver.notice.entity;

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
@ToString
@DynamicInsert
@DynamicUpdate
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notiNo;
    private String title;
    private String content;

    private String writer;

    @ColumnDefault("0")
    private Long hits;

    public void changeTitle(String title){this.title=title;}
    public void changeContent(String content){this.content=content;}


}
