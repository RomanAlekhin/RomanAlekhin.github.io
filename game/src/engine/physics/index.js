import Phaser from 'phaser'
import isInAngle from '../../utils/isInAngle'

export default class Physics {
    constructor (engine, game) {
        this.engine = engine
        this.game = game
    }

    init () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        // game.physics.startSystem(Phaser.Physics.P2JS);
    }

    initPhysicsForUnit (unit) {
        this.game.physics.arcade.enable(unit.sprite)
        // Set physic boundary box of sprites according to spritesManager.
        const boundaryBox = this.game.texturesManager.getBoundaryBox(unit.sprite.key)
        unit.sprite.body.width = boundaryBox.width
        unit.sprite.body.height = boundaryBox.height
        // sprite.boundaryBox.width / 2); // Problems with collisions of circle bodies, used rectangle bodies.
    }

    initSpecialPhysicsForHeroUnit (unit) {
        unit.sprite.body.collideWorldBounds = true
    }

    initSpecialPhysicsForBossUnit (unit) {
        unit.sprite.body.immovable = true
        unit.sprite.body.setSize(250, 250, 150, 150)
    }

    initPhysicsForProjectile (projectile) {
        this.game.physics.arcade.enable(projectile.sprite)

        // Set physic boundary box of sprites according to spritesManager.
        const boundaryBox = this.game.texturesManager.getBoundaryBox(projectile.sprite.key)
        projectile.sprite.body.width = boundaryBox.width
        projectile.sprite.body.height = boundaryBox.height
    }

    moveUnit (unit) {
        if (unit.moving) {
            this.game.physics.arcade.velocityFromAngle(unit.movementDirection, unit.speed, unit.sprite.body.velocity)
        } else {
            unit.sprite.body.velocity.x = 0
            unit.sprite.body.velocity.y = 0
        }
    }

    moveProjectile (projectile) {
        this.game.physics.arcade.velocityFromAngle(projectile.direction, projectile.speed, projectile.sprite.body.velocity)
    }

    handleUnitsCollisions () {
        this.game.physics.arcade.collide(this.engine.hero.sprite, this.engine.enemySprites)
        this.game.physics.arcade.collide(this.engine.enemySprites)
    }

    handleProjectilesCollisions () {
        this.game.physics.arcade.overlap(this.engine.allUnitsSprites, this.engine.projectileSprites,
            (unitSprite, projectileSprite) => {
                // Call handler from Engine class.
                this.engine.handleProjectileHit(unitSprite.unit, projectileSprite.projectile)
            })
    }

    // Returns all units from specified group that are situated in the angle of attack and in range of weapon.
    getHitUnits (weapon, group) {
        const attacker = weapon.unit
        // const attackDirection = attacker.direction
        const targets = []
        group.forEach((unit) => {
            if (this.game.physics.arcade.distanceBetween(attacker.sprite, unit.sprite) <= weapon.range + unit.sprite.body.width / 2 &&
                isInAngle(attacker.direction, this.game.math.radToDeg(this.game.physics.arcade.angleBetween(attacker.sprite, unit.sprite)), weapon.hitAngle)) {
                targets.push(unit)
            }
        })

        return targets
    }

}
