import expresss from 'express';
import 'dotenv/config';
import cors from 'cors';

import authRoutes from './routes/auth';
import { dbConnection } from './database/config';

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
// * auth routes
app.use('/api/auth', authRoutes);

// * start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
