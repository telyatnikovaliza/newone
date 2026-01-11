import { Player } from "./Player.js"
import { Platform } from "./Platform.js"
import { Enemy } from "./Enemy.js"
import { Crystal } from "./Crystal.js"
import { InputHandler } from "./InputHandler.js"
import { Collision } from "./Collision.js"

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.inputHandler = new InputHandler(this)
    this.running = false
    this.currentLevel = Number.parseInt(localStorage.getItem("currentLevel")) || 1
    this.maxLevel = 3
    this.crystalCount = 0
    this.paused = false

    this.initLevel()
  }

  initLevel() {
    this.player = new Player(100, 400)
    this.platforms = this.createPlatforms()
    this.enemies = this.createEnemies()
    this.crystals = this.createCrystals()
    this.updateHUD()
  }

  createPlatforms() {
    const platforms = []

    // Ground
    platforms.push(new Platform(0, 550, 800, 50, "#2d3561"))

    if (this.currentLevel === 1) {
      // Level 1 - Easy
      platforms.push(new Platform(200, 450, 150, 20, "#3d4571"))
      platforms.push(new Platform(450, 350, 150, 20, "#3d4571"))
      platforms.push(new Platform(200, 250, 150, 20, "#3d4571"))
      platforms.push(new Platform(500, 150, 150, 20, "#3d4571"))
    } else if (this.currentLevel === 2) {
      // Level 2 - Medium
      platforms.push(new Platform(150, 450, 120, 20, "#3d4571"))
      platforms.push(new Platform(350, 380, 120, 20, "#3d4571"))
      platforms.push(new Platform(550, 310, 120, 20, "#3d4571"))
      platforms.push(new Platform(300, 240, 120, 20, "#3d4571"))
      platforms.push(new Platform(100, 170, 120, 20, "#3d4571"))
      platforms.push(new Platform(500, 100, 150, 20, "#3d4571"))
    } else {
      // Level 3 - Hard
      platforms.push(new Platform(100, 480, 100, 20, "#3d4571"))
      platforms.push(new Platform(280, 420, 100, 20, "#3d4571"))
      platforms.push(new Platform(460, 360, 100, 20, "#3d4571"))
      platforms.push(new Platform(640, 300, 100, 20, "#3d4571"))
      platforms.push(new Platform(500, 240, 100, 20, "#3d4571"))
      platforms.push(new Platform(300, 180, 100, 20, "#3d4571"))
      platforms.push(new Platform(100, 120, 100, 20, "#3d4571"))
      platforms.push(new Platform(600, 60, 150, 20, "#3d4571"))
    }

    return platforms
  }

  createEnemies() {
    const enemies = []

    if (this.currentLevel === 1) {
      enemies.push(new Enemy(220, 430, 130, 200, 150))
    } else if (this.currentLevel === 2) {
      enemies.push(new Enemy(170, 430, 100, 150, 120))
      enemies.push(new Enemy(570, 290, 100, 550, 120))
    } else {
      enemies.push(new Enemy(300, 400, 80, 280, 100))
      enemies.push(new Enemy(480, 340, 80, 460, 100))
      enemies.push(new Enemy(520, 220, 80, 500, 100))
    }

    return enemies
  }

  createCrystals() {
    const crystals = []

    if (this.currentLevel === 1) {
      crystals.push(new Crystal(275, 410))
      crystals.push(new Crystal(525, 310))
      crystals.push(new Crystal(275, 210))
      crystals.push(new Crystal(575, 110))
    } else if (this.currentLevel === 2) {
      crystals.push(new Crystal(200, 410))
      crystals.push(new Crystal(400, 340))
      crystals.push(new Crystal(600, 270))
      crystals.push(new Crystal(350, 200))
      crystals.push(new Crystal(575, 60))
    } else {
      crystals.push(new Crystal(150, 440))
      crystals.push(new Crystal(330, 380))
      crystals.push(new Crystal(510, 320))
      crystals.push(new Crystal(690, 260))
      crystals.push(new Crystal(350, 140))
      crystals.push(new Crystal(675, 20))
    }

    return crystals
  }

  start() {
    this.running = true
    this.gameLoop()
  }

  togglePause() {
    this.paused = !this.paused
    if (this.paused) {
      window.showPause()
    } else {
      window.hidePause()
    }
  }

  restart() {
    this.currentLevel = Number.parseInt(localStorage.getItem("currentLevel")) || 1
    this.crystalCount = 0
    this.paused = false
    this.initLevel()
    this.running = true
  }

  gameLoop = () => {
    if (!this.running) return

    if (!this.paused) {
      this.update()
    }
    this.render()

    if (this.paused) {
      this.drawPauseOverlay()
    }

    requestAnimationFrame(this.gameLoop)
  }

  drawPauseOverlay() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = "#ffffff"
    this.ctx.font = "bold 48px Arial"
    this.ctx.textAlign = "center"
    this.ctx.fillText("ПАУЗА", this.canvas.width / 2, this.canvas.height / 2)

    this.ctx.font = "20px Arial"
    this.ctx.fillText("Нажмите ESC для продолжения", this.canvas.width / 2, this.canvas.height / 2 + 50)
    this.ctx.fillText("Нажмите R для рестарта", this.canvas.width / 2, this.canvas.height / 2 + 80)
  }

  update() {
    // Update player
    this.player.update(this.inputHandler.keys)

    this.player.velocityY += 0.15

    if (this.player.velocityY > 6) {
      this.player.velocityY = 6
    }

    // Handle horizontal collisions first
    this.player.x += this.player.velocityX
    for (const platform of this.platforms) {
      if (Collision.checkCollision(this.player, platform)) {
        // Collision on X-axis, push player back
        if (this.player.velocityX > 0) {
          this.player.x = platform.x - this.player.width
        } else if (this.player.velocityX < 0) {
          this.player.x = platform.x + platform.width
        }
        this.player.velocityX = 0
      }
    }

    // Handle vertical collisions
    this.player.y += this.player.velocityY
    this.player.isOnGround = false
    for (const platform of this.platforms) {
      if (Collision.checkCollision(this.player, platform)) {
        if (this.player.velocityY > 0) {
          // Landing on platform
          this.player.y = platform.y - this.player.height
          this.player.velocityY = 0
          this.player.isOnGround = true
        } else if (this.player.velocityY < 0) {
          // Hitting platform from below
          this.player.y = platform.y + platform.height
          this.player.velocityY = 0
        }
      }
    }

    // Update enemies
    for (const enemy of this.enemies) {
      enemy.update()

      // Check enemy collision with player
      if (Collision.checkCollision(this.player, enemy)) {
        this.player.takeDamage()
        this.updateHUD()

        if (this.player.lives <= 0) {
          this.gameOver()
        }
      }
    }

    // Check crystal collection
    for (let i = this.crystals.length - 1; i >= 0; i--) {
      const crystal = this.crystals[i]
      crystal.update()

      if (Collision.checkCollision(this.player, crystal)) {
        this.crystals.splice(i, 1)
        this.crystalCount++
        this.updateHUD()
      }
    }

    // Check level completion
    if (this.crystals.length === 0) {
      if (this.currentLevel < this.maxLevel) {
        this.nextLevel()
      } else {
        this.victory()
      }
    }

    // Keep player in bounds
    if (this.player.x < 0) this.player.x = 0
    if (this.player.x + this.player.width > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.width
    }
    if (this.player.y > this.canvas.height) {
      this.player.takeDamage()
      this.player.x = 100
      this.player.y = 400
      this.player.velocityY = 0
      this.updateHUD()

      if (this.player.lives <= 0) {
        this.gameOver()
      }
    }
  }

  render() {
    // Clear canvas
    this.ctx.fillStyle = "#16213e"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw background stars
    this.ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 50; i++) {
      const x = (i * 137.5) % this.canvas.width
      const y = (i * 217.3) % this.canvas.height
      this.ctx.fillRect(x, y, 2, 2)
    }

    // Draw platforms
    for (const platform of this.platforms) {
      platform.draw(this.ctx)
    }

    // Draw crystals
    for (const crystal of this.crystals) {
      crystal.draw(this.ctx)
    }

    // Draw enemies
    for (const enemy of this.enemies) {
      enemy.draw(this.ctx)
    }

    // Draw player
    this.player.draw(this.ctx)
  }

  updateHUD() {
    document.getElementById("levelDisplay").textContent = this.currentLevel
    document.getElementById("crystalCount").textContent = this.crystalCount

    const heartsContainer = document.getElementById("hearts")
    heartsContainer.innerHTML = ""
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("div")
      heart.className = i < this.player.lives ? "heart" : "heart lost"
      heartsContainer.appendChild(heart)
    }
  }

  nextLevel() {
    this.currentLevel++
    localStorage.setItem("currentLevel", this.currentLevel)
    this.initLevel()
  }

  gameOver() {
    this.running = false
    window.showGameOver(this.crystalCount)
  }

  victory() {
    this.running = false
    localStorage.setItem("currentLevel", 1)
    window.showVictory(this.crystalCount)
  }
}
