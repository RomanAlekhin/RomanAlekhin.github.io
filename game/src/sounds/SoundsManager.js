export default class SoundsManager {
    constructor (game, config) {
        this.game = game
        this.config = config
        this.soundList = []
    }

    loadSounds () {
        this.config.map((sound) => {
            this.game.load.audio(sound.key, sound.path)
        })
    }

    renderSounds () {
        const _this = this
        this.config.map((sound) => {
            const tune = _this.game.add.audio(sound.key)
            _this.soundList.push(tune)
        })
        return this.soundList
    }

    playSound (sound, volume) {
        let tune
        let i = 0
        while (!tune && (i < this.soundList.length)) {
            if (this.soundList[i].key === sound) tune = this.soundList[i]
            i++
        }
        tune.play()
    }

    toggleMuteSounds () {
        if (!this.game.sound.mute) {
            this.game.sound.mute = true
        } else {
            this.game.sound.mute = false
        }
    }

    stopSound (sound) {
        let tune
        let i = 0
        while (!tune && (i < this.soundList.length)) {
            if (this.soundList[i].key === sound) tune = this.soundList[i]
            i++
        }
        tune.stop()
    }

    loopSound (sound) {
        let tune
        let i = 0
        while (!tune && (i < this.soundList.length)) {
            if (this.soundList[i].key === sound) tune = this.soundList[i]
            i++
        }
        tune.loopFull(0.3)
    }

}
