export function initApis() {
  console.log("Inicializando módulo de APIs...");

  async function fetchApisData() {
    console.log("Iniciando requisições às APIs...");
    
    try {
      // definicao das 4 APIs solicitadas
      const apiEndpoints = [
        { 
          name: "Dólar (USD-BRL)",
          url: "https://economia.awesomeapi.com.br/json/last/USD-BRL",
          fallback: () => "1 USD = 5.50 BRL (dados offline)",
          parser: data => `1 USD = ${parseFloat(data.USDBRL?.bid).toFixed(2) || 'N/A'} BRL`
        },
        { 
          name: "Bitcoin (USD)",
          url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
          fallback: () => "1 BTC = 60,000 USD (dados offline)",
          parser: data => `1 BTC = ${data.bitcoin?.usd?.toLocaleString() || 'N/A'} USD`
        },
        { 
          name: "Horário na Hungria",
          url: "https://worldtimeapi.org/api/timezone/Europe/Budapest",
          fallback: () => `Horário local: ${new Date().toLocaleString("pt-BR", {timeZone: "Europe/Budapest"})}`,
          parser: data => {
            const dt = new Date(data.datetime);
            return dt.toLocaleString("pt-BR", {timeZone: "Europe/Budapest"});
          }
        },
        { 
          name: "Estação Espacial (ISS)",
          url: "https://api.wheretheiss.at/v1/satellites/25544",
          fallback: () => "Posição ISS: Lat. 0°, Long. 0° (dados offline)",
          parser: data => `Posição ISS: Lat. ${data.latitude?.toFixed(2)}°, Long. ${data.longitude?.toFixed(2)}°`
        }
      ];

      // feedback durante o carregamento
      document.getElementById('api-results').innerHTML = `
        <div class="loading">
          <div class="spinner"></div>
          Carregando dados das APIs...
        </div>
      `;

      const results = await Promise.all(
        apiEndpoints.map(async (api) => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch(api.url, { 
              signal: controller.signal,
              headers: {
                'Accept': 'application/json'
              }
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error(`Erro ${response.status}`);
            const data = await response.json();
            return {
              name: api.name,
              result: api.parser(data),
              error: null
            };
          } catch (error) {
            console.warn(`Falha na API ${api.name}:`, error);
            return {
              name: api.name,
              result: api.fallback(),
              error: error.message.includes("abort") ? "Timeout: Servidor não respondeu" : "Erro na conexão"
            };
          }
        })
      );

      renderApiResults(results);
    } catch (error) {
      console.error('Erro geral:', error);
      renderApiResults([
        {name: "Dólar (USD-BRL)", result: "1 USD = 5.50 BRL (modo offline)", error: "Erro geral"},
        {name: "Bitcoin (USD)", result: "1 BTC = 60,000 USD (modo offline)", error: "Erro geral"},
        {name: "Horário na Hungria", result: `Horário local: ${new Date().toLocaleString("pt-BR")}`, error: "Erro geral"},
        {name: "Estação Espacial (ISS)", result: "Posição ISS: Lat. 0°, Long. 0° (offline)", error: "Erro geral"}
      ]);
    }
  }

  function renderApiResults(apis) {
      const resultsHTML = apis.map(api => `
        <div class="api-result ${api.error ? 'has-error' : ''}">
          <h4>${api.name}</h4>
          <p>${api.result}</p>
        </div>
      `).join('');

      document.getElementById('api-results').innerHTML = resultsHTML;
  }

  // configuração de botão
  const apiButton = document.getElementById('fetch-apis-btn');
  if (apiButton) {
    apiButton.addEventListener('click', fetchApisData);
    console.log("Botão de APIs configurado com sucesso");
  } else {
    console.warn("Botão fetch-apis-btn não encontrado");
  }
}