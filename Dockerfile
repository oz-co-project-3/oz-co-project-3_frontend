FROM node:23.3.0-alpine3.18 AS builder 
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# 도커파일의 build-args와 같이 사용해야함 (클라이언트 컴포넌트용)
# 빌드 시 환경 변수 받기
ARG NEXT_PUBLIC_EXTERNAL_BASE_URL
ARG NEXT_PUBLIC_WS_URL

# 디버깅용 출력
RUN echo "ENV Debug: NEXT_PUBLIC_EXTERNAL_BASE_URL=${NEXT_PUBLIC_EXTERNAL_BASE_URL}"
RUN echo "ENV Debug: NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}"

# 환경 변수 설정
ENV NEXT_PUBLIC_EXTERNAL_BASE_URL=$NEXT_PUBLIC_EXTERNAL_BASE_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

COPY . .
RUN npm run build

FROM node:23.3.0-alpine3.18
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 환경 변수 추가해주기

EXPOSE 3000

CMD ["node", "server.js"]

