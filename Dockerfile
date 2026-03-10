FROM node:18-alpine AS build

WORKDIR /app

COPY package.*json ./

RUN npm i

FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runtime AS runtime

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]
