package com.sorune.gttapiserver.member.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sorune.gttapiserver.member.DTO.MemberDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "roles")
@Table(name = "member")
@DynamicInsert
@DynamicUpdate
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num;        // 맴버 번호 자동생성 nn

    @Column(nullable = false)
    private String password;       // 맴버 비번 자동생성 nn

    @Column(nullable = false)
    private String nick;     // 맴버 별명 nn

    @Column(nullable = true)
    private String userId;       // 맴버 아이디 nn
    private String phone;
    private LocalDate birth;    // 맴버 생일 nn
    private String zoneCode;   // 맴버 우편 nn
    private String address;     // 맴버 주소 nn
    private String addrSub;     // 맴버 나머지 주소 nn

    @Column(nullable = false,unique = true)
    private String email;       // 맴버 아이디 자동생성 nn

    @ColumnDefault("1")
    private boolean enabled;

    @ColumnDefault("0")
    private boolean social;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private List<MemberRole> roles = new ArrayList<>();


    // 회원 닉네임 수정용
    public void editMemNick(String nick) {
        this.nick = nick;
    }

    // 회원 아이디 수정용
    public void editMemId(String userId) {this.userId = userId;}

    // 회원 휴대폰 수정용
    public void editPhone(String phone) {this.phone = phone;}

    // 회원 이메일 수정용
    public void editEmail(String email) {this.email = email;}

    // 회원 비밀번호 수정용
    public void editMemPw(String pw) {
        this.password = pw;
    }

    // 회원 생년월일 수정용
    public void editMemBirth(LocalDate birth) {
        this.birth = birth;
    }

    // 회원 우편번호 수정용
    public void editMemAddrNum(String zoneCode) {
        this.zoneCode = zoneCode;
    }

    // 회원 주소 수정용
    public void editMemAddr(String address) {
        this.address = address;
    }

    // 회원 나머지 주소 수정용
    public void editMemAddr2(String addrSub) { this.addrSub = addrSub; }

    public void addRole(MemberRole role) { this.roles.add(role); }

    public void clearRoles() { this.roles.clear(); }

    public static MemberRole convertStringToMemberRole(String roleString) {
        try {
            return MemberRole.valueOf(roleString);
        } catch (IllegalArgumentException e) {
            // 문자열이 유효한 MemberRole Enum 상수와 일치하지 않는 경우
            // 적절한 예외 처리를 수행할 수 있습니다.
            // 여기서는 null을 반환하도록 합니다.
            return null;
        }
    }

    public MemberDTO entityToDto() {
        return new MemberDTO(
                this.num,
                this.enabled,
                this.nick,
                this.userId,
                this.zoneCode,
                this.address,
                this.addrSub,
                this.email,
                this.phone,
                this.birth,
                this.password,
                this.roles
        );
    }
}
