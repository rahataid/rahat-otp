# Install dependencies only when needed
FROM node:18-alpine3.17 AS devdeps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production && yarn cache clean
COPY . ./
CMD ["yarn", "stage"]