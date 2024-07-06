package com.sorune.gttapiserver.files.DTO;

import com.sorune.gttapiserver.files.Entity.Files;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilesDTO {
    private String fileName;
    private String uuid;
    private String folderPath;

    public String getImageURL(){
        return URLEncoder.encode(folderPath + "/" + uuid + "_" + fileName, StandardCharsets.UTF_8);

    }
    public String getThumbnailURL(){
        return URLEncoder.encode(folderPath + "/s_" + uuid + "_" + fileName, StandardCharsets.UTF_8);
    }
    public Files toFiles(){
        return Files.builder()
                .fileName(URLEncoder.encode(folderPath + "/" + uuid + "_" + fileName, StandardCharsets.UTF_8))
                .build();
    }
}
