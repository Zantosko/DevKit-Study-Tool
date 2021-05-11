# DevKit

## Description

The idea behind Devkit was to create a "Quizlet" like Web page target towards developers. This is an environment to help aspiring developers study key concepts and create notes that also include flashcard sets. Some of the features include the ability to create an account, register and login, and create notes (and a flashcard set, corresponding to each note). We tried to make the studying process as simple as possible with all the tools we incorporated into DevKit.

## Screenshots

<p align="center">
  <img src="./assets/screenshots/Home-page.png" height="300" width="300">
</p>
<p align="center">
  <img src="./assets/screenshots/Login-page.png" height="300" width="300">
</p>
<p align="center">
  <img src="./assets/screenshots/Create-note-page.png" height="300" width="300">
</p>
<p align="center">
  <img src="./assets/screenshots/Note-page.png" height="300" width="300">
</p>
<p align="center">
  <img src="./assets/screenshots/Card-page.png" height="300" width="300">
</p>
<p align="center">
  <img src="./assets/screenshots/Edit-card-page.png" height="300" width="300">
</p>

## Key Features

- **Register/Login System** - This feature allows a user to create an account and login accordingly. Once a user registers an account, Bcrypt is then used to "hash" said password. For user authentication Passport.js was implemented. Whenever a user attempts to login, Passport will compare the entered password to the hashed password and then proceed to serialize the user-id and create a new session.

- **Notes specific to individual user** - Once a user has logged in they then have option to create notes that are specific to them. This feature takes advantage of the Mustache template. Instead of using client-side side JavaScript to grab the data and create HTML elements, the form submission invokes a server-side route and persists the data to a database. The user can then click "View Notes" and this in turn invokes another server-side route to interpolate the data on screen.

- **Flash-Card set specific to individual note** - For each note created by a user, set of flash cards can be made for that specific note. This feature allows the user to create as many cards as they want by giving inputs for the front and back sides and then submitting that data. This persisted data is then accessed using client-side JavaScript to fetch from the data base and render one card at a time. The fetched data is converted to JSON and returned as an array of objects. Instead of looping over the array to display the data, the front and back sides of the initial card are set to index 0 (first value) with the question going on the front and the answer going on the back. This index can then be incremented by pressing the next button or decremented by pressing the previous button.

- **CRUD Functionality** - The Note section and Flash Card section both allow the user to Create, Read, Update, and Delete data from the database. The UI is different when it comes to each of these features, but they both have the same functionality under the hood.

## Technologies Used

**Built with**:

- JavaScript
- Node.js
- Express.js
- Passport.js
- Bcrypt
- PostgreSQL
- Sequelize ORM
- Mustache Template Engine
- CSS
- Bootstrap

## What was learned

- Gained a better understanding of Node.js.

  - Learned how to integrate the client and server sides together to create a fully functional full stack application.
  - How to intercept data from the client-side and pass back a response depending on the request.

- Gained a better understanding of Relatiional Databases.

  - Learned how to create associations using foreign keys.
  - Learned about different types of associations and knowing which one to use based on the situation.
    - For example this project uses two One-To-Many realtionships. One user can have many notes and one note can have many flash cards.

- Was able to get familiar with the Sequelize ORM (Object Relational Mapper).

  - Understanding how this is a much more intuitive approach compared to writing raw SQL.
  - Learned how to properly model, seed, and migrate data to desired tables.

- Became more familiar with the Mustache Template Engine

  - Learned how to dynamically interpolate data on a page by passing it the queried values from the database.
    - This involves rendering mustache objects using server-side routes.
  - Learned Template Engines eliminate the need for excess client-side JavaScript code.

- Learned how to implement User Authentication using Passport.js and Bcrypt.
  - Learned how to hash user passwords.
  - Learned how take user input and compare it to existing usernames and hashed passwords in the database.
  - Learned how to take successful input, serialize it and creating a session. Along with that understanding how to access stored information by deserializing it to use in server-side routes.
