import i18next from 'i18next';
import mime from 'mime';
import { body } from 'express-validator/check';

export default class FileValidator {

    static get validateFile() {
        let allowedExtension = ['png', 'jpeg', 'jpg'];
        return [
            body('files')
                .exists().withMessage(i18next.t('validation.requiredField', {field: 'files'}))
                .custom((value, {req}) => {
                    return value.length > 0 && req.body.files.filter(file => allowedExtension.includes(mime.getExtension(file.mimetype))).length == value.length
                }).withMessage(i18next.t('validation.incorrectExtension', {extensions: allowedExtension}))
        ];
    }
}
