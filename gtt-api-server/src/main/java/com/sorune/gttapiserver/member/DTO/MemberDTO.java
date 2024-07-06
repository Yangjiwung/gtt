package com.sorune.gttapiserver.member.DTO;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sorune.gttapiserver.member.entity.Member;
import com.sorune.gttapiserver.member.entity.MemberRole;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class MemberDTO extends User implements OAuth2User{

    private Long num;           // 회원번호
    private String password;    // 회원 비밀번호
    private String nick;        // 회원 닉네임
    private String userId;      // 회원 아이디
    private String zoneCode;    // 회원 주소(우편번호)
    private String address;     // 회원 주소(검색주소)
    private String addrSub;     // 회원 주소(나머지 동/호/수 등)
    private String email;       // 회원 이메일
    private String phone;       // 회원 휴대폰번호
    private boolean enabled;    // 회원 활성화 여부
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate birth;    // 회원 생년월일 nn
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime joinDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime editDate;

    private List<MemberRole> roles;

    private Map<String, Object> props; //소셜 로그인 정보
    public MemberDTO(String userId, String pw, String nick, boolean isEnabled, List<MemberRole> authorities) {
        super(userId,pw,authorities.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList()));
        this.nick = nick;
        this.userId = userId;
        this.enabled = isEnabled;
        this.roles = authorities;
        this.password = pw;
    }
    public MemberDTO(Long num,boolean isEnabled, String nick, String userId, String zoneCode, String address, String addrSub, String email, String phone, LocalDate birth, String password, List<MemberRole> authorities) {
        super(userId==null?email:userId, password, authorities.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList()));
        this.num = num;
        this.enabled = isEnabled;
        this.nick = nick;
        this.userId = userId;
        this.zoneCode = zoneCode;
        this.address = address;
        this.addrSub = addrSub;
        this.email = email;
        this.phone = phone;
        this.birth = birth;
        this.password = password;
        this.roles = authorities; // authorities를 roles로 설정
    }

    @JsonCreator
    public MemberDTO(
            @JsonProperty("userId") String userId,
            @JsonProperty("password") String password,
            @JsonProperty("nick") String nick,
            @JsonProperty("birth") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul") LocalDate birth,
            @JsonProperty("zoneCode") String zoneCode,
            @JsonProperty("address") String address,
            @JsonProperty("addrSub") String addrSub,
            @JsonProperty("phone") String phone,
            @JsonProperty("email") String email){
        super(userId,password,List.of(MemberRole.ROLE_USER).stream().map((role)->new SimpleGrantedAuthority(role.name())).collect(Collectors.toList()));
        this.userId=userId;
        this.password=password;
        this.nick=nick;
        this.birth=birth;
        this.zoneCode=zoneCode;
        this.address=address;
        this.addrSub=addrSub;
        this.phone=phone;
        this.email=email;
        this.roles = List.of(MemberRole.ROLE_USER);
        this.enabled = true;

    }
    @Override
    public Map<String, Object> getAttributes() {
        return this.getProps();
    }

    @Override
    public String getName() {
        return this.getNick();
    }

    @Override
    public String getUsername(){
        return this.getUserId();
    }

    @Override
    public String getPassword() { return this.password;}

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        if (roles == null) {
            return Collections.emptyList();
        }

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }

    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("num", this.getNum());
        dataMap.put("pw", this.getPassword());
        dataMap.put("nick", this.getNick());
        dataMap.put("userId", this.getUserId());
        dataMap.put("zoneCode", this.getZoneCode());
        dataMap.put("address", this.getAddress());
        dataMap.put("addrSub", this.getAddrSub());
        dataMap.put("email", this.getEmail());
        dataMap.put("phone", this.getPhone());
        dataMap.put("enabled", this.isEnabled());
        dataMap.put("birth", this.getBirth());
        dataMap.put("joinDate", this.getJoinDate());
        dataMap.put("editDate", this.getEditDate());
        dataMap.put("roles", this.getRoles());
        return dataMap;
    }

    public Member toEntity(MemberDTO memberDTO) {
        return Member.builder()
                .num(memberDTO.getNum())
                .password(memberDTO.getPassword())
                .nick(memberDTO.getNick())
                .userId(memberDTO.getUserId())
                .email(memberDTO.getEmail())
                .phone(memberDTO.getPhone())
                .birth(memberDTO.getBirth())
                .zoneCode(memberDTO.getZoneCode())
                .address(memberDTO.getAddress())
                .addrSub(memberDTO.getAddrSub())
                .enabled(memberDTO.isEnabled())
                .roles(memberDTO.getRoles())
                .build();
    }


    public MemberDTO toDTO(Member member) {
        return new MemberDTO(
                member.getNum(),
                member.isEnabled(),
                member.getNick(),
                member.getUserId(),
                member.getZoneCode(),
                member.getAddress(),
                member.getAddrSub(),
                member.getEmail(),
                member.getPhone(),
                member.getBirth(),
                member.getPassword(),
                member.getRoles()
        );
    }
}
