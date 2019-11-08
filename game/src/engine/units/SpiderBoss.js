import Unit from '.'
import BossClaw from '../weapons/BossClaw'
import BossShootingWeapon from '../weapons/BossShootingWeapon'
import BossBullet from '../projectiles/BossBullet'
import getOffsetPoint from '../../utils/getOffsetPoint'

export default class SpiderBoss extends Unit {
    constructor (engine, x, y) {
        super(engine, x, y, 'spider_boss', {
            speed: 150,
            hpMax: 10000,
            weapon1: BossClaw,
            weapon2: BossShootingWeapon,
            deathColor: 'yellow'
        })
        this.animationSpeed = 5
        this.blowInterval = 150
        this.blowFrame = this.blowInterval
        this.blows = 16
    }

    blow () {
        for (let i = 0; i < this.blows; i++) {
            const deg = i * (360 / this.blows)
            const point = getOffsetPoint(this.sprite.x, this.sprite.y, deg, 125)
            this.engine.createProjectile(point.x, point.y, deg, BossBullet)
        }
    }

    updateAdditional () {
        if (this.blowFrame <= 0) {
            this.blow()
            this.blowFrame = this.blowInterval
        } else {
            this.blowFrame--
        }
    }

}
