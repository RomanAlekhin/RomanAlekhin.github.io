import Projectile from '.'

export default class RedBullet extends Projectile {
    constructor (engine, x, y, direction, additional) {
        super(engine, x, y, direction, 'red_plasma', {}, additional)
    }
}
