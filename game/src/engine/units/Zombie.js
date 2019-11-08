import Unit from '.'

export default class Zombie extends Unit {
    constructor (engine, x, y) {
        super(engine, x, y, 'zombie', {
            speed: 100,
            deathColor: 'green'
        })
        this.animationSpeed = 5
    }
}
