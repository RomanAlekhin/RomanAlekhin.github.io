import Phaser from 'phaser'

export default class HpBars {
    constructor (game) {
        this.game = game
        this.init()
    }

    init () {
        this.hpBarOverUnitWidth = 25
        this.hpBarOverUnitHeight = 3

        this.hpBarOnScreenWidth = 747
        this.hpBarOnScreenHeight = 9

        this.hpBarOnScreenX = (this.game.canvasWidth - this.hpBarOnScreenWidth) / 2
        this.hpBarOnScreenY = this.game.height - 80
    }

    // Compute parameters for rendering HP bar.
    computeHpBar (unit, hpBarWidth) {
        const hpPercent = unit.hp > 0 ? unit.hp / unit.hpMax : 0

        // Get width (in px) of coloured and black parts of HP bar.
        const hpLeftWidth = Math.round(hpPercent * hpBarWidth)
        const blackBarWidth = hpBarWidth - hpLeftWidth

        // Color dynamically changes from green to red.
        const green = Math.round(255 * (hpPercent > 0.5 ? 1 : hpPercent))
        const red = Math.round(255 * (hpPercent > 0.5 ? (1 - hpPercent / 2) : 1))
        const color = 'rgb(' + red + ',' + green + ',0)'

        return {
            color: color,
            coloredPixels: hpLeftWidth,
            blackPixels: blackBarWidth
        }
    }

    renderHpBar (x, y, width, height, bar) {
        this.game.debug.geom(new Phaser.Rectangle(x, y, bar.coloredPixels, height), bar.color, true)
        this.game.debug.geom(new Phaser.Rectangle(x + bar.coloredPixels, y, bar.blackPixels, height), 'black', true)
    }

    renderHpBarOverUnit (unit) {
        const barProps = this.computeHpBar(unit, this.hpBarOverUnitWidth)
        this.renderHpBar(unit.sprite.x - this.hpBarOverUnitWidth / 2, unit.sprite.y, this.hpBarOverUnitWidth, this.hpBarOverUnitHeight, barProps)
    }

    renderHpBarOnScreen (unit) {
        const barProps = this.computeHpBar(unit, this.hpBarOnScreenWidth)
        this.renderHpBar(this.hpBarOnScreenX + this.game.camera.view.x, this.hpBarOnScreenY + this.game.camera.view.y, this.hpBarOverUnitWidth, this.hpBarOnScreenHeight, barProps)
    }

    render () {
        this.renderHpBarOnScreen(this.game.engine.hero)
        this.game.engine.enemies.forEach((enemy) => {
            if (enemy.hp < enemy.hpMax) {
                this.renderHpBarOverUnit(enemy)
            }
        })
    }

}
