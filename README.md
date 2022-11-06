# Storefront Backend Project 

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Setup Environment

Create `.env` file with Vars:

```
PORT=3000
ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_front
POSTGRES_DB_TEST=store_front_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
BCRYPT_PASSWORD=secret-password
SALT_ROUNDS=10
TOKEN_SECRET=token90
```
### 2. Create Database and Migrations

Connect to default postgres database :
```
psql -U postgres 
```
- Frist, In psql you need to create database :
  - `CREATE DATABASE store_front;`
  - `CREATE DATABASE store_front_test;`
- Second, In psql you need connect the database :
  - for develope
  - `\c store_front;`
  - for testing
  - `\c store_front_test;`
- Third, you need to use migration up :
  - `yarn migrate:up` -> to create tables

``` Notice: the port of database running is '5432' ```
### 3. Scripts
1. `yarn start` 
2. `yarn dev `
3. `yarn test` 
4. `yarn prettier` 
5. `yarn lint`
6. `yarn migrate:up` -> to create tables
7. `yarn migrate:down` -> to drop tables