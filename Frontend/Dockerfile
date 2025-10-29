### Build stage
FROM node:20-alpine AS build
WORKDIR /app

ARG API_URL=http://backend:3333

COPY package*.json ./
RUN npm install

COPY . .

# Substitui a URL da API no config.js (se existir)
RUN if [ -f ./config.js ]; then sed -i "s|http://localhost:3333|$API_URL|g" ./config.js || true; fi

RUN npm run build

### Production stage
FROM nginx:stable-alpine

# Copia os arquivos compilados
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a config do nginx (SPA)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
