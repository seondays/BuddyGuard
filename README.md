# 🐾 Buddy Guard

<div align="center">
<img src="https://github.com/user-attachments/assets/e2e26451-56ba-4113-81f1-11313f450828" alt="대표이미지" width="300">
<div>반려동물과 보호자를 위한 스마트 케어 다이어리</div>
</div>

## 😎 프로젝트 소개

`BuddyGuard`는 반려동물의 일상을 체계적으로 관리할 수 있는 통합 케어 플랫폼입니다.  
산책 기록부터 건강 관리까지, 반려동물과의 모든 순간을 스마트하게 기록하고 관리할 수 있습니다.

-   **개발 기간**: 2024.09 ~ 2024.10 (6주)
-   **타겟**: 반려동물의 건강과 일상을 체계적으로 관리하고 싶은 보호자

## 👥 개발팀 소개

|                                                   Frontend                                                   |                                                 Frontend                                                  |
| :----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/96780693?v=4" width=150>](https://github.com/minjeongHEO) | [<img src="https://avatars.githubusercontent.com/u/110621233?v=4" width=150>](https://github.com/Jinga02) |
|                                    [우디](https://github.com/minjeongHEO)                                    |                                   [재화니](https://github.com/Jinga02)                                    |

|                                                  Backend                                                   |                                                 Backend                                                  |                                                  Backend                                                   |
| :--------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/110711591?v=4" width=150>](https://github.com/seondays) | [<img src="https://avatars.githubusercontent.com/u/85946481?v=4" width=150>](https://github.com/shimbaa) | [<img src="https://avatars.githubusercontent.com/u/140429591?v=4" width=150>](https://github.com/jieunjin) |
|                                    [데이](https://github.com/seondays)                                     |                                    [심바](https://github.com/shimbaa)                                    |                                     [진](https://github.com/jieunjin)                                      |

## 🔗 Links

-   [🐾 서비스 바로가기](https://buddyguard.site/)
-   [📖 API 문서](https://api.buddyguard.site/swagger-ui/index.html#/)
-   [📋 Notion](https://profuse-aftershave-ac6.notion.site/318eaff407e04f3f833343dad7877c83)

<br/>

## 🚀 시작하기

```bash
# 저장소 클론
git clone https://github.com/myBuddyGuard/BuddyGuard.git

# frontend 실행
cd fe
npm install -g pnpm@9.9.0
pnpm install
pnpm dev
```

<br/>

## 📱 주요 기능

### 1. 카카오 소셜 로그인

-   간편한 회원가입 및 로그인

    <img src="https://github.com/user-attachments/assets/ca9c2d9f-8129-4c65-9530-476d5abb0a87" alt="1-login" width="200">

### 2. 반려동물 산책 관리

|                                                    실시간 위치 트래킹                                                    |                                              현재위치로 이동 및 핀 닫기                                              |                                             산책 시간, 거리 측정 후 저장                                             |
| :----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/33d9ed39-e23c-4a16-85ab-5ce017e79a13" alt="2-tracking" width="200"> | <img src="https://github.com/user-attachments/assets/15606a3d-a33e-495d-97c1-b3aa3a71598c" alt="2-move" width="200"> | <img src="https://github.com/user-attachments/assets/7b19b21d-eb8f-46af-bdab-a688e88e7f22" alt="2-save" width="200"> |

|                    - 주간 기록확인<br/>- 산책 기록 시각화 (그래프)<br/>- 과거 산책 경로 지도 확인                    |                            - 월간 기록확인<br/>- 산책 기록 시각화 (그래프)<br/>- 노트 수정                            |                                   - 전체 기록확인<br/>- 산책 기록 시각화 (캘린더)                                   |
| :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/6e26b8d6-5154-4dcc-a259-98f4fee40748" alt="2-week" width="200"> | <img src="https://github.com/user-attachments/assets/7a1dc81e-877e-4a2d-a1a5-914a9312b335" alt="2-month" width="200"> | <img src="https://github.com/user-attachments/assets/8b548bef-771f-4699-8de9-22da1b0c18f5" alt="2-all" width="200"> |

### 3. 건강 관리

-   체중 관리
-   사료/간식 급여 기록
-   급여 시간 관리

<img src="https://github.com/user-attachments/assets/fad29323-61fc-4ee3-a3ae-e304d696166a" alt="3-health" width="200">

### 4. 일정 관리

-   병원, 예방접종 등 일정 등록
-   캘린더 뷰 및 알림 기능

<img src="https://github.com/user-attachments/assets/f91bfbcd-7392-4395-a8ca-46102a20e8d5" alt="4-plan" width="200">

## 💻 UI/UX

### 반응형 디자인

<img src="https://github.com/user-attachments/assets/245b6a9d-0b30-4e1d-a9c4-8e45ae92cd75" alt="responsive-layout" width="500">

-   mobile 우선 설계
-   PC에서는 mobile 프레임으로 제공

### 테마 설정

-   라이트/다크 모드 지원
-   시스템 설정 연동
-   수동 테마 변경 가능

|                                                          mobile                                                           |                                                          PC                                                           |
| :-----------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/5f86f4ae-3fde-4fd1-bb42-3c4c7e3dd842" alt="mobile-dark" width="200"> | <img src="https://github.com/user-attachments/assets/83a8ac66-8095-477a-8974-8e4a7d84e45f" alt="pc-dark" width="500"> |

<br/>

## 🔧 기술 스택

### Frontend

-   **Config** : <img src="https://img.shields.io/badge/Vite-646CFF?style=&logo=Vite&logoColor=white"><img src="https://img.shields.io/badge/pnpm-F69220?style=&logo=pnpm&logoColor=white">

-   **Core** : <img src="https://img.shields.io/badge/TypeScript-3178C6?style=&logo=TypeScript&logoColor=white"><img src="https://img.shields.io/badge/React-61DAFB?style=&logo=React&logoColor=white"><img src="https://img.shields.io/badge/React Router-CA4245?style=&logo=ReactRouter&logoColor=white">

-   **State Management** : <img src="https://img.shields.io/badge/Zustand-3E67B1?style=&logo=Zustand&logoColor=white"><img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=&logo=ReactQuery&logoColor=white">

-   **Form & Validation** : <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=&logo=ReactHookForm&logoColor=white"><img src="https://img.shields.io/badge/Zod-3E67B1?style=&logo=Zod&logoColor=white">

-   **Styling** : <img src="https://img.shields.io/badge/styled components-DB7093?style=&logo=styledComponents&logoColor=white">

-   **Tools** : <img src="https://img.shields.io/badge/Storybook-FF4785?style=&logo=Storybook&logoColor=white">

### Backend

[백엔드 스택 정보]

## 🏗️ 아키텍처

### Frontend

-   Atomic Design Pattern 적용
-   모바일 우선 반응형 디자인

#### 디자인 패턴

-   **Atomic Design Pattern** 적용
    -   `atoms`: 버튼, 입력 필드 등 최소 단위의 컴포넌트
    -   `molecules`: 여러 개의 atom을 결합한 복잡한 컴포넌트
    -   `organisms`: molecules를 조합한 큰 단위의 컴포넌트
    -   `templates`: 페이지 레이아웃을 담당하는 컴포넌트
    -   `pages`: 실제 라우팅되는 페이지 컴포넌트

#### 주요 디렉토리 구조

```
📦 be
📦 .vscode
 ┗ 📜setting.json       # 저장 시 자동 포맷팅 설정
📦 fe                   # 프로젝트 FE 루트 (buddyGuard/fe)
 ┣ 📂.storybook         # 컴포넌트 문서화 설정
 ┣ 📂public             # 정적 리소스 (이미지, 아이콘 등)
 ┗ 📂src
   ┣ 📂apis             # API 통신 관련 로직
   ┣ 📂components       # Atomic Design 기반 컴포넌트
   ┃ ┣ 📂atoms          # 기본 UI 요소
   ┃ ┣ 📂molecules      # 기능 단위 컴포넌트
   ┃ ┣ 📂organisms      # 섹션 단위 컴포넌트
   ┃ ┣ 📂templates      # 레이아웃 템플릿
   ┃ ┗ 📂pages          # 페이지 컴포넌트
   ┣ 📂hooks            # 커스텀 훅
   ┣ 📂stores           # 전역 상태 관리 (Zustand)
   ┣ 📂styles           # 글로벌 스타일, 테마 설정
   ┗ 📂utils            # 유틸리티 함수
```

#### 상세 코딩 컨벤션

자세한 코딩 컨벤션은 [[FE] 개발 전략 문서](https://profuse-aftershave-ac6.notion.site/FE-f4469aa1ffd74e12bda321b7f466d97e?pvs=74)를 참고해주세요.

### Backend

[백엔드 아키텍처 정보]
