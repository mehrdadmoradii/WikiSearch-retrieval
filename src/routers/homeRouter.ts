import { Router } from "express";
import * as homeController from '../controllers/homeController';

const homeRouter = Router();

homeRouter.post('/search', homeController.postSearch);

export default homeRouter;