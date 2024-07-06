package com.sorune.gttapiserver.news.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsDTO {

    private Long newsNo;
    private String title;
    private String content;
    private String writer;
    private String theTeam;
    private Long hits;
    private Long recomNo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime regDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime modDate;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();  // 등록과 수정 시 새로운 파일을 업로드할 때 사용

    @Builder.Default
    private List<String> fileDTOList = new ArrayList<>();   // 업로드가 완료된 파일의 이름




}
