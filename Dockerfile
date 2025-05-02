FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .
COPY .env .env

RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]
