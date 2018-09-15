import i18next from 'i18next';
import {body, header, param, oneOf, check} from 'express-validator/check';

import {PROFILETYPEENUM} from '../../../domain/profiletype.domain';

export default class CategoryValidator {

    static get validIdentifier() {
        return [
            param('id').exists().withMessage(i18next.t('validation.requiredUrlParam', {field: 'id'})).isInt({gt: 0}).withMessage(i18next.t('validation.mustBeInt', {field: 'id'})),
        ];
    }

    static get validHeaders() {
        return [
            header("Authorization").optional().custom((value, {req}) => {
                var headers = req.headers;
                if (headers.amaprofiletype === undefined) {
                    return false;
                }

                return (headers.amaprofiletype == PROFILETYPEENUM.A_PROFILE || headers.amaprofiletype == PROFILETYPEENUM.M_PROFILE);
            }).withMessage(i18next.t("validation.accessTokenProvideProfileType", {values: "M_PROFILE, A_PROFILE"}))
        ];
    }

    static get postSubmission() {
        return [
            param('id').exists().withMessage(i18next.t('validation.requiredUrlParam', {field: 'id'})).custom((value, {req}) => {
                return req.models && req.models.category;
            }).withMessage(i18next.t('validation.entityDoesNotExist', {entity: 'Category'})),

            body('submission.sections').exists().withMessage(i18next.t('validation.requiredField', {field: 'sections'})).isArray().withMessage(i18next.t('validation.mustBeOfType', {
                field: 'sections',
                type: 'array'
            })),

            body('submission.sections.*.key').exists().withMessage(i18next.t('validation.requiredField', {field: 'sections.*.key'})).isString().withMessage(i18next.t('validation.mustBeOfType', {
                field: 'sections.*.key',
                type: 'string'
            })),

            body('submission.sections.*.value').exists().withMessage(i18next.t('validation.requiredField', {field: 'sections.*.value'})),

            body('submission.extra_questions').exists().withMessage(i18next.t('validation.requiredField', {field: 'extra_questions'})).isArray().withMessage(i18next.t('validation.mustBeOfType', {
                field: 'extra_questions',
                type: 'array'
            })),

            body('submission.extra_questions.*.key').exists().withMessage(i18next.t('validation.requiredField', {field: 'extra_questions.*.key'})).isString().withMessage(i18next.t('validation.mustBeOfType', {
                field: 'extra_questions.*.key',
                type: 'string'
            })),

            body('submission.extra_questions.*.value').exists().withMessage(i18next.t('validation.requiredField', {field: 'extra_questions.*.value'}))
        ];
    }

}
