import Weapon from '.'
import RedBullet from '../projectiles/RedBullet'

export default class BlasterPistol extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'Blaster Pistol', {
            projectile: RedBullet,
            delayBeforeAttack: 0,
            delayAfterAttack: 15,
            maxAmmo: 12,
            addDamage: 20,
            delayReload: 15,
            icon: 'pistol_icon',
            sprite: 'pistol'
        })
    }
}
