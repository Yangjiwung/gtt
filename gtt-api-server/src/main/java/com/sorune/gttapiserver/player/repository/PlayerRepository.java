package com.sorune.gttapiserver.player.repository;

import com.sorune.gttapiserver.player.entity.Player;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    Player findPlayerByPno(Long pno);

    @Query("SELECT p FROM Player p ORDER BY p.pno")
    Page<Player> findAllByPno(Pageable pageable);

    @Modifying
    @Query("UPDATE Player p SET p.gpa = :gpa WHERE p.pno = :pno")
    void setGpa(@Param("pno") Long playerId, @Param("gpa") Double gpa);

}
