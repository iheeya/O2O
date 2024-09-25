# 🗃️ 간단한 재고관리/ 비품 대여 시스템 O2O
![o2o 로고](https://github.com/user-attachments/assets/661ebc1b-d78a-4369-afb2-e983b013e2e7)

## 👋 서비스 소개
### 기획 목적
- 번번히 수기로 작성해야 하는 비품 대여 신청서와 반납 확인서, 비품 목록 장부 등!   
- 기존의 번거로움을 없애기 위해 AIoT를 이용한 무인 대여 물품 관리 사물함을 제작했습니다.
### 주요 기능 
- 저희 서비스는 키오스크와 웹 페이지에서 이용할 수 있도록 구현했습니다.   
- 사물함에서는 키오스크를 사용해 사원들이 간편하게 물건을 빌릴 수 있도록 하였습니다.
- 사용자 웹 페이지에서는 사원들이 필요한 비품 신청, 장바구니 예약 기능들을 도입해 사원들이 업무 중 필요한 비품에 대해 편하게 요청할 수 있습니다.  
- 관리자 웹 페이지에서는 비품 재고 관리, 연체자 관리, 물풍 신청 관리등을 가능하게 해 관리자가 보다 쉽게 비품을 관리할 수 있도록 만들었습니다.   

## 👋 프로젝트 소개
<div align="center">
  <p><b>프로젝트 기간</b></p>
  <p>2024.07.08 ~ 2024.08.16 (6주)</p>
  <p><b>인원:</b> 6명(BE_3, FE_3)</p>
  
</div>

## ⚒️ 사용 기술 스택 및 협업 도구
<div align="center">
  <p><b>Back-end</b></p>
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  
  <p><b>Front-end</b></p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
    <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

  <p><b>IoT</b></p>
  <img src="https://img.shields.io/badge/nvidia-76B900?style=for-the-badge&logo=nvidia&logoColor=white">      

  <p><b>Infra & CI/CD</b></p>
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white"> 
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> 
  <img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white">

  <p><b>Tool</b></p>
    <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
     <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
      <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
              <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
 
  
</div>

## ✨ git 컨벤션
- git flow 전략을 사용해 브랜치를 관리했습니다.
- 브랜치와 이슈를 함께 생성해 서로의 작업 과정을 관리했습니다.
  
## ✨ 주요 기능 및 화면
### 📱 키오스크
1. 물품 대여
   - OCR을 이용해 사원증을 인식해 로그인
     ![메인페이지](https://github.com/user-attachments/assets/73def4f4-43e4-4776-9686-f16ee14a82b4)
   - 물건을 선택하면 해당 물건이 있는 사물함의 문을 자동으로 열리도록 설정
     ![대여](https://github.com/user-attachments/assets/3a87b9ef-7b5d-4139-97dd-72e47608c40c)
     ![대여 완료](https://github.com/user-attachments/assets/7c078612-6b4d-44f5-ad44-b9658a333b98)



2. 물품 반납   
    - OCR을 이용해 사원증을 인식해 로그인     
    - 사원이 대여한 내역 중 반납하고자 하는 내역 클릭    
    - 카메라를 통해 반납하고자 하는 물건과 개수 인식     
    ![반납](https://github.com/user-attachments/assets/8ad8cc7b-a16a-464b-ba26-41155b4f4e15)



3.  물품 이상 신고와 등록 또한 물품 대여와 같은 프로세스로 동작. 다만, 카메라를 통한 물건 인식은 제외       
### 🖥️ 사용자 웹 페이지
1. 물품 예약하기
  - 사용자 편의성을 위해 웹에서도 원하는 물품을 예약할 수 있도록 했습니다.
  - 장바구니 상태는 context API를 사용해 관리했습니다.
  ![예약](https://github.com/user-attachments/assets/529e5ea7-9c82-4330-9cc9-40eb01d53772)   
2. 물품 요청
  - 업무 중 필요한 물품을 바로 요청할 수 있도록 물품을 요청할 수 있는 페이지를 만들었습니다.
    ![물품 요청](https://github.com/user-attachments/assets/1d7055c4-e451-406c-b0f0-2136b36da2cc)

3. 나의 내역 조회
  - 현재 나의 대여 내역을 조회해 대여 중인 물건을 알 수 있도록 했습니다.
  - 현재 내가 예약한 물품과 남은 시간을 조회할 수 있도록 했습니다.
![예약 현황](https://github.com/user-attachments/assets/f1062bbc-e900-4b9d-904a-b165c9ba17b8)




### 🖥️ 관리자 웹 페이지   
1. 파손.분실 신고 관리   
   - 파손, 분실 신고가 들어온 물품과 그 이유를 한눈에 볼 수 있도록 했습니다.   
   - 신고에 대한 적절한 처리를 한 건수는 체크박스를 눌러 우선순위에서 배제되도록 했습니다.
     ![파손 분실신고 관리](https://github.com/user-attachments/assets/813880d5-08c2-4484-b9f4-ee2f2f9b993a)

2. 연체 이용자 관리   
   - 연체 이용자를 한눈에 관리 할 수 있도록 했습니다.
  ![연체 이용자](https://github.com/user-attachments/assets/fc930a7d-167a-4907-a235-5bf61d740ded)

3. 물건 요청 관리   
   - 요청한 물건과 사유등을 보고 요청을 수락할지, 거절할지 체크할 수 있도록 했습니다.   
    ![물건요청](https://github.com/user-attachments/assets/15a7f8b4-4e04-4937-9e5f-f4eb4add9c71)

4. 물품 추가   
   - 새로 들어온 물건을 등록할 수 있도록 했습니다.
    ![물품 추가](https://github.com/user-attachments/assets/44636c31-9b03-4ecf-a897-f9a2cac49ae4)

5. 이용자 등록   
    - 회사에 입사자가 생길 경우 이용자가 사원을 등록할 수 있도록 했습니다.
     ![이용자 등록](https://github.com/user-attachments/assets/6aaeed75-a1ef-4390-8e99-a62b3d4307f1)
 



## ✨ ERD
![o2oERD](https://github.com/user-attachments/assets/f7166af0-56bc-45d3-8bda-72041945826f)




