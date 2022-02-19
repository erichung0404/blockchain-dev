FROM node:17

# copy required files
# dir will be created if not exists
COPY app.js \
     BlockchainController.js \
     package.json \
     package-lock.json \
     /app/

# copy source dir
COPY src/ /app/src/

# set working dir
WORKDIR /app/

# install packages
RUN npm i

# expose port 8000
EXPOSE 8000

# start server
CMD ["node", "app.js"]