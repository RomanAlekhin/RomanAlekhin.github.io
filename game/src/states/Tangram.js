import Phaser from 'phaser'
import WebFont from 'webfontloader'


export default class extends Phaser.State {
    create () {
        const TOP = 300
        const x = this.game.world.centerX
        const y = this.game.world.centerY

        const manager = this.game.texturesManager

        this.inactive = manager.createSpriteByName(x, TOP, 'tangram_inactive')
        this.active = manager.createSpriteByName(x, TOP, 'tangram_active')
        const w = this.active.width
        const h = this.active.height

        this.discl = manager.createSpriteByName(x, TOP + h / 2 + 25, 'tangram_discl')
        this.inactive.inputEnabled = true


        this.hovered = false
        this.b = new Phaser.Polygon(x, TOP, x - w / 2 - 5, TOP, x, TOP + h / 2 + 5)
    }

    render () {
        this.hovered = this.b.contains(this.game.input.x, this.game.input.y)

        if (this.inactive.input.pointerDown() && this.hovered) {
            this.game.state.start('Brif')
        }
        this.active.visible = this.hovered
    }

}
