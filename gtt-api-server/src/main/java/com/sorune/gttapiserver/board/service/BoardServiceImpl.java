package com.sorune.gttapiserver.board.service;

import com.sorune.gttapiserver.board.DTO.BoardDTO;
import com.sorune.gttapiserver.board.entity.Board;
import com.sorune.gttapiserver.board.repository.BoardRepository;
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

import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;

    @Override
    public Long registerBoard(BoardDTO boardDTO) {
        Board board = modelMapper.map(boardDTO, Board.class);
        boardRepository.save(board);
        return board.getBno();
    }

    @Override
    public void modifyBoard(BoardDTO boardDTO) {
        Board board = boardRepository.getReferenceById(boardDTO.getBno());
        board.changeContent(boardDTO.getContent());
        board.changeTitle(boardDTO.getTitle());
        board.changeTheTeam(boardDTO.getTheTeam());
        boardRepository.save(board);
    }

    @Override
    public void removeBoard(Long no) { boardRepository.deleteById(no); }

    @Override
    public BoardDTO getById(Long no) {
        Board board = boardRepository.getOne(no);
        board.setHits(board.getHits() + 1);
        boardRepository.save(board);
        return modelMapper.map(board, BoardDTO.class);
    }

    @Override
    public PageResponseDTO<BoardDTO> getList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage()-1, pageRequestDTO.getSize(), Sort.by("bno").descending());
        Page<Board> boards = boardRepository.findAll(pageable);
        List<BoardDTO> dtoList = boards.stream().map(board -> modelMapper.map(board, BoardDTO.class)).toList();
        dtoList.forEach(dto -> log.info(dto));
        long totalCount = boards.getTotalElements();
        return PageResponseDTO.<BoardDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }

    @Override
    public PageResponseDTO<BoardDTO> getMyBoard(PageRequestDTO pageRequestDTO, String userId) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage()-1, pageRequestDTO.getSize() ,Sort.by("bno").descending());
        Page<Board> result = boardRepository.findAllByWriter(pageable, userId);
        List<BoardDTO> dtoList = result.stream().map(board -> modelMapper.map(board, BoardDTO.class)).toList();
        dtoList.forEach(dto -> log.info(dto));
        long totalCount = result.getTotalElements();
        return PageResponseDTO.<BoardDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();
    }
}
