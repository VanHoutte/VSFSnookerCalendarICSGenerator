import { Router } from 'express';
import * as StatusController from '../controllers/status.controller';

export default () => {
    let api = Router();

    // Status
    api.get('/status', StatusController.status);

    return api;
};
