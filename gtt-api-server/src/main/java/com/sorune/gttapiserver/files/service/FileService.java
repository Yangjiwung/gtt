package com.sorune.gttapiserver.files.service;

import com.sorune.gttapiserver.files.DTO.FilesDTO;
import com.sorune.gttapiserver.files.Entity.Files;

import java.util.List;

public interface FileService {

    List<FilesDTO> getNewsFiles();
}
