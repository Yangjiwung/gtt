package com.sorune.gttapiserver.boardComment.service;

import com.sorune.gttapiserver.boardComment.DTO.BoardCommentDTO;
import com.sorune.gttapiserver.boardComment.entity.BoardComment;
import com.sorune.gttapiserver.boardComment.repository.BoardCommentRepository;
import com.sorune.gttapiserver.common.DTO.PageRequestDTO;
import com.sorune.gttapiserver.common.DTO.PageResponseDTO;
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
public class BoardCommentServiceImpl implements BoardCommentService {

    // 자동 주입 대상은 final로 선언
    private final ModelMapper modelMapper;

    private final BoardCommentRepository commentRepository;

    @Override
    public Long register(Long bno, BoardCommentDTO commentDTO) {
        commentDTO.setBno(bno);

        BoardComment comment = modelMapper.map(commentDTO, BoardComment.class);

        BoardComment saveComment = commentRepository.save(comment);

        return saveComment.getComNo();
    }

    @Override
    public BoardCommentDTO get(Long comNo) {

        Optional<BoardComment> result = commentRepository.findById(comNo);

        BoardComment comment = result.orElseThrow();

        BoardCommentDTO dto = modelMapper.map(comment, BoardCommentDTO.class);

        return dto;
    }

    @Override
    public void modify(BoardCommentDTO commentDTO) {

        Optional<BoardComment> result = commentRepository.findById(commentDTO.getComNo());
        BoardComment comment = result.orElseThrow();
        comment.changeContent(commentDTO.getContent());
        commentRepository.save(comment);
    }

    @Override
    public void remove(Long comNo) {

        commentRepository.deleteById(comNo);
    }

    @Override
    public PageResponseDTO<BoardCommentDTO> list(PageRequestDTO pageRequestDTO, Long bno) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("comNo").descending());  // 1페이지가 0
        Page<BoardComment> result = commentRepository.findAllByBno(bno,pageable);
        log.info(result);
        List<BoardCommentDTO> dtoList = result.getContent().stream().map(comment -> modelMapper.map(comment, BoardCommentDTO.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<BoardCommentDTO> responseDTO =
                PageResponseDTO.<BoardCommentDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(totalCount)
                        .build();
        return responseDTO;
    }


}
