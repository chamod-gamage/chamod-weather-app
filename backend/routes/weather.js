import express from 'express';
import { getCurrentWeather } from '../controllers';

const app = express();

app.get('/:id', getCurrentWeather);

export default app;
