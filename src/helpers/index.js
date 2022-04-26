export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  localStorage.getItem(key);
};
