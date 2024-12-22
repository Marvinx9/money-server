FROM node:20.14.0-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build

FROM node:20.14.0-alpine AS prod
WORKDIR /app

RUN addgroup -g 1001 -S production
RUN adduser -S backend -u 1001

COPY package*.json ./
COPY tsconfig.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# COPY --chown=backend:production docker-entrypoint.sh ./

USER backend
EXPOSE ${PORT}
EXPOSE ${DB_PORT}

CMD ["node", "dist/main.js"]