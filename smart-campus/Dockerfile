FROM node:alpine as builder
RUN apk update && apk add --no-cache make git
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
    openssh \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
# Create app directory
WORKDIR /app
# Install app dependencies
# COPY package.json package-lock.json  /app/
RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts
RUN git clone git@gitlab.com:scyclone/thesis/web-platform.git
RUN npm install -g @angular/cli
RUN  npm install npm@latest -g
RUN rm -rf /app/web-platform/smart-campus/node_modules
RUN rm -rf /app/web-platform/smart-campus/package-lock.json
RUN cd /app/web-platform/smart-campus && npm install
# Copy project files into the docker image
# COPY .  /app
RUN cd /app/web-platform/smart-campus &&  npm install typescript@">=3.1.1 <3.2"
RUN cd /app/web-platform/smart-campus && npm run prod

# STEP 2 build a small nginx image with static website
FROM nginx:stable

RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx

COPY --from=builder /app/web-platform/smart-campus/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/web-platform/smart-campus/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/web-platform/smart-campus/dist /usr/share/nginx/html
RUN mv /usr/share/nginx/html/smart-campus/* /usr/share/nginx/html/
RUN rm -rf /usr/share/nginx/html/smart-campus
EXPOSE 8081