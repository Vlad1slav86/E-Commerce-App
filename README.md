# E-Commerce-App

This is a web application that utilizes Object-Relational Mapping (ORM) to manage products, categories, and tags. It provides an API for performing CRUD (Create, Read, Update, Delete) operations on the data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
```
   git clone https://github.com/Vlad1slav86/E-Commerce-App
```
Navigate to the project directory:

```
cd E-Commerce-App
```
Install the dependencies:

```
npm install
```
Set up the database:

Create a MySQL database.
Configure the database connection in the .env file.
Run the database migrations and seed the data:

```
npm run seed
```
## Usage
Start the application:

```
npm start
```
Access the API endpoints using a tool like Postman or Insomnia.

API Endpoints
The following API endpoints are available:

Categories:

- GET /api/categories - Get all categories.
- GET /api/categories/:id - Get a single category by ID.
- POST /api/categories - Create a new category.
- PUT /api/categories/:id - Update a category by ID.
- DELETE /api/categories/:id - Delete a category by ID.
Products:

- GET /api/products - Get all products.
- GET /api/products/:id - Get a single product by ID.
- POST /api/products - Create a new product.
- PUT /api/products/:id - Update a product by ID.
- DELETE /api/products/:id - Delete a product by ID.
Tags

- GET /api/tags - Get all tags.
- GET /api/tags/:id - Get a single tag by ID.
- POST /api/tags - Create a new tag.
- PUT /api/tags/:id - Update a tag by ID.
- DELETE /api/tags/:id - Delete a tag by ID.

## Screenshots


GET API:

![READ Categories](./assets/images/READ%20Categories.png)

POST API:

![CREATE Categories](./assets/images/CREATE%20Categories.png)

DELETE API:

![DELETE Categories](./assets/images/DELETE%20Categories.png)

## Video Link:

https://drive.google.com/file/d/1ehr4X2TzdtJuo5TwjPt4nIf914uNvY3Z/view

## Contributing
Contributions to this project are welcome! If you have any suggestions, enhancements, or bug fixes, please create a pull request or open an issue.

## License
This project is licensed under the MIT License.

## Contact

You can contact me with any questions at vladkb@yahoo.com.