package com.sorune.gttapiserver.news.DTO;

import com.sorune.gttapiserver.news.entity.News;
import lombok.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NewsImageDTO {

    private Long imgNO;
    private String uuid;
    private String path;
    private String imgName;
    private News news;

    public String getImageURL(){
        return URLEncoder.encode(path + "/" + "uuid" + "_" + imgName, StandardCharsets.UTF_8);

    }

    public String getThumbnailURL(){
        return URLEncoder.encode(path + "/s_" + uuid + "_" + imgName, StandardCharsets.UTF_8);

    }
}
