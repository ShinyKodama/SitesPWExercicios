const imagem_fibonacci          = document.querySelector('#imagem-fibonacci');
const texto_descricao_fibonacci = document.querySelector('#texto-descricao-fibonacci');

imagem_fibonacci.addEventListener("click", function() { texto_descricao_fibonacci.classList.toggle('ativo'); });
