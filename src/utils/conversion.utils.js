import { Encoding } from '../domain/encoding.domain';
import { StringDecoder } from 'string_decoder';

export function lambert72toWGS84(x, y) {
    let newLongitude, newLatitude;

    let n = 0.77164219,
        F = 1.81329763,
        thetaFudge = 0.00014204,
        e = 0.08199189,
        a = 6378388,
        xDiff = 149910,
        yDiff = 5400150,
        theta0 = 0.07604294;

    let xReal = xDiff - x,
        yReal = yDiff - y;

    let rho = Math.sqrt(xReal * xReal + yReal * yReal),
        theta = Math.atan(xReal / -yReal);

    newLongitude = (theta0 + (theta + thetaFudge) / n) * 180 / Math.PI;
    newLatitude = 0;

    for (let i = 0; i < 5; ++i) {
        newLatitude = (2 * Math.atan(Math.pow(F * a / rho, 1 / n) * Math.pow((1 + e * Math.sin(newLatitude)) / (1 - e * Math.sin(newLatitude)), e / 2))) - Math.PI / 2;
    }
    newLatitude *= 180 / Math.PI;

    return {
        latitude: newLatitude,
        longitude: newLongitude
    };
}

export function rad2deg(angle) {
    return angle / Math.PI * 180;
}

export function deg2rad(angle) {
    return (angle / 180) * Math.PI;
}

export function bufferToString(buffer, encoding = Encoding.UTF8) {
    return new StringDecoder(encoding).write(buffer);
}

export function toHumanReadableFileSize(bytes, si = true) {
    let thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    let units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}