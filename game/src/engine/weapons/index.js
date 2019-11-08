import getOffsetPoint from '../../utils/getOffsetPoint'
let debugAttack = false



export default class Weapon {
    constructor (engine, unit, name, stats = {}) {
        this.engine = engine

        stats = Object.assign({}, Weapon.defaultStats, stats)
        Object.assign(this, stats)

        this.name = name
        this.unit = unit
        this.ammo = this.maxAmmo
        this.icon = stats.icon
        this.state = 'NO_ACTION'
        this.frame = -1

        this.used = false // Is weapon used in this frame.

        this.resolveAction = {
            NO_ACTION: undefined,
            ATTACK: this.resolveAttack,
            COOLDOWN: this.resolveCooldown,
            RELOAD: this.resolveReload
        }
    }

    destroy () {
        if (this.meleeEffect !== undefined) this.meleeEffect.destroy()
    }

    // Perform every frame.
    update () {
        // if (this.isUsed) debugger
        // if (this.unit == engine.hero && this.unit.weapon2 == this)
        // console.log(this.requiresAmmo, this.unit.reloading, this.ammo < this.ammoMax);
        if (this.requiresAmmo && this.unit.reloading && this.ammo < this.maxAmmo) {
            this.startReload()
        }
        if (this.isUsed && this.state === 'NO_ACTION') {
            // Check ammo.
            if (this.requiresAmmo) {
                if (this.ammo > 0) {
                    this.startAttack()
                    this.ammo--
                } else {
                    if (debugAttack) console.log('need to reload!')
                    this.startReload()
                }
            } else {
                this.startAttack()
            }
        }

        if (this.state !== 'NO_ACTION' && this.frame <= 0) {
            // Action finished.
            this.resolveAction[this.state].apply(this)
        } else {
            this.frame--

            if (this.state === 'ATTACK' && !this.isShooting && this.meleeEffect !== undefined) {
                this.meleeEffect.update()
            }

            if (debugAttack) {
                switch (this.state) {
                case 'ATTACK':
                    console.log('attack in progress!')
                    break
                case 'COOLDOWN':
                    console.log('cooldown in progress!')
                    break
                case 'RELOAD':
                    console.log('reload in progress!')
                    break
                }
            }
        }
    }

    startAttack () {
        this.state = 'ATTACK'
        this.frame = this.delayBeforeAttack
        if (!this.isShooting && this.showMeleeEffect) this.meleeEffect = new MeleeEffect(this)
        this.engine.game.soundsManager.playSound(this.name)
        if (debugAttack) console.log('attack started') // DEBUG
    }

    resolveAttack () {
        if (this.isShooting) {
            this.shot()
        } else {
            this.hitWithMeleeWeapon()
        }
        this.startCooldown()
    }

    startCooldown () {
        this.state = 'COOLDOWN'
        this.frame = this.delayAfterAttack
    }

    resolveCooldown () {
        this.state = 'NO_ACTION'
        if (debugAttack) console.log('cooldown finished!')
    }

    startReload () {
        this.state = 'RELOAD'
        this.frame = this.delayReload
    }

    resolveReload () {
        this.state = 'NO_ACTION'
        this.ammo = this.maxAmmo
        if (debugAttack) console.log('reload finished!') // DEBUG
    }

    // Perform shot from weapon.
    shot () {
        const shooter = this.unit
        this.engine.shots++
        const point = getOffsetPoint(shooter.sprite.x, shooter.sprite.y, this.attackPoint.offset + shooter.direction, this.attackPoint.distance)
        const additional = {
            damage: this.addDamage,
            speed: this.addProjectileSpeed
        }
        this.engine.createProjectile(point.x, point.y, this.unit.direction, this.projectile, additional)
    };

    // Perform melee weapon attack.
    hitWithMeleeWeapon () {
        const attacker = this.unit
        const groupToCheck = attacker.role === 'hero' ? this.engine.enemies : (attacker.role === 'enemy' || attacker.role === 'boss' ? [this.engine.hero] : [])
        const unitsHit = this.engine.physics.getHitUnits(this, groupToCheck)
        unitsHit.forEach((unit) => {
            unit.dealDamage(this.addDamage)
        })
        if (this.meleeEffect !== undefined) this.meleeEffect.destroy()
    };

}

Weapon.defaultStats = { // Intervals counted in frames.
    delayBeforeAttack: 0, // Interval between start of attack and actual attack executing (damage dealing for
    // melee attack or projectile fire for shooting attack).
    delayAfterAttack: 10, // Interval between end of attack and possibility of starting new attack.
    range: 75, // For melee only - range from which melee attack can hit the target.
    hitAngle: 90, // For melee only - angle of possible hit.
    isShooting: true,
    addDamage: 0,
    addProjectileSpeed: 0,
    twoHanded: false,

    requiresAmmo: true,
    maxAmmo: 12,
    delayReload: 30,

    showMeleeEffect: false
}
