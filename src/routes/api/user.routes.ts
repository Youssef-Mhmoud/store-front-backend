import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';

const routes = Router();

routes.route('/').get(controllers.getMany).post(controllers.create);
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);
export default routes;
