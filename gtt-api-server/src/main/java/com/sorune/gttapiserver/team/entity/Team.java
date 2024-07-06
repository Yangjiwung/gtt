package com.sorune.gttapiserver.team.entity;

import com.sorune.gttapiserver.files.Entity.Files;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;

@Entity  // 이 클래스를 데이터베이스 테이블과 매핑할 엔티티 클래스로 선언
@Builder  // 객체 생성 시 빌더 패턴을 사용
@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자를 자동으로 만듦
@NoArgsConstructor   // 파라미터 없는 기본 생성자를 자동으로 만듦
@Getter  // 모든 필드에 대한 getter 메서드를 자동으로 생성
@ToString  // 클래스의 toString() 메서드를 자동으로 생성
@DynamicInsert  // null이 아닌 필드만 데이터베이스에 삽입함
@DynamicUpdate  // 변경된 필드만 데이터베이스에 업데이트
public class Team {

    @Id  // 데이터베이스 테이블의 기본 키
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 기본 키 생성을 데이터베이스에 위임, IDENTITY 사용
    private Long teamNo;        // 팀 번호(자동생성)

    @Column
    private String teamName;    // 팀 이름

    @Column
    private String teamImage;   // 팀 이미지
    // 팀 이름을 업데이트 할 때 사용하는 메서드
    public void changeTeamName(String teamName){
        this.teamName = teamName; // 넘겨받은 팀 이름으로 현재 팀 이름을 변경
    }
    // 팀 이미지를 업데이트 할 때 사용하는 메서드
    public void changeTeamImage(String teamImage) {
        this.teamImage = teamImage; // 넘겨받은 팀 이미지로 현재 팀 이미지를 변경
    }
}
