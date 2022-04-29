const getMeal = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const data = await fetch(URL).then((response) => response.json());
  return (data);
};

export default getMeal;

// Criando para requisito 74
