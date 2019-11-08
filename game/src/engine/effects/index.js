// Represents special effect that is rendered on the screeen and must disappear after some period of time.
export default class Effect {
    constructor (engine, sprite, lifeTime) {
        this.engine = engine
        this.sprite = sprite
        this.lifeTime = lifeTime
        engine.effects.push(this)
    }

    update () {
        if (this.lifeTime <= 0) {
            this.sprite.kill()
        } else {
            this.lifeTime--
        }
    }
}
