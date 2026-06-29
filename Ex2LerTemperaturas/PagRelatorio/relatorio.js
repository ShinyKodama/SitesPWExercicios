const dadosSalvos      = localStorage.getItem('cadastroAlunos'); 
const relatoriosAlunos = document.querySelector("#relatorios-alunos");

if (relatoriosAlunos) {
    relatoriosAlunos.innerHTML = '';
    relatoriosAlunos.classList.add('d-flex', 'flex-wrap', 'gap-3');
    if (dadosSalvos) {  
        const alunosArray = JSON.parse(dadosSalvos);
        const alunos = new Map(alunosArray);
  
        alunos.forEach((notas, nome) => {
            const cardDadoAluno     = document.createElement('div');
            
            cardDadoAluno.className = 'd-flex flex-column shadow-lg text-white bf-filter-5px bf-brightness-1 rounded-4 px-5 p-2 fs-2 font-family-oswald';
            const n1 = Number(notas[0]) || 0;
            const n2 = Number(notas[1]) || 0;
            const media = ((n1 + n2) / 2).toFixed(1);
            let corSituacao = 'text-success';
            
            if (media < 6) corSituacao = 'text-danger';
            else if (media >= 6 && media < 7) corSituacao = 'text-warning';
            
            cardDadoAluno.innerHTML = `
                <strong>${nome}</strong> 
                1° Nota: ${Number(n1).toFixed(1)} <br> 
                2° Nota: ${Number(n2).toFixed(1)} <br> 
                <span class='${corSituacao}'>Média: ${Number(media).toFixed(1)} </span>`;
            
            relatoriosAlunos.appendChild(cardDadoAluno);
        });
    } else {
        relatoriosAlunos.innerHTML = '<div class="ms-2">Nenhum aluno cadastrado ainda.</div>';
    }
}