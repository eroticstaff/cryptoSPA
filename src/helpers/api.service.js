async function getCoinChart(coin) {
  const vs_val = coin.vs_currecy_id.join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin.api_id}&vs_currencies=${vs_val}`;
  let res = await fetch(url).then((res) => res.json());
  return res[coin.api_id];
}

export default getCoinChart;
