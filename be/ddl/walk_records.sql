CREATE TABLE WALK_RECORDS (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              buddy_ids VARCHAR(255) NOT NULL,
                              start_date DATE NOT NULL,
                              end_date DATE NOT NULL,
                              start_time TIME NOT NULL,
                              end_time TIME NOT NULL,
                              total_time VARCHAR(20) NOT NULL,
                              note VARCHAR(255) NOT NULL,
                              center_position VARCHAR(255) NOT NULL,
                              map_level INT NOT NULL,
                              path TEXT NOT NULL,
                              path_image_id BIGINT NOT NULL,
                              distance DOUBLE(10, 3) NOT NULL
);
