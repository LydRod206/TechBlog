# TechBlog

## Description

The main functionalities of the app TechBlog include the following:

User Authentication: The app supports user registration and login functionality, allowing users to create accounts and authenticate themselves.

Create Posts: Authenticated users can create new blog posts by providing a title and content for the post.
View Posts: The app displays a list of existing posts, showing the post title, content, author's username, and creation date.

Add Comments: Users can add comments to individual posts, providing their thoughts or feedback on the post.

Modal Dialog: The app utilizes Bootstrap's modal component to present a form for adding comments. This modal dialog appears when the user clicks on the "Add Comment" button.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone the repository:

2. Install the following dependencies:

Express: A web application framework for Node.js.
Sequelize: A promise-based ORM (Object-Relational Mapping) for Node.js, used for interacting with the database.
bcrypt: A library for hashing passwords and comparing hashes for user authentication.
dotenv: A module for loading environment variables from a .env file.
express-handlebars: A templating engine for rendering dynamic views.
express-session: A middleware for managing user sessions.
connect-session-sequelize: A Sequelize session store for Express.js, used to store session data in the database.
mysql2: A MySQL database driver for Node.js.
nodemon: A development tool that monitors changes in the source code and automatically restarts the server.
bootstrap: A popular CSS framework for building responsive and visually appealing websites.
mime: (Multipurpose Internet Mail Extensions) is a standard that defines the types of files based on their content and helps browsers and servers understand how to handle and interpret those files.

3. Set up the configuration:

Rename the `.env.example` file to `.env`.
Modify the environment variables in the `.env` file according to your setup.

4. Start the application:

5. Access the application at `http://localhost:3000` in your web browser.

## Usage

Tech Blog provides a platform for users to create, view, and comment on blog posts. It incorporates user authentication, database integration, and a responsive UI using Bootstrap.


### Liscense

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

