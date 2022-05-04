export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const value = localStorage[key];
  if (value) {
    return JSON.parse(value);
  }
};

export const filterValuesFromObjectToArray = (regex, obj) => {
  let keys = Object.keys(obj);
  keys = keys.filter((item) => regex.test(item))
    .filter((item) => obj[item] && obj[item] !== ' ' && obj[item] !== '');
  const values = keys.map((item) => [item, obj[item]]);
  return values;
};

export const statusRecipes = (id, key) => {
  const doneRecipes = getLocalStorage('doneRecipes');
  if (doneRecipes) {
    const atualRecipe = doneRecipes.find((item) => item.id === Number(id));
    if (atualRecipe) {
      return 'done';
    }
  }
  const inProgressRecipes = getLocalStorage('inProgressRecipes');
  if (inProgressRecipes && inProgressRecipes[key]) {
    console.log(inProgressRecipes);
    const atualRecipe = inProgressRecipes[key][id];
    if (atualRecipe) {
      return 'inProgress';
    }
  }

  return 'start';
};
