FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV production
ENV NEXT_PUBLIC_APP_BASE_URL=http://jd-s-ghibli.jdsignals.internal:5553

RUN yarn install

COPY . .

EXPOSE 3005

CMD ["bash", "docker_cmd.sh"]