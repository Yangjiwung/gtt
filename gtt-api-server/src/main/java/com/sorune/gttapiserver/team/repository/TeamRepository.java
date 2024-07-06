package com.sorune.gttapiserver.team.repository;

import com.sorune.gttapiserver.news.entity.News;
import com.sorune.gttapiserver.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query("SELECT n FROM Team n  WHERE n.teamNo=:teamNo")
    News findByTeamNo(@Param("teamNo") Long teamNo);

    @Query("SELECT count(teamNo) FROM Team WHERE teamNo > 0 ")
    Long countByTeamNo();


}
