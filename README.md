# Northcoders House of Games API

Find the hosted version of this API here:
https://nc-games-783o.onrender.com

Summary:

This project contains files required to run the backend of an api which handles a site for reviewing board games. You can access all the reviews that are in the database, as well as comments, categories and users. You can also post comments on reviews and delete them. Eventually you'll be able to post your own review of a board game. Have a play around with the different endpoints! You can find details for all the endpoints in the *endpoints.json* or on the hosted version by adding /api to the end of the url.

To run this code:

- Clone this repo from github and add it as a new repo under your username.

- Type 'npm install' in the terminal to install all the necessary dependencies 

- Type 'npm setup-dbs' in the terminal to setup your databases

- Type 'npm run seed' in the terminal to seed your databases

- You must create 2 .env files (.env.test & .env.development), in each you must declare your database name using PGDATABASE=your_db_name_here. These database names should be the same as the databases created in the setup.sql file.

- If you want to run some tests, make sure you have jest, jest-sorted and supertest installed!
    - You can then use 'npm test' or 'npm t' to run tests 

- Want to run your api locally?
    Just type: 'npm start' into the terminal and connect using your application of choice!

- REQUIRES Node.js version 19.6.0 or higher
- REQUIRES Postgres version 14.7 or higher