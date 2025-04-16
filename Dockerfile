FROM node:23-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# 빌드 시 환경 변수 받기
# ARG NEXT_PUBLIC_API_URL

# 환경 변수 설정
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

FROM node:23-alpine
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 환경 변수 추가해주기

EXPOSE 3000

CMD ["node", "server.js"]

