const getFoods = async (searchItem, filter) => {
  let URL = '';

  switch (filter) {
  case 'ingredient':
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`;
    break;
  case 'name':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
    break;
  case 'firstLetter':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`;
    break;
  case 'ingredientList':
    URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    break;
  default:
    URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    break;
  }

  const data = await fetch(URL).then((response) => response.json());
  return (data);
};

export default getFoods;
