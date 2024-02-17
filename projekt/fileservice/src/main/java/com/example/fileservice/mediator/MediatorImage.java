package com.example.fileservice.mediator;

import com.example.fileservice.entity.ImageDTO;
import com.example.fileservice.entity.ImageEntity;
import com.example.fileservice.entity.ImageResponse;
import com.example.fileservice.exceptions.FtpConnectionException;
import com.example.fileservice.service.FtpService;
import com.example.fileservice.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
@AllArgsConstructor
public class MediatorImage {
    private final FtpService ftpService;
    private final ImageService imageService;

    public ResponseEntity<?> saveImage(MultipartFile file) {
        try {
            ImageEntity imageEntity = ftpService.uploadFileToFtp(file);
            imageEntity = imageService.save(imageEntity);
            return ResponseEntity.ok(
                    ImageDTO.builder()
                            .uuid(imageEntity.getUuid())
                            .createAt(imageEntity.getCreateAt()));
        } catch (FtpConnectionException e1){
            return ResponseEntity.status(400).body(new ImageResponse("Cannot save file"));
        } catch (IOException e) {
            return ResponseEntity.status(400).body(new ImageResponse("File dont exist"));
        }

    }
}
