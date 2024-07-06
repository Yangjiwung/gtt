package com.sorune.gttapiserver.team.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sorune.gttapiserver.files.DTO.FilesDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Lombok 라이브러리를 사용해 getter, setter, equals, hashCode, toString 자동 생성
@Data
@Builder  // 객체 생성 시 빌더 패턴을 사용
@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자 자동 생성
@NoArgsConstructor   // 파라미터 없는 기본 생성자를 자동 생성
public class TeamDTO {

    private Long teamNo;        // 팀 번호
    private String teamName;    // 팀 이름
    private String teamImage;   // 팀 이미지

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime regDate; // 등록 날짜, 서울 시간대로 yyyy-MM-dd 포맷으로 나타낸다.
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime modDate; // 수정 날짜, 서울 시간대로 yyyy-MM-dd 포맷으로 나타낸다.
}
