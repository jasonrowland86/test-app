# Bare app frame-work with CRUD(create, read, update, delete) using mysql, express.js, and node.js

## Main Dependencies:

* Passport and bcrypt for authentication
* Mysql database
* EJS for rendering

## Creating the database:

* In mysql run: Create database "Your database name";
* Then select database: Use "Your database name";
* Run migration by copying full path of the migration file and running: source "full path of migration file";
* Change lines 6 and 7 in database.js to your database name and password:

![Alt text](/ScreenShot1.jpg?raw=true)

## Creating a SECRET_KEY for sessions

* Create a .env file and add the following:

![Alt text](/ScreenShot2.jpg?raw=true)

* Add .env to  the .gitignore file:

![Alt text](/ScreenShot3.jpg?raw=true)

## Installing Dependencies and running app

* In app directory run npm install to install all dependencies
* Run npm start to run the app
