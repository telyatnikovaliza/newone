import { Game } from "./Game.js"

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

// Set canvas size
canvas.width = 800
canvas.height = 600

// UI Elements
const menuScreen = document.getElementById("menu")
const gameOverScreen = document.getElementById("gameOver")
const victoryScreen = document.getElementById("victory")
const pauseScreen = document.getElementById("pauseScreen")
const hud = document.getElementById("hud")
const startBtn = document.getElementById("startBtn")
const restartBtn = document.getElementById("restartBtn")
const playAgainBtn = document.getElementById("playAgainBtn")
const pauseRestartBtn = document.getElementById("pauseRestartBtn")
const resumeBtn = document.getElementById("resumeBtn")

let game

function startGame() {
  menuScreen.classList.add("hidden")
  gameOverScreen.classList.add("hidden")
  victoryScreen.classList.add("hidden")
  pauseScreen.classList.add("hidden")
  hud.classList.remove("hidden")

  game = new Game(canvas, ctx)
  game.start()
}

function showGameOver(score) {
  hud.classList.add("hidden")
  gameOverScreen.classList.remove("hidden")
  document.getElementById("finalScore").textContent = `Вы собрали ${score} кристаллов`
}

function showVictory(score) {
  hud.classList.add("hidden")
  victoryScreen.classList.remove("hidden")
  document.getElementById("victoryScore").textContent = `Поздравляем! Вы собрали ${score} кристаллов`
}

function showPause() {
  pauseScreen.classList.remove("hidden")
}

function hidePause() {
  pauseScreen.classList.add("hidden")
}

// Event Listeners
startBtn.addEventListener("click", startGame)
restartBtn.addEventListener("click", () => {
  localStorage.setItem("currentLevel", 1)
  startGame()
})
playAgainBtn.addEventListener("click", () => {
  localStorage.setItem("currentLevel", 1)
  startGame()
})

resumeBtn.addEventListener("click", () => {
  if (game) {
    game.togglePause()
  }
})

pauseRestartBtn.addEventListener("click", () => {
  if (game) {
    game.togglePause()
    game.restart()
  }
})

// Export for Game class
window.showGameOver = showGameOver
window.showVictory = showVictory
window.showPause = showPause
window.hidePause = hidePause
