CREATE TABLE WALK_RECORD_PATH (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  path_id BIGINT,  -- path_id 추가
                                  latitude DOUBLE NOT NULL,
                                  longitude DOUBLE NOT NULL
);
