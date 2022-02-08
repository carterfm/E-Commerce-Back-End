# E-Commerce Back End 

## Table of Contents

1. [Description](#description)

2. [Installation](#installation)

3. [Usage](#usage)

4. [Questions](#questions)

## Description <a id="description"></a>

A simple back-end framework for managing e-commerce inventory. Built on MySQL and sequelize.

## Installation <a id="installation"></a>

If you intend to run this locally, first, clone this repository to your local system. Then, navigate to it, open the mysql shell (type mysql -u root -p in your terminal and then enter your local mysql password), and type source db/schema.sql to initialize the database. After that,, exit the mysql shell and create a .env file containing the following variables and values: DB_USER--root--DB_PASSWORD--your local MySQL password--and DB_NAME--ecommerce_db. Finally, to actually run the database locally, open http://localhost:3001/ in Insomnia or your browser (you'll need to use Insomnia if you wish to make requests besides GET).

## Usage <a id="usage"></a>

This backend features the following routes:

#### Categories: 

* GET /api/categories: returns all categories along with their associated products.

* GET /api/categories/:id : returns a single category with the specified id along with its associated products.

* POST /api/categories: creates a new category

* PUT /api/categories/:id : edits the name of the category with the specified id

* DELETE /api/categories/:id : deletes a single category with the specified id. 

#### Products:

* GET /api/products: returns all products along with their associated categories and tags

* GET /api/products/:id : returns a single product with the specified id along with its associated category and tags.

* POST /api/products: creates a new product and sets up many-to-many associations with specified tags

* PUT /api/products/:id : edits the product with the specified id, including its many-to-many associations with tags

* DELETE /api/products/:id : deletes the product with the specified id

#### Tags:

* GET /api/tags: return all tags along with their associated products

* GET /api/tags/:id : returns a single tag with the specified id along with its associated products

* POST /api/tags: creates a new tag and sets up many-to-many associations with specified products

* PUT /api/tags/:id : edits the tag with the specified id, including its many-to-many associations with products

* DELETE /api/tags/:id : deletes the product with the specified id


## Questions <a id="questions"></a>

My GitHub profile is [carterfm](https://github.com/carterfm), and I can be reached for questions via email at [carterf.morfitt@gmail.com](mailto:carterf.morfitt@gmail.com).
