import Phaser from 'phaser'


export default class Controls {
    constructor (engine, game) {
        this.engine = engine
        this.game = game
        this.init()
    }

    init () {
        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.keys = this.game.input.keyboard.addKeys({
            'right': Phaser.Keyboard.D,
            'left': Phaser.Keyboard.A,
            'up': Phaser.Keyboard.W,
            'down': Phaser.Keyboard.S,
            'reload': Phaser.Keyboard.R,
            'ability1': Phaser.Keyboard.Q,
            'ability2': Phaser.Keyboard.E
        })

        // Prevent opening context menu when clicking right MB.
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault() }

        this.game.input.mouse.capture = true
    }

    rightIsDown () {
        return this.cursors.right.isDown || this.keys['right'].isDown
    }

    leftIsDown () {
        return this.cursors.left.isDown || this.keys['left'].isDown
    }

    upIsDown () {
        return this.cursors.up.isDown || this.keys['up'].isDown
    }

    downIsDown () {
        return this.cursors.down.isDown || this.keys['down'].isDown
    }

    // Returns angle (in degrees) of direction pressed by arrows. If no key is pressed - returns undefined.
    getDirectionFromKeyboard () {
        const x = +this.rightIsDown() - this.leftIsDown()
        const y = +this.upIsDown() - this.downIsDown()
        if (x === 0 && y === 0) {
            return undefined
        } else {
            return this.game.math.radToDeg(Math.atan2(-y, x)) // y * (-1 ) due to inversion of Y axis.
        }
    }

    setUnitActionsFromControls (unit) {
        if (!this.engine.cinematicMode) {
            // var x = this.game.input.mousePointer.x
            // var y = this.game.input.mousePointer.y
            unit.direction = this.game.math.radToDeg(this.game.physics.arcade.angleToPointer(unit.sprite))
            const movementDirection = this.getDirectionFromKeyboard()
            // console.log(movementDirection)
            if (movementDirection !== undefined) {
                unit.moving = true
                unit.movementDirection = movementDirection
            } else {
                unit.moving = false
            }

            // Check if attack buttons are pressed.
            unit.attacking1 = this.game.input.activePointer.leftButton.isDown
            unit.attacking2 = this.game.input.activePointer.rightButton.isDown
            unit.reloading = this.keys['reload'].isDown
        } else {
            unit.moving = false
            unit.attacking1 = false
            unit.attacking2 = false
        }
    }

}
