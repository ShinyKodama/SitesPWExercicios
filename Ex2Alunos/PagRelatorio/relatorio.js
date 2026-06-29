const dadosSalvos = localStorage.getItem('cadastroAlunos');

const relatoriosAlunos              = document.querySelector("#relatorios-alunos");
const relatoriosAlunosAcimaMedia    = document.querySelector('#relatorios-alunos-acima-media');
const relatoriosAlunosAbaixoMedia   = document.querySelector('#relatorios-alunos-abaixo-media');
const relatoriosAlunosDentroMedia   = document.querySelector('#relatorios-alunos-dentro-media');
const relatoriosMediaTotalSala      = document.querySelector('#relatorios-media-sala');
const relatoriosAlunosAprovados     = document.querySelector('#relatorios-alunos-aprovados');

const relatoriosQtdeAlunosAcimaMedia  = document.querySelector('#relatorios-qtde-alunos-acima-media');
const relatoriosQtdeAlunosAbaixoMedia = document.querySelector('#relatorios-qtde-alunos-abaixo-media');
const relatorioQtdeAlunosDentroMedia  = document.querySelector('#relatorios-qtde-alunos-dentro-media');

let totalAlunosAcimaMedia  = 0;
let totalAlunosAbaixoMedia = 0;
let totalAlunosDentroMedia = 0;
let soma_medias     = 0;
let alunosAprovados = 0;

if (relatoriosAlunos) {
    relatoriosAlunos.innerHTML = '';

    if (relatoriosAlunosAcimaMedia)  relatoriosAlunosAcimaMedia.innerHTML  = '';
    if (relatoriosAlunosAbaixoMedia) relatoriosAlunosAbaixoMedia.innerHTML = '';
    if (relatoriosAlunosDentroMedia) relatoriosAlunosDentroMedia.innerHTML = '';
    if (relatoriosAlunosAprovados)   relatoriosAlunosAprovados.innerHTML   = '';

    if (dadosSalvos) {
        const alunosArray = JSON.parse(dadosSalvos);
        const alunos = new Map(alunosArray);
        const totalAlunosCadastrados = alunos.size;

        alunos.forEach((notas, nome) => {
            const cardDadoAluno = document.createElement('div');
            cardDadoAluno.className = 'd-flex flex-column shadow-lg text-white bf-filter-5px bf-brightness-1 rounded-4 px-5 p-2 fs-2 font-family-oswald';

            const n1 = Number(notas[0]) || 0;
            const n2 = Number(notas[1]) || 0;

            let media = ((n1 + n2) / 2);

            soma_medias += media;

            let corSituacao = '';
            let statusAluno = '';

            if (media < 6) {
                corSituacao = 'text-light-red';
                statusAluno = 'abaixo';
            } else if (media >= 6 && media < 7) {
                corSituacao = 'text-light-yellow';
                statusAluno = 'dentro';
            } else {
                corSituacao = 'text-light-green';
                statusAluno = 'acima';
            }

            if (statusAluno === "dentro" || statusAluno === "acima")
                alunosAprovados++;

            cardDadoAluno.innerHTML = `
                <strong>${nome}</strong> 
                1° Nota: ${Number(n1).toFixed(1)} <br> 
                2° Nota: ${Number(n2).toFixed(1)} <br> 
                <span class='${corSituacao}'>Média: ${Number(media).toFixed(1)} </span>`;

            relatoriosAlunos.appendChild(cardDadoAluno);

            if (statusAluno === "acima") {
                const textoPorcentagem_AM = document.querySelector('#relatorios-porcentagem-alunos-AM');

                corSituacao = 'text-light-green'
                totalAlunosAcimaMedia++;
                let porcentagemAlunosAcimaMedia = (totalAlunosAcimaMedia / totalAlunosCadastrados) * 100;

                const cardAlunosAcimaDaMedia = document.createElement('div');

                cardAlunosAcimaDaMedia.className = 'd-flex flex-column green-glow border-color-white text-white bf-filter-5px bf-brightness-3 rounded-4 p-4 font-family-oswald overflow-auto w-fit';
                cardAlunosAcimaDaMedia.innerHTML = `
                    <strong>${nome}</strong>
                    <span class='${corSituacao}'>Média: ${Number(media).toFixed(1)} </span>`;

                if (relatoriosAlunosAcimaMedia)
                    relatoriosAlunosAcimaMedia.appendChild(cardAlunosAcimaDaMedia);

                textoPorcentagem_AM.innerHTML = (totalAlunosAcimaMedia === 1)
                    ? `Representa ${porcentagemAlunosAcimaMedia.toFixed(1)}% do total de alunos registrados`
                    : `Representam ${porcentagemAlunosAcimaMedia.toFixed(1)}% do total de alunos registrados`;


            } else if (statusAluno === "abaixo") {
                const textoPorcentagem_AbM = document.querySelector('#relatorios-porcentagem-alunos-AbM');

                corSituacao = 'text-light-red';
                totalAlunosAbaixoMedia++;
                let porcentagemAlunosAbaixoMedia = (totalAlunosAbaixoMedia / totalAlunosCadastrados) * 100;

                const cardAlunosAbaixoDaMedia = document.createElement('div');

                cardAlunosAbaixoDaMedia.className = 'd-flex flex-column red-glow border-color-white text-white bf-filter-5px bf-brightness-3 rounded-4 p-4 font-family-oswald overflow-auto w-fit';
                cardAlunosAbaixoDaMedia.innerHTML = `
                    <strong>${nome}</strong>
                    <span class='${corSituacao}'>Média: ${Number(media).toFixed(1)} </span>`;

                if (relatoriosAlunosAbaixoMedia)
                    relatoriosAlunosAbaixoMedia.appendChild(cardAlunosAbaixoDaMedia);

                textoPorcentagem_AbM.innerHTML = (totalAlunosAbaixoMedia === 1)
                    ? `Representa ${porcentagemAlunosAbaixoMedia.toFixed(1)}% do total de alunos registrados`
                    : `Representam ${porcentagemAlunosAbaixoMedia.toFixed(1)}% do total de alunos registrados`;

            } else {
                const textoPorcentagem_DM = document.querySelector('#relatorios-porcentagem-alunos-DM');

                corSituacao = 'text-light-yellow';
                totalAlunosDentroMedia++;
                let porcentagemAlunosDentroMedia = (totalAlunosDentroMedia / totalAlunosCadastrados) * 100;

                const cardAlunosDentroDaMedia = document.createElement('div');

                cardAlunosDentroDaMedia.className = 'd-flex flex-column yellow-glow border-color-white text-white bf-filter-5px bf-brightness-3 rounded-4 p-4 font-family-oswald overflow-auto w-fit';
                cardAlunosDentroDaMedia.innerHTML = `
                    <strong>${nome}</strong>
                    <span class='${corSituacao}'>Média: ${Number(media).toFixed(1)} </span>`;

                if (relatoriosAlunosDentroMedia)
                    relatoriosAlunosDentroMedia.appendChild(cardAlunosDentroDaMedia);

                textoPorcentagem_DM.innerHTML = (totalAlunosDentroMedia === 1)
                    ? `Representa ${porcentagemAlunosDentroMedia.toFixed(1)}% do total de alunos registrados`
                    : `Representam ${porcentagemAlunosDentroMedia.toFixed(1)}% do total de alunos registrados`;
            }
        });

        if (relatoriosAlunosAprovados) {
            relatoriosAlunosAprovados.classList.remove('green-glow', 'yellow-glow', 'red-glow');
            
            let porcentagemAlunosAprovados = (alunosAprovados / totalAlunosCadastrados) * 100;
            const cardPorcentagemAlunosAprovados = document.createElement('div');
            
            if (porcentagemAlunosAprovados > 50) {
                relatoriosAlunosAprovados.classList.add('green-glow');
                cardPorcentagemAlunosAprovados.className = 'd-flex bg-dark text-light-green text-center w-fit p-4 font-family-oswald display-6 rounded-4';
                cardPorcentagemAlunosAprovados.innerHTML = `<strong>${porcentagemAlunosAprovados.toFixed(1)}% </strong>`;
            } else if (porcentagemAlunosAprovados >= 25) {
                relatoriosAlunosAprovados.classList.add('yellow-glow');
                cardPorcentagemAlunosAprovados.className = 'd-flex bg-dark text-light-yellow text-center w-fit p-4 font-family-oswald display-6 rounded-4';
                cardPorcentagemAlunosAprovados.innerHTML = `<strong>${porcentagemAlunosAprovados.toFixed(1)}% </strong>`;
            } else {
                relatoriosAlunosAprovados.classList.add('red-glow');
                cardPorcentagemAlunosAprovados.className = 'd-flex bg-dark text-light-red text-center w-fit p-4 font-family-oswald display-6 rounded-4';
                cardPorcentagemAlunosAprovados.innerHTML = `<strong>${porcentagemAlunosAprovados.toFixed(1)}% </strong>`;
            }

            relatoriosAlunosAprovados.appendChild(cardPorcentagemAlunosAprovados);
        }

        if (relatoriosMediaTotalSala) {
            relatoriosMediaTotalSala.innerHTML = '';
            const mediaGeralSala = totalAlunosCadastrados > 0 ? (soma_medias / totalAlunosCadastrados) : 0;

            const cardMediaSala = document.createElement('div');
            
            cardMediaSala.className = 'd-flex flex-column bf-brightness-1 mt-5 text-white p-5 fs-2 rounded-5 text-center';
            
            if (mediaGeralSala < 6) {
                relatoriosMediaTotalSala.classList.add('red-glow');
                cardMediaSala.innerHTML = `
                    <strong> — Média geral da sala — </strong>
                    <span class="display-3 font-family-oswald text-light-red">${mediaGeralSala.toFixed(1)}</span> 
                `;

            } else if (mediaGeralSala >= 6 && mediaGeralSala < 7) {
                relatoriosMediaTotalSala.classList.add('yellow-glow');
                cardMediaSala.innerHTML = `
                    <strong> — Média geral da sala — </strong>
                    <span class="display-3 font-family-oswald text-light-yellow">${mediaGeralSala.toFixed(1)}</span> 
                `;
            } else {
                relatoriosMediaTotalSala.classList.add('green-glow');
                cardMediaSala.innerHTML = `
                    <strong> — Média geral da sala — </strong>
                    <span class="display-3 font-family-oswald text-light-green">${mediaGeralSala.toFixed(1)}</span> 
                `;
            }
            relatoriosMediaTotalSala.appendChild(cardMediaSala);
        }

        if (relatoriosQtdeAlunosAcimaMedia) relatoriosQtdeAlunosAcimaMedia.innerHTML = (totalAlunosAcimaMedia === 1)
            ? `<h1>${totalAlunosAcimaMedia} aluno</h1>`
            : `<h1>${totalAlunosAcimaMedia} alunos</h1>`; 
        if (relatoriosQtdeAlunosAbaixoMedia) relatoriosQtdeAlunosAbaixoMedia.innerHTML = (totalAlunosAbaixoMedia === 1)
            ? `<h1>${totalAlunosAbaixoMedia} aluno</h1>`
            : `<h1>${totalAlunosAbaixoMedia} alunos</h1>`;
        if (relatorioQtdeAlunosDentroMedia) relatorioQtdeAlunosDentroMedia.innerHTML = (totalAlunosDentroMedia === 1)
            ? `<h1>${totalAlunosDentroMedia} aluno</h1>`
            : `<h1>${totalAlunosDentroMedia} alunos</h1>`;


    } else {
        relatoriosAlunos.innerHTML = '<div class="ms-2 text-white">Nenhum aluno cadastrado ainda.</div>';
        if (relatoriosQtdeAlunosAcimaMedia) relatoriosQtdeAlunosAcimaMedia.innerHTML = `<h3>0 alunos</h3>`;
        if (relatoriosQtdeAlunosDentroMedia) relatorioQtdeAlunosDentroMedia.innerHTML = `<h3> 0 alunos</h3>`;
        if (relatoriosQtdeAlunosAbaixoMedia) relatoriosQtdeAlunosAbaixoMedia.innerHTML = `<h3>0 alunos</h3>`;
    }
}

