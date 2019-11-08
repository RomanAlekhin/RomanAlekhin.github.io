import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import MenuState from './states/Menu'
import TangramState from './states/Tangram'
import BrifState from './states/Brif'
import BattleState from './states/Battle'
import DeathState from './states/Death'

import config from './config'

import SoundsManager from './sounds/SoundsManager'
import { soundsConfig } from './sounds/SoundsConfig'
import TexturesManager from './textures/TexturesManager'
import { texturesPaths, texturesConfig } from './textures/TexturesConfig'
import { Level1, Level2, Level3, BossLevel } from './engine/levels/Levels'

class ShooterGame extends Phaser.Game {

    constructor() {
        const docElement = document.documentElement
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

        super(width, height,
            Phaser.CANVAS,
            // Phaser.AUTO,
            'content', null)

        this.state.add('Boot', BootState, false)
        this.state.add('Splash', SplashState, false)
        this.state.add('Game', GameState, false)

        this.state.add('Menu', MenuState, false)
        this.state.add('Tangram', TangramState, false)
        this.state.add('Brif', BrifState, false)
        this.state.add('Battle', BattleState, false)
        this.state.add('Death', DeathState, false)

        // Additional logic for Shooter game.
        this.canvasWidth = width
        this.canvasHeight = height
        this.soundsManager = new SoundsManager(this, soundsConfig)
        this.texturesManager = new TexturesManager(this, texturesPaths, texturesConfig)
        this.initGlobalData()

        // this.state.start('Game')
        this.state.start('Boot')
    }

    // Load resources for Game. Must be run in preload() method.
    loadResources () {
        this.texturesManager.loadAssets()
        this.soundsManager.loadSounds()
    }

    // Shpud be run once, when instance of Engine is created.
    initGlobalData () {
        this.levels = [Level1, Level2, Level3, BossLevel]
        this.currentLevel = 0
        this.chosenWeapon1 = null
        this.chosenWeapon2 = null
        this.score = 0
    }

    getCurrentLevel () {
        return this.levels[this.currentLevel]
    }

    nextLevel () {
        this.currentLevel++
    }
}

window.game = new ShooterGame()
