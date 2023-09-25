FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
ENV REACT_APP_PORT 5000
EXPOSE $REACT_APP_PORT
CMD [ "npm", "start"]

