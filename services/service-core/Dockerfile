FROM node:lts-alpine

ARG USER=humanitech
RUN adduser -D -s /sbin/nologin $USER

WORKDIR /app

COPY ./package.json ./
COPY ./dist ./dist

RUN npm install --ignore-scripts --omit=dev

RUN chown -R $USER .
USER $USER

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
