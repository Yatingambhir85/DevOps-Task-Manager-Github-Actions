FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian13:nonroot AS runtime

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["backend/server.js"]
