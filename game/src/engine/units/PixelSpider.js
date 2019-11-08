import Unit from '.'

export default class PixelSpider extends Unit {
    constructor (engine, x, y) {
        super(engine, x, y, 'spider_pixel', {
            speed: 250,
            hpMax: 400,
            deathColor: 'yellow'
        })
    }
}
