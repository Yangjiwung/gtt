package com.sorune.gttapiserver.freeBoard.repository;

import com.sorune.gttapiserver.freeBoard.entity.FreeBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {
    @Query("SELECT b FROM FreeBoard b  WHERE b.fno=:fno")
    FreeBoard findByNewsNo(@Param("fno") Long fno);

    @Query("SELECT count(bno) FROM Board WHERE bno > 0 ")
    Long countByBno();

    Page<FreeBoard> findAllByWriter(Pageable pageable, String userId);

    List<FreeBoard> findTop10ByOrderByHitsDesc();
}
