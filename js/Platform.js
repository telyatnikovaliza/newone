export class Platform {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)

    // Add highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    ctx.fillRect(this.x, this.y, this.width, 2)
  }
}
