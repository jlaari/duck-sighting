FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN chown -R node:node /usr/src/app

USER node
RUN npm install
RUN npm run build
ENV PORT 8081  
CMD [ "npm", "start" ]
EXPOSE 8081