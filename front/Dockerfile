FROM node:lts-buster-slim

WORKDIR /app

ADD ./package.json ./
ADD ./package-lock.json ./

RUN npm install
ADD . /app
