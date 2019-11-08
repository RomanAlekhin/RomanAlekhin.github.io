import MonsterClaw from '../weapons/MonsterClaw'

export default class Unit {
    constructor (engine, x, y, assetName, stats = {}) {
        this.engine = engine

        stats = Object.assign({}, Unit.defaultStats, stats)
        Object.assign(this, stats)

        // Set weapons.
        if (stats.weapon1 !== undefined) this.weapon1 = engine.createWeapon(this, stats.weapon1)
        if (stats.weapon2 !== undefined) this.weapon2 = engine.createWeapon(this, stats.weapon2)

        const manager = this.engine.game.texturesManager

        // Set dynamic sprite.
        if (!manager.spriteIsDynamic(assetName)) {
            this.sprite = manager.createSpriteByName(x, y, assetName)
        } else {
            this.weaponSprites = {
                left: this.weapon1 ? manager.createSpriteByName(0, 0, manager.getDynamicWeaponAssetByKey(assetName, this.weapon1.sprite, false)) : undefined,
                right: this.weapon2 ? manager.createSpriteByName(0, 0, manager.getDynamicWeaponAssetByKey(assetName, this.weapon2.sprite, true)) : undefined
            }
            // Create sprite.
            this.sprite = manager.createSpriteByName(x, y, manager.getDynamicBodyAsset(assetName))
            if (this.weaponSprites.left !== undefined) {
                this.weaponSprites.left.parent = this.sprite
            }
            if (this.weaponSprites.right !== undefined) {
                this.weaponSprites.right.parent = this.sprite
            }
        }

        // Set attack points.
        const attackPoints = manager.getAttackPointsByAssetName(assetName)
        if (stats.weapon1 !== undefined) {
            if (attackPoints !== undefined) {
                this.weapon1.attackPoint = this.weapon1.twoHanded ? attackPoints.middle : this.weapon1.attackPoint = attackPoints.left
            }
        };
        if (stats.weapon2 !== undefined) {
            if (attackPoints !== undefined) this.weapon2.attackPoint = attackPoints.right
        }

        // General properties.
        this.sprite.unit = this
        this.hp = this.hpMax * stats.hp

        this.direction = 0 // Direction of unit's face.
        this.movementDirection = 0 // Direction of unit's movement.
        this.moving = false
        this.attacking1 = false
        this.attacking2 = false

        // ????????? // NEW
        // ????????? this.asset = assetName
    }

    updateSprite () {
        this.sprite.angle = this.direction
        if (this.moving) {
            this.sprite.animations.play('move', this.animationSpeed || 10, true)
        } else {
            this.sprite.animations.play('idle')
        }
    }

    modifyStats () {
        if (this.hp < this.hpMax) {
            this.hp += this.hpMax * this.hpRegen / 100
            if (this.hp > this.hpMax) this.hp = this.hpMax
        };
    };

    update () {
        if (this.hp > 0) {
            this.modifyStats()

            // ?????????????? Special actions for boss ?????????????????
            // if (unit.role === 'boss') unit.update()

            this.engine.physics.moveUnit(this) // Implemented in physics.js module
            this.updateSprite()
            if (this.weapon1 !== undefined) {
                this.weapon1.isUsed = this.attacking1
                this.weapon1.update()
            }
            if (this.weapon2 !== undefined) {
                this.weapon2.isUsed = this.attacking2
                this.weapon2.update()
            }

            if (this.updateAdditional) this.updateAdditional()
        }
    }

    dealDamage (damage) {
        this.hp -= damage
        if (this.hp <= 0) {
            this.engine.removeUnit(this)
        }
    }



}

Unit.defaultStats = {
    hpMax: 100,
    hp: 1, // 1 means that unit is created with 100% of its max HP. If you want create damaged unit, use value from 0 to 1.
    hpRegen: 1 / 60, // HP regen (in %) per frame
    speed: 100,
    weapon1: MonsterClaw,
    deathColor: 'red'
}
