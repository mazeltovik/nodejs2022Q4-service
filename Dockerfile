FROM node:lts-alpine3.18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
#Genarate prisma client
RUN npm run prisma:generate


# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 4000
# Start the server using the production build
CMD [ "node", "dist/main.js" ]
