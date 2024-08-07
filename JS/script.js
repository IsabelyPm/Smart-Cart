var largura;
var altura;
var larguraMenu = 400;
var alturaMenu = 300;
var canvas = document.getElementById("canvasMenu");
var ctx = canvas.getContext("2d");
var img = new Image();
var fadeDuration = 3000; // Duração do efeito de desvanecimento em milissegundos
var fadeStart = Date.now(); // Marca o início da animação

function atualizarPlanoDeFundo() {
    largura = 1500;
    altura = 720;
    canvas.setAttribute("width", largura);
    canvas.setAttribute("height", altura);
    img.src = "IMG/menu.png";
    img.onload = function() {
        drawFadingImage();
    };
}

function drawFadingImage() {
    var now = Date.now();
    var elapsed = now - fadeStart;
    var progress = Math.min(elapsed / fadeDuration, 1);

    // Limpar o canvas
    ctx.clearRect(0, 0, largura, altura);

    // Desenhar a imagem com o efeito de desvanecimento
    ctx.globalAlpha = progress;
    ctx.drawImage(img, 0, 0, largura, altura);
    ctx.globalAlpha = 1; // Restaurar opacidade normal

    if (progress < 1) {
        requestAnimationFrame(drawFadingImage);
    }
}

canvas.addEventListener('click', function(event) {
    var posX = event.clientX - canvas.getBoundingClientRect().left;
    var posY = event.clientY - canvas.getBoundingClientRect().top;
    console.log("Click position: ", posX, posY); // Logging the click position
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    var indice = -1;

    // Margem de tolerância para as coordenadas
    var margem = 10;

    if (posX > x && posX < x + larguraMenu) {
        if (posY > y && posY < y + alturaMenu) {
            indice = parseInt((posY - y) / 100);
        }
    }

    // Verificação de coordenadas específicas com margem de tolerância
    if (posX >= 981 - margem && posX <= 981 + margem && posY >= 659 - margem && posY <= 659 + margem) {
        console.log("Case 1 selected"); // Logging case 1 selection
        indice = 1;
    } else if (posX >= 977 - margem && posX <= 977 + margem && posY >= 551 - margem && posY <= 551 + margem) {
        console.log("Case 2 selected"); // Logging case 2 selection
        indice = 2;
    } else if (posX >= 1020 - margem && posX <= 1020 + margem && posY >= 951 - margem && posY <= 951 + margem) {
        console.log("Case 0 selected"); // Logging case 0 selection
        indice = 0;
    }

    if (indice >= 0) {
        switch (indice) {
            case 0:
                window.close();
                // Se a janela não foi aberta pelo script, então tenta redirecionar para uma página "sobre"
                setTimeout(() => {
                    window.location.href = 'about:blank';
                }, 100);
                break;
            case 1:
                window.location.href = './HTML/game.html';
                break;
            case 2:
                window.location.href = './HTML/options.html';
                break;
        }
    }
});

atualizarPlanoDeFundo();
 // Inicia a trilha sonora
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