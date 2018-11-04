FROM node:alpine as builder
RUN apk update && apk add --no-cache make git
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package.json package-lock.json  /app/
RUN npm install -g @angular/cli
RUN cd /app && npm install
# Copy project files into the docker image
COPY .  /app
RUN cd /app && npm run prod

# STEP 2 build a small nginx image with static website
#FROM nginx:alpine
FROM nginx:stable
## Remove default nginx website
# RUN apk add --update sudo
#RUN rm -rf /usr/share/nginx/html/*
## From 'builder' copy website to default nginx public folder
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=builder /app/dist /usr/share/nginx/html
#COPY start-nginx.sh /
#RUN mv /usr/share/nginx/html/web-application/* /usr/share/nginx/html/
#RUN chmod 777 /etc/nginx -R
#RUN /etc/init.d/name
#RUN chmod 777 /var/cache/nginx -R
#RUN chmod 777 /var/run/nginx.pid 
#USER root
#RUN rm -rf /usr/share/nginx/html/web-application
# EXPOSE 80
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx

COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN mv /usr/share/nginx/html/web-application/* /usr/share/nginx/html/
RUN rm -rf /usr/share/nginx/html/web-application
EXPOSE 8081
#CMD ["nginx", "-g", "daemon off;"]
# CMD ["/start-nginx.sh"]
# CMD /usr/sbin/nginx -g "daemon off;"
