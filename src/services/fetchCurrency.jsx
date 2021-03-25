const fetchCurrency = async (url) => fetch(url).then((res) => res.json());

export default fetchCurrency;
