package com.sorune.gttapiserver.lolAPI.repository;

import com.sorune.gttapiserver.lolAPI.entity.ServerPlayer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerPlayerRepository extends JpaRepository<ServerPlayer,Long> {

    @Query("SELECT sp FROM ServerPlayer sp ORDER BY sp.id")
    Page<ServerPlayer> getAllPlayerWithAll(Pageable pageable);

    @Query("SELECT sp FROM ServerPlayer sp WHERE sp.teamImg = :teamImg ORDER BY sp.id")
    Page<ServerPlayer> getAllPlayerWithTeam(Pageable pageable, @Param("teamImg") String teamImg);

    @Modifying
    @Query("UPDATE ServerPlayer p SET p.gpa = :gpa WHERE p.id = :id")
    void setGpa(@Param("id") Long id, @Param("gpa") Double gpa);
}
