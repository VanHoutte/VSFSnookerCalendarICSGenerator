import { Router } from "express";
import multer from "multer";
import { storage } from "../../utils/multer.utils";
import path from "path";

import * as CalendarController from "../controllers/calendar.controller";

export default () => {
	const api = Router();

	api.post("/calendare/generate", CalendarController.generateICS);

	return api;
};
