import expresss from 'express';
import 'dotenv/config';

import authRoutes from './routes/auth';

// * create express server
const app = expresss();

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
