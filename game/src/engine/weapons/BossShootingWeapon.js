import Weapon from '.'
import BossBullet from '../projectiles/BossBullet'

export default class BossShootingWeapon extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'PoisonGun', {
            projectile: BossBullet,
            delayBeforeAttack: 5,
            delayAfterAttack: 15,
            // addDamage: 150,
            // addProjectileSpeed: 1000,
            maxAmmo: 5,
            delayReload: 180
            // icon: 'sniper_rifle_icon',
            // sprite: 'sniper'
        })
    }
}
