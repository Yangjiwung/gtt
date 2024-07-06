package com.sorune.gttapiserver.team.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.files.DTO.FilesDTO;
import com.sorune.gttapiserver.files.Entity.Files;
import com.sorune.gttapiserver.team.DTO.TeamDTO;
import com.sorune.gttapiserver.team.entity.Team;
import com.sorune.gttapiserver.team.repository.TeamRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// 이 서비스는 비즈니스 로직을 처리하는 서비스라고 스프링에 알림
@Service
// 이 클래스의 메서드를 실행하는 동안 시작된 트랜잭션이 완료되기 전까지 데이터베이스에 커밋하지 않음
@Transactional
// final 또는 @NonNull 필드에 대한 생성자를 자동으로 생성
@RequiredArgsConstructor
// 로그를 쉽게 출력할 수 있게 도와주는 로거 라이브러리를 사용
@Log4j2
public class TeamServiceImpl implements TeamService {

    // 데이터 모델을 다른 데이터 모델로 매핑해준다
    private final ModelMapper modelMapper;
    private final TeamRepository teamRepository;

    @Override
    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll().stream().map((element) -> modelMapper.map(element, TeamDTO.class)).collect(Collectors.toList());
    }

    @Override // 팀 생성
    public Long registerTeam(TeamDTO teamDTO) {
        Team team = modelMapper.map(teamDTO, Team.class);
        /*Team team = Team.builder()
                .teamName(teamDTO.getTeamName())
                .teamImage(teamDTO.getTeamImage().stream().map(FilesDTO::toFiles).toList())
                .build();*/
        // 팀 정보를 데이터 베이스에 저장함
        log.info(team);
        // 들어온 팀 정보를 로그에 출력
        teamRepository.save(team);
        // 저장된 팀의 고유 번호를 반환함
        return team.getTeamNo();
    }

    @Override // 팀 정보 수정
    public void modifyTeam(TeamDTO teamDTO) {
        Team team = teamRepository.getReferenceById(teamDTO.getTeamNo());
        // 팀 이름 수정
        team.changeTeamName(teamDTO.getTeamName());
        // 팀 이미지 변경
        team.changeTeamImage(teamDTO.getTeamImage());
        //team.changeTeamImage(teamDTO.getTeamImage().stream().map(FilesDTO::toFiles).toList());
        // 수정된 팀 정보를 데이터베이스에 저장함
    }

    @Override // 팀 삭제
    public void removeTeam(Long teamNo) {
        // 주어진 번호의 팀 정보를 데이터베이스에서 삭제
        teamRepository.deleteById(teamNo);
    }

    @Override // 팀 한팀 조회
    public TeamDTO getById(Long teamNo) {
        // 팀 번호로 팀 정보를 조회
        Optional<Team> team = teamRepository.findById(teamNo);
        // 조회된 팀 정보를 DTO로 변환
        TeamDTO teamDTO = modelMapper.map(team, TeamDTO.class);
        // 변환된 DTO를 반환
        return teamDTO;
    }

    @Override // 팀 전체 조회
    public PageResponseDTO<TeamDTO> getList(PageRequestDTO pageRequestDTO) {
        // 페이징과 정렬 정보를 이용하여 팀 목록을 조회
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1, pageRequestDTO.getSize(), Sort.by("teamNo").descending());
        Page<Team> result = teamRepository.findAll(pageable);
        List<TeamDTO> dtoList = result.stream().map(team -> modelMapper.map(team, TeamDTO.class)).toList();
        // 조회된 각 팀 정보를 로그로 출력
        dtoList.forEach(teamDTO -> log.info(teamDTO));
        // 조회된 팀 수를 계산
        long totalCount = result.getTotalElements();
        PageResponseDTO pageResponseDTO =  PageResponseDTO.<TeamDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build(); // 조회 결과를 PageResponseDTO 객체로 빌드
        return pageResponseDTO;
    }
}
