FROM node:8-slim

RUN mkdir /app

RUN npm install nodemon -g

WORKDIR /app
COPY . .
#ADD . .

RUN npm install


EXPOSE 3000

CMD npm start