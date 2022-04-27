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
  default:
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;
  }

  const data = await fetch(URL).then((response) => response.json());
  return (data);
};

export default getDrinks;
