# 1. Base image để build
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files và install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 4. Copy toàn bộ project và build
COPY . .
RUN npm run build

# 5. Chuyển sang image nhỏ hơn để chạy
FROM node:18-alpine AS runner

# 6. Set working directory
WORKDIR /app

# 7. Copy từ bước build sang runner
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 8. Expose port 3000
EXPOSE 3000

# 9. Start Next.js in production
CMD ["npm", "start"]

# docker build -t zhihu-client .
# docker save -o zhihu-client.tar zhihu-client
# docker load -i zhihu-client.tar