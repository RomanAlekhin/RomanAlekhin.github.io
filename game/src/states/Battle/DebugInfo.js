import Phaser from 'phaser'
import getOffsetPoint from '../../utils/getOffsetPoint'


export default class DebugInfo {
    constructor (game) {
        this.game = game
        this.game.time.advancedTiming = true
    }

    renderAttackTarget (weapon, color) {
        if (weapon.unit.hp > 0) {
            const sprite = weapon.unit.sprite
            if (weapon.isShooting) {
                const point1 = getOffsetPoint(sprite.x, sprite.y, weapon.attackPoint.offset + sprite.angle, weapon.attackPoint.distance)
                const point2 = getOffsetPoint(point1.x, point1.y, sprite.angle, 1000)

                this.game.debug.geom(new Phaser.Line(point1.x, point1.y, point2.x, point2.y), color)
            } else {
                const range = weapon.range
                const hitAngle = weapon.hitAngle / 2

                const angle1 = sprite.angle - hitAngle
                const point1 = getOffsetPoint(sprite.x, sprite.y, angle1, range)
                this.game.debug.geom(new Phaser.Line(sprite.x, sprite.y, point1.x, point1.y), color)

                const angle2 = sprite.angle + hitAngle
                const point2 = getOffsetPoint(sprite.x, sprite.y, angle2, range)
                this.game.debug.geom(new Phaser.Line(sprite.x, sprite.y, point2.x, point2.y), color)
            }
        }
    }

    render () {
        this.game.debug.text('FPS: ' + this.game.time.fps, 10, 20, '#00ff00')
        this.game.debug.text('Enemies: ' + this.game.engine.enemies.length, 10, 35, '#00ff00')
        this.game.debug.text('Projectiles: ' + this.game.engine.projectiles.length, 10, 50, '#00ff00')

        // this.renderAttackTarget(this.game.engine.hero.weapon1, '#00ff00')
        // if (this.game.engine.hero.weapon2) this.renderAttackTarget(this.game.engine.hero.weapon2, '#00ff00')
    }

}
