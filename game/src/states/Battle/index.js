import Phaser from 'phaser'
import BattleEngine from '../../engine'
import Buttons from './Buttons'
import DebugInfo from './DebugInfo'
import HpBars from './HpBars'
import ScoreInfo from './ScoreInfo'
import Toolbar from './Toolbar'


export default class extends Phaser.State {
    init () {
        this.engine = new BattleEngine(this.game)
    }

    preload () {
        this.game.loadResources()
    }

    create () {
        this.engine.create()
        this.engine.startLevel(this.game.getCurrentLevel())

        this.buttons = new Buttons(this.game, this)
        this.debugInfo = new DebugInfo(this.game)
        this.hpBars = new HpBars(this.game)
        this.scoreInfo = new ScoreInfo(this.game)
        this.toolbar = new Toolbar(this.game)
    }

    update () {
        this.engine.update()
    }

    render () {
        this.buttons.render()
        this.toolbar.render()
        this.hpBars.render()
        this.scoreInfo.render()
        this.debugInfo.render()
    }

}
