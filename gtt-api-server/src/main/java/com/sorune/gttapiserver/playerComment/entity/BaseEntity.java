package com.sorune.gttapiserver.playerComment.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass // 직접 테이블 용이 아님을 명시
@Getter
// 세터 대신 감시용 코드 (데이터 변경 감지해 적용 -> Main 메소드에 추가 코드 입력)
@EntityListeners(value = {AuditingEntityListener.class})
abstract class BaseEntity { // 테이블의 공통 부분을 상속할 클래스
    
    @CreatedDate // 게시물 생성할 때 동작
    @Column(name = "regDate", updatable = false) // 테이블에 필드명 지정, 업데이트 막음
    private LocalDateTime regDate; // 게시물 등록일

    @LastModifiedDate // 게시물 수정될 때 동작
    @Column(name = "modDate") // 테이블에 필드명 지정
    private LocalDateTime modDate; // 게시물 수정일
    
}
