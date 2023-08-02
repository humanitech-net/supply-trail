# Use the official Ubuntu image as the base image
FROM ubuntu:latest

ARG USER=humanitech
RUN useradd -m -s /bin/bash $USER

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /Services

COPY . .

RUN chown -R $USER:$USER .
USER $USER

RUN npm install
