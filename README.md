# Titan

Titan is a simple course support system. The goal of the project is to demonstrate use of modern web technologies and build a basic application which may serve as an example for other projects.

## Highlights

* JavaScript and Node.js as the basis
* React and Material-UI as the frontend
* Express and Mongoose as the backend
* MongoDB as the database
* Webpack as the module bundler
* HTTPS with compression
* Authentication with logging
* ES6 modules as a replacement for CommonJS modules
* ES6 promises as a replacement for callbacks

## Deployment

Install MongoDB as root:
```
$ apt install mongodb
```
Install Node.js as root:
```
$ curl -sL https://deb.nodesource.com/setup_10.x | bash
$ apt install -y nodejs
```
Install the project dependencies:
```
$ npm install
```
Create the first application user from the shell:
```
$ node --experimental-modules etc/createUser.mjs <email> <fullname> <password>
```
Start the Webpack process (in a separate shell):
```
$ npm run cli
```
Start the backend (in a separate shell):
```
$ npm run srv
```
Open the browser and sign in.
