FROM node:11-alpine

WORKDIR ./

COPY package.json .

RUN npm install --quiet

COPY . .
 
RUN npm run build

EXPOSE 8080

CMD npm start