export default class ScoreInfo {
    constructor (game) {
        this.game = game
    }

    render () {
        const game = this.game
        const engine = game.engine

        if (game.engine.displayScore) {
            game.debug.text('Level cleared', (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) - 50, '#00ff00', '50px Courier')
            game.debug.text('Total score:' + game.score, (game.canvasWidth - 380) / 2, (game.canvasHeight / 2), '#00ff00', '35px Courier')
            game.debug.text('Shots done:' + engine.shots, (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 35, '#00ff00', '35px Courier')
            game.debug.text('Hits done:' + engine.hits, (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 70, '#00ff00', '35px Courier')
            game.debug.text('Accuracy:' + (engine.hits / engine.shots * 100).toFixed(2) + '%', (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 105, '#00ff00', '35px Courier')
            game.debug.text('Click to face new enemies!', (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 140, '#00ff00', '35px Courier')
        }
    }

}
