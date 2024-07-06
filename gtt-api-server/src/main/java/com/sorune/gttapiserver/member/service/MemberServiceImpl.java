package com.sorune.gttapiserver.member.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.member.DTO.MemberDTO;
import com.sorune.gttapiserver.member.entity.Member;
import com.sorune.gttapiserver.member.entity.MemberRole;
import com.sorune.gttapiserver.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

// 이 클래스가 비즈니스 로직을 처리하는 서비스로 사용된다고 스프링에 알림
@Service
// 이 클래스의 메서드를 실행하는 동안 시작된 트랜잭션이 완료되기 전까지 데이터베이스에 커밋하지 않음.
@Transactional
// final 또는 @NonNull 필드에 대한 생성자를 자동으로 생성
@RequiredArgsConstructor
// 로그를 쉽게 출력할 수 있게 도와주는 로거 라이브러리를 사용
@Log4j2
public class MemberServiceImpl implements MemberService {

    // 데이터 모델을 다른 데이터 모델로 매핑해준다
    private final ModelMapper modelMapper;

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Override // 페이징 없는 전체 회원 조회
    public List<MemberDTO> getAllMembers() {
        return memberRepository.findAll().stream().map((element) -> modelMapper.map(element, MemberDTO.class)).collect(Collectors.toList());
    }

    @Override //회원 가입
    public Long joinMember(MemberDTO memberDTO) {

        Member member = modelMapper.map(memberDTO, Member.class);
        log.info(member);
        // 회원 정보를 데이터베이스에 저장함.
        memberRepository.save(member);
        // 저장된 회원의 고유 번호를 반환.
        return member.getNum();
    }

    @Override // 회원 정보 수정
    public Long editMember(MemberDTO memberDTO) {

        Member member = memberRepository.getReferenceById(memberDTO.getNum());
        // 회원 아이디 수정
        member.editMemId(memberDTO.getUserId());
        // 회원 비밀번호 수정
        member.editMemPw(memberDTO.getPassword());
        // 회원 닉네임 수정
        member.editMemNick(memberDTO.getNick());
        // 회원 우편번호 수정
        member.editMemAddrNum(memberDTO.getZoneCode());
        // 회원 주소 수정
        member.editMemAddr(memberDTO.getAddress());
        // 회원 나머지 주소 수정
        member.editMemAddr2(memberDTO.getAddrSub());
        // 회원 생일 수정
        member.editMemBirth(memberDTO.getBirth());
        // 수정된 회원 정보를 데이터베이스에 저장함.
        memberRepository.save(member);
        return null;
    }

    @Override // 회원 일부정보 수정 (닉네임, 생년월일, 우편번호, 주소, 나머지주소)
    public void partModifyMember(MemberDTO memberDTO) {

        Member member = memberRepository.getReferenceById(memberDTO.getNum());
        log.info("member : "+member);
        member.editMemNick(memberDTO.getNick());        // 닉네임 수정
        member.editMemBirth(memberDTO.getBirth());      // 생년월일 수정
        member.editMemAddrNum(memberDTO.getZoneCode()); // 우편번호 수정
        member.editMemAddr(memberDTO.getAddress());     // 주소 수정
        member.editMemAddr2(memberDTO.getAddrSub());    // 나머지 주소 수정

        memberRepository.save(member);                  // 엔티티를 통해 DB에 저장
    }

    @Override // 회원 탈퇴
    public void cencelMember(Long num) {
        // 주어진 번호의 회원 정보를 데이터베이스에서 삭제
        memberRepository.deleteById(num);
    }

    @Override // 회원 한명 조회
    public MemberDTO searchMember(Long num) {
        // 회원 번호로 회원 정보를 조회
        Optional<Member> member = memberRepository.findById(num);
        // 조회된 회원 정보를 DTO로 변환
        MemberDTO memberDTO = modelMapper.map(member, MemberDTO.class);
        // 변환된 DTO를 반환
        return memberDTO;
    }

    @Override // 회원 전체 조회
    public PageResponseDTO<MemberDTO> memberList(PageRequestDTO pageRequestDTO) {

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("num").descending());
        // 페이징과 정렬 정보를 이용하여 회원 목록을 조회
        Page<Member> result = memberRepository.findAll(pageable);
        List<MemberDTO> dtoList = result.stream().map(member -> modelMapper.map(member, MemberDTO.class)).toList();
        // 조회된 각 회원 정보를 로그로 출력
        dtoList.forEach(memDto -> log.info(memDto));
        // 조회된 회원의 총 수를 계산
        long totalCount = result.getTotalElements();

        PageResponseDTO pageResponseDTO = PageResponseDTO.<MemberDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build(); // 조회 결과를 PageResponseDTO 객체로 빌드
        // 빌드된 객체를 반환
        return pageResponseDTO;
    }

    @Override
    public boolean checkId(String id) {
        Member member =memberRepository.findByUserId(id) ;
        log.info(member);
        return member==null;
    }

    @Override
    public boolean checkNick(String nick) {
        Member member =memberRepository.findByNick(nick) ;
        log.info(member);
        return member==null;
    }

    @Override
    public boolean isLogin(String id, String pw) {
        Member members = memberRepository.findByUserIdAndPassword(id, pw);
        return members == null;
    }

    @Override
    public boolean checkEmail(String email) {
        Member member =memberRepository.findByEmail(email) ;
        log.info(member);
        return member==null;
    }

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);
        log.info(email);
        Optional<Member> result = Optional.ofNullable(memberRepository.findByEmail(email));
        if (result.isPresent()) {
            MemberDTO memberDTO = result.get().entityToDto();
            return memberDTO;
        }
        Member socialMember = makeSocialMember(email);
        memberRepository.save(socialMember);
        MemberDTO memberDTO = socialMember.entityToDto();
        return memberDTO;
    }

    private String getEmailFromKakaoAccessToken(String accessToken) {
        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";
        if(accessToken == null){
            throw new RuntimeException("Access Token is null");
        }
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type","application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();
        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET,entity,LinkedHashMap.class);
        log.info(response);
        LinkedHashMap<String ,LinkedHashMap> body = response.getBody();
        LinkedHashMap<String,String> kakaoAccount = body.get("kakao_account");
        log.info(kakaoAccount);
        return kakaoAccount.get("email");
    }

    private String makeTempPassword(){
        StringBuffer buffer = new StringBuffer();
        for(int i = 0 ; i < 10; i ++){
            buffer.append((char)((int)(Math.random()*55)+65));
        }
        return buffer.toString();
    }

    private Member makeSocialMember(String email){
        String tempPassword = makeTempPassword();
        log.info(tempPassword);
        StringBuffer tmp = new StringBuffer();
        IntStream.rangeClosed(1,10).forEach((index)->tmp.append((int)(Math.random()*10)));
        String nick = "user"+tmp.toString();

        Member member = Member.builder()
                .userId(email)
                .email(email)
                .password(passwordEncoder.encode(tempPassword))
                .nick(nick)
                .enabled(true)
                .social(true)
                .build();
        member.addRole(MemberRole.ROLE_USER);
        return member;
    }
}
