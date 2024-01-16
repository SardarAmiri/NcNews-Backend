# Northcoders News API

follow this instruction in order to create the environment variables,
In Express.js, you can use the dotenv library to manage environment variables easily. Environment variables are often used to store configuration settings for your application, such as database connection strings, API keys, and other sensitive information. Here's a step-by-step guide on how to create and use environment variables in an Express.js application:

1. Install dotenv:

npm install dotenv

2. Create a .env File:
   We'll have two databases in this project: nc_news Database for real-looking dev data, and nc_news_test Database for simpler test data.
   You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment. in this case you can add your nc_news database inside your .env.development and nc_news_test database inside your .env.test

3. Use dotenv in Your Express Application:
   In your main application file (e.g., app.js or index.js), require and configure dotenv near the top of the file:

require('dotenv').config();
This line reads the variables from your .env file and adds them to process.env

4. Connecting to the database and Access Environment Variables in Your Code:
   You can now access the environment variables using process.env throughout your application. For example:

const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
throw new Error('PGDATABASE not set');
}

module.exports = new Pool();
