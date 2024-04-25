
FROM node:lts
# Preparing the environment
RUN mkdir /app
WORKDIR /app

# Copying application files
COPY . /app

# Installing packages
RUN npm install

# RUN npm run build

# Setup node environment
ENV NODE_OPTIONS=--max_old_space_size=2048

# Expose application port
EXPOSE 5173

# Starting the service
CMD ["npm", "run", "dev"]
