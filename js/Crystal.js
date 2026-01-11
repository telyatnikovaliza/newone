export class Crystal {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 20
    this.height = 20
    this.rotation = 0
    this.bobOffset = 0
  }

  update() {
    this.rotation += 0.05
    this.bobOffset = Math.sin(Date.now() / 200) * 3
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2 + this.bobOffset)
    ctx.rotate(this.rotation)

    // Diamond shape
    ctx.fillStyle = "#fbbf24"
    ctx.beginPath()
    ctx.moveTo(0, -10)
    ctx.lineTo(10, 0)
    ctx.lineTo(0, 10)
    ctx.lineTo(-10, 0)
    ctx.closePath()
    ctx.fill()

    // Inner shine
    ctx.fillStyle = "#fef3c7"
    ctx.beginPath()
    ctx.moveTo(0, -6)
    ctx.lineTo(6, 0)
    ctx.lineTo(0, 6)
    ctx.lineTo(-6, 0)
    ctx.closePath()
    ctx.fill()

    ctx.restore()

    // Glow effect
    ctx.shadowColor = "#fbbf24"
    ctx.shadowBlur = 10
    ctx.shadowColor = "transparent"
  }
}
