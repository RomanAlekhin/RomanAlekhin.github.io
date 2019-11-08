export default class Buttons {
    constructor (game, context) {
        this.game = game
        this.button = game.add.button(50, 50, 'mute_icon', game.soundsManager.toggleMuteSounds, context)
        this.button.fixedToCamera = true
    }

    render () {
        this.button.tint = this.game.sound.mute ? 0xdcdcdc : 0xffffff
    }
}
