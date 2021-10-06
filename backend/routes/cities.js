import express from 'express';
import { searchForCities } from '../controllers';

const app = express();

app.get('/:q', searchForCities);

export default app;
