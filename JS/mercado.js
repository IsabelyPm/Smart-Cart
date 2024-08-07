var largura;
var altura;
var larguraMenu = 400;
var alturaMenu = 300;
var canvas = document.getElementById("canvasMenu");
var ctx = canvas.getContext("2d");

// Coordenadas das imagens com estado de visibilidade
var imagens = [
    { src: "../IMG/macarrao.png", x: 225, y: 260, width: 49, height: 128, visivel: true, itemId: "item2" },
    { src: "../IMG/atum.png", x: 520, y: 100, width: 60, height: 40, visivel: true, itemId: "item1" },
    { src: "../IMG/manteiga.png", x: 185, y: 100, width: 91, height: 41, visivel: true, itemId: "item5" },
    { src: "../IMG/sal.png", x: 752, y: 122, width: 84, height: 96, visivel: true, itemId: "item6" },
    { src: "../IMG/molho.png", x: 856, y: 308, width: 41, height: 86, visivel: true, itemId: "item3" },
    { src: "../IMG/refrigerante.png", x: 470, y: 272, width: 51, height: 114, visivel: true, itemId: "item4" },
    { src: "../IMG/tomate.png", x: 550, y: 500, width: 60, height: 57, visivel: true },
    { src: "../IMG/cogumelo.png", x: 170, y: 500, width: 45, height: 49, visivel: true },
    { src: "../IMG/batata.png", x: 912, y: 500, width: 45, height: 52, visivel: true },
    { src: "../IMG/leite.png", x: 622, y: 280, width: 63, height: 112, visivel: true }
];
var tempoRestante = 60; // Definido para 60 segundos
var cronometroInterval;

function atualizarPlanoDeFundo() {
    largura = 1500;
    altura = 720;
    canvas.setAttribute("width", largura);
    canvas.setAttribute("height", altura);
    var img = new Image();
    img.src = "../IMG/fundo.png";

    img.onload = function() {
        ctx.clearRect(0, 0, largura, altura); // Limpa o canvas
        ctx.drawImage(img, 0, 0, largura, altura);
        adicionarImagens();
    };
}

function adicionarImagens() {
    imagens.forEach(function(imagem) {
        if (imagem.visivel) {
            var img = new Image();
            img.src = imagem.src;
            img.onload = function() {
                ctx.drawImage(img, imagem.x, imagem.y, imagem.width, imagem.height);
            };
        }
    });
}

function iniciarCronometro() {
    cronometroInterval = setInterval(function() {
        tempoRestante--;
        document.getElementById('cronometro').innerText = 'Tempo: ' + tempoRestante + 's';
        if (tempoRestante <= 0) {
            pararCronometro();
            alert("O tempo acabou!");
            window.location.href = '../index.html';
        }
    }, 1000);
}

function pararCronometro() {
    clearInterval(cronometroInterval);
}

canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var posX = event.clientX - rect.left;
    var posY = event.clientY - rect.top;

    // Verificação de proximidade com as imagens (inclui uma área de 20px ao redor)
    var margem = 60;
    imagens.forEach(function(imagem) {
        if (imagem.visivel &&
            posX >= imagem.x - margem && posX <= imagem.x + imagem.width + margem &&
            posY >= imagem.y - margem && posY <= imagem.y + imagem.height + margem) {
            if (imagem.itemId !== undefined) {
                imagem.visivel = false;
                var itemElemento = document.getElementById(imagem.itemId);
                if (itemElemento) {
                    itemElemento.style.textDecoration = "line-through"; // Adiciona o estilo line-through ao item da lista correspondente
                }
                substituirImagemGaroto(); // Substituir a imagem do garoto
                verificarListaCompleta(); // Verificar se todos os itens foram riscados
            } else {
                substituirImagemGarotoErro(); // Substituir a imagem do garoto com erro
                setTimeout(function() {
                    alert("Mommy doesn't need these items!");
                }, 500); // Exibe o alerta após a substituição da imagem do garoto
            }
            atualizarPlanoDeFundo(); // Redesenhar o fundo e as imagens visíveis
        }
    });
});

function substituirImagemGaroto() {
    var boyImage = document.getElementById("grt");
    var originalSrc = boyImage.src;
    boyImage.src = "../IMG/boy2.png";
    boyImage.style.filter = 'drop-shadow(0 0 20px green)'; // Filtro verde

    setTimeout(function() {
        boyImage.src = originalSrc;
        boyImage.style.filter = 'none'; // Remove o filtro
    }, 750); // Voltar à imagem original após 0.75 segundos
}

function substituirImagemGarotoErro() {
    var boyImage = document.getElementById("grt");
    var originalSrc = boyImage.src;
    boyImage.src = "../IMG/boy3.png";
    boyImage.style.filter = 'drop-shadow(0 0 20px red)'; // Filtro vermelho

    setTimeout(function() {
        boyImage.src = originalSrc;
        boyImage.style.filter = 'none'; // Remove o filtro
    }, 500); // Voltar à imagem original após 0.5 segundos
}

function verificarListaCompleta() {
    var todosRiscados = true;
    imagens.forEach(function(imagem) {
        if (imagem.itemId !== undefined) {
            var itemElemento = document.getElementById(imagem.itemId);
            if (!itemElemento || itemElemento.style.textDecoration !== "line-through") {
                todosRiscados = false;
            }
        }
    });
    
    if (todosRiscados) {
        pararCronometro();
        window.location.href = "../HTML/fim.html"; // Substitua pelo nome da página de destino
    }
}

document.addEventListener('DOMContentLoaded', function() {
    atualizarPlanoDeFundo();
    iniciarCronometro();
    
    var modal = document.getElementById("gameModal");
    var span = document.getElementsByClassName("close")[0];

    // Exibe o modal ao carregar a página
    modal.style.display = "block";
    
    // Quando o usuário clicar no <span> (x), fecha o modal
    span.onclick = function() {
        modal.classList.add('fade-out');
        setTimeout(function() {
            modal.style.display = "none"; // Oculta o modal após animação de saída
            modal.classList.remove('fade-out'); // Remove a classe de animação
        }, 500);
    }
    
    // Quando o usuário clicar fora do modal, fecha o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            span.onclick();
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.volume = 0.5; // Define o volume para médio

    // Recupera o tempo salvo do localStorage, se houver
    var savedTime = localStorage.getItem('musicTime');
    if (savedTime) {
        backgroundMusic.currentTime = parseFloat(savedTime);
    }

    backgroundMusic.play();

    // Salva o tempo atual da música ao sair da página
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('musicTime', backgroundMusic.currentTime);
    });
});