# API/ui Setup with PostgreSQL & Node.js

This project uses **Node.js v20.19.4** and **PostgreSQL** as the database.  
Follow the steps below to set up your personal PostgreSQL server and configure the API.

---

## Prerequisites
-Node.js `v20.19.4`  
-npm `v20.19.4`  
-PostgreSQL (latest stable version recommended)  
-pgAdmin (optional, for GUI management)

---

## Step 1: Setup PostgreSQL Server
1. Install PostgreSQL from [official downloads](https://www.postgresql.org/download/).
2. Create a **new local server** using pgAdmin or CLI.
3. During setup, choose a username and password (e.g., `postgres` / `yourpassword`).
4. Create a new database for your project:
   ```sql
   CREATE DATABASE my_project_db;

## Step 2: Update API Database Credentials
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'my_project_db',      # Database name
        'USER': 'postgres',           # Your PostgreSQL username
        'PASSWORD': 'yourpassword',   # Your PostgreSQL password
        'HOST': 'localhost',          # Or server IP
        'PORT': '5432',               # Default PostgreSQL port
    }
}

## Step 3: Run the API and UI
`npm install`
`python manage.py runserver`
