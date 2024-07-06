package com.sorune.gttapiserver.board.repository;

import com.sorune.gttapiserver.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b  WHERE b.bno=:bno")
    Board findByNewsNo(@Param("bno") Long bno);

    @Query("SELECT count(bno) FROM Board WHERE bno > 0 ")
    Long countByBno();

    Page<Board> findAllByWriter(Pageable pageable, String userId);

}
