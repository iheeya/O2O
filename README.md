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
  <p><b>SSAFY 11기 2학기 공통 프로젝트</b></p>
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
   - 물건을 선택하면 해당 물건이 있는 사물함의 문을 자동으로 열리도록 설정
    <div align="center">
  <h3><u>키오스크</u></h3>
  <table border="1" cellpadding="10" cellspacing="0">
    <tr>
      <td align="center" width="50%"> 
   <img src="https://github.com/user-attachments/assets/a9514e17-570f-460f-958c-473a5fc6dd91"
        <br>
        <hr>
        <b>사원증 인식</b>
      </td>
      <td align="center" width="50%">
              <img src="https://github.com/user-attachments/assets/08190a62-934b-4be6-92dd-14d78e34c7ba"/>
     
<br>
        <hr>
        <b>대여</b>
      </td>
    </tr>
  </table>
</div>
2. 물품 반납
    - OCR을 이용해 사원증을 인식해 로그인
    - 사원이 대여한 내역 중 반납하고자 하는 내역 클릭
    - 카메라를 통해 반납하고자 하는 물건과 개수 인식
3.  물품 이상 신고와 등록 또한 물품 대여와 같은 프로세스로 동작. 다만, 카메라를 통한 물건 인식은 제외    
### 🖥️ 웹 페이지


## ✨ ERD
![o2oERD](https://github.com/user-attachments/assets/f7166af0-56bc-45d3-8bda-72041945826f)




