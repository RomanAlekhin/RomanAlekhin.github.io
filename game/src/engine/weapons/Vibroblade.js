import Weapon from '.'

export default class Vibroblade extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, 'Vibroblade', {
            isShooting: false,
            delayBeforeAttack: 7,
            delayAfterAttack: 10,
            addDamage: 50,
            meleeEffectColor: '#fff'
        })
    }
}
