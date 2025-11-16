# Simple static site served with nginx
FROM nginx:stable-alpine

# Remove default nginx index (optional) and copy site
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
