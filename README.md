# Travel Tracker

Welcome to the Travel Tracker project repository! This project is a web application that allows users to track the countries they have visited by coloring them on a world map. The application is built with Node.js, Express, PostgreSQL, HTML, CSS, JavaScript, and EJS.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- HTML
- CSS
- JavaScript
- EJS

## Features

- Interactive world map with all countries.
- Input field to add country names that you have visited.
- New countries are added to the PostgreSQL database and displayed on the map with different colors.

## Installation

To run the Travel Tracker website locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Utkarsh1244p/Travel-Tracker.git

2. **Navigate into the project directory:**

   ```bash
   cd Travel-Tracker

3. **Install the dependencies:**

   ```bash
   npm install

4. **Set up the PostgreSQL database:**

- Ensure PostgreSQL is installed and running on your machine.
- Create a new database named travel_tracker.
- Create a table named visited_countries with the following schema:

   ```bash
   CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  country_code CHAR(2) NOT NULL
);

5. **Run the website:**

   ```bash
   npm index.js

