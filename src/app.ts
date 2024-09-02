import express from 'express';
import Pusher from "pusher";
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// Initialise pusher with credentials
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
  });

// Function to trigger the Pusher event with new data
const triggerPusherEvent = (channel: string, event: string, data: any) => {
  pusher.trigger(channel, event, data)
    .then(() => console.log('Event triggered successfully'))
    .catch(err => console.error('Error triggering event:', err));
};

// Function that periodically checks the API and sends updates via WebSocket
const checkEndpointAndPush = async () => {
  const endpoints = ['us-east', 'eu-west', 'eu-central', 'us-west', 'sa-east', 'ap-southeast'];
  try {
    // Create an array of axios requests
    const requests = endpoints.map(region =>
      axios.get(`https://data--${region}.upscope.io/status?stats=1`).then(response => ({
        region,
        data: response.data
      }))
    );

    // Wait for all requests to complete
    const results = await Promise.all(requests);

    // Combine results into a single object
    const data = results.reduce((acc, { region, data }) => {
      acc[region] = data;
      return acc;
    }, {});

    // Trigger a Pusher event to push the data to the frontend
    triggerPusherEvent('my-channel', 'status-update', data);
  } catch (error) {
    console.error('Error checking endpoint:', error);
  }
};

// Set an interval to check the endpoint and send updates every 3 seconds
setInterval(checkEndpointAndPush, 3000);



 