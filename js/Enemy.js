export class Enemy {
  constructor(x, y, patrolWidth, platformX, platformWidth) {
    this.x = x
    this.y = y
    this.width = 30
    this.height = 30
    this.speed = 0.2 // Reduced enemy speed from 0.3 to 0.2
    this.direction = 1
    this.startX = x
    this.patrolWidth = patrolWidth
    this.platformX = platformX
    this.platformWidth = platformWidth
    this.minX = platformX + 5 // Small margin from edge
    this.maxX = platformX + platformWidth - this.width - 5
  }

  update() {
    this.x += this.speed * this.direction

    if (this.x <= this.minX) {
      this.x = this.minX
      this.direction = 1
    } else if (this.x >= this.maxX) {
      this.x = this.maxX
      this.direction = -1
    }
  }

  draw(ctx) {
    // Body
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(this.x, this.y, this.width, this.height)

    // Eyes
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(this.x + 6, this.y + 8, 6, 6)
    ctx.fillRect(this.x + 18, this.y + 8, 6, 6)

    // Pupils
    ctx.fillStyle = "#000000"
    const pupilOffset = this.direction > 0 ? 2 : -2
    ctx.fillRect(this.x + 8 + pupilOffset, this.y + 10, 3, 3)
    ctx.fillRect(this.x + 20 + pupilOffset, this.y + 10, 3, 3)

    // Angry mouth
    ctx.fillStyle = "#000000"
    ctx.fillRect(this.x + 8, this.y + 20, 14, 3)
  }
}
