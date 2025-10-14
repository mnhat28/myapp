# Sử dụng Node.js phiên bản ổn định
FROM node:18

# Tạo thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Copy file package.json trước để cài dependency
COPY package*.json ./

# Cài dependency
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

# Container sẽ chạy trên port 80
EXPOSE 80

# Lệnh chạy ứng dụng
CMD ["node", "server.js"]

