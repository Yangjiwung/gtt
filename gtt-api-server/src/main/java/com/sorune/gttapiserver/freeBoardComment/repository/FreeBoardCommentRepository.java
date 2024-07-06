package com.sorune.gttapiserver.freeBoardComment.repository;

import com.sorune.gttapiserver.freeBoardComment.entity.FreeBoardComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeBoardCommentRepository extends JpaRepository<FreeBoardComment, Long> {
    Page<FreeBoardComment> findAllByFno(Long fno, Pageable pageable);
}
