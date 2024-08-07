var largura;
var altura;
var larguraMenu = 400;
var alturaMenu = 300;
var canvas = document.getElementById("canvasMenu");
var ctx = canvas.getContext("2d");

function atualizarPlanoDeFundo() {
    largura = 1500;
    altura = 720;
    canvas.setAttribute("width", largura);
    canvas.setAttribute("height", altura);
    var img = new Image();
    img.src = "../IMG/23.png";

    img.onload = function() {
        ctx.drawImage(img, 0, 0, largura, altura);
    };
}
atualizarPlanoDeFundo();
document.getElementById('returnButton').addEventListener('click', function() {
    window.location.href = '.../index.html'; // Caminho para a página inicial
});
document.addEventListener('DOMContentLoaded', function() {
    // Inicia a trilha sonora
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