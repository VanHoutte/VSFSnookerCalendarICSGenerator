import { sequelize } from '../db';
import config from '../config/config';

export function orderByDate(tableName, columnName, order = 'ASC') {
    return config.database.driver === 'sqlite' ? [sequelize.literal(`datetime(\`${tableName}\`.\`${columnName}\`)`), order] : [columnName, order]
}