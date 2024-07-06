package com.sorune.gttapiserver.files.controller;

import com.sorune.gttapiserver.common.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class FilesTestsController {

    private final CustomFileUtil fileUtil;

    // 첨부파일 불러와지는지 확인하는 컨트롤러
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @PostMapping("/")
    public List<String> insertFile(@RequestParam("file") List<MultipartFile> file) {
        List<String> fileName = fileUtil.saveFiles(file);

        return fileName;
    }

    @DeleteMapping("/{fileName}")
    public void deleteFile(@PathVariable List<String> fileName) {
        fileUtil.deleteFile(fileName);
    }
}
