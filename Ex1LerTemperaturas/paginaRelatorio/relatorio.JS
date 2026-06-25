let listaTemperaturas = JSON.parse(localStorage.getItem("listaTemperaturas")) || [];
const resultsBox = document.querySelector("#resultsBox");
if (resultsBox) { // se o container onde ele vai botar os negócio existir...
    resultsBox.innerHTML = '';

    if (listaTemperaturas.length > 0) {
        listaTemperaturas.forEach(temp => {
            const cardTemperatura = document.createElement("div"); // cria uma div nova na página do relatorio
            // atribui as classes que a 'caixa' que vai receber a temperatura vai ter
            cardTemperatura.className = "w-fit p-3 mx-2 d-flex bg-dark position-relative align-items-center text-light rounded-4 flex-shrink-0 display-6";
            cardTemperatura.textContent = `${temp}°C`;

            resultsBox.appendChild(cardTemperatura);   // adiciona a nova temperatura q foi registrada na página
        });
    }
}

const resultsHighestTemp = document.querySelector("#resultsHighestTemp");
resultsHighestTemp.innerHTML = `${getTheHighestTemperature(listaTemperaturas)}°C`;

const resultsLowestTemp = document.querySelector("#resultsLowestTemp");
resultsLowestTemp.innerHTML = (listaTemperaturas.length >= 2)
    ? `${getTheLowestTemperature(listaTemperaturas)}°C`
    : `Adicione mais uma temperatura para fazer a comparação!`;

const resultsAverageTemp = document.querySelector("#resultsAverageTemp");
resultsAverageTemp.innerHTML = (listaTemperaturas.length >= 2)
    ? `${getTheAverageTemperature(listaTemperaturas)}°C`
    : `Adicione mais uma temperatura para realizar o cálculo!`;

function getTheHighestTemperature(listTemp) {   // função q retorna a maior temperatura do array
    let highestTemp = -Infinity
    listTemp.forEach(t => {
        const num = Number(t);
        if (num > highestTemp)
            highestTemp = num;
    });
    return highestTemp;
}

function getTheAverageTemperature(listTemp) {       // função que retorna a média das temperaturas do array
    if (listTemp.length === 0) return;
    let sum = listTemp.reduce((acc, t) => acc + Number(t), 0);
    return sum / listTemp.length;
}

// o .reduce passa pelo array todo usando um loop interno.
// A cada volta, ele pega o item atual 't', faz a conta e 
// guarda o resultado na variável 'acc' (acumuladora).
   // isso é bom pq reduz toda a função à só 3 ou 4 linhas :)
    

function getTheLowestTemperature(listTemp) {    // função q retorna a menor temperatura do array
    let lowestTemp = Infinity
    listTemp.forEach(t => {
        const num = Number(t);
        if (num < lowestTemp)
            lowestTemp = num;
    });
    return lowestTemp;
}