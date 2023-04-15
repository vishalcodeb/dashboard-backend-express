import { Request, Response, Router } from 'express';
import product from './product';

const routes = Router();

routes.use('/v1/product', product);

export { routes };
