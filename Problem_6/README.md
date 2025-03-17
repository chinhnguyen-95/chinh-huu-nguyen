# 📈 Scoreboard Module

## Overview

This module powers the **Top 10 Scoreboard** for a website. Users earn points by performing actions (details irrelevant to this module), and their scores are updated in real-time. The system prevents unauthorized score manipulation and broadcasts live updates to all connected users.

---

## Features

- Increment user scores securely via REST API.
- Broadcast Top 10 scoreboard updates using WebSocket.
- Store and rank scores efficiently with Redis.
- Prevent abuse with basic JWT validation and rate limiting.

---

## Architecture

```
User Action
     |
     V
[Frontend Website]
     |
     | REST API (POST /score/increase)
     | WebSocket (wss://api.example.com/ws/scoreboard)
     V
[Backend Server] <--> [Auth Service]
     |
     V
[Redis (Sorted Set)]
     |
     V
[Broadcast via WebSocket]
     |
     V
[Connected Clients]
```

---

## API Design

### `POST /score/increase`

Increments the authenticated user’s score.

#### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

#### Request Body
```json
{
  "points": 1
}
```

#### Response
```json
{
  "success": true,
  "currentScore": 123
}
```

> 🔐 Server will extract user ID from the JWT token only.

---

## Real-Time Scoreboard

- **Protocol:** WebSocket
- **URL:** `wss://api.example.com/ws/scoreboard?token=<token>`
- **Authentication:** JWT token via query param

### Flow

1. User connects via WebSocket.
2. Server verifies the token.
3. When a score update:
    - Backend fetches fresh Top 10 from Redis
    - Sends update to all connected clients

### Broadcast Format

```json
{
  "event": "scoreboardUpdate",
  "top10": [
    { "userId": "u1", "score": 123 },
    ...
  ]
}
```

---

## Score Storage (Redis)

- **Data Structure:** Sorted Set
- **Key:** `user:scores`

### Commands

```bash
# Add or update user score
ZINCRBY user:scores <points> <userId>

# Get Top 10
ZRANGE user:scores 0 9 REV WITHSCORES
```

---

## Security

- ✅ JWT Authentication for all requests
- ✅ Use `userId` from the token (never trust user input)
- ✅ Basic rate limiting (e.g., Redis token bucket or express-rate-limit)

---

## Tech Stack Suggestions

| Component        | Tech               |
|------------------|--------------------|
| API Server       | Express.js         |
| Real-Time        | WebSocket          |
| Score Storage    | Redis (Sorted Set) |
| Auth             | JWT                |

---

## Future Improvements

### 1. Cached Leaderboard

To reduce Redis load and avoid unnecessary broadcasts, cache the Top 10 leaderboard (`scoreboard:top10`) in Redis.

Only recompute and broadcast when:
- The user is already in Top 10, or
- The user's new score is higher than the current 10th place.

After recomputing:
- Compare the new Top 10 with the cached version.
- If it has changed, update the cache and broadcast to clients. If not, do nothing.

Use JSON string or hash comparison to detect changes efficiently.

### 2. Scaling

To support more users and higher traffic, begin scaling by separating components:

#### Step 1: Split Services
- Run the **API server** (handles REST) and **WebSocket server** (handles real-time updates) as **separate services**.
- This allows each to scale independently based on workload type.

#### Step 2: Sync Across WebSocket Servers
- When scaling WebSocket servers horizontally:
    - Use **Redis Pub/Sub** to sync Top 10 leaderboard updates between all WebSocket instances.
    - When the API server detects a Top 10 change, it publishes to a Redis channel.
    - All WebSocket servers subscribe to that channel and broadcast the update to their connected clients.

This ensures consistency across all WebSocket connections, no matter which server the client is connected to.

### 3. Analytics

Store long-term score history in PostgreSQL for tracking and reporting.

### 4. Monitoring & Alerts

Track metrics (e.g., active users, API latency, WebSocket health) with Prometheus and Grafana.

