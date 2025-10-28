
FROM node:lts-bullseye

USER root

RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

Copy all files from your project into the container
COPY . .

RUN npm install --legacy-peer-deps


Expose the port your app uses (change if needed)
EXPOSE 7860

ENV NODE_ENV=production

Run the app
CMD ["npm", "start"]







