/**
 * Returns an array containing the values of an object literal
 */
export const values = obj =>
  Object.keys(obj).map(k => obj[k])
