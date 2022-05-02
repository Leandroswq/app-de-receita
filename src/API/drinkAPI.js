const getCocktail = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await fetch(URL).then((response) => response.json());
  return (data);
};

export default getCocktail;

// Criando para requisito 74
