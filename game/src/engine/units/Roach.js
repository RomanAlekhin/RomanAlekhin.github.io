import Unit from '.'

export default class Roach extends Unit {
    constructor (engine, x, y) {
        super(engine, x, y, 'roach', {
            speed: 200
        })
    }
}
