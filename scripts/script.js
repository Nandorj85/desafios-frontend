let posicaoX = 0; // Posição inicial no eixo X
let posicaoY = 0; // Posição inicial no eixo Y

let direcaoX = 1; // Direção inicial no eixo X
let direcaoY = 1; // Direção Inicial no eixo Y

let velocidade = 3; // Velocidade da movimentação

let dvdLogo = document.getElementById('logo'); // Pegando o SVG presente no HTML.
let container = document.getElementById('container'); // Pegando o container onde ocorrerá a animação

const dvdLogoWidth = dvdLogo.clientWidth; // Pegando a largura exata do SVG
const dvdLogoHeight = dvdLogo.clientHeight; // Pegando a altura exata do SVG

const url = "../api/cores.json" // Constante com a URL da API

function requestApi() {
  // Retorna a promise com uma cor aleatória
  return fetch(url)
    .then((res) => res.json())
    .then(function(data) {
      return data.colors.sort(() => Math.random() - 0.5)[0]; // Ordenando randomicamente o array com as cores e pegando o primeiro item do array
    })
    .catch((err) => console.log(err)); // Em caso de erro na requisição
}

function getCor() {
  let color = requestApi();
  // Retorna a promise pra quem precisa da cor
  return color;
}

async function movimenta() { // Criando a função que faz todo o movimento, colisão e alteração da cor no momento da colisão
  const telaWidth = document.body.clientWidth; // Pegando a largura da tela que receberá a animação
  const telaHeight = document.body.clientHeight; // Pegando a altura da tela que receberá a animação
  let color; // Utilizado async await pra variável conseguir capturar a cor da promise

  posicaoX += direcaoX * velocidade;
  posicaoY += direcaoY * velocidade;

  dvdLogo.style.left = posicaoX + "px"; // Pegando a posição do logo no eixo X e concatenando "px" para informar o valor em pixels
  dvdLogo.style.top = posicaoY + "px"; // // Pegando a posição do logo no eixo Y e concatenando "px" para informar o valor em pixels

  // Inicio do loop condicional para movimentação e verificação de colisão

  if (posicaoX + dvdLogoWidth >= telaWidth || posicaoX < 0) {
    cor = await getCor();
    direcaoX *= -1; // Muda a direção do eixo X após a colisão
    dvdLogo.style.fill = cor; // Em caso de colisão no eixo X, altera a cor do logo
  }

  if (posicaoY + dvdLogoHeight >= telaHeight || posicaoY < 0) {
    cor = await getCor();
    direcaoY *= -1; // Muda a direção do eixo Y após a colisão
    dvdLogo.style.fill = cor; // Em caso de colisão no eixo Y, altera a cor do logo
  }

  // Executando a função de movimentação do logo
  window.requestAnimationFrame(movimenta);
}
window.requestAnimationFrame(movimenta);
