import Weapon from '.'

export default class MonsterClaw extends Weapon {
    constructor (engine, unit) {
        super(engine, unit, "Monster's claw", {
            isShooting: false,
            delayBeforeAttack: 15,
            delayAfterAttack: 15,
            addDamage: 5
        })
    }
}
