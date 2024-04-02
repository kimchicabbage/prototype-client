# Nginx 공식 이미지를 기반으로 합니다.
FROM nginx

# Nginx의 기본 설정을 삭제합니다.
RUN rm -rf /etc/nginx/conf.d/*

# 호스트 머신의 빌드 파일을 컨테이너 내부의 /usr/share/nginx/html에 복사합니다.
COPY build /usr/share/nginx/html

# Nginx 설정 파일을 컨테이너 내부의 /etc/nginx/conf.d에 복사합니다.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너가 80번 포트를 사용할 수 있도록 열어줍니다.
EXPOSE 80

# Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
