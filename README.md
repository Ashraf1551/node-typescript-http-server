# Node.js TypeScript REST API Server

## Overview

This project is a small **Node.js + TypeScript** HTTP server that manages football players using JSON file storage.

The application follows **object-oriented programming (OOP)** principles by organizing player operations in a `PlayerService` class, which encapsulates CRUD logic and keeps the code modular and reusable.

## Features

- Create, read, update, and delete players
- OOP-based architecture using a `PlayerService` class to encapsulate CRUD logic
- Route handling using native Node.js HTTP server
- JSON request parsing
- File-based persistence with `db/data.json`
- Type-safe TypeScript models

## Project Structure

```text
src/
├── index.ts                    # Starts the server and routes requests
├── routes/
│   └── player.route.ts         # Handles player endpoints
├── services/
│   └── player.service.ts       # CRUD logic
├── utils.ts                    # Response and request parsing helpers
└── types/
    └── index.ts                # TypeScript types

db/
└── data.json                   # Stored player data
```

## Setup

```bash
git clone <repository-url>
cd <project-folder>
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint      | Description                               |
| ------ | ------------- | ----------------------------------------- |
| GET    | `/`           | Returns a welcome message from the server |
| GET    | `/player`     | Returns all players                       |
| GET    | `/player/:id` | Returns a single player by ID             |
| POST   | `/player`     | Creates a new player                      |
| PUT    | `/player/:id` | Updates a player by ID                    |
| DELETE | `/player/:id` | Deletes a player by ID                    |

## Example Request

```json
{
  "name": "Arda Guler",
  "position": "CAM",
  "age": 21,
  "nationality": "Turkey"
}
```

## Response Format

```json
{
  "success": true,
  "message": "Player created successfully",
  "data": {
    "id": "97",
    "name": "Arda Guler",
    "position": "CAM",
    "age": 21,
    "nationality": "Turkey"
  }
}
```
