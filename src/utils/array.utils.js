/**
 * If it's not certain if a parameter is an object or an array but an array is required, this function will wrap
 * the object inside an array.
 */

export function sanitizeArray(potentialArray) {
    if (!potentialArray) {
        return [];
    }

    if (!(potentialArray instanceof Array)) {
        potentialArray = [potentialArray];
    }

    return potentialArray;
}

export function first(array) {

    if (!(array instanceof Array)) {
        return array;
    }

    if (array.length === 0) {
        return null;
    }

    return array[0];
}
