package com.sorune.gttapiserver.playerComment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class PlayerComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerComNo;

    private String comment;

    private String comWriter;

    private Long recomNo;

    private Long pno;

    public void changeComment(String comment) {this.comment = comment;}
    public void changeRecomNo(Long recomNo) {this.recomNo = recomNo;}
}
