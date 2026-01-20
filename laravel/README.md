# WhatUBox - Laravel Edition

This is the Laravel version of the WhatUBox application, a powerful WhatsApp SaaS platform with AI integration. Developed By MLHK infotech (Hariom Vishwkama).

## Setup Instructions

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js & NPM
- A local database server (MySQL, PostgreSQL, etc.) or SQLite

### 1. Clone the Repository
```bash
git clone <repository-url>
cd whatubox/laravel
```

### 2. Install Dependencies
Install the PHP and JavaScript dependencies:
```bash
composer install
npm install
```

### 3. Environment Configuration
Copy the example environment file and generate an application key:
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Database Setup (SQLite)
This project is configured to use SQLite by default.
1. Create the SQLite database file:
   ```bash
   touch database/database.sqlite
   ```
2. Run the database migrations to create the necessary tables:
   ```bash
   php artisan migrate
   ```

### 5. Compile Frontend Assets
Build the React and Tailwind CSS assets:
```bash
npm run build
```

### 6. Run the Development Server
Start the Laravel development server:
```bash
php artisan serve
```
The application will be available at `http://localhost:8000`.

### 7. Admin User
To access the admin dashboard, you first need to register a regular user. Then, you will need to manually edit the user's email in the `database/database.sqlite` file to be `admin@whatubox.com`.
