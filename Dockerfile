FROM node:18-alpine AS build

WORKDIR /app

COPY package.*json ./

RUN npm i

FROM node:18-alpine AS runtime

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]