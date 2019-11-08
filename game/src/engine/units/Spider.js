import Unit from '.'

export default class Spider extends Unit {
    constructor (engine, x, y) {
        super(engine, x, y, 'spider', {
            speed: 250,
            hpMax: 400,
            deathColor: 'yellow'
        })
    }
}
