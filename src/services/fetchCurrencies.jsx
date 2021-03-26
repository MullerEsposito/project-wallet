const url = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = async () => fetch(url).then((res) => res.json());

export default fetchCurrencies;
