package com.sorune.gttapiserver.lolAPI.repository;

import com.sorune.gttapiserver.lolAPI.entity.ServerTournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerTournamentRepository extends JpaRepository<ServerTournament, Long> {

    public ServerTournament findTopByChallengerNotNullOrderByStartDateDesc();
}
