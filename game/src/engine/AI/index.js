export default class AI {
    constructor (engine, game) {
        this.engine = engine
        this.game = game
    }

    // Set general strategy of AI controlled unit.
    setStrategyForUnit (unit) {
        // Simply move to the position of the hero.
        unit.AI = {
            // targetPoint: { x: engine.hero.sprite.x, y: engine.hero.sprite.y },
            targetUnit: this.engine.hero
        }
    }


    setStrategyForBoss (boss) {
        boss.AI = {
            shootTo: this.engine.hero,
            targetUnit: this.engine.hero
            // targetPoint: { x: engine.hero.sprite.x, y: engine.hero.sprite.y },
        }
    }


    // Set simple actions for current frame.
    setActionsForUnit (unit) {
        if (!this.engine.cinematicMode) {
            const AI = unit.AI
            let moveTo

            // Try to get target moving point.
            if (AI.targetUnit) {
                moveTo = { x: AI.targetUnit.sprite.x, y: AI.targetUnit.sprite.y }
            } else if (AI.targetPoint) {
                moveTo = { x: AI.targetPoint.x, y: AI.targetPoint.y }
            }

            if (moveTo !== undefined) {
                // Rotate to position of target point.
                unit.direction = this.game.math.radToDeg(this.game.physics.arcade.angleToXY(unit.sprite, moveTo.x, moveTo.y))
                unit.movementDirection = unit.direction

                // If has target unit to attack in melee and distance is OK - attack unit.
                let range = unit.weapon1.isShooting ? 300 : unit.weapon1.range
                if (AI.targetUnit && this.game.physics.arcade.distanceBetween(unit.sprite, AI.targetUnit.sprite) <= range) {
                    unit.moving = false
                    unit.attacking1 = true
                } else {
                    // Else - run to target.
                    unit.moving = true
                    unit.attacking1 = false
                }
            } else {
                unit.moving = false
            }

            if (AI.shootTo !== undefined) {
                unit.direction = this.game.math.radToDeg(this.game.physics.arcade.angleToXY(unit.sprite, AI.shootTo.sprite.x, AI.shootTo.sprite.y))
                if (unit.weapon1 !== undefined && unit.weapon1.isShooting) unit.attacking1 = true
                if (unit.weapon2 !== undefined && unit.weapon2.isShooting) unit.attacking2 = true
            }
        } else {
            unit.moving = false
            unit.attacking1 = false
            unit.attacking2 = false
        }
    }
}
