// src/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

export const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger);

// app.get('/test', (req, res) => {
//   res.json({ message: 'Helmet check' });
// });
// app.get('/test-error', (req, res) => {
//   throw new Error('Simulated server error');
// });
app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
