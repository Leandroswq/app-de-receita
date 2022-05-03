export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export const filterValuesFromObjectToArray = (regex, obj) => {
  let keys = Object.keys(obj);
  keys = keys.filter((item) => regex.test(item))
    .filter((item) => obj[item] && obj[item] !== ' ' && obj[item] !== '');
  const values = keys.map((item) => [item, obj[item]]);
  return values;
};
