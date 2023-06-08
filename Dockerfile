FROM docker.io/node:lts-alpine AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY ./src ./src
COPY database.js index.js ./

CMD ["dumb-init", "node", "index.js"]