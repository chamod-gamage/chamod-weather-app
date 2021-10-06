import express from 'express';
import WeatherRouter from './weather.js';
import CitiesRouter from './cities.js';

const app = express();

app.use('/weather', WeatherRouter);
app.use('/cities', CitiesRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
