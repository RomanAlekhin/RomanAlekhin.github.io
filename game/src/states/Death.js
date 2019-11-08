import Phaser from 'phaser'
import WebFont from 'webfontloader'


export default class extends Phaser.State {
    preload () {
        this.game.loadResources()
    }

    create () {
        const game = this.game
        game.add.tileSprite(0, 0, 1280, 760, 'black_screen')
        this.game_over = game.texturesManager.createSpriteByName(340, 180, 'game_over')
        this.menu = []
        this.menuConf = [{
            text: 'TRY AGAIN',
            y: game.height - 150,
            callback: function () {
                game.state.start('Menu')
            }
        }]
        const style = { font: '42px caveStory', fill: '#ffffff', align: 'center' }
        const _self = this
        this.menuConf.forEach((cfg) => {
            const text = game.add.text(game.width / 2 - 70, cfg.y, cfg.text, style)
            text.inputEnabled = true
            text.input.useHandCursor = true
            text.events.onInputOver.add(function () {
                text.fill = '#8CC63F'
            }, this)
            text.events.onInputOut.add(function () {
                text.fill = '<div id="f"></div>fffff'
            }, this)
            text.events.onInputDown.add(cfg.callback, this)

            _self.menu.push(text)
        })
    }
}
