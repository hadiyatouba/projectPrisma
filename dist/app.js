import express from 'express';
import UserRoute from './route/UserRoute.js';
import PostRoute from './route/PostRoute.js';
import ActorRoute from './route/ActorRoute.js';
import RepostRoute from './route/RepostRoute.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(`${process.env.BASE_URL}/users`, UserRoute);
app.use(`${process.env.BASE_URL}/posts`, PostRoute);
app.use(`${process.env.BASE_URL}/reposts`, RepostRoute);
app.use(`${process.env.BASE_URL}/actors`, ActorRoute);
app.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
