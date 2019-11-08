import Weapon from '.'
import RedBullet from '../projectiles/RedBullet'

export default class Railgun extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'Railgun', {
            projectile: RedBullet,
            delayBeforeAttack: 15,
            delayAfterAttack: 45,
            addDamage: 400,
            addProjectileSpeed: 1000,
            maxAmmo: 20,
            delayReload: 120,
            twoHanded: true,
            icon: 'sniper_rifle_icon',
            sprite: 'sniper'
        })
    }
}
