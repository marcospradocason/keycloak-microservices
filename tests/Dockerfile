FROM node:12.14.0-alpine

ENV UID 1000

##RUN apt install bash
RUN apk add bash

USER 0

RUN mkdir -p /home/node/app

WORKDIR /home/node/app