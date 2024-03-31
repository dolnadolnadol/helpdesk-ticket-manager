FROM node:lts AS BUILDER

RUN groupadd -r app && useradd -r -g app app-user

WORKDIR /app

COPY package.json package-lock.json*
RUN npm install
RUN npm run build

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]
