# Task Manager

Task Manager is a full-stack application with:

- A Spring Boot backend
- An Angular frontend
- MySQL for persistence
- JWT-based authentication
- Docker support for containerized deployment

## Project Structure

- `backend` - Spring Boot API
- `frontend` - Angular application
- `docker-compose.yml` - all-in-one Docker setup for MySQL, backend, and frontend
- `.env` - environment variables used by Docker Compose

## Tech Stack

- Backend: Java, Spring Boot, Spring Security, JPA
- Frontend: Angular
- Database: MySQL
- Auth: JWT
- Production frontend serving: Nginx

## Run in Development

### 1. Backend

Open a terminal in the `backend` folder and make sure these environment variables are available:

```env
MYSQL_DB
MYSQL_USER
MYSQL_PASSWORD
MYSQL_ROOT_PASSWORD
JWT_SECRET
FRONTEND_URL
```

The backend expects MySQL to be running and reachable with the above database credentials.

Then run:

```bash
mvn clean install
mvn spring-boot:run
```

By default, the backend is exposed on `http://localhost:8080` in development mode.

### 2. Frontend

Open a terminal in the `frontend` folder and run:

```bash
npm install
npm run start
```

This starts the Angular app in development mode. The frontend will be available at:

```text
http://localhost:4200
```

Make sure the backend is already running and that the frontend uses the correct API configuration:

- In Development (`npm run start`), the frontend uses `environment.development.ts` to call the backend at `http://localhost:8080`.
- In Production (`docker-compose up` / `ng build`), the frontend uses `environment.ts` to call the backend at `http://localhost:9090`.

## Database Setup

The backend is configured to use MySQL.

Relevant backend database configuration:

- Database name:
- Username:
- Password:
- Root Password:

The application reads these values through environment variables:

```env
MYSQL_DB=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
```

If you are running with Docker Compose, the full `.env` content is:

```env
MYSQL_DB=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
JWT_SECRET=
FRONTEND_URL=
```

## Authentication and Credentials

JWT authentication is implemented.

- `JWT_SECRET` must be configured for the backend
- Users log in with username and password
- After login, the backend returns a JWT token
- The frontend stores the JWT and sends it with protected task API requests

There are no seeded default application user credentials documented in this repository. Create a user through the registration flow or the register API before logging in.

## Common Local API Flow

Register:

```http
POST /api/v1/users/register
```

Login:

```http
POST /api/v1/users/login
```

Protected task endpoints use the JWT in the `Authorization` header.

## Run with Docker

### All-in-one Docker Compose

The repository includes `docker-compose.yml` which starts:

- MySQL
- Backend
- Frontend

To run:

```bash
docker compose up --build
```

The compose file reads values from `.env`.

After startup:

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:9090`
- MySQL: `localhost:3306`

### Production Notes

For production, the frontend is served with Nginx. The frontend Docker image builds the Angular app and serves the compiled files through Nginx as a reverse-proxy-friendly static server.

You mentioned two production approaches:

1. A separate `docker-compose.prod.yml` for running only the production database
2. An all-in-one production Docker Compose setup

In the checked-in repository, the available compose file is `docker-compose.yml`. If you maintain a separate production compose file outside this repo, make sure it uses the same environment values required by the backend.

## Environment Variables Summary

### Development backend

```env
MYSQL_DB=taskdb
MYSQL_USER=mysqluser
MYSQL_PASSWORD=40777f07b11eac380f8ba49e36e694f8dd417f6e
MYSQL_ROOT_PASSWORD=3c16a59c100749889e671b7e253697e9e61f49f9
```

### Docker / production-style compose

```env
MYSQL_DB=taskdb
MYSQL_USER=mysqluser
MYSQL_PASSWORD=40777f07b11eac380f8ba49e36e694f8dd417f6e
MYSQL_ROOT_PASSWORD=3c16a59c100749889e671b7e253697e9e61f49f9
JWT_SECRET=9d5249d7b6ef18e52a4dd43709f16e29a357c2c2
FRONTEND_URL=http://localhost:4200
```

## Screenshots

<img width="1283" height="724" alt="image" src="https://github.com/user-attachments/assets/6501b756-e618-4fdd-a758-6834b847d398" />

<img width="1914" height="906" alt="image" src="https://github.com/user-attachments/assets/600e94a2-29fd-46a9-b516-341f5c950f3d" />

<img width="1911" height="909" alt="image" src="https://github.com/user-attachments/assets/98ce724e-8880-48f9-8e42-16be88301e58" />

<img width="1917" height="903" alt="image" src="https://github.com/user-attachments/assets/c50012a7-90a0-465f-9332-7317b4a8fe2b" />

<img width="1911" height="904" alt="image" src="https://github.com/user-attachments/assets/343dbafb-1f9c-48b5-b62e-699f5a48c1fd" />





