let limitante_sequencia = document.querySelector('#input-limitante-sequencia');
let resultado = document.querySelector('#resultado');

let limitante = limitante_sequencia.valueAsNumber;

let numeros = [0, 1];

for (let i = 2; i < limitante; i++) { 
    let proxNum = numeros[i - 1] + (numeros[i - 2]); 
    numeros.push(proxNum); 
}

resultado.innerHTML = numeros.join(' ');