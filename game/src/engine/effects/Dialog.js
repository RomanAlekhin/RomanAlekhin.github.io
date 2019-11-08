import Effect from '.'

// Represents text message rendered over unit's head.
export default class Dialog extends Effect {
    constructor (engine, unit, phrase) {
        super(engine, engine.game.texturesManager.createSpriteByName(unit.sprite.x, unit.sprite.y - 50, phrase), 180)
        this.unit = unit
    }

}
