CREATE TABLE WALK_RECORD_PET (
                                 walk_record_id BIGINT NOT NULL,
                                 pet_id BIGINT NOT NULL,
                                 PRIMARY KEY (walk_record_id, pet_id)
);
