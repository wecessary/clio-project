# System Health Monitor
This project is a **System Health Dashboard** built using **Nodejs**, **React** and **TypeScript**. It visualizes real-time data for various regions and services, displaying system statuses and server statistics. The dashboard updates dynamically through the integration of **Pusher**, enabling real-time notifications for system status changes.

## Features

- **Real-time Data**: The dashboard receives live updates via **Pusher**, ensuring that system statuses are up-to-date.
- **Dynamic Visualization**: The UI dynamically renders services and server statistics for different regions.
- **CPU History Tracking**: Tracks the last 10 CPU usage data points for each region.

## Backend Setup

The backend is implemented using **Express** and **Pusher**, and it periodically fetches status data from multiple endpoints. It then pushes this data to the frontend through Pusher.

### Backend Code

The backend code is responsible for:
1. **Fetching Data**: Periodically checks multiple endpoints for system status. Currently set to update every 3 seconds.
2. **Triggering Events**: Sends real-time updates to the frontend using Pusher.

#### Environment Variables

The backend uses environment variables for Pusher credentials. Create a `.env` file in the root of the backend project with the following content:
```
PUSHER_APP_ID = your_pusher_app_id
PUSHER_KEY = your_pusher_key
PUSHER_KEY = your_pusher_key PUSHER_SECRET=your_pusher_secret
```
#### Running the backend
1. **Install dependencies**: `npm install`
2. **Run the server**: `npm start` - The backend will start listening on port `3000`.

## Frontend setup

- **React Components**: Organized into modular components for services, server statistics, and overall region status.
- **State Management**: Handles real-time data updates and CPU history using `useState` and `useEffect` hooks.
- **TypeScript Types**: Ensures type safety for service data, server statistics, and region statuses.

### Running the frontend
1. **Go to client folder**: `cd client`
2. **Install dependencies**: `npm install`
3. **Set up Pusher**: Add a `.env` file in the client folder and include pusher key:
```
VITE_PUSHER_KEY=your_pusher_key
```
4. **Run the project**: `npm run dev`

