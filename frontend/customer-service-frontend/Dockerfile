FROM node:16.14.0
WORKDIR /app
ENV PATH ./node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY . ./
RUN npm install
RUN npm install react-scripts@5.0.0
EXPOSE 3000
CMD ["npm", "start"]