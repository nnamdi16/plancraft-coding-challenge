FROM node:16-alpine as base

FROM base as builder

# deps for post-install scripts
RUN apk add --update --no-cache \
    python3 \
    make \
    git \
    g++

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

FROM base

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY . .

# RUN NODE_ENV=production yarn run build

EXPOSE 30100


# start the application
CMD [ "yarn", "run", "dev" ]

# Trigger build
