## 시장에 가면
> IN SOPT sopkathon project

> **오프라인에 있는 재래시장 사장님들의 명함을 쉽고 빠르게 만들어주는 서비스**

변화는 멀게 느껴지지만 우리에게 가장 밀접하게, 서서히 하지만 빠르게 일어난다. 하지만 이런 조용하면서도 급격한 변화에 따라오지 못하는 분들이 있다. 우리 조는 소외를 받고 있는 사회의 한켠에 집중하고자 했다. 온라인 시장이 활성화되고 있는 가운데 오프라인에만 머물러 있는 재래시장의 상황을 변화시킬 수 있는 작은 트리거, 온라인 시장 명함이라는 가치를 제안한다.

## 📌 ERD
<img width="449" alt="스크린샷 2022-11-20 오전 12 10 48" src="https://user-images.githubusercontent.com/43312096/202857721-162fde3a-a75e-4000-ba14-e85d966e7189.png">

## 📌 역할 분담
### 정정빈
- 
### 양지영
- 
### 강수현
- 

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
