package com.sorune.gttapiserver.notice.repository;

import com.sorune.gttapiserver.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Page<Notice> findAllByWriter (Pageable pageable, String userid);
}
