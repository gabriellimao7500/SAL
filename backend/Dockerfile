FROM node:20-alpine

WORKDIR /app

# Copia package.json e instala apenas dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia o restante do código
COPY . .

# Define variáveis padrão (podem ser sobrescritas via docker-compose)
ENV PORT=3333

EXPOSE 3333

CMD ["npm", "start"]
