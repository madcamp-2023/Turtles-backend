# 거북이주의



## 모니터 앞에서 많은 시간을 보내는 개발자들을 위한 '시작 페이지'

---

- GitHub SDK를 이용하여 GitHub 로그인이 가능합니다.
- 일정 시간마다 건강 관련 알림을 수신하고, 모니터와 얼굴 간의 거리가 가까워질 때 알림을 수신할 수 있습니다.
- 매일 매일의 to-do 리스트를 관리하고, 

---

### a. 개발 팀원

Madcamp Week-3 1분반

- 박은수 - 숙명여자대학교 컴퓨터과학전공 21학번
- 안시현 - KAIST 전기및전자공학부 20학번

---

### b. 개발 환경

- Language

  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
- DB

  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
- IDE

  <img src="https://img.shields.io/badge/VS code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
- OS : Web

---

### c. 어플리케이션 소개

### Login
(사진)

### Major Features

- 로그인 버튼을 누르면 GitHub 로그인 화면으로 넘어갑니다.
- 로그인 과정을 거치면 메인 화면으로 이동합니다.
- 브라우저에 로그인 기록이 남아 있을 경우, 곧바로 메인 화면으로 이동합니다.

### 기술 설명

- GitHub 서버와의 통신으로 autorization_code를 받습니다.
- autorization_code를 GitHub 서버에 보내 access_token을 받고, 이를 다시 GiHub 서버에 보내 user에 대한 정보를 받습니다. 받은 user 정보를 DB 및 브라우저에 저장합니다.

### Main Page
(사진)

### Major Features

- 

### 기술 설명

- 



Backend : https://github.com/madcamp-2023/Turtles-backend.git
