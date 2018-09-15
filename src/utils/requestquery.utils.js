// converts the query string to an object based on the passed config object

export function convertQueryToObject(query, query_mapping) {
    var whereClause = {};
    for (var key in query_mapping) {
        var newQuery = query[key];
        if (newQuery) {
            if (typeof query_mapping[key] === 'object') {
                whereClause = {
                    ...whereClause,
                    ...query_mapping[key]
                }
            } else {
                whereClause = {
                    ...whereClause,
                    [query_mapping[key]]: newQuery
                }
            }
        }
    }

    return whereClause;
}
