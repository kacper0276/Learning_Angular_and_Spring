package com.example.fileservice.service;

import com.example.fileservice.entity.ImageEntity;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.UUID;


@Service
public class FtpService {

    @Value("${ftp.server}")
    private String FTP_SERVER;
    @Value("${ftp.username}")
    private String FTP_USERNAME;
    @Value("${ftp.password}")
    private String FTP_PASSWORD;
    @Value("${ftp.origin}")
    private String FTP_ORIGIN_DIRECTORY;
    @Value("${ftp.port}")
    private int FTP_PORT;


    public ImageEntity uploadFileToFtp(MultipartFile file) {
        try {
            FTPClient ftpClient = new FTPClient();
            ftpClient.connect(FTP_SERVER, FTP_PORT);
            ftpClient.login(FTP_USERNAME, FTP_PASSWORD);

            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            String remoteFilePath = FTP_ORIGIN_DIRECTORY + LocalDate.now() + file.getOriginalFilename();
            InputStream inputStream = file.getInputStream();
            boolean uploaded = ftpClient.storeFile(remoteFilePath, inputStream);
            inputStream.close();
            ftpClient.logout();
            ftpClient.disconnect();

            if (!uploaded) {
                throw new RuntimeException();
            }

            return ImageEntity.builder()
                    .path(remoteFilePath)
                    .uuid(UUID.randomUUID().toString())
                    .createAt(LocalDate.now())
                    .isUsed(false).build();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
