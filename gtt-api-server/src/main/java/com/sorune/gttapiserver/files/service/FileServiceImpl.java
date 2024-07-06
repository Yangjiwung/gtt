package com.sorune.gttapiserver.files.service;

import com.sorune.gttapiserver.files.DTO.FilesDTO;
import com.sorune.gttapiserver.files.Entity.Files;
import com.sorune.gttapiserver.files.repository.FilesRepository;
import com.sorune.gttapiserver.news.DTO.NewsDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FileServiceImpl implements FileService {

    private final FilesRepository filesRepository;
    private final ModelMapper modelMapper;


    @Override
    public List<FilesDTO> getNewsFiles() {
        List<Files> result = filesRepository.findNewsByFileType();

        List<FilesDTO> dtoList = result.stream().map(files -> modelMapper.map(files, FilesDTO.class)).toList();

        return dtoList;
    }
}
