import multer from "multer";
import uuid from "uuid/v4";
import config from "../config/config.json";
import mime from "mime";

export const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploads.dir);
	},
	filename: (req, file, cb) => {
		cb(null, uuid() + Date.now() + "." + mime.getExtension(file.mimetype));
	}
});
