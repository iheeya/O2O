# 가져올 이미지를 정의
FROM node:20 AS builder
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
#RUN ls -al
COPY package.json package-lock.json ./
# 명령어 실행 (의존성 설치)
RUN ls -al
RUN npm install
RUN ls -al
COPY . .
RUN npm run build

# /app/build의 내용 확인
RUN ls -al /app/build

FROM nginx:alpine
# Nginx가 수신 대기할 포트 노출
#EXPOSE 80
# 필요에 따라 Node.js 애플리케이션의 포트를 노출
#EXPOSE 3000
RUN ls -al


COPY --from=builder /app/build /usr/share/nginx/html
#RUN ls -al /usr/share/nginx/html/kiosk

#RUN ls -al /usr/share/nginx/html
CMD ["nginx", "-g","daemon off;"]
