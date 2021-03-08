FROM node:12.14.0-alpine

ARG UID=1000

##RUN apt install bash
RUN apk add bash

USER ${UID}

RUN mkdir -p /home/node/app

WORKDIR /home/node/app