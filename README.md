
#### First Init

Create backend folder and server.js

```
npm init

```
Entry point will be server.js

Git init

```
git init
```

Install some basic package

```
npm i express dotenv mongoose colors bcryptjs 
```

Install nodemon for Dev mode 

```
npm i -D nodemon
```

Insert nodemon command to package.json

```
 "server": "nodemon backend/server.js"
```

### Setup Express server

install async handler middleware
```
npm install --save express-async-handler
```