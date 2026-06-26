const inputNomeAluno         = document.querySelector('#input-nome-aluno');
const inputPrimeiraNotaAluno = document.querySelector('#input-primeira-nota-aluno');
const inputSegundaNotaAluno  = document.querySelector('#input-segunda-nota-aluno');
const btnConfirmar           = document.querySelector('#btn-confirmar');
const btnRelatoiro           = document.querySelector("#btn-ir-para-relatorio");
const cadastroInputs         = document.querySelectorAll("input .form-control");

let alunos = new Map(); // separa cada aluno por chave e valor (map)
// recupera os dados, se n tiver nada, retorna um mapa vazio
let dadosSalvos = localStorage.getItem('cadastroAlunos'); 

if (dadosSalvos) {  // se tem dado salvo...
    // transforma o string do localStorage em array
    const alunosArray = JSON.parse(dadosSalvos);
    // coloca os dados recuperados no map original
    alunos = (Array.isArray(alunosArray))? new Map(alunosArray) : false; 
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

btnConfirmar.addEventListener('click', function() {
    let nomeAluno = inputNomeAluno.value.trim();
    let n1        = inputPrimeiraNotaAluno.valueAsNumber;
    let n2        = inputSegundaNotaAluno.valueAsNumber;

    if (inputsAreEmpty(cadastroInputs) || isNaN(n1) || isNaN(n2)) {
        alert("Preencha todos os campos!");
        return;
    } else if (n1 > 10 || n2 > 10) {
        alert("Insira Notas válidas!");
        inputPrimeiraNotaAluno.value = "";
        inputSegundaNotaAluno.value  = "";
    } else {
        alunos.set(nomeAluno, [n1, n2]);
        // guarda os alunos no localStorage em formato de string pra n perder os dados
        // dps transforma o map em array usando o Array.from(alunos.entries()) pro JSON aceitar
        localStorage.setItem('cadastroAlunos', JSON.stringify(Array.from(alunos.entries))); 
        alert("Cadastro realizado com sucesso! ");
            
        inputNomeAluno.value         = "";
        inputPrimeiraNotaAluno.value = "";
        inputSegundaNotaAluno.value  = "";
    }
});

// caso algum input fique vazio, ele vai retornar true usando a função '.some (algum)' 
function inputsAreEmpty(inputs) { return Array.from(inputs).some(input => input.value.trim() === ''); }

