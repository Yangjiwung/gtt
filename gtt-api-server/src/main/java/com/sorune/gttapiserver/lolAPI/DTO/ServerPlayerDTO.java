package com.sorune.gttapiserver.lolAPI.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sorune.gttapiserver.lolAPI.entity.Role;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ServerPlayerDTO {
    private Long id;
    private String nickName;
    private String name;                    // 불필요 ( 아래에서 가져다 쓰면 될 듯 )
    private String nameFull;                // 영문 + 한글 이름 - 가공 필요
    private String country;                 // 불필요 / 국적, 외국인 선수 없으니까 의미 없나
    private Integer age;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate birthdate;
    private String teamImg;
    private List<Role> roles;
    private List<String> favChamps;               // 선택 ( 조금 더 자세한 선수의 정보를 표시 )
    private String birthdatePrecision;      // 불필요
    private double gpa;
}
