import Weapon from '.'

export default class BareHand extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'Bare Hand', {
            isShooting: false,
            delayBeforeAttack: 15,
            delayAfterAttack: 15,
            addDamage: 50
        })
    }
}
