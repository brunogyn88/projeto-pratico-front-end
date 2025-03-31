# Etapa de build do Angular
FROM node:18.19.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa de produção com Nginx
FROM nginx:latest

# Criação manual do diretório html caso não exista
RUN mkdir -p /usr/share/nginx/html

# Copiar os arquivos do build do Angular para o diretório html
COPY --from=build /app/dist/projeto-pratico-angular/* /usr/share/nginx/html

# Copiar o arquivo de configuração nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
