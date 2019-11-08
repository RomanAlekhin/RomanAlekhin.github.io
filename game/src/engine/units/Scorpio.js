import Unit from '.'

export default class Scorpio extends Unit {
    constructor (engine, x, y) {
        super(engine, x, y, 'scorpio', {
            speed: 250,
            hpMax: 400,
            deathColor: 'yellow'
        })
    }
}
