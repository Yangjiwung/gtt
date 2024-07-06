package com.sorune.gttapiserver.playerComment.repository;

import com.sorune.gttapiserver.playerComment.entity.PlayerComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface PlayerCommentRepository extends JpaRepository<PlayerComment, Long> {

//    Page<PlayerComment> findAllByPnoOrderByPlayerComNo(Pageable pageable, Long pno);

    // 한 선수에 대한 전체 댓글 리스트
    List<PlayerComment> findAllByPnoOrderByPlayerComNo(Long pno);

    // 한 선수에 대한 댓글 중 평점에 대한 평균을 가져옴
    @Query("SELECT AVG(pc.recomNo) FROM PlayerComment pc WHERE pc.pno = :pno")
    Double meanOfRecomNoByPno(@PathVariable("pno") Long pno);

    // 현재 댓글 작성자가 이 선수에 이미 댓글을 작성 했는지 여부 체크
    boolean existsByPnoAndComWriter(Long pno, String comWriter);
}
