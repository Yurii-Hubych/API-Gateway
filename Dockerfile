FROM node:18-alpine

RUN mkdir "/apiGateway"

COPY ./package.json /apiGateway

WORKDIR /apiGateway

RUN npm install