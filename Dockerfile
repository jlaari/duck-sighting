FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g bower gulp 

COPY . /usr/src/app/
RUN rm -rf /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

USER node
RUN npm install
RUN npm run build -- --env=prod
ENV PORT 8081  
CMD [ "npm", "start" ]
EXPOSE 8081