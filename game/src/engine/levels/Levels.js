import Level from '.'
import Marine from '../units/Marine'
import Spider from '../units/Spider'
import Zombie from '../units/Zombie'
import Roach from '../units/Roach'
import SpiderBoss from '../units/SpiderBoss'
import Dialog from '../effects/Dialog'


export class Level1 extends Level {
    constructor (engine) {
        super(engine)
        this.width = 1920
        this.height = 1920
        this.enemiesCounter = 60
        this.creepTypes = [Zombie, Zombie, Spider]
        this.phrase = 'intro-first'
    }
}

export class Level2 extends Level {
    constructor (engine) {
        super(engine)
        this.width = 1920
        this.height = 1920
        this.enemiesCounter = 60
        this.creepTypes = [Roach, Roach, Spider]
        this.phrase = 'intro-second'
    }
}

export class Level3 extends Level {
    constructor (engine) {
        super(engine)
        this.width = 1920
        this.height = 1920
        this.enemiesCounter = 90
        this.creepTypes = [Zombie, Spider, Roach]
        this.phrase = 'intro-third'
    }
}

export class BossLevel extends Level {
    constructor (engine) {
        super(engine)
        this.width = 1920
        this.height = 1920
        this.enemiesCounter = 30
        this.spawnInterval = 60
        this.creepTypes = [Roach]
        this.phrase = 'intro-boss'
    }

    createStartingUnits () {
        this.engine.createHero(this.engine.game.world.centerX + 600, this.engine.game.world.centerY, Marine)
        this.engine.createBoss(this.engine.game.world.centerX - 600, this.engine.game.world.centerY, SpiderBoss)
    }

    showIntro () {
        this.engine.cinematicMode = true
        new Dialog(this.engine, this.engine.hero, this.phrase)
        this.engine.cameraFollowUnit(this.engine.hero)
        this.engine.setTimer('intro', 180, () => {
            this.engine.cameraFollowUnit(this.engine.boss)
            this.engine.cameraZoom(90)
            this.engine.setTimer('cameraReturn', 90, () => {
                this.engine.cameraFollowUnit(this.engine.hero)
                this.engine.cinematicMode = false
            })
        })
    }

}
