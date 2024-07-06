package com.sorune.gttapiserver.boardComment.repository;

import com.sorune.gttapiserver.boardComment.entity.BoardComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {
    Page<BoardComment> findAllByBno(Long bno, Pageable pageable);
}
