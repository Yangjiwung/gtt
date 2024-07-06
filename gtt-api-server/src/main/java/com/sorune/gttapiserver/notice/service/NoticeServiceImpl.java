package com.sorune.gttapiserver.notice.service;


import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.notice.domain.NoticeDTO;
import com.sorune.gttapiserver.notice.entity.Notice;
import com.sorune.gttapiserver.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    private final ModelMapper modelMapper;

    private final NoticeRepository noticeRepository;

    @Override
    public Long register(NoticeDTO noticeDTO) {

        Notice notice = modelMapper.map(noticeDTO, Notice.class);
        // dto를 modelMapper를 이용해 엔티티로 변환

        Notice savedNotice = noticeRepository.save(notice);

        return savedNotice.getNotiNo();
    }

    @Override
    public NoticeDTO get(Long notiNo) {


        Optional<Notice> result = noticeRepository.findById(notiNo);

        Notice notice =result.orElseThrow();

        NoticeDTO noticeDTO = modelMapper.map(notice,NoticeDTO.class);

        noticeDTO.setHits(notice.getHits()+1);
        log.info("조회수 : " + noticeDTO.getHits() );
        noticeRepository.save(modelMapper.map(noticeDTO, Notice.class));

        return noticeDTO;
    }

    @Override
    public void modify(NoticeDTO noticeDTO) {

        Optional<Notice> result = noticeRepository.findById(noticeDTO.getNotiNo());

        Notice notice =result.orElseThrow();

        notice.changeTitle(noticeDTO.getTitle());
        notice.changeContent(noticeDTO.getContent());

        noticeRepository.save(notice);
    }

    @Override
    public void remove(Long notiNo) {

        noticeRepository.deleteById(notiNo);
    }

    @Override
    public PageResponseDTO<NoticeDTO> list(PageRequestDTO pageRequestDTO) {

        Pageable pageable =
                PageRequest.of(
                        pageRequestDTO.getPage() - 1, // 1페이지는 0
                        pageRequestDTO.getSize(),
                        Sort.by("notiNo").descending());
        Page<Notice> result = noticeRepository.findAll(pageable);

        List<NoticeDTO> dtoList =result.getContent()
                .stream()
                .map(notice -> modelMapper.map(notice,NoticeDTO.class))
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<NoticeDTO> responseDTO =
                PageResponseDTO.<NoticeDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(totalCount)
                        .build();

        return responseDTO;
    }

    @Override
    public PageResponseDTO<NoticeDTO> getMyPost(PageRequestDTO pageRequestDTO, String userId) {
        Pageable pageable =
                PageRequest.of(
                        pageRequestDTO.getPage() - 1, // 1페이지는 0
                        pageRequestDTO.getSize(),
                        Sort.by("notiNo").descending());
        Page<Notice> result = noticeRepository.findAllByWriter(pageable, userId);

        List<NoticeDTO> dtoList = result.getContent()
                .stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());
        long totalCount =result.getTotalElements();

        PageResponseDTO<NoticeDTO> responseDTO =
                PageResponseDTO.<NoticeDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(totalCount)
                        .build();

        return responseDTO;
    }



}
