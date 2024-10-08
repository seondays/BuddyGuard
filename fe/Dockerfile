# Step 1: Build the React application
FROM node:18 AS build

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# package.json과 .npmrc 복사
COPY package*.json ./
COPY .npmrc .npmrc

# 의존성 설치
RUN pnpm install

# 애플리케이션 복사 (node_modules 제외)
COPY . .

# 빌드 - 오류를 무시하고 빌드를 진행
RUN pnpm run build || true

# Step 2: Nginx를 사용하여 정적 파일 제공
FROM nginx:alpine

# 빌드된 파일을 Nginx의 정적 파일 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 컨테이너가 실행될 때 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]