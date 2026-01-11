export class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 32
    this.height = 40
    this.velocityX = 0
    this.velocityY = 0
    this.speed = 1 // Reduced speed from 3 to 1 for slower, more controlled movement
    this.minJumpPower = 6 // Minimum jump power for tap
    this.maxJumpPower = 9 // Maximum jump power for held jump
    this.isOnGround = false
    this.lives = 3
    this.invulnerable = false
    this.invulnerabilityTime = 0
    this.isJumping = false
    this.jumpHoldTime = 0
    this.maxJumpHoldTime = 12 // Reduced frames to prevent excessive height
  }

  update(keys) {
    // Horizontal movement
    this.velocityX = 0
    if (keys.left) {
      this.velocityX = -this.speed
    }
    if (keys.right) {
      this.velocityX = this.speed
    }

    if (keys.up && this.isOnGround && !this.isJumping) {
      this.velocityY = -this.minJumpPower // Start with minimum jump
      this.isOnGround = false
      this.isJumping = true
      this.jumpHoldTime = 0
    }

    if (keys.up && this.isJumping && this.jumpHoldTime < this.maxJumpHoldTime && this.velocityY < 0) {
      this.velocityY -= 0.25 // Reduced from 0.3 for more controlled height
      this.jumpHoldTime++
    }

    if (!keys.up && this.isJumping) {
      this.isJumping = false
      if (this.velocityY < 0) {
        this.velocityY *= 0.3 // More aggressive cut from 0.5 to 0.3
      }
    }

    if (this.isOnGround) {
      this.isJumping = false
      this.jumpHoldTime = 0
    }

    // Apply velocity is now done in Game.js after collision checks

    // Update invulnerability
    if (this.invulnerable) {
      this.invulnerabilityTime--
      if (this.invulnerabilityTime <= 0) {
        this.invulnerable = false
      }
    }
  }

  takeDamage() {
    if (!this.invulnerable) {
      this.lives--
      this.invulnerable = true
      this.invulnerabilityTime = 240 // 4 seconds invulnerability (240 frames at 60 FPS)
    }
  }

  draw(ctx) {
    if (this.invulnerable && Math.floor(this.invulnerabilityTime / 10) % 2 === 0) {
      return // Flashing effect
    }

    if (this.invulnerable) {
      ctx.strokeStyle = "rgba(102, 255, 255, 0.6)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        Math.max(this.width, this.height) / 2 + 5,
        0,
        Math.PI * 2,
      )
      ctx.stroke()
    }

    // Body
    ctx.fillStyle = "#667eea"
    ctx.fillRect(this.x, this.y + 10, this.width, this.height - 10)

    // Head
    ctx.fillStyle = "#764ba2"
    ctx.beginPath()
    ctx.arc(this.x + this.width / 2, this.y + 10, 10, 0, Math.PI * 2)
    ctx.fill()

    // Eyes
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(this.x + 10, this.y + 7, 4, 4)
    ctx.fillRect(this.x + 18, this.y + 7, 4, 4)
  }
}
