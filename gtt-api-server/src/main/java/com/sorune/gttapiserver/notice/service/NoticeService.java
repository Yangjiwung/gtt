package com.sorune.gttapiserver.notice.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.notice.domain.NoticeDTO;
import org.springframework.data.domain.Page;

public interface NoticeService {

    Long register(NoticeDTO noticeDTO);

    NoticeDTO get(Long notiNo);

    void modify(NoticeDTO noticeDTO);

    void remove(Long notiNo);

    PageResponseDTO<NoticeDTO> list(PageRequestDTO requestDTO);

    PageResponseDTO<NoticeDTO> getMyPost(PageRequestDTO requestDTO, String userId);

}
