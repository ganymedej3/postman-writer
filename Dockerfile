FROM node:18.17.0

RUN npm install -g npm@latest

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json /app/
COPY package*.json ./

# Install dependencies
#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN mkdir -p /app/reports && chmod -R 777 /app/reports

# Define the command to run the application
#CMD ["node", "main.js"]
#CMD ["node", "write2json.js"]
#USER root
CMD ["npm", "start"]