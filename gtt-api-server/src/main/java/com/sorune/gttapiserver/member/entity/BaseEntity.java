package com.sorune.gttapiserver.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass // 직접 테이블용이 아님
@Getter
// @EntityListeners : 세터 대용 코드(데이터 변경 감지해 적용)
// Main 메서드에 추가 코드를 입력
@EntityListeners(value = {AuditingEntityListener.class})
public class BaseEntity {

    @CreatedDate // 게시물을 생성할때 생성시간, 수정시간을 자동으로 저장
    // @Column : JPA를 사용하여 DB table의 Column을 Mapping 할 때 이 Annotaion을 사용
    @Column(name = "joinDate", updatable = false) // 테이블에 필드명 지정, 업데이트를 막음
    private LocalDateTime joinDate; // 회원 가입일

    @LastModifiedDate // 게시물을 수정 할 때 동작
    @Column(name = "editDate") // 테이블에 필드명 지정
    private LocalDateTime editDate; // 회원 수정일

}
