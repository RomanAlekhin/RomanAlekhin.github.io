import Weapon from '.'
import BlueBullet from '../projectiles/BlueBullet'

export default class Uzi extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'Uzi', {
            projectile: BlueBullet,
            delayBeforeAttack: 0,
            delayAfterAttack: 4,
            addDamage: 5,
            addProjectileSpeed: 5,
            maxAmmo: 25,
            delayReload: 90,
            icon: 'uzi_icon',
            sprite: 'uzi'
        })
    }
}
