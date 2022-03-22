let game = document.querySelector(".game")
let ball = document.querySelector(".game__ball")
let gameHeight = game.getBoundingClientRect().height

// Génération du jeu
let generateBlock = function() {
    let block = document.createElement("div")
    block.classList.add("game__block")
    // Block bonus
    if(Math.random() > 0.9) {
        block.classList.add("awesome")
    }
    game.appendChild(block)
}
for (let i = 0; i < 100; i++) {
    generateBlock()
}

// Position de départ
let ballLeft = ball.style.left = 720/2 - 15 + "px"
let ballBottom = ball.style.bottom = "10px"
// Vitesse du jeu
let speed = 2
let xSpeed = speed
let ySpeed = speed

let moveBall = function() {
    ballLeft = parseInt(ballLeft.split("px")[0]) + xSpeed + "px"
    ball.style.left  = ballLeft
    ballBottom = parseInt(ballBottom.split("px")[0]) + ySpeed + "px"
    ball.style.bottom = ballBottom

    if (parseInt(ballBottom.split("px")[0]) > game.getBoundingClientRect().height - 38) {
        ySpeed = -speed
        console.log("1")
    }
    if (parseInt(ballBottom.split("px")[0]) < 0) {
        ySpeed = speed
        console.log("2")
    }
    if (parseInt(ballLeft.split("px")[0]) > game.getBoundingClientRect().width - 38) {
        xSpeed = -speed
        console.log("3")
    }
    if (parseInt(ballLeft.split("px")[0]) < 0) {
        xSpeed = speed
        console.log("4")
    }
}

setInterval(moveBall, 1)