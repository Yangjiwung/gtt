package com.sorune.gttapiserver.files.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "FileNews")
@SecondaryTable(name = "FileFree")
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileNo;        // 파일 번호 자동생성

    private String fileName;    // 파일명

    private String fileType;    // 어떠한 엔티티와 연관이 있는지 확인하기 위함


}
