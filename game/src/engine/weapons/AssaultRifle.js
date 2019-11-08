import Weapon from '.'
import RedBullet from '../projectiles/RedBullet'

export default class AssaultRifle extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'Assault Rifle', {
            projectile: RedBullet,
            delayBeforeAttack: 0,
            delayAfterAttack: 4,
            addDamage: 15,
            addProjectileSpeed: 5,
            maxAmmo: 30,
            delayReload: 90,
            sprite: 'rifle',
            icon: 'assault_rifle_icon',
            twoHanded: true
        })
    }
}
