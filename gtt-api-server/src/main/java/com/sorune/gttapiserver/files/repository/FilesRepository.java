package com.sorune.gttapiserver.files.repository;

import com.sorune.gttapiserver.files.Entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FilesRepository extends JpaRepository<Files, Long> {

    @Query("SELECT f FROM Files f WHERE f.fileType LIKE '%news%'")
    List<Files> findNewsByFileType();

}
