import Weapon from '.'
import BlueBullet from '../projectiles/BlueBullet'

export default class Minigun extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'Minigun', {
            projectile: BlueBullet,
            delayBeforeAttack: 0,
            delayAfterAttack: 2,
            addDamage: 20,
            addProjectileSpeed: 10,
            maxAmmo: 100,
            delayReload: 300,
            twoHanded: true,
            icon: 'machine_gun_icon',
            sprite: 'machinegun'
        })
    }
}
