FROM node:14
WORKDIR /dwp_code_test
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
