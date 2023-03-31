# Northcoders House of Games API

Find the hosted version of this API here:
https://nc-games-783o.onrender.com

Summary:

This project contains files required to run the backend of an api which handles a site for reviewing board games. You can access all the reviews that are in the database, as well as comments, categories and users. You can also post comments on reviews and delete them. Eventually you'll be able to post your own review of a board game. Have a play around with the different endpoints! You can find details for all the endpoints in the *endpoints.json* or on the hosted version by adding /api to the end of the url.

To run this code:

- Clone this repo from github and add it as a new repo under your username.
- You'll need to npm install the required dependencies from the list as follows:
    - dotenv
    - express
    - pg
    - pg-format

    Install the following under devDependencies:
    - jest
    - jest-sorted
    - supertest

- After this you'll need to seed the databases, you can do this easily by running: npm run seed

- You must create 2 .env files (.env.test & .env.development), in each you must declare your database name using PGDATABASE=your_db_name_here. These database names should be the same as the databases created in the setup.sql file.

- If you want to run some tests, make sure you have jest, jest-sorted and supertest installed!
    - You can then use 'npm test' or 'npm t' to run tests 

- REQUIRES Node.js version 10.13.0 or higher
- REQUIRES Postgres version 8.10.0 or higher