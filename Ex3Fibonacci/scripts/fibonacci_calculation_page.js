const btnConfirmar = document.querySelector('#btn-confirmar');
let limitante_sequencia = document.querySelector('#input-limitante-sequencia');
let resultado = document.querySelector('#resultado');

btnConfirmar.addEventListener('click', function () {
    let limitante = limitante_sequencia.valueAsNumber;
    
    if (isNaN(limitante)) {
        resultado.innerHTML = "Digite um número válido!";
        return;
    }

    if (limitante <= 0) {
        resultado.innerHTML = "";
        return;
    }

    if (limitante === 1) {
        resultado.innerHTML = "0";
        return;
    }

    let numeros = [0, 1];

    for (let i = 2; i < limitante; i++) {
        numeros.push(numeros[i - 1] + numeros[i - 2]);
    }

    resultado.innerHTML = numeros.join(' ');
});