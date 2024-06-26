document.getElementById('searchButton').addEventListener('click', function() {
    const countryName = document.getElementById('countryInput').value.trim();
    if (countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('País não encontrado');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    const country = data[0];
                    const countryInfo = `
                        <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" class="country-flag">
                        <div class="country-details"><strong>Nome:</strong> ${country.name.common}</div>
                        <div class="country-details"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</div>
                        <div class="country-details"><strong>Região:</strong> ${country.region}</div>
                        <div class="country-details"><strong>Sub-região:</strong> ${country.subregion}</div>
                        <div class="country-details"><strong>População:</strong> ${country.population.toLocaleString()}</div>
                        <div class="country-details"><strong>Área:</strong> ${country.area.toLocaleString()} km²</div>
                        <div class="country-details"><strong>Moeda:</strong> ${Object.values(country.currencies).map(c => c.name).join(', ')}</div>
                        <div class="country-details"><strong>Idiomas:</strong> ${Object.values(country.languages).join(', ')}</div>
                    `;
                    document.getElementById('countryInfo').innerHTML = countryInfo;
                } else {
                    document.getElementById('countryInfo').innerHTML = 'País não encontrado.';
                }
            })
            .catch(error => {
                document.getElementById('countryInfo').innerHTML = 'Erro ao buscar informações do país.';
                console.error('Error:', error);
            });
    } else {
        document.getElementById('countryInfo').innerHTML = 'Por favor, digite o nome de um país.';
    }
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('countryInput').value = '';
    document.getElementById('countryInfo').innerHTML = '';
});