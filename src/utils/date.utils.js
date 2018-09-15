import moment from 'moment';

export function toClientFormat(date, inputFormat = null) {
    return moment(date, inputFormat).format('DD/MM/YYYY HH:mm:ss');
}