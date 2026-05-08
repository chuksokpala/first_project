# API Endpoints

Base URL: `http://localhost:5000/api`

## Health
- `GET /health` - Check server status

## Auth
- `POST /auth/register`
  - Body: `{ "name": "John", "email": "john@mail.com", "password": "123456" }`
- `POST /auth/login`
  - Body: `{ "email": "john@mail.com", "password": "123456" }`
- `GET /auth/me` (Protected)
  - Header: `Authorization: Bearer <token>`

## Tasks (All protected)
- `POST /tasks`
  - Body: `{ "title": "Learn MVC", "description": "Study controller flow", "status": "todo" }`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
  - Body (any): `{ "title": "Updated title", "description": "Updated", "status": "done" }`
- `DELETE /tasks/:id`

## Response format
- Success:
  - `{ "message": "...", "data": ... }`
- Validation failure:
  - `{ "message": "Validation failed", "errors": [...] }`
