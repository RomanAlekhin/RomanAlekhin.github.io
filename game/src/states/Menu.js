import Phaser from 'phaser'
import WebFont from 'webfontloader'


export default class extends Phaser.State {
    init () {
    }

    preload () {
        this.game.loadResources()
    }

    create () {
        const manager = this.game.texturesManager
        this.skull = manager.createSpriteByName(this.game.width / 2 - 120, 20, 'logo_skull')
        this.game_name = manager.createSpriteByName(this.game.width / 2 - 215, 290, 'text_logo')
        this.game_name.alpha = 0
        this.menu = []

        const game = this.game

        this.menuConf = [{
            text: 'NEW GAME',
            y: 450,
            callback: () => {
                game.state.start('Tangram')
            }
        }]

        const style = { font: '42px caveStory', fill: '#ffffff', align: 'center' }
        const _self = this


        this.menuConf.forEach(function (cfg) {
            const text = game.add.text(game.width / 2 - 80, cfg.y, cfg.text, style)
            text.inputEnabled = true
            text.input.useHandCursor = true
            text.alpha = 0
            text.events.onInputOver.add(function () {
                text.fill = '#8CC63F'
            }, this)
            text.events.onInputOut.add(function () {
                text.fill = '#ffffff'
            }, this)
            text.events.onInputDown.add(cfg.callback, this)
            _self.menu.push(text)
        })

        const copyRight = this.game.add.text(this.game.width / 2 - 190, this.game.height - 70, '2017 Killer Koderz Kode', style)
        copyRight.alpha = 0

        const logoTween = this.game.add.tween(this.game_name).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 500, 0, false)

        _self.menu.forEach(function (menu) {
            game.add.tween(menu).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 1000, 0, false)
        })
        this.game.add.tween(copyRight).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false)

        // this.gameNameText = this.game.add.text(this.game.world.centerX - 80, 100, "CAPTAIN \n SLAYER", {
        //   font: "64px caveStory",
        //   fill: "#F7931E",
        //   align: "top"
        // });
    }
}









// function DeathScreen () {};

// DeathScreen.prototype.preload = function () {
//   loadResources();
// }

// DeathScreen.prototype.create = function () {
//   game.add.tileSprite(0, 0, 1280, 760, 'black_screen');
//   this.game_over = createSpriteByName(340, 180, 'game_over');
//   this.menu = [];
//   this.menuConf = [{
//     text: 'TRY AGAIN',
//     y: game.height - 150,
//     callback: function () {
//       game.state.start('menu');
//     }
//   }];
//   var style = { font: "42px caveStory", fill: "#ffffff", align: "center"};
//   var _self = this;
//   this.menuConf.forEach(function(cfg){
//     var text = game.add.text(game.width/2 - 70, cfg.y, cfg.text, style);
//     text.inputEnabled = true;
//     text.input.useHandCursor = true;
//     text.events.onInputOver.add(function (){
//       text.fill = '#8CC63F';
//     }, this);
//     text.events.onInputOut.add(function (){
//       text.fill = '#ffffff';
//     }, this);
//     text.events.onInputDown.add(cfg.callback, this);

//     _self.menu.push(text);
//   });
// }

// function renderMuteButton () {
//   var muteButton = game.add.button(50, 50, 'mute_icon', toggleMuteSounds, this);
//   muteButton.fixedToCamera = true;

//   if (game.sound.mute) muteButton.tint = '#DCDCDC';
// }

// var chosenWeapon1, chosenWeapon2, nextButton;







// var frames =0;

// function renderGameState() {

//   if (engine.hero.hp <= 0) {
//     engine.hero.textBubble = new Dialog(engine.hero, 'death-speech');
//     game.camera.fade('#000000', 1000);
//     stopSound('Soundtrack');
//     game.state.start('death');
//   } else if (engine.enemies.length == 0) {
//     engine.cinematicMode=true;
//     if (!frames) {
//       engine.scores = (100000000/engine.length * (game.hits/game.shots).toFixed(4)).toFixed(0);
//     }
//     game.debug.text('Level cleared', (canvasWidth - 380) / 2, (canvasHeight / 2) - 50, "#00ff00", "50px Courier");
//     game.debug.text('Total score:' + engine.scores, (canvasWidth - 380) / 2, (canvasHeight / 2), "#00ff00", "35px Courier");
//     game.debug.text('Shots done:' + game.shots, (canvasWidth - 380) / 2, (canvasHeight / 2) + 35, "#00ff00", "35px Courier");
//     game.debug.text('Hits done:' + game.hits, (canvasWidth - 380) / 2, (canvasHeight / 2) + 70, "#00ff00", "35px Courier");
//     game.debug.text('Accuracy:' + (game.hits/game.shots*100).toFixed(2) + '%', (canvasWidth - 380) / 2, (canvasHeight / 2) + 105, "#00ff00", "35px Courier");
//     game.debug.text('Click to face new enemies!', (canvasWidth - 380) / 2, (canvasHeight / 2) + 140, "#00ff00", "35px Courier");
//     frames++;
//     if ((frames  >= 180) && (game.input.activePointer.leftButton.isDown)){
//       var heroPos = {
//         'x': engine.hero.sprite.x.toFixed(0),
//         'y': engine.hero.sprite.y.toFixed(0),
//       };
//       delete engine;
//       levelID++;
//       if (levelID< 5){
//         game.hits=0;
//         game.shots = 0;
//         engine = new Engine(1920, 1920);
//         engine.length=0;
//         designLevel(levelID, heroPos);
//         frames=0;
//       }
//     }

//   }
// }