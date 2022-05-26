/**
 * Making Deep Property Access Safe in JavaScript
 * @constant
 * @type {function}
 * @param {function} fn
 * @param {data} defaultVal
 * @return {function}
 */

 export const getSafe = (fn, defaultVal) => {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  };