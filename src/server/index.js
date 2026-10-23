import express from 'express';
import routes from '../services/notes/routes/index.js';
import ErrorHandler from '../middlewares/error.js';
import authRoutes from '../services/authentications/routes/index.js';
import userRoutes from '../services/users/routes/index.js'; 
 
const app = express();
 
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(routes);
app.use(ErrorHandler);
 
export default app;