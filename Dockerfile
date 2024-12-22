# Estágio de compilação

FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build

# Estágio de produção

FROM node:20.14.0-alpine AS prod

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
