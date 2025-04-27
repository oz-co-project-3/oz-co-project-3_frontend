FROM node:23-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# build-args와 같이 사용해야함
# 빌드 시 환경 변수 받기
# ARG NEXT_PUBLIC_BASE_URL

# 디버깅용 출력
# RUN echo "ENV Debug: NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}"

# 환경 변수 설정
# ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

COPY . .
RUN npm run build

FROM node:23-alpine
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 환경 변수 추가해주기

EXPOSE 3000

CMD ["node", "server.js"]

