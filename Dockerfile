FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production 
#npm install

# Bundle app source
COPY . .

EXPOSE 8090
CMD [ "node", "server.js" ]