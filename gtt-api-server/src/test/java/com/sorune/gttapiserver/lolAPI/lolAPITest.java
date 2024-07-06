package com.sorune.gttapiserver.lolAPI;

import com.sorune.gttapiserver.common.formatter.LocalDateTimeFormatter;
import com.sorune.gttapiserver.lolAPI.DTO.ServerPlayerDTO;
import com.sorune.gttapiserver.lolAPI.DTO.ServerTeamDTO;
import com.sorune.gttapiserver.lolAPI.DTO.ServerTournamentDTO;
import com.sorune.gttapiserver.lolAPI.entity.*;
import com.sorune.gttapiserver.lolAPI.repository.ServerMatchRepository;
import com.sorune.gttapiserver.lolAPI.repository.ServerPlayerRepository;
import com.sorune.gttapiserver.lolAPI.repository.ServerTeamRepository;
import com.sorune.gttapiserver.lolAPI.repository.ServerTournamentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
@Log4j2
public class lolAPITest {
    @Autowired
    private ServerPlayerRepository playerRepository;
    @Autowired
    private ServerTeamRepository teamRepository;
    @Autowired
    private ServerMatchRepository matchRepository;
    @Autowired
    private ServerTournamentRepository tournamentRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Test
    public void testInsertPlayer(){
            playerRepository.save(ServerPlayer.builder()
                    .nickName("Kellin")
                    .name("Kim Hyeong-gyu")
                    .nameFull("Kim Hyeong-gyu (김형규)")
                    .country("South Korea")
                    .age(23)
                    .birthDate(LocalDate.parse("2001-02-01"))
                    .roles(Arrays.asList(Role.Support))
                    .favChamps(Arrays.asList("Rumble","Heimerdinger"))
                    .build());
        playerRepository.save(ServerPlayer.builder()
                .nickName("Kingen")
                .name("Hwang Seong-hoon")
                .nameFull("Hwang Seong-hoon (황성훈)")
                .country("South Korea")
                .age(24)
                .birthDate(LocalDate.parse("2000-03-11"))
                .roles(Arrays.asList(Role.Top))
                .favChamps(Arrays.asList("RAatrox"))
                .build());
        playerRepository.save(ServerPlayer.builder()
                .nickName("Lucid")
                .name("Choi Yong-hyeok")
                .nameFull("Choi Yong-hyeok (최용혁)")
                .country("South Korea")
                .age(19)
                .birthDate(LocalDate.parse("2005-01-28"))
                .roles(Arrays.asList(Role.Jungle))
                .build());
        playerRepository.save(ServerPlayer.builder()
                .nickName("ShowMaker")
                .name("Heo Su")
                .nameFull("Heo Su (허수)")
                .country("South Korea")
                .age(23)
                .birthDate(LocalDate.parse("2000-07-22"))
                .roles(Arrays.asList(Role.Mid))
                .favChamps(Arrays.asList("Katarina","Kassadin","Syndra","LeBlanc","Zoe"))
                .build());
    }

    @Test
    public void testInsertTeam(){
        List<ServerPlayer> players = playerRepository.findAll();
        ServerTeam team = ServerTeam.builder()
                .teamName("Dplus KIA")
                .image("Dplus KIAlogo profile.png")
                .location("South Korea")
                .rosterPhoto("DPLUS Spring 2024.jpg")
                .serverPlayers(players)
                .build();
        teamRepository.save(team);
    }

    @Test
    public void testInsertMatch(){
        ServerTeam team = teamRepository.findById(2L).get();
        ServerMatch match = ServerMatch.builder()
                .serverTeam1(team)
                .serverTeam2(team)
                .matchDate(LocalDateTime.parse("2024-01-25 10:30:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
        matchRepository.save(match);
    }

    @Test
    public void testInsertTournament(){
        List<ServerMatch> matches = matchRepository.findAll();
        ServerTournament tournament = ServerTournament.builder()
                .name("LCK 2024 Spring")
                .country("Korea")
                .league("LCK/2024 Season/Spring Season")
                .startDate(LocalDate.parse("2024-01-17"))
                .endDate(LocalDate.parse("2024-03-24"))
                .serverMatches(matches)
                .build();
        tournamentRepository.save(tournament);
    }

    @Test
    @Transactional
    public void getTournament(){
        List<ServerTournament> tournaments = tournamentRepository.findAll();
        ServerTournament tournament = tournaments.get(0);
        log.info(tournament.toString());
        ServerTeam team = teamRepository.findDetailById(2L);
        log.info(team.toString());
        log.info(team.getServerPlayers().toString());
        ServerTournament serverTournament = tournamentRepository.findById(2L).get();
        ServerTournamentDTO serverTournamentDTO = modelMapper.map(serverTournament, ServerTournamentDTO.class);
        log.info(serverTournamentDTO.toString());

    }

    @Test
    @Transactional
    public void getPlayer(){
        ServerTournament serverTournament = tournamentRepository.findTopByChallengerNotNullOrderByStartDateDesc();
        ServerTeamDTO winnerTeam = modelMapper.map(teamRepository.findByTeamName(serverTournament.getChallenger()), ServerTeamDTO.class);
        log.info(winnerTeam.toString());
    }

    @Test
    public void getTeams(){
        List<ServerTeam> teams = teamRepository.findAll();
        List<ServerTeamDTO> teamDTOList = teams.stream().map(team -> ServerTeamDTO.builder()
                .id(team.getId())
                .teamName(team.getTeamName())
                .image(team.getImage())
                .location(team.getLocation())
                .rosterPhoto(team.getRosterPhoto())
                .build()
        ).toList();
        log.info(teamDTOList.toString());
    }
    @Test
    @Transactional
    public void getPlayers(){
        Pageable pageable = Pageable.ofSize(10);
        Page<ServerPlayer> result = playerRepository.getAllPlayerWithAll(pageable);
        log.info(result);
        List<ServerPlayerDTO> dtoList = result.stream().map(serverPlayer -> modelMapper.map(serverPlayer, ServerPlayerDTO.class)).toList();

        log.info(dtoList.toString());
    }
}
