FROM node:lts-buster
RUN git clone https://github.com/Thomas-shelby001/PEAKY-BLINDER-MD/root/iklee
WORKDIR /root/iklee
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
