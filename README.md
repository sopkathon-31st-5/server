## 시장에 가면
> IN SOPT sopkathon project

> **오프라인에 있는 재래시장 사장님들의 명함을 쉽고 빠르게 만들어주는 서비스**

변화는 멀게 느껴지지만 우리에게 가장 밀접하게, 서서히 하지만 빠르게 일어난다. 하지만 이런 조용하면서도 급격한 변화에 따라오지 못하는 분들이 있다. 우리 조는 소외를 받고 있는 사회의 한켠에 집중하고자 했다. 온라인 시장이 활성화되고 있는 가운데 오프라인에만 머물러 있는 재래시장의 상황을 변화시킬 수 있는 작은 트리거, 온라인 시장 명함이라는 가치를 제안한다.

## 📌 ERD

<img width="574" alt="스크린샷 2022-11-20 오전 2 20 34" src="https://user-images.githubusercontent.com/43312096/202863439-7d2209d3-2bb3-4229-bb89-f1b683a50990.png">

## 📌 schema.prisma
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Card {
  id        Int       @id @default(autoincrement())
  name      String    @db.VarChar(100)
  telNumber String    @db.VarChar(20)
  introduce String    @db.VarChar(100)
  isDeliver Boolean
  imageURL  String?   @db.VarChar(300)
  userId    Int
  type      Int
  address   String    @db.VarChar(200)
  User      User      @relation(fields: [userId], references: [id], onDelete: Cascade, map: "userId")
  Weekday   Weekday[]
}

model User {
  id          Int    @id @default(autoincrement())
  name        String @db.VarChar(10)
  phoneNumber String @unique @db.VarChar(20)
  Card        Card[]
}

model Weekday {
  id     Int     @id @default(autoincrement())
  sun    Boolean @default(false)
  mon    Boolean @default(false)
  tue    Boolean @default(false)
  wed    Boolean @default(false)
  thu    Boolean @default(false)
  fri    Boolean @default(false)
  sat    Boolean @default(false)
  cardId Int
  Card   Card    @relation(fields: [cardId], references: [id], onDelete: Cascade, map: "weekday_card_id_fk")
}
```

## 📌 package.json
```
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "private": "true",
  "repository": "https://github.com/sopkathon-31st-5/server.git",
  "license": "MIT",
  "dependencies": {
    "@prisma/client": "^4.6.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "prisma": "^4.6.1"
  },
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist",
    "db:pull": "npx prisma db pull",
    "db:push": "npx prisma db push",
    "generate": "npx prisma generate"
  },
  "devDependencies": {
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.14",
    "@types/node": "^18.11.9",
    "nodemon": "^2.0.20"
  }
}
```

## 📌 서버 아키텍처
![ar](https://user-images.githubusercontent.com/70002218/202870765-cd561f05-8a85-4498-9691-18665d99b654.jpg)

## 📌 역할 분담
- 정정빈 : 명함 조회 api 개발, Repository 세팅, AWS 세팅
- 강수현 : 명함 생성 / 수정 api 개발, 아키텍처 이미지 제작
- 양지영 : 유저 생성 / 로그인 api 개발, 프로젝트 초기 세팅, 테이블 생성, 아키텍처 이미지 제작

## 📌 코드 컨벤션
- 변수명
    - Camel Case 사용
    - 함수의 경우 동사 + 명사 사용 ex) getInformation()
    - 길이는 20자로 제한
    - flag로 사용 되는 변수는 `is+동사` 로 구성
    - 약어 사용 지양
- 주석
    - `//*`, `//?` 사용 
- 비동기 함수의 사용
    - async, await 함수 사용 지향
    - Promise 사용은 지양
## 📌 Git 전략
> 1 Branch = 1 Issue = 1 PR
### Git Workflow
- git-flow를 사용합니다.(https://techblog.woowahan.com/2553/)
- default branch: `develop`

1. **이슈 생성**
2. **브랜치 생성**
3. **작업, 커밋**
4. **push**
5. **pr 작성**
6. **코드리뷰**
7. **두 명(권장), 한 명(최소) Approve 받았을 경우 셀프 merge**
8. **Delete Branch**

### Commit Convention
```
Chore: 그냥 보통 작업 있잖아요.. 잡일
Feat: 새로운 주요 기능 추가
Add: 파일 추가, 에셋 추가, etc...
Fix: 버그 수정
Del: 쓸모없는 코드, 뭐 어쩌고 삭제
Refactor: 코드 리팩토링 -> 결과는 똑같음. 근데 코드가 달라짐
Move: 프로젝트 구조 변경(폴더링 등)
Rename: 파일, 클래스, 변수명 등 이름 변경
Docs: Wiki, README 파일 수정
```
### Branch Naming
> `분류` /`#이슈 번호` - `상세 작업 내역`
```
chore/#3-Project-Setting
feat/#3-HomeView-UI
fix/#2-
refactor/#1-
```

### Issue, PR
- 템플릿 사용

## 📌 프로젝트 폴더링
```
.
├── constants
│   ├── index.ts
│   ├── response.ts
│   ├── responseMessage.ts
│   ├── statusCode.ts
│   └── tokenType.ts
├── controller
│   ├── index.ts
│   └── userController.ts
├── index.ts
├── router
│   ├── index.ts
│   └── userRouter.ts
└── service
    ├── index.ts
    └── userService.ts
```
