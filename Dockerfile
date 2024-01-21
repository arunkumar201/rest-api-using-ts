FROM ubuntu
 

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY package.json  package.json
COPY package-lock.json  package-lock.json
COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .env 

COPY nodemon.json nodemon.json

RUN npm install -g ts-node nodemon
RUN npm install ts-node --save-dev
RUN npm install typescript -g 
RUN npm install typescript --save-dev
ENV PORT 8000
ENV SECRET 123
ENV ADMIN_EMAIL admin@gmail.com

EXPOSE 8000:8000

CMD ["nodemon", "src/server.ts"]
