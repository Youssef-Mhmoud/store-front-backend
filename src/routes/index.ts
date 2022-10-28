import { Router } from 'express';
import usesrRoutes from './api/user.routes';

const routes = Router();

routes.use('/users', usesrRoutes);

export default routes;
