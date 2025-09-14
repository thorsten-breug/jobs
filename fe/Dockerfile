# run 'npm run build' with the correct value in ENV 'VITE_API_URL' before building the image
FROM node:22-alpine

WORKDIR /app

RUN npm i -g serve

COPY ./dist .

EXPOSE 3000

CMD [ "serve", "-s" ]