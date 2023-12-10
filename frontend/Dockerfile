FROM node:alpine

WORKDIR /frontend
COPY public/ /frontend/public
COPY src/ /frontend/src
COPY package.json /frontend/package.json

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]