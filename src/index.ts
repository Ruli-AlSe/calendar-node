import expresss from 'express';
import 'dotenv/config';
import cors from 'cors';

import authRoutes from './routes/auth';
import eventRoutes from './routes/events';
import { dbConnection } from './database/config';
import path from 'path';

// * create express server
const app = expresss();

// * Database connection
dbConnection();

// * CORS
app.use(cors());

// * Public directory
app.use(expresss.static('public'));

// * read and parse body
app.use(expresss.json());

// * create a routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// * start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
