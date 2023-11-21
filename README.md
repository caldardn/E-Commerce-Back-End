# E-Commerce Back End 

## Description

A mysql database and application backend for an e-commerce site. Built using MySQL2, Express, Sequelize and dotenv.
  
Below is the gif showing the functionality of the application:

[Application Video](https://drive.google.com/file/d/1H96rCG9AiSy_SU7nIWTeaOBQbwDzXrXM/view)

## User Story
  
```
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria
  
``` 
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Installation

`npm i`

`npm i express@4.18.2`

`npm i mysql2@3.6.3`

`npm i sequelize@6.34.0`

`npm i dotenv@16.3.1`
  
## Usage  
  
Run the following command at the root of your project and answer the prompted questions:

`mysql -u root -p`

Enter password when promted

`source db/schema.sql`

`quit`

`node seeds/`
  
`node server`

## Questions
Contact me with any questions: [Email](mailto:caldardn@gmail.com), [GitHub](https://github.com/caldardn)<br />