package com.sorune.gttapiserver.freeBoardComment.service;

import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
import com.sorune.gttapiserver.freeBoardComment.DTO.FreeBoardCommentDTO;
import com.sorune.gttapiserver.freeBoardComment.entity.FreeBoardComment;
import com.sorune.gttapiserver.freeBoardComment.repository.FreeBoardCommentRepository;
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
@RequiredArgsConstructor // 생성자 자동주입
public class FreeBoardCommentServiceImpl implements FreeBoardCommentService {

    // 자동 주입 대상은 final로 선언
    private final ModelMapper modelMapper;

    private final FreeBoardCommentRepository commentRepository;

    @Override
    public Long register(Long fno, FreeBoardCommentDTO commentDTO) {
        commentDTO.setFno(fno);

        FreeBoardComment comment = modelMapper.map(commentDTO, FreeBoardComment.class);

        FreeBoardComment saveComment = commentRepository.save(comment);

        return saveComment.getComNo();
    }

    @Override
    public FreeBoardCommentDTO get(Long comNo) {

        Optional<FreeBoardComment> result = commentRepository.findById(comNo);

        FreeBoardComment comment = result.orElseThrow();

        FreeBoardCommentDTO dto = modelMapper.map(comment, FreeBoardCommentDTO.class);

        return dto;
    }

    @Override
    public void modify(FreeBoardCommentDTO commentDTO) {

        Optional<FreeBoardComment> result = commentRepository.findById(commentDTO.getComNo());
        FreeBoardComment comment = result.orElseThrow();
        comment.changeContent(commentDTO.getContent());
        commentRepository.save(comment);
    }

    @Override
    public void remove(Long comNo) {

        commentRepository.deleteById(comNo);
    }

    @Override
    public PageResponseDTO<FreeBoardCommentDTO> list(PageRequestDTO pageRequestDTO,Long fno) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("comNo").descending());  // 1페이지가 0
        Page<FreeBoardComment> result = commentRepository.findAllByFno(fno,pageable);
        log.info(result);
        List<FreeBoardCommentDTO> dtoList = result.getContent().stream().map(comment -> modelMapper.map(comment, FreeBoardCommentDTO.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<FreeBoardCommentDTO> responseDTO =
                PageResponseDTO.<FreeBoardCommentDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(totalCount)
                        .build();
        return responseDTO;
    }


}
