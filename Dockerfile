FROM node:10-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production 
#npm install

# Bundle app source
COPY . .

EXPOSE 8090
CMD [ "node", "index.js" ]