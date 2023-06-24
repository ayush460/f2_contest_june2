document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const sortMarketCapButton = document.getElementById('sortMarketCapButton');
    const sortPercentageChangeButton = document.getElementById('sortPercentageChangeButton');
    const tableBody = document.getElementById('tableBody');
    let cryptoData = [];
  
    // Fetch data using .then
    function fetchDataWithThen() {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
          cryptoData = data;
          renderTable();
        })
        .catch(error => console.error(error));
    }
  
    // Fetch data using async/await
    async function fetchDataWithAsyncAwait() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        cryptoData = data;
        renderTable();
      } catch (error) {
        console.error(error);
      }
    }
  
    // Render data in the table
    function renderTable() {
      tableBody.innerHTML = '';
  
      cryptoData.forEach(item => {
        const row = document.createElement('tr');
  
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
  
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
  
        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        imageCell.appendChild(image);
  
        const symbolCell = document.createElement('td');
        symbolCell.textContent = item.symbol;
  
        const priceCell = document.createElement('td');
        priceCell.textContent = item.current_price;
  
        const volumeCell = document.createElement('td');
        volumeCell.textContent = item.total_volume;
  
        row.appendChild(nameCell);
        row.appendChild(idCell);
        row.appendChild(imageCell);
        row.appendChild(symbolCell);
        row.appendChild(priceCell);
        row.appendChild(volumeCell);
  
        tableBody.appendChild(row);
      });
    }
  
    // Event listeners
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredData = cryptoData.filter(item => item.name.toLowerCase().includes(searchTerm) || item.symbol.toLowerCase().includes(searchTerm));
      cryptoData = filteredData;
      renderTable();
    });
  
    sortMarketCapButton.addEventListener('click', () => {
      cryptoData.sort((a, b) => b.market_cap - a.market_cap);
      renderTable();
    });
  
    sortPercentageChangeButton.addEventListener('click', () => {
      cryptoData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderTable();
    });
  
    // Fetch data using both methods
    fetchDataWithThen();
    // fetchDataWithAsyncAwait();
  });
  