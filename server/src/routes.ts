import express, { json } from 'express';

import PointsController from './controllers/PointsControllers';
import ItemsControllers from './controllers/ItemsControllers';

const routes = express.Router();
const pointsController = new PointsController();
const itemscontroller = new ItemsControllers();


routes.get('/items', itemscontroller.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;