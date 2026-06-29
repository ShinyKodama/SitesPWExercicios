const inputNomeAluno         = document.querySelector('#input-nome-aluno');
const inputPrimeiraNotaAluno = document.querySelector('#input-primeira-nota-aluno');
const inputSegundaNotaAluno  = document.querySelector('#input-segunda-nota-aluno');
const btnConfirmar           = document.querySelector('#btn-confirmar');
const btnRelatorio           = document.querySelector("#btn-ir-para-relatorio");
const cadastroInputs         = document.querySelectorAll("input.form-control");
const linkPagRelatorio       = './PagRelatorio/relatorio.html';
const maxAlunos = 5;

let alunos = new Map(); // separa cada aluno por chave e valor (map)
// recupera os dados, se n tiver nada, retorna um mapa vazio
let dadosSalvos = localStorage.getItem('cadastroAlunos'); 

if (dadosSalvos) {  // se tem dado salvo...
    // transforma o string do localStorage em array
    const alunosArray = JSON.parse(dadosSalvos);
    // coloca os dados recuperados no map original
    alunos = (Array.isArray(alunosArray))? new Map(alunosArray) : new Map(); 
    btnRelatorio.disabled = false;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

btnConfirmar.addEventListener('click', async function() {
    let nomeAluno = inputNomeAluno.value.trim();
    let n1        = inputPrimeiraNotaAluno.valueAsNumber;
    let n2        = inputSegundaNotaAluno.valueAsNumber;

    if (inputsAreEmpty(cadastroInputs) || isNaN(n1) || isNaN(n2)) {  
        cadastroInputs.forEach(c => {
            if (inputIsEmpty(c) || (c !== inputNomeAluno && isNaN(c.valueAsNumber))) {
                shakeErrorAnimation(c);
                c.value = '';
            } else {
                shakeValidAnimation(c);
            } 
        });
        await sleep(350);
        alert("Preencha todos os campos!");
        return;

    } else if (n1 > 10 || n2 > 10 || n1 < 0 || n2 < 0) {
        
        inputPrimeiraNotaAluno.value = (n1 > 10 || n1 < 0) ? '' : n1; 
        inputSegundaNotaAluno.value  = (n2 > 10 || n1 < 0) ? '' : n2;   

        shakeValidAnimation(inputNomeAluno);
        await sleep(350);
        alert("Insira notas válidas! ");

        inputPrimeiraNotaAluno.focus();
        return;
    } else {
        cadastroInputs.forEach(c => shakeValidAnimation(c));
        await sleep(350);
    }

    if (alunos.size < maxAlunos) {
        alunos.set(nomeAluno, [n1, n2]);
        // guarda os alunos no localStorage em formato de string pra n perder os dados
        // dps transforma o map em array usando o Array.from(alunos.entries()) pro JSON aceitar
        localStorage.setItem('cadastroAlunos', JSON.stringify(Array.from(alunos.entries()))); 
        
        btnRelatorio.disabled = false;
            
        inputNomeAluno.value         = "";
        inputPrimeiraNotaAluno.value = "";
        inputSegundaNotaAluno.value  = "";

    } else {
        alert("Máximo de alunos atingido! (Max. 5)");
        cadastroInputs.forEach(c => shakeErrorAnimation(c) );
        inputNomeAluno.value         = "";
        inputPrimeiraNotaAluno.value = "";
        inputSegundaNotaAluno.value  = "";
    }
});

btnRelatorio.addEventListener("click", function() { window.location.href = linkPagRelatorio; });
inputNomeAluno.addEventListener('keypress', function(event) {
    // Se a tecla pressionada for um número, cancela o evento de digitação
    if (/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
});

inputNomeAluno.addEventListener('input', function() {
    // Remove qualquer número que aparecer no campo instantaneamente
    this.value = this.value.replace(/[0-9]/g, '');
});

// caso algum input fique vazio, ele vai retornar true usando a função '.some (algum)' 
function inputsAreEmpty(inputs) { return Array.from(inputs).some(input => input.value.trim() === ''); }
// cuida de cada input separadamente
function inputIsEmpty(input)    { return input.value.trim() === ''; }
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
        }
    ],
        {
            duration: 350,
            iterations: 1,
            easing: 'ease'
        });
}
function shakeValidAnimation(element) {
    element.animate([
        {
            transform: 'translateX(-10px) ',
            opacity: 1,
            borderColor: '#d3ffca',
            backgroundColor: '#8bff95',
        },
        {
            transform: 'translateX(0px)',
            opacity: 1,
            borderColor: '#caffcd',
            backgroundColor: '#8bff9a',
        },
        {
            transform: 'translateX(10px)',
            opacity: 1,
            borderColor: '#caffd7',
            backgroundColor: '#8bffb2',
        },
        {
            transform: 'translateX(0px)', opacity: 1,
        }
    ],
        {
            duration: 350,
            iterations: 1,
            easing: 'ease'
        });
}


