const dadosSalvos                     = localStorage.getItem('cadastroAlunos'); 
const relatoriosAlunos                = document.querySelector("#relatorios-alunos");
const relatoriosAlunosAcimaMedia      = document.querySelector('#relatorios-alunos-acima-media');
const relatoriosAlunosAbaixoMedia     = document.querySelector('#relatorios-alunos-abaixo-media');
const relatoriosQtdeAlunosAcimaMedia  = document.querySelector('#relatorios-qtde-alunos-acima-media');
const relatoriosQtdeAlunosAbaixoMedia = document.querySelector('#relatorios-qtde-alunos-abaixo-media')
let totalAlunosAcimaMedia             = 0;
let totalAlunosAbaixoMedia            = 0;

if (relatoriosAlunos) {
    relatoriosAlunos.innerHTML = '';
    relatoriosAlunos.classList.add('d-flex', 'flex-wrap', 'gap-3');
    
    if (relatoriosAlunosAcimaMedia) relatoriosAlunosAcimaMedia.innerHTML = '';
    if (relatoriosAlunosAbaixoMedia) relatoriosAlunosAbaixoMedia.innerHTML = '';

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

            if (Number(media) > 7) {
                corSituacao = 'text-light-green'
                totalAlunosAcimaMedia++;
            
                const cardAlunosAcimaDaMedia  = document.createElement('div');
                
                cardAlunosAcimaDaMedia.className  = 'd-flex flex-column green-glow border-color-white text-white bf-filter-5px bf-brightness-3 rounded-4 p-4 font-family-oswald overflow-auto w-fit';
                cardAlunosAcimaDaMedia.innerHTML = `
                    <strong>${nome}</strong>
                    <span class='${corSituacao}'>Média: ${Number(media).toFixed(1)} </span>`;
            
                if (relatoriosAlunosAcimaMedia)
                    relatoriosAlunosAcimaMedia.appendChild(cardAlunosAcimaDaMedia);                                    
            
            } else {
                corSituacao = 'text-light-red';
                totalAlunosAbaixoMedia++;
                
                const cardAlunosAbaixoDaMedia = document.createElement('div');
                
                cardAlunosAbaixoDaMedia.className = 'd-flex flex-column red-glow border-color-white text-white bf-filter-5px bf-brightness-3 rounded-4 p-4 font-family-oswald overflow-auto w-fit';
                cardAlunosAbaixoDaMedia.innerHTML = `
                    <strong>${nome}</strong>
                    <span class='${corSituacao}'>Média: ${Number(media).toFixed(1)} </span>`;

                if (relatoriosAlunosAbaixoMedia) 
                    relatoriosAlunosAbaixoMedia.appendChild(cardAlunosAbaixoDaMedia);      
            }
        });

        if (relatoriosQtdeAlunosAcimaMedia) relatoriosQtdeAlunosAcimaMedia.innerHTML = `
            <h1>${totalAlunosAcimaMedia} alunos</h1>`;
            
        if (relatoriosQtdeAlunosAbaixoMedia) relatoriosQtdeAlunosAbaixoMedia.innerHTML = `
            <h1>${totalAlunosAbaixoMedia} alunos</h1>`;
        
    } else {
        relatoriosAlunos.innerHTML = '<div class="ms-2 text-white">Nenhum aluno cadastrado ainda.</div>';
        if (relatoriosQtdeAlunosAcimaMedia)  relatoriosQtdeAlunosAcimaMedia.innerHTML = `<h3>0 alunos</h3>`; 
        if (relatoriosQtdeAlunosAbaixoMedia) relatoriosQtdeAlunosAbaixoMedia.innerHTML = `<h3>0 alunos</h3>`; 
    }
}

