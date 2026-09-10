# Weather Scope

A lightweight, keyless weather app combining Spring Boot and React. Highlights real-time weather tracking, smart server-side caching for optimal load times, and a beautiful glassmorphism design.

## Key Highlights Covered:

- **Architecture**: Java Spring Boot + React
- **Data Provider**: Open-Meteo (keyless setup)
- **Optimization**: In-memory / server-side caching (10-minute TTL)
- **Design System**: Glassmorphism UI & responsive styling

## Features
- **Real-time Weather**: Fetches up-to-date weather data for any city.
- **Smart Caching**: Backend caches weather data for 10 minutes to reduce API calls and improve speed.
- **Premium UI**: Glassmorphism design with responsive layout and smooth animations.
- **No API Keys**: Uses Open-Meteo for hassle-free deployment.

## Tech Stack
### Backend
- Java 17
- Spring Boot 3.2.2
- Maven
- Caffeine Cache (In-memory)

### Frontend
- React 18
- TypeScript
- Vite
- Lucide React (Icons)
- Vanilla CSS (Variables & Animations)

## Getting Started

### Prerequisites
- JDK 17+
- Node.js 18+

### 1. Run Backend Service
```bash
cd server
mvn spring-boot:run
```
The server will start on `http://localhost:8080`.

### 2. Run Frontend Application
```bash
cd client
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

## Architecture
1. **Frontend**: Sends a request to `GET /api/weather?city=London`.
2. **Backend**:
   - Checks `Caffeine` cache for "london".
   - If missing, calls `Open-Meteo Geocoding API` to get coordinates.
   - Calls `Open-Meteo Forecast API` with coordinates.
   - Caches the result and returns it to the frontend.
3. **Frontend**: Renders the data in a beautiful glass card.

## API Documentation
### GET /api/weather
**Parameters**:
- `city` (required): Name of the city (e.g., "Paris")

**Response**:
```json
{
  "city": "Paris",
  "country": "France",
  "temperature": 12.5,
  "windSpeed": 15.2,
  "weatherCode": 3,
  "isDay": true,
  "localTime": "2023-10-27T14:30"
}
```
