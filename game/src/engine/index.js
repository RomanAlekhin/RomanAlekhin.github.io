import AI from './AI'
import Controls from './controls'
import Physics from './physics'

import removeFrom from '../utils/Array.remove'
import Dialog from './effects/Dialog'


// Engine contains all information about the world.
export default class BattleEngine {
    constructor (game, level) {
        this.game = game
        game.engine = this
        this.canvasWidth = game.canvasWidth
        this.canvasHeight = game.canvasHeight

        this.AI = new AI(this, game)
        this.controls = new Controls(this, game)
        this.physics = new Physics(this, game)

        this.TINT_RANGE = 80
        this.debugAttack = false
    }

    create () {
        this.game.soundsManager.renderSounds()
    }


    render () {
    }

    // Initialize level of battle.
    startLevel (LevelType) {
        this.level = new LevelType(this)

        this.worldWidth = this.level.width
        this.worldHeight = this.level.height

        this.initLevelData()
        this.initObjects()
        this.initWorldBounds(this.worldWidth, this.worldHeight)
        this.initBackground(this.worldWidth, this.worldHeight, '')
        this.initializePhaserSpriteGroups()
        this.level.create()
    }

    initLevelData () {
        this.shots = 0
        this.hits = 0
        this.score = 0
        this.cinematicMode = false // If true - no unit can take actions.
        this.timers = {}
    }

    initObjects () {
        this.hero = undefined
        this.enemies = []
        this.projectiles = []
        this.effects = []
    }

    // Set bound of the world.
    initWorldBounds (worldWidth, worldHeight) {
        this.game.world.setBounds(0, 0, worldWidth, worldHeight)
    }

    initBackground (width, height, texture) {
        this.background = this.game.add.tileSprite(0, 0, width, height, texture)
    }

    // Create Phaser groups for units and projectiles sprites.
    initializePhaserSpriteGroups () {
        // !!!!!!!!!!!!!!!!!! First all previous groups must be removed - ADD THIS!
        this.deadBodies = this.game.add.group()
        this.allUnitsSprites = this.game.add.group() // contains both heroes and enemies
        this.enemySprites = this.game.add.group()
        this.allUnitsSprites.addChild(this.enemySprites)
        this.projectileSprites = this.game.add.group()
    }

    // Level building.
    setBackgroundTexture (texture) {
        this.background.loadTexture(texture, 0)
    }


    cameraFollowUnit (unit) {
        this.game.camera.follow(unit.sprite)
    }

    // cameraZoom () {
    //     this.game.camera.shake(0.05, 500)
    // }

    cameraZoom (frames) {
        let scale = 1.5
        this.game.world.scale.setTo(scale, scale)
        this.game.camera.shake(0.05, frames / 60 * 1000)
        this.setTimer('camera', frames, () => {
            this.game.world.scale.setTo(1, 1)
        })
    }
    // , 100)
        // })

        

    //     const zoomOut = function (x, game) {
    //         var zoom = setInterval(() => {
    //             x--;
    //             game.world.scale.setTo(x, x);
    //             if (x === 1 ) {
    //                 game.camera.shake(0.05, 500);
    //                 clearInterval(zoom);
    //                 game.camera.follow(engine.hero.sprite);
    //                 engine.cinematicMode = false;
    //             };
    //         }, 100);
    //     }


    createUnit (x, y, unitType) {
        const unit = new unitType(this, x, y)
        this.physics.initPhysicsForUnit(unit)
        return unit
    }

    createHero (x, y, unitType) {
        const hero = this.createUnit(x, y, unitType)
        hero.role = 'hero'
        this.hero = hero

        // Add sprite to Phaser group.
        this.allUnitsSprites.addChild(hero.sprite)
        this.physics.initSpecialPhysicsForHeroUnit(hero)
        return hero
    }

    createEnemy (x, y, unitType) {
        const enemy = this.createUnit(x, y, unitType)
        enemy.role = 'enemy'
        this.enemies.push(enemy)

        //  Add sprite to Phaser group.
        this.enemySprites.add(enemy.sprite)
        return enemy
    }

    // Boss has specific physics and AI.
    createBoss (x, y, unitType) {
        const boss = this.createUnit(x, y, unitType)
        boss.role = 'boss'
        this.boss = boss
        this.enemies.push(boss)

        //  Add sprite to Phaser group.
        this.enemySprites.add(boss.sprite)
        this.physics.initSpecialPhysicsForBossUnit(boss)
        return boss
    }

    createWeapon (unit, weaponType) {
        const weapon = new weaponType(this, unit)
        return weapon
    }


    // Projectiles.
    createProjectile (x, y, direction, projectileType, additional) {
        const projectile = new projectileType(this, x, y, direction, additional)
        this.projectiles.push(projectile)

        //  Add sprite to Phaser group.
        this.projectileSprites.add(projectile.sprite)
        this.physics.initPhysicsForProjectile(projectile)
        return projectile
    };

    removeProjectile (projectile) {
        removeFrom(this.projectiles, projectile)
        this.projectileSprites.remove(projectile.sprite)
        projectile.sprite.kill()
    };

    setTimer (name, frames, callback) {
        this.timers[name] = {
            left: frames,
            callback: callback
        }
    }


    // Activity (Updates every frame).

    // Here must be executed all activity of every object during current frame.
    update () {
        this.level.update()

        // At first actions are setted, than actions are executed.
        this.controls.setUnitActionsFromControls(this.hero)
        this.hero.update()

        this.enemies.forEach((enemy) => {
            if (enemy.role === 'enemy') {
                this.AI.setStrategyForUnit(enemy)
            } else if (enemy.role === 'boss') {
                this.AI.setStrategyForBoss(enemy)
            }

            this.AI.setActionsForUnit(enemy)
            enemy.update()
        })

        this.projectiles.forEach((projectile) => {
            projectile.update()
        })

        this.physics.handleProjectilesCollisions()
        this.physics.handleUnitsCollisions()

        this.effects.forEach((effect) => {
            effect.update()
        })

        Object.keys(this.timers).forEach((name) => {
            let timer = this.timers[name]
            if (timer.left <= 0) {
                timer.callback()
                delete this.timers[name]
            } else {
                timer.left--
            }
        })
    }


    removeUnit (unit) {
        if (unit.role === 'hero') {
            this.allUnitsSprites.remove(unit.sprite)
            if (!unit.deathFrameCount || unit.deathFrameCount < 20) {
                this.createTheGuts(unit)
                unit.deathFrameCount = unit.deathFrameCount && unit.deathFrameCount++ || 0
            }
        } else if (unit.role === 'enemy' || unit.role === 'boss') {
            this.createTheGuts(unit)
            removeFrom(this.enemies, unit)
            this.enemySprites.remove(unit.sprite)
            this.score += 1000
        }
        if (unit.weapon1 !== undefined) unit.weapon1.destroy()
        if (unit.weapon2 !== undefined) unit.weapon2.destroy()

        // Kill attached sprites with weapons.
        if (unit.weaponSprites !== undefined) {
            if (unit.weapon1 !== undefined) unit.weaponSprites.left.kill()
            if (unit.weapon2 !== undefined) unit.weaponSprites.right.kill()
        }
    }

    createTheGuts (unit) {
        let sprite = unit.sprite

        if (!sprite.animations.getAnimation('death')) {
            sprite = this.game.texturesManager.createSpriteByName(sprite.x, sprite.y, 'death_' + (unit.deathColor || 'green'))
        }

        const scale = sprite.scale.x + sprite.scale.x * (Math.random() * 0.4 - 0.2)
        sprite.scale.setTo(scale)
        sprite.rotation = Math.random() * Math.PI * 2

        const TINT_RANGE = this.TINT_RANGE

        sprite.tint = 0 +
            (Math.round((Math.random() * TINT_RANGE) + (255 - TINT_RANGE)) << 16) +
            (Math.round((Math.random() * TINT_RANGE) + (255 - TINT_RANGE)) << 8) +
            (Math.round((Math.random() * TINT_RANGE) + (255 - TINT_RANGE)) << 0)

        this.deadBodies.add(sprite)
        sprite.sendToBack()
        sprite.animations.play('death', 10, false)
        sprite.body && (sprite.body.moves = false)
    }




    // What happens when projectile hits unit.
    handleProjectileHit (unit, projectile) {
        unit.dealDamage(projectile.damage)
        this.hits++
        if (unit.hp > 0) {
            this.removeProjectile(projectile)
        };
    };

    win () {
        this.game.score += this.score
        this.displayScore = true
        this.setTimer('nextLevel', 180, () => {
            this.nextLevel()
        })
    }

    lose () {
        new Dialog(this, this.hero, 'death-speech')
        this.game.camera.fade('#000000', 1000)
        this.game.soundsManager.stopSound('Soundtrack')
        this.setTimer('death', 120, () => {
            this.game.state.start('Death')
        })
    }

    nextLevel () {
        this.game.nextLevel()
        if (this.game.getCurrentLevel()) {
            this.game.state.start('Battle')
        }
    }


}









