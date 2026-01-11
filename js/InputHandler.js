export class InputHandler {
  constructor(game) {
    this.game = game
    this.keys = {
      left: false,
      right: false,
      up: false,
    }

    window.addEventListener("keydown", (e) => {
      this.handleKeyDown(e)
    })

    window.addEventListener("keyup", (e) => {
      this.handleKeyUp(e)
    })
  }

  handleKeyDown(e) {
    switch (e.key.toLowerCase()) {
      case "a":
      case "arrowleft":
        this.keys.left = true
        break
      case "d":
      case "arrowright":
        this.keys.right = true
        break
      case "w":
      case " ":
      case "arrowup":
        this.keys.up = true
        e.preventDefault()
        break
      case "escape":
        if (this.game) {
          this.game.togglePause()
        }
        e.preventDefault()
        break
      case "r":
        if (this.game) {
          this.game.restart()
        }
        e.preventDefault()
        break
    }
  }

  handleKeyUp(e) {
    switch (e.key.toLowerCase()) {
      case "a":
      case "arrowleft":
        this.keys.left = false
        break
      case "d":
      case "arrowright":
        this.keys.right = false
        break
      case "w":
      case " ":
      case "arrowup":
        this.keys.up = false
        break
    }
  }
}
