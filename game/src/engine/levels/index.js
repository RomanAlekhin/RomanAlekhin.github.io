import getRandomInt from '../../utils/getRandomInt'
import Marine from '../units/Marine'
import Dialog from '../effects/Dialog'


// Represents current game level.
export default class Level {
    constructor (engine) {
        this.engine = engine

        this.backGroundTexture = 'bricks'
        this.soundtrack = 'Soundtrack'
        this.spawnInterval = 18
    }

    create () {
        this.setBackground()
        this.createStartingUnits()
        this.startSoundtrack()
        this.frame = this.spawnInterval
        this.victoryEnabled = false
        this.defeatEnabled = true
        this.end = false
        this.showIntro()
    }

    setBackground () {
        this.engine.setBackgroundTexture(this.backGroundTexture)
    }

    createStartingUnits () {
        this.engine.createHero(this.engine.game.world.centerX, this.engine.game.world.centerY, Marine)
    }

    startSoundtrack () {
        this.engine.game.soundsManager.loopSound(this.soundtrack)
    }

    showIntro () {
        this.engine.cinematicMode = true
        new Dialog(this.engine, this.engine.hero, this.phrase)
        this.engine.setTimer('intro', 180, () => {
            this.engine.cinematicMode = false
        })
        this.engine.cameraFollowUnit(this.engine.hero)
    }

    update () {
        if (!this.engine.cinematicMode) {
            this.tryEndLevel()
            this.spawn()
        }
    }

    spawn () {
        if (this.frame <= 0) {
            if (this.enemiesCounter > 0) {
                const unitType = this.getRandomCreepType()
                const point = this.getRandomPointForSpawn()
                this.engine.createEnemy(point.x, point.y, unitType)
                this.enemiesCounter--
            } else {
                this.victoryEnabled = true
            }
            this.frame = this.spawnInterval
        } else {
            this.frame--
        }
    }

    tryEndLevel () {
        if (!this.end) {
            if (this.checkDefeatCondition()) {
                this.engine.lose()
                this.end = true
            } else if (this.checkVictoryCondition()) {
                this.engine.win()
                this.end = true
            }
        }
    }

    checkDefeatCondition () {
        return this.defeatEnabled && this.engine.hero.hp <= 0
    }

    checkVictoryCondition () {
        return this.victoryEnabled && this.engine.enemies.length === 0
    }

    getRandomCreepType () {
        return this.creepTypes[getRandomInt(0, this.creepTypes.length - 1)]
    }

    getRandomPointForSpawn () {
        let enemyX = getRandomInt(1, this.engine.game.world.width)
        let enemyY = getRandomInt(1, this.engine.game.world.height)
        const heroX = this.engine.hero.sprite.x
        if (heroX > enemyX) {
            enemyX = enemyX - heroX
        }
        return { x: enemyX, y: enemyY }
    }


}
