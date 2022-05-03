const getDrinks = async (searchItem, filter) => {
  let URL = '';

  switch (filter) {
  case 'ingredient':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchItem}`;
    break;
  case 'name':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchItem}`;
    break;
  case 'firstLetter':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchItem}`;
    break;
  case 'ingredientList':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    break;
  case 'categorie':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchItem}`;
    break;
  case 'categoriesList':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    break;
  default:
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;
  }
  const data = await fetch(URL).then((response) => response.json());
  return (data);
};

export default getDrinks;
