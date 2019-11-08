export default class Projectile {
    // additional - contains additional speed or damage that will be added to base value (according to gun or special ability).
    constructor (engine, x, y, direction, assetName, stats = {}, additional) {
        this.engine = engine

        stats = Object.assign({}, Projectile.defaultStats, stats)
        Object.assign(this, stats)

        if (additional === undefined) additional = { damage: 0, speed: 0 }
        this.damage += additional.damage
        this.speed += additional.speed

        this.direction = direction
        this.sprite = this.engine.game.texturesManager.createSpriteByName(x, y, assetName)
        this.sprite.projectile = this
        this.sprite.angle = this.direction
    }

    update () {
        if (this.lifeTime <= 0) {
            this.engine.removeProjectile(this)
        } else {
            this.lifeTime--
        };
        this.engine.physics.moveProjectile(this) // Implemented in physics.js module
    }

}

Projectile.defaultStats = {
    speed: 1000,
    damage: 20,
    lifeTime: 60,
    icon: 'bullet'
}
