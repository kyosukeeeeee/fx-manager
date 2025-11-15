FROM node:22-alpine

WORKDIR /app

# 依存だけ先に入れる（キャッシュ効かせる）
COPY package*.json ./
RUN npm install

# アプリ本体コピー
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
