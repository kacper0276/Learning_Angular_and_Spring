package com.example.fileservice.fasada;

import com.example.fileservice.entity.ImageResponse;
import com.example.fileservice.mediator.MediatorImage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/v1/image")
@RequiredArgsConstructor
public class ImageController {
    private final MediatorImage mediatorImage;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> saveFile(@RequestBody MultipartFile multipartFile) {
       return mediatorImage.saveImage(multipartFile);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<ImageResponse> deleteFile(@RequestParam String uuid) {
        return mediatorImage.delete(uuid);
    }
}
