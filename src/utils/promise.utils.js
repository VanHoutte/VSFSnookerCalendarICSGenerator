/**
 * Executes promises one by one in sequence. Only does the next promise when the previous promise was resolved.
 * @param functions An array of promises, each promise should be wrapped in a function so it is not executed immediately. See example below.
 * @example functions () => { return myPromise(parameter); }
 */
export const queue = functions =>
    functions.reduce((promise, func) =>
        promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));