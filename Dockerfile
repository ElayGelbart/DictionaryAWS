FROM node:14
COPY ./serverless/back /back
RUN cd /back
WORKDIR /back
RUN npm i
CMD [ "npm run test" ]
