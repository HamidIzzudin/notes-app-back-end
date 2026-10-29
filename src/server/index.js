import express from 'express';
import cors from 'cors';
import routes from '../services/notes/routes/index.js';
import ErrorHandler from '../middlewares/error.js';
import authRoutes from '../services/authentications/routes/index.js';
import userRoutes from '../services/users/routes/index.js';
import collaborationRoutes from '../services/collaborations/routes/index.js';
import exportRoutes from '../services/exports/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('src/services/uploads/files/images'));
app.use(authRoutes);
app.use(userRoutes);
app.use(routes);
app.use(collaborationRoutes);
app.use(exportRoutes);
app.use(ErrorHandler);

export default app;