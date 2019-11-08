import Projectile from '.'

export default class BlueBullet extends Projectile {
    constructor (engine, x, y, direction, additional) {
        super(engine, x, y, direction, 'blue_plasma', {}, additional)
    }
}
