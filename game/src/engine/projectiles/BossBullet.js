import Projectile from '.'

export default class BossBullet extends Projectile {
    constructor (engine, x, y, direction, additional) {
        super(engine, x, y, direction, 'roach', {
            speed: 300,
            damage: 20,
            lifeTime: 120,
            icon: 'bullet'
        }, additional)
        this.sprite.play('death')
    }
}
