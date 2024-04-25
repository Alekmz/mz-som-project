# Use a imagem do Node.js como base
FROM node:latest

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que o aplicativo Express está rodando
EXPOSE 3000


# RUN npx prisma generate
# RUN npx prisma migrate dev budget

# Comando para iniciar o servidor Express
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh
CMD ["/usr/src/app/start.sh"]


