FROM node:8-slim

RUN mkdir /app
RUN npm install npm-run-all -g

WORKDIR /app
COPY . .
#ADD . .
RUN npm install

EXPOSE 8080

CMD npm start