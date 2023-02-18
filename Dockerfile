FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

RUN mkdir /app/dist/img

EXPOSE 3000

CMD ["yarn", "start"]