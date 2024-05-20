# Northcoders News API

### Link to hosted version:

[https://newsapp-7o7y.onrender.com/api/articles](https://)

### Project Summary:

Building and testing an API to access application data programmatically, mimicking a real world backend service. NC News is a database created with PSQL, and interacted with using node-postgres. The database contains tables for users, topics, articles, and comments - similar to what you might expect to find for a service like Reddit. Multiple requests can be made to the database in order to interact with the data - including GET, POST, PATCH, and DELETE requests. These requests can be used along multiple paths to receive specific types of data, e.g. to get articles filtered by topic, or to delete a comment using its unique id.

### Setup:

#1 Clone the repository: https://github.com/kneeshuh/ni-be-nc-news
#2 Install dependencies:
(Find a list of these by typing npm ls in your terminal, or see below) - dotenv - express - husky - jest - jest-extended - jest-sorted - pg - pg-format - supertest
#3 Seed databases:
(Look in the package.json file for scripts for setting up and seeding, or see below) - Setup databases: npm run setup-dbs - Seed database with development data: npm run seed - Seed database with test data and run tests: npm run test - Seed with production data: npm run seed-prod

### To create the correct environment variables and run the project locally:

#1 Look in the db/setup.sql file to find the relevant database names
#2 Create two .env files in the root - one for testing, and one for development purposes
#3 In .env.development write in: PGDATABASE=name_of_database (found in db/setup.sql file)
#4 In .env.test write in: PGDATABASE=name_of_database_test
#5 In the .gitignore file add .env.\* to ensure you don't push these variables to GitHub.

- In the event of creating a production database, also create a third .env file (.env.production) and write in: DATABASE_URL:<link_to_hosted_database>

### Minimum versions required to run project:

Node.js v21.2.0 Postgres v14.10
