FROM node:lts AS BUILDER

RUN groupadd -r app && useradd -r -g app app-user

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]
