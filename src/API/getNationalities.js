async function getNationalities() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const data = await fetch(URL).then((response) => response.json());
  return (data.meals.map((elem) => elem.strArea));
}

export default getNationalities;
