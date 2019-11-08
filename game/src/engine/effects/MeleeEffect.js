// Represents effect of weapon's swing to animate melee attacks.
export default class MeleeEffect {
    constructor (weapon) {
        this.weapon = weapon
        const attacker = weapon.unit
        this.sprite = createSpriteByName(attacker.sprite.x, attacker.sprite.y, 'meleeEffect')

        this.sprite.scale.x *= weapon.range / 64

        // Set starting angle of effect. Effect for weapon in left hand must be inversed.
        if (attacker.weapon1 === weapon) {
            this.sprite.scale.y *= -1
            this.relativeAngle = -1 * weapon.hitAngle / 2
        } else {
            this.relativeAngle = weapon.hitAngle / 2
        }
        this.sprite.angle = attacker.direction + this.relativeAngle

        if (weapon.meleeEffectColor !== undefined) this.sprite.tint = weapon.meleeEffectColor
    }

    update () {
        const attacker = this.weapon.unit
        this.sprite.x = attacker.sprite.x
        this.sprite.y = attacker.sprite.y
        const progress = 1 - this.weapon.frame / this.weapon.delayBeforeAttack
        // const angle = attacker.direction
        this.relativeAngle = (this.weapon.unit.weapon1 === this.weapon ? -1 : 1) * this.weapon.hitAngle * (1 / 2 - progress)
        this.sprite.angle = attacker.direction + this.relativeAngle
    }

    destroy () {
        this.weapon.meleeEffect = undefined
        this.sprite.kill()
    }

}
