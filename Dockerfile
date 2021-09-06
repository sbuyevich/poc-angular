FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/ach /usr/share/nginx/html