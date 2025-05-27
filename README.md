# 🐾 Buddy Guard

<div align="center">
<img src="https://github.com/user-attachments/assets/e2e26451-56ba-4113-81f1-11313f450828" alt="대표이미지" width="300">
<div>반려동물과 보호자를 위한 스마트 케어 다이어리</div>
</div>

## 😎 프로젝트 소개

`BuddyGuard`는 반려동물의 일상을 체계적으로 관리할 수 있는 통합 케어 플랫폼입니다.  
산책 기록부터 건강 관리까지, 반려동물과의 모든 순간을 스마트하게 기록하고 관리할 수 있습니다.

- **개발 기간**: 2024.09 ~ 2024.10 (6주)
- **타겟**: 반려동물의 건강과 일상을 체계적으로 관리하고 싶은 보호자

<br/>
팀 프로젝트 종료 후 개인적으로 4주간 프로젝트 고도화 개선 작업을 진행하였습니다.

## 👷 고도화 작업 진행
### 💫 Redis 저장 로직 최적화를 통한 불필요한 메모리 사용량 약 60% 감소 [(블로그 정리글)](https://seondays.tistory.com/83)

#### 1. 이슈 상황
refresh token 엔티티에 TTL을 설정했음에도 불구, 일정 시간이 지나도 Redis에 저장된 값이 완전히 지워지지 않고 남아 있음 (hash 값은 만료되어 삭제되지만 set 값은 삭제되지 않음)

#### 2. 문제 분석
- Redis Data Redis의 Repository를 이용하여 토큰을 저장하는 과정에서 set 타입 데이터가 자동 생성됨
- TTL을 통해 저장된 키 값이 만료되더라도 생성된 set 데이터는 만료되지 않아서 생기는 문제

#### 3. 해결 방법
1.  `RedisKeyExpiredEvent`를 통해 만료 이벤트를 감지하여 만료된 키의 set 값을 정리하도록 할 수 있음
    - `@EnableRedisRepositories(enableKeyspaceEvents = EnableKeyspaceEvents.ON_STARTUP)` 옵션을 사용하여 활성화 가능
    - `@EnableKeyspaceEvents(shadowCopy = OFF)`를 사용하여 phantom copy 저장하지 않도록 할 수 있음
2. RedisTemplate 사용하여 직접 작업 ✅
    - 이 경우 아예 set 타입 데이터를 생성하지 않도록 할 수 있어 문제의 원인 제거 가능

#### 4. 방법 선택
1번 방법은 다음과 같은 단점이 있음
- 키 만료 시 이벤트를 수신하고, 남은 데이터들을 삭제하는 등 추가 작업의 오버헤드가 발생
- 이런 변경 사항 이벤트의 감지를 위한 Redis의 Pub/Sub 메시지는 손실 가능성이 있음 

이에 문제상황을 처음부터 발생시키지 않을 수 있는 방법인 `RedisTemplate`를 사용하는 방법을 선택하여 해결

<br/>

### 💫 초대 링크 가입 로직 트러블슈팅 : Redis 동시성 문제 [(블로그 정리글)](https://seondays.tistory.com/84)
#### 1. 이슈 상황
- 하나의 링크 당, 한 명의 유저가 가입하는 것이 규칙
- 하지만 짧은 시간에 하나의 초대 링크에 가입 요청이 동시에 들어오는 경우 동시성 문제로 인해 이 규칙이 지켜지지 않는 상황

#### 2. 문제 분석
- 서비스 계층 코드에서 링크 값의 조회와 삭제 사이의 간격이 존재한다. 따라서 작업 후 링크가 삭제 되기 전에 다른 스레드들에서 값을 조회하게 되어 문제가 발생함

```java
    @Transactional
    public void register(String uuidLink, Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(UserInformationNotFoundException::new);

        // !!! 조회는 여기서 !!!
        InvitationInformation invitation = invitationRepository.findById(uuidLink).orElseThrow(
                InvitationLinkExpiredException::new);

        Pet pet = petRepository.findById(invitation.getPetId())
                .orElseThrow(PetNotFoundException::new);

        validateRegister(user.getId(), pet.getId());

        UserPet userPetGroup = UserPet.builder()
                .user(user)
                .pet(pet)
                .role(UserPetRole.GUEST).build();
                
        userPetRepository.save(userPetGroup);

        // !!! 삭제는 여기서 !!!
        invitationRepository.delete(invitation);
    }
```

#### 3. 해결 방법
1. `synchronized` 사용
2. 조회와 삭제라는 두 가지 연산을 원자성을 지니는 하나의 명령어로 만들자
    - `GETDEL` 명령어를 사용 ✅
    - Lua scripts를 작성하고 실행하도록 함

#### 4. 방법 선택
메서드에 `@Transactional`이 붙어 있고 RDB에서 작업하는 부분이 함께 포함되어 있음, 따라서 `synchronized`를 사용하는 것은 적합하지 않다고 생각했기 때문에 1번 방법은 제외!

요구되는 로직이 간단하고(조회-삭제) 이 작업을 수행하는 명령어가 존재하므로, 스크립트를 작성하지 않고 `GETDEL`를 사용해 문제를 해결했다.

<br/>

### 💫 초대 링크 가입 로직 트러블슈팅 : 예외 발생 시 Redis 작업이 롤백되지 않는 문제 [(블로그 정리글)](https://seondays.tistory.com/85)
#### 1. 이슈 상황
- 가입 로직을 처리하는 `register()`에서 링크 값 조회-삭제 로직 이후 코드에서 예외가 발생하여 롤백되는 경우, 삭제된 링크 값이 롤백되지 않고 사라지고 있음
-  Redis 작업도 문제 발생 시 롤백될 수 있도록 트랜잭션 관련 설정이 필요해 보임 &rarr; Redis 트랜잭션 활성화를 하자

#### 2. 문제 분석
`@Transactional`이 RDB에서의 트랜잭션 개념을 서포트하기 위해 만들어졌기 때문에, 기본적으로 Redis에는 영향을 끼치지 못하는 것이 문제가 되었다. Redis에서의 트랜잭션은 여타 RDB들과는 다소 다르게 작동하기 때문이다.

#### 3. Redis에서의 트랜잭션 개념

redis에서의 트랜잭션 개념은 `명령어 그룹을 한 번에 실행하는 것`으로, `MULTI`, `EXEC`, `DISCARD` 및 `WATCH` 명령을 중심으로 한다.
간략하게 트랜잭션 작업 과정을 정리해보면 다음과 같다.

1. `MULTI` 명령을 사용하여 트랜잭션을 시작
2. 이제 여러가지 명령을 입력하여 실행 대기시킬 수 있음
3. 명령들은 바로 실행되는 것이 아니라 큐에 대기  (`QUEUED`)
4. `EXEC` 명령어를 호출하여 쌓인 큐 내부 명령들을 실행
5. 만일 문제가 생기면 `DISCARD`를 통해 쌓인 명령어를 실행하지 않도록 함

#### 4. 해결 방법
> If you want `RedisTemplate` to make use of Redis transaction when using `@Transactional` or `TransactionTemplate`, you need to be explicitly enable transaction support for each `RedisTemplate` by setting `setEnableTransactionSupport(true)`

`template.setEnableTransactionSupport(true);` 설정을 통해 명시적으로 트랜잭션 지원 활성화 하기

<br/>

### 💫 초대 링크 가입 로직 트러블슈팅 : Redis 트랜잭션 활성화 시 값이 조회되지 않는 문제 [(블로그 정리글)](https://seondays.tistory.com/86)
#### 1. 이슈 상황
- 3번 이슈 `초대 링크 가입 로직 트러블슈팅 : 예외 발생 시 Redis 작업이 롤백되지 않는 문제`를 해결하는 과정에 있어 Redis 트랜잭션을 활성화하게 되었음
- 그런데 트랜잭션 활성화 이후, Redis에서 값을 조회해오는 `findById` 메서드의 조회 결과값이 `null`로 조회되는 이슈 발생
    - 비활성화 시에는 정상적으로 조회되던 값이 활성화 이후 `null`이 되는 것으로 보아 트랜잭션 적용 문제로 보임
 
#### 2. 문제 분석
- Redis의 트랜잭션은 간단하게 `MULTI`로 명령어들을 모아두었다가 `EXEC`로 한번에 실행되도록 하는 개념
- 조회를 위해 `GET`를 실행하더라도 그 순간에 바로 실행되는 것이 아니고 `EXEC`전까지 대기 &rarr; 따라서 `findById`실행 시 `GET` 명령어가 큐에 쌓이기만 하기 때문에 값이 조회되지 못하고 `null`값이 나오게 된 것
- 따라서 단순히 Redis 트랜잭션을 활성화하는 것만으로는 문제가 된다

#### 3. 해결 방법
최우선 목표는 처음 계획했던 대로 아래 두 가지 기능을 충족하는 것
- 하나의 초대 링크로 경쟁이 일어나는 상황이어도, 하나의 링크로는 한 사람만 가입되어야 한다 (동시성 문제)   🆗
- 트랜잭션이 실패하는 경우 Redis 값도 다시 롤백되어야 한다 (트랜잭션 작업의 원자성 문제) ❗️ &rarr; 현재 해결 필요

아예 로직을 변경하여 메서드에서 링크를 바로 조회 & 삭제하도록 한 후에, 문제가 생겨서 트랜잭션이 롤백되는 경우에만 삭제했던 링크를 다시 저장시키는 **보상 매커니즘** 적용

- `TransactionSynchronization`의 `afterCompletion`를 이용, 결과가 롤백일 경우 감지해서 삭제 값을 다시 저장하도록 함 ✅ 
- 주의할 점은 반드시 방금 링크로 가입한 유저일 경우에만 보상 매커니즘이 작동해야 한다는 것이다. 따라서 `status == STATUS_ROLLED_BACK`를 체크하자

```java
// (메서드 본문 다른 코드 생략)
    @Transactional
    public void register(String uuid, Long userId) {
        TransactionSynchronizationManager.registerSynchronization(
                new TransactionSynchronization() {
                    @Override
                    public void afterCompletion(int status) {
                        if (status == STATUS_ROLLED_BACK) {
                            if (finalInvitationDeleted) {
                                invitationRepository.restore(uuid, invitation);
                            }
                        }
                    }
                });
    }
```

<br/>

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

- [📚 기존 레포지토리](https://github.com/myBuddyGuard/BuddyGuard)
- [📋 Notion](https://profuse-aftershave-ac6.notion.site/318eaff407e04f3f833343dad7877c83)
- [📋 GitHub 이슈 & 프로젝트](https://github.com/orgs/myBuddyGuard/projects/2)
- ~~[🐾 서비스 바로가기](https://buddyguard.site/)~~ 비용 문제로 배포 중단
- ~~[📖 API 문서](https://api.buddyguard.site/swagger-ui/index.html#/)~~ 비용 문제로 배포 중단
  <br/>

## 📱 주요 기능

### 1. 카카오 소셜 로그인

- 간편한 회원가입 및 로그인

  <img src="https://github.com/user-attachments/assets/ca9c2d9f-8129-4c65-9530-476d5abb0a87" alt="1-login" width="200">

### 2. 반려동물 산책 관리

|                                                    실시간 위치 트래킹                                                    |                                              현재위치로 이동 및 핀 닫기                                              |                                             산책 시간, 거리 측정 후 저장                                             |
| :----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/33d9ed39-e23c-4a16-85ab-5ce017e79a13" alt="2-tracking" width="200"> | <img src="https://github.com/user-attachments/assets/15606a3d-a33e-495d-97c1-b3aa3a71598c" alt="2-move" width="200"> | <img src="https://github.com/user-attachments/assets/7b19b21d-eb8f-46af-bdab-a688e88e7f22" alt="2-save" width="200"> |

|                    - 주간 기록확인<br/>- 산책 기록 시각화 (그래프)<br/>- 과거 산책 경로 지도 확인                    |                            - 월간 기록확인<br/>- 산책 기록 시각화 (그래프)<br/>- 노트 수정                            |                                   - 전체 기록확인<br/>- 산책 기록 시각화 (캘린더)                                   |
| :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/6e26b8d6-5154-4dcc-a259-98f4fee40748" alt="2-week" width="200"> | <img src="https://github.com/user-attachments/assets/7a1dc81e-877e-4a2d-a1a5-914a9312b335" alt="2-month" width="200"> | <img src="https://github.com/user-attachments/assets/8b548bef-771f-4699-8de9-22da1b0c18f5" alt="2-all" width="200"> |

### 3. 건강 관리

- 체중 관리
- 사료/간식 급여 기록
- 급여 시간 관리

<img src="https://github.com/user-attachments/assets/fad29323-61fc-4ee3-a3ae-e304d696166a" alt="3-health" width="200">

### 4. 일정 관리

- 병원, 예방접종 등 일정 등록
- 캘린더 뷰 및 알림 기능

<img src="https://github.com/user-attachments/assets/f91bfbcd-7392-4395-a8ca-46102a20e8d5" alt="4-plan" width="200">

## 💻 UI/UX

### 반응형 디자인

<img src="https://github.com/user-attachments/assets/245b6a9d-0b30-4e1d-a9c4-8e45ae92cd75" alt="responsive-layout" width="500">

- mobile 우선 설계
- PC에서는 mobile 프레임으로 제공

### 테마 설정

- 라이트/다크 모드 지원
- 시스템 설정 연동
- 수동 테마 변경 가능

|                                                          mobile                                                           |                                                          PC                                                           |
| :-----------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/5f86f4ae-3fde-4fd1-bb42-3c4c7e3dd842" alt="mobile-dark" width="200"> | <img src="https://github.com/user-attachments/assets/83a8ac66-8095-477a-8974-8e4a7d84e45f" alt="pc-dark" width="500"> |

<br/>

## 🔧 기술 스택

### Frontend

- **Config** : <img src="https://img.shields.io/badge/Vite-646CFF?style=&logo=Vite&logoColor=white"><img src="https://img.shields.io/badge/pnpm-F69220?style=&logo=pnpm&logoColor=white">

- **Core** : <img src="https://img.shields.io/badge/TypeScript-3178C6?style=&logo=TypeScript&logoColor=white"><img src="https://img.shields.io/badge/React-61DAFB?style=&logo=React&logoColor=white"><img src="https://img.shields.io/badge/React Router-CA4245?style=&logo=ReactRouter&logoColor=white">

- **State Management** : <img src="https://img.shields.io/badge/Zustand-3E67B1?style=&logo=Zustand&logoColor=white"><img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=&logo=ReactQuery&logoColor=white">

- **Form & Validation** : <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=&logo=ReactHookForm&logoColor=white"><img src="https://img.shields.io/badge/Zod-3E67B1?style=&logo=Zod&logoColor=white">

- **Styling** : <img src="https://img.shields.io/badge/styled components-DB7093?style=&logo=styledComponents&logoColor=white">

- **Tools** : <img src="https://img.shields.io/badge/Storybook-FF4785?style=&logo=Storybook&logoColor=white">

### Backend

- **Core** : <img src="https://img.shields.io/badge/Java-007396?style=&logo=OpenJDK&logoColor=white"> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=&logo=Spring%20Boot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Data JPA-6DB33F?style=&logo=Spring&logoColor=white"> <img src="https://img.shields.io/badge/Spring Data Redis-6DB33F?style=&logo=Spring&logoColor=white">

- **Database** : <img src="https://img.shields.io/badge/MySQL-4479A1?style=&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=&logo=Redis&logoColor=white">

- **Security** : <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=&logo=Spring%20Security&logoColor=white"> <img src="https://img.shields.io/badge/OAuth2-3C7EBB?style=&logo=OAuth&logoColor=white">

- **Infrastructure** : <img src="https://img.shields.io/badge/AWS EC2-232F3E?style=&logo=amazonec2&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=&logo=Docker&logoColor=white">

- **Documentation** : <img src="https://img.shields.io/badge/Swagger-85EA2D?style=&logo=swagger&logoColor=black"> <img src="https://img.shields.io/badge/Springdoc-6DB33F?style=&logo=spring&logoColor=white">


## 🏗️ 아키텍처

### Frontend

- Atomic Design Pattern 적용
- 모바일 우선 반응형 디자인

#### 디자인 패턴

- **Atomic Design Pattern** 적용
  - `atoms`: 버튼, 입력 필드 등 최소 단위의 컴포넌트
  - `molecules`: 여러 개의 atom을 결합한 복잡한 컴포넌트
  - `organisms`: molecules를 조합한 큰 단위의 컴포넌트
  - `templates`: 페이지 레이아웃을 담당하는 컴포넌트
  - `pages`: 실제 라우팅되는 페이지 컴포넌트

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

<img width="1064" alt="스크린샷 2024-11-05 오후 11 55 29" src="https://github.com/user-attachments/assets/15eede39-9503-479a-847e-5c85fe4aa9a4">
