# FastifyApp

## Table of Contents
1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)


## Requirements
- **Node.js**: Version 14 or higher
- **PostgresSQL**: Version 12 or higher
- **Fastify**: A fast web framework for Node.js

## Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/sssBless/fastify_app.git
  cd <your_project_name>
  ```
2. Install dependecies:
  ```bash
  npm install
  ```
3. Set up environment variables by creating a ```.env``` file in the project root:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

## Database Setup
1. Run setup script from ```src/db/dbGenerateCode.sql```.

## Usage
To start the application:
```bash
npm run dev
```
The server should now be running on ```http://localhost:3000```.

## API Endpoints
- GET ```/data?table=fonts&columns=id,name,license&limit=3``` - Retireve data from table ```table``` with columns ```columns (default: all columns)``` and ```limit (default: 100)``` - quantity of returned rows.
