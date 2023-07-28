# Use the official Ubuntu image as the base image
FROM ubuntu:latest


RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

COPY . /Services
WORKDIR /Services

RUN npm install
RUN npm run build
