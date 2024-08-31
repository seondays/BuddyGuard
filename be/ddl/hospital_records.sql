CREATE TABLE HOSPITAL_RECORDS
(
    id            INTEGER PRIMARY KEY AUTO_INCREMENT, -- 기본 키, 자동 증가
    user_id       INTEGER      NOT NULL,              -- 사용자 ID (외래 키)
    pet_id        INTEGER      NOT NULL,              -- 반려동물 ID (외래 키)
    visit_date    DATE         NOT NULL,              -- 병원 방문 날짜
    hospital_name VARCHAR(255) NOT NULL,      -- 병원 이름 (default: 병원)
    description   VARCHAR(255) NOT NULL               -- 세부 설명
);
