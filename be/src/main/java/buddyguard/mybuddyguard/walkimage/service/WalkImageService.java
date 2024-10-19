package buddyguard.mybuddyguard.walkimage.service;

import buddyguard.mybuddyguard.walkimage.entity.WalkS3Image;
import org.springframework.web.multipart.MultipartFile;

public interface WalkImageService {
    WalkS3Image uploadWalkImage(MultipartFile multipartFile);

    WalkS3Image getWalkImageById(Long id);

    // S3에 폴더(디렉터리)를 생성
    void createDir(String bucketName, String folderName);
}


