FROM nginx

RUN rm -rf /etc/nginx/conf.d/*

COPY build /usr/share/nginx/html/prototype-client

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
