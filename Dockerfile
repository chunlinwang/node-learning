FROM node:buster AS base

ENV USER=root

RUN apt update 

WORKDIR /code
COPY . /code/
