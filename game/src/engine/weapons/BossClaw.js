import Weapon from '.'

export default class BossClaw extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, "Boss's claw", {
            isShooting: false,
            delayBeforeAttack: 15,
            delayAfterAttack: 15,
            addDamage: 5,
            range: 175
            // showMeleeEffect: true
        })
    }
}
