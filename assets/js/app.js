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
        if (Math.random() > 0.8) {
            block.classList.add("amazing")
        } else {
            block.classList.add("awesome")
        }
    }
    game.appendChild(block)
}
let totalBlock = 150
let remainingBlock = totalBlock
let blockInfo = document.querySelector(".bloc-info")
blockInfo.textContent = totalBlock
for (let i = 0; i < totalBlock; i++) {
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
        if ((positionBlocs[i-2][0] - positionBall[0] > -30 && positionBlocs[i-2][0] - positionBall[0] < 30) && (positionBlocs[i-2][1] - positionBall[1] > -20 && positionBlocs[i-2][1] - positionBall[1] < 20) && game.children[i].style.opacity !== "0") {
            game.children[i].style.opacity = "0"
            ySpeed = -speed
            remainingBlock -= 1
            blockInfo.textContent = remainingBlock
            // Activation des bonus
            if (game.children[i].classList.contains("awesome")) {
                // xSpeed = 2
                // ySpeed = 2
                // speed = 2
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

// Reset
let reset = document.querySelector(".reset")
reset.addEventListener("click", function() {
    for (let i = 2; i < game.children.length; i++) {
        if (game.children[i].style.opacity === "0") {
            game.children[i].style.display = "none"
        }
    }
    let regenerateBlock = function() {
        while (remainingBlock < totalBlock) {
            generateBlock()
            remainingBlock += 1
            blockInfo.textContent = remainingBlock
        }
    }
    setTimeout(regenerateBlock, 100)

    

    // ball.style.left = game.getBoundingClientRect().width/2 - 8 + "px"
    // ball.style.bottom = "30px"
    // controller.style.left = game.getBoundingClientRect().width/2 - 125 + "px"
    // xSpeed = speed
    // ySpeed = speed
    // ballBottom = ball.style.bottom 
    // ballLeft = ball.style.left
    // interval = undefined
})

// Kill blocks

// let blocks = []
// for (let i = 2; i < game.children.length; i++) {
//     blocks.push(game.children[i])
// }
// blocks.forEach(function(block) {
//     block.addEventListener("mouseover", function() {
//         block.style.opacity = "0"
//         remainingBlock -= 1
//         blockInfo.textContent = remainingBlock
//     })
// })