import i18next from 'i18next';
import {body, header, param, oneOf, check} from 'express-validator/check';
import _ from "lodash";

export default class TemplateValidator {

    static get generateShortUri() {
        return [body('parameters').exists().withMessage(i18next.t('validation.requiredField', {field: 'parameters'})).custom((value) => {
                return _.isPlainObject(value);
            }).withMessage(i18next.t('validation.mustBeOfType', {
                field: 'parameters',
                type: 'object'
            }))
            .custom(value => {
                return isJSON(value);
            }).withMessage(i18next.t('validation.mustBeOfType', {
                field: 'parameters',
                type: 'json'
            })).trim()];
    }

    static get isValidUUID() {
        return [param('id').exists().withMessage(i18next.t('validation.requiredUrlParam', {field: 'id'})).isUUID().withMessage(i18next.t('validation.mustBeOfType', {
                field: 'id',
                type: 'uuid'
            }))];
    }
}

function isJSON(str) {
    try {
        return (JSON.parse(JSON.stringify(str)) && !!str);
    } catch (e) {
        return false;
    }
}
