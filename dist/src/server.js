var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
import Pusher from "pusher";
import fetch from 'node-fetch';
require("dotenv").config();
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
});
// fetch data from api
router.get('/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching data...');
    try {
        const response = yield fetch('https://data--us-east.upscope.io/status?stats=1');
        console.log(response);
        const data = yield response.json();
        // Trigger Pusher event with the fetched data
        pusher.trigger('my-channel', 'status-update', data);
        res.status(200).send('Data fetched and pushed to Pusher!');
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
}));
router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Test route working');
});
export default router;
//# sourceMappingURL=server.js.map