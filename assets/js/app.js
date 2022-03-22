let game = document.querySelector(".game")
let controller = document.querySelector(".game__controller")
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

// Stockage de la position des blocs
let positionBlocs = []
for (let i = 2; i < game.children.length; i++) {
    let position = []
    position.push(game.children[i].getBoundingClientRect().x, game.children[i].getBoundingClientRect().y)
    positionBlocs.push(position)
}

// Position de départ
let ballLeft = game.getBoundingClientRect().width/2 - 8 + "px"
ball.style.left  = ballLeft
let ballBottom = "30px"
ball.style.bottom = ballBottom
// Vitesse du jeu
let speed = 1
let xSpeed = speed
let ySpeed = speed

let moveBall = function() {
    ballLeft = parseInt(ballLeft.split("px")[0]) + xSpeed + "px"
    ball.style.left  = ballLeft
    ballBottom = parseInt(ballBottom.split("px")[0]) + ySpeed + "px"
    ball.style.bottom = ballBottom

    // La balle reste dans la fenêtre de jeu
    if (parseInt(ballBottom.split("px")[0]) > game.getBoundingClientRect().height - 38) {
        ySpeed = -speed
    }
    if (parseInt(ballBottom.split("px")[0]) < 0) {
        clearInterval(interval)
    }
    if (parseInt(ballLeft.split("px")[0]) > game.getBoundingClientRect().width - 38) {
        xSpeed = -speed
    }
    if (parseInt(ballLeft.split("px")[0]) < 0) {
        xSpeed = speed
    }

    // La balle rebondit sur le controller
    if (parseInt(ballBottom.split("px")[0]) < parseInt(controllerBottom.split("px")[0]) + 18 && parseInt(controllerLeft.split("px")[0]) < parseInt(ballLeft.split("px")[0]) && parseInt(ballLeft.split("px")[0]) < (parseInt(controllerLeft.split("px")[0])) + 250) {
        ySpeed = speed
    }

    // La balle détruit les blocs
    let positionBall = []
    positionBall.push(ball.getBoundingClientRect().x, ball.getBoundingClientRect().y)
    for (let i = 2; i < game.children.length; i++) {
        if ((positionBlocs[i-2][0] - positionBall[0] > -20 && positionBlocs[i-2][0] - positionBall[0] < 20) && (positionBlocs[i-2][1] - positionBall[1] > -20 && positionBlocs[i-2][1] - positionBall[1] < 20) && game.children[i].style.opacity !== "0") {
            game.children[i].style.opacity = "0"
            ySpeed = -speed
            // Activation des bonus
            if (game.children[i].classList) {
                
            }
        }
    }
}

// Controller
let controllerLeft = game.getBoundingClientRect().width/2 - 125 + "px"
controller.style.left = controllerLeft
let controllerBottom = "10px"
controller.style.bottom = controllerBottom

let interval
document.addEventListener("keydown", function(e) {
    if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && interval === undefined) {
        interval = setInterval(moveBall, 1)
    }
    if (e.key === "ArrowLeft" && parseInt(controller.style.left.split("px")[0]) > 15) {
        controllerLeft = parseInt(controller.style.left.split("px")[0]) - 20 + "px"
        controller.style.left = controllerLeft
    }
    if (e.key === "ArrowRight" && parseInt(controller.style.left.split("px")[0]) < 455) {
        controllerLeft = parseInt(controller.style.left.split("px")[0]) + 20 + "px"
        controller.style.left = controllerLeft
    }
})