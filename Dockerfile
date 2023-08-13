FROM node:lts-alpine3.18 AS build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm ci
#Genarate prisma client
RUN npm run prisma:generate


# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

FROM node:lts-alpine3.18

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist


EXPOSE 4000
# Start the server using the production build
CMD [ "node", "dist/main.js" ]
