FROM node:lts AS BUILDER

RUN groupadd -r app && useradd -r -g app app-user

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
