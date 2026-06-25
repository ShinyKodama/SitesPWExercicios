const inputTemperatura = document.querySelector("#inputTemperatura");
const btnRelatorio = document.querySelector("#btnRelatorio");
const linkSegundaPagina = "./paginaRelatorio/relatorio.HTML";
const btnLimparRelatorio = document.querySelector("#btnLimparRegistros");
let listaTemperaturas = JSON.parse(localStorage.getItem("listaTemperaturas")) || [];

let totalRegistros = listaTemperaturas.length;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

alterStateButton(btnRelatorio);
alterStateButton(btnLimparRelatorio);

document.querySelector("#btnConfirmar").addEventListener("click", async function () {
    const alertPopUp = document.querySelector("#sucessoAlert");
    const temp = inputTemperatura.value.trim();

    if (isNaN(temp) || temp === '') {
        shakeErrorAnimation(inputTemperatura);
    } else {
        listaTemperaturas.push(temp);
        totalRegistros++;

        localStorage.setItem("listaTemperaturas", JSON.stringify(listaTemperaturas));

        inputTemperatura.value = '';
        alterStateButton(btnRelatorio);
        alterStateButton(btnLimparRelatorio);
        await alertEntryAnimation(alertPopUp);
    }
});

inputTemperatura.addEventListener("focus", async function() {
    const quantidadeRegistrosAlertPopUp = document.querySelector("#quantidadeRegistrosAlert");
    if (quantidadeRegistrosAlertPopUp) {
        
        quantidadeRegistrosAlertPopUp.innerHTML = (totalRegistros === 1) 
            ? `<strong>${totalRegistros}</strong> registro foi realizado!`
            : `<strong>${totalRegistros}</strong> registros foram realizados!`;

        await sleep(200);
        await alertEntryAnimation(quantidadeRegistrosAlertPopUp);
    }
});

btnLimparRelatorio.addEventListener("click", async function() {
    let resposta = confirm("Você tem certeza que quer apagar todos os registros? ");
    if (resposta) {
        const deleteAlertPopUp = document.querySelector("#deletarRegistroAlert");
    
        localStorage.removeItem("listaTemperaturas");
        listaTemperaturas = [];
        totalRegistros = 0; 

        alterStateButton(btnRelatorio);
        alterStateButton(btnLimparRelatorio);
        if (deleteAlertPopUp)
            await alertEntryAnimation(deleteAlertPopUp);

        location.reload();
    }
});

btnRelatorio.addEventListener("click", function () {   
    window.location.href = linkSegundaPagina;
});

function alterStateButton(button) {
    if (!button) return;

    if (listaTemperaturas.length >= 1) {
        button.disabled = false;
        button.style.cursor = "pointer";
    } else {
        button.disabled = true;
        button.style.cursor = "not-allowed";
    }
}

function shakeErrorAnimation(element) {
    element.animate([
        {
            transform: 'translateX(-10px) ',
            opacity: 1,
            borderColor: '#ffcaca',
            backgroundColor: '#ff8b8b',
        },
        {
            transform: 'translateX(0px)',
            opacity: 1,
            borderColor: '#ffcaca',
            backgroundColor: '#ff8b8b',
        },
        {
            transform: 'translateX(10px)',
            opacity: 1,
            borderColor: '#ffcaca',
            backgroundColor: '#ff8b8b',
        },
        {
            transform: 'translateX(0px)', opacity: 1,
        }],
        {
            duration: 350,
            iterations: 1,
            easing: 'ease'
        });
}

async function alertEntryAnimation(element) {
    element.classList.remove("d-none");
    const entryAnimation = element.animate([
        { 
            transform: 'translateY(-20px)',
            opacity: 0
        },
        { 
            transform: 'translateY(0)', 
            opacity: 1 
        }
    ], 
        {
            duration: 400,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });

    await entryAnimation.finished;
    await sleep(1100);

    const exitAnimation = element.animate([
        { 
            transform: 'translateY(0)', 
            opacity: 1 
        },
        { 
            transform: 'translateY(10px)', 
            opacity: 0 
        } 
    ], 
        {
            duration: 300,
            easing: 'ease-in'
        });

    await exitAnimation.finished;
    element.classList.add("d-none");
}

