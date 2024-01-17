# 거북이주의



## 모니터 앞에서 많은 시간을 보내는 개발자들을 위한 '시작 페이지'

---

- GitHub SDK를 이용하여 GitHub 로그인이 가능합니다.
- 일정 시간마다 건강 관련 알림을 수신하고, 모니터와 얼굴 간의 거리가 가까워질 때 알림을 수신할 수 있습니다.
- 매일 매일의 to-do 리스트를 관리하고, 

---

## a. 개발 팀원

Madcamp Week-3 1분반

- 박은수 - 숙명여자대학교 컴퓨터과학전공 21학번
- 안시현 - KAIST 전기및전자공학부 20학번

---

## b. 개발 환경

- Language

  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
- DB

  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
- IDE

  <img src="https://img.shields.io/badge/VS code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
- OS : Web

---

## c. 어플리케이션 소개

### Login
![turtle_login](https://github.com/madcamp-2023/Turtles-backend/assets/79096116/dc7b7964-2b81-4ad7-9650-ce6dfcaf95ad)


### Major Features

- 로그인 버튼을 누르면 GitHub 로그인 화면으로 넘어갑니다.
- 로그인 과정을 거치면 메인 화면으로 이동합니다.
- 브라우저에 로그인 기록이 남아 있을 경우, 곧바로 메인 화면으로 이동합니다.

### 기술 설명

- GitHub 서버와의 통신으로 autorization_code를 받습니다.
- autorization_code를 GitHub 서버에 보내 access_token을 받고, 이를 다시 GiHub 서버에 보내 user에 대한 정보를 받습니다. 받은 user 정보를 DB 및 브라우저에 저장합니다.

### Main Page
![turtle_main](https://github.com/madcamp-2023/Turtles-backend/assets/79096116/374f704d-086a-43ae-9592-eedd363922fe)


## Major Features

### 캘린더
- 지금까지의 투두 달성 기록을 확인할 수 있습니다.
- 투두 달성 개수에 따라 날짜 타일의 색깔이 다르게 나타납니다.
- 날짜를 클릭하면 해당 날짜의 투두 기록을 팝업으로 확인할 수 있습니다.

### 오늘의 건강 관리
- 오늘 건강을 위해 해야할 일들을 투두리스트 형식으로 관리할 수 있습니다.
- '+' 버튼을 누르면 아이콘을 선택하고 내용을 입력하여 새로운 할 일을 추가할 수 있습니다.
- 각 항목 위에서 우클릭을 하면 삭제 버튼이 생겨납니다. 버튼을 눌러 항목을 삭제할 수 있습니다.
- 체크박스를 눌러 각 할일의 완료 상태를 표시할 수 있습니다.

### 나의 알림
- '스트레칭 알림', '산책 알림', '물 마시기 알림', '눈 운동 알림'을 설정한 경우, 1시간에 한 번씩 알림을 받을 수 있습니다.
- '화면과의 거리 조절 알림'을 설정한 경우 웹캠을 이용하여 화면-얼굴 간 거리를 추적하고, 일정 거리 이하에 도달한 경우 알림을 받을 수 있습니다.
  
### 팔로우
- GitHub ID로 다른 사용자를 검색, 팔로우할 수 있습니다.
- 본인은 검색되지 않으며, 이미 팔로우 중인 사용자의 경우 팔로우 버튼이 비활성화 되어 있습니다.
- 팔로잉 목록에서 다른 사용자의 프로필을 클릭할 시, 해당 사용자의 캘린더와 '오늘의 건강 관리'를 볼 수 있습니다.
  
### 구글 검색
- 검색바에 검색어와 'ENTER'를 입력할 경우, 새로운 탭에서 해당하는 구글 검색 결과를 확인할 수 있습니다.
  
### 북마크
- 개발자가 자주 방문하는 웹 페이지 3곳으로 이동할 수 있는 버튼입니다.
- 각 버튼을 클릭할 시, 새로운 탭을 통해 해당 웹 페이지로 이동합니다.



### 기술 설명

- 웹캠이 받아오는 화면에서 얼굴 인식 마스크가 차지하는 비율을 통해 얼굴과 화면의 거리를 측정하고, 일정 거리보다 가까워질 경우 경고 알림을 보내줍니다.




Frontend : https://github.com/madcamp-2023/Turtles-frontend
