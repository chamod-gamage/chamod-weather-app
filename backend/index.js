import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 80;

const corsOptions = {
  origin: ['http://localhost:3000'],
};

app.use(express.json());

app.use(cors(corsOptions));

mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', function (err) {
  console.log('Error: Could not connect to MongoDB.');
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

export default app;
