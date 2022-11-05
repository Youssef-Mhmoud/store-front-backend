# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
  - Method: `get`
  - Endpoint: `/products/`
- Show
  - Method: `get`
  - Endpoint: `/products/:id`
- Create [token required]
  - Method: `post`
  - Endpoint: `/products/:id`
  - Request Body:
  ```
  {
    "id": "1",
    "name": "test",
    "price": "120"
  }
  ```
#### Users
- Authenticate
  - Method: `post`
  - Endpoint: `/users/authenticate`
  - Request Body:
  ```
  {
    "id": "1",
    "password": "120"
  }
  ```
- Index [token required]
  - Method: `get`
  - Endpoint: `/users/`
- Show [token required]
  - Method: `get`
  - Endpoint: `/users/:id`
- Create N[token required]
  - Method: `post`
  - Endpoint: `/users/:id`
  - Request Body:
  ```
  {
    "first_name": "firstname",
    "last_name": "lastname",
    "password": "120"
  }
  ```

#### Orders
- Index [token required]
  - Method: `get`
  - Endpoint: `/orders/`
- Show [token required]
  - Method: `get`
  - Endpoint: `/orders/:id`
- Create N[token required]
  - Method: `post`
  - Endpoint: `/users/:id`
  - Request Body:
  ```
  {
    "id": "1",
    "status": "active",
    "user_id": "1"
  }
  ```
- Current Order by user (args: user id)[token required]
  - Method: `post`
  - Endpoint: `/orders/:id/products`
  - Request Body:
  ```
  {
    "productId": "1",
    "quantity": "20"
  }
  ```

## Data Shapes
#### Product
```
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  price INT NOT NULL
)
```

#### User
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
)
```
#### Orders
```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(80),
  user_id bigint REFERENCES users(id)
)
```
#### Order_products
```
CREATE TABLE order_products (
  quantity INT,
  order_id bigint REFERENCES orders(id),
  products_id bigint REFERENCES products(id)
)
```