import { queue } from "../../utils/promise.utils";
import { globalErrorHandler } from "../../services/error.service";
import { sequelize } from "../../db";
import { toCamelCase, toPascalCase } from "../../utils/strings.utils";

/**
 * This function will transform ID's in the URL to their respective database models and inject them in the req.
 */
export default function(model) {
    return function(req, res, next) {
        // Check if there is something to resolve.
        if (!req.params || Object.keys(req.params).length === 0) {
            return next();
        }

        // Add a fail-safe initialisation of the req.models
        if (!req.models) {
            req.models = {};
        }

        var splittedValue = model.split(".");
        if(!splittedValue || !splittedValue.length) {
            return next();
        }

        var identifier;
        if(splittedValue.length > 1) {
            identifier = splittedValue[1];
        }
        
        let resolvers = Object.keys(req.params).map(key => ({
            key: key,
            value: req.params[key],
            model: findModelByName(splittedValue[0]),
            identifier: identifier
        }));

        // Throw error when an entity could not be resolved, should only occur during development.
        if (resolvers.some(resolver => resolver.model === null)) {
            throw new Error("Couldn't resolve entity");
        }

        // Create promises that will resolve the models.
        let promises = resolvers.map(resolver => {
            let whereStatement = { where: {}, include: [{all: true, nested: true}] };
            whereStatement.where[resolver.identifier] = resolver.value;
            return () => resolver.model.findOne(whereStatement);
        });

        // Resolve the models.
        queue(promises)
            .then(models => {
                for (let model of models) {
                    if (model) {
                        req.models[toCamelCase(model.constructor.name)] = model;
                    }
                }

                next();
            })
            .catch(err => globalErrorHandler(res, err));
    };
}

function findModelByName(name) {
    // Sanitize the name.
    name = toPascalCase(name.replace("Id", ""));

    // Get the model from Sequelize.
    return sequelize.models[name] || null;
}
