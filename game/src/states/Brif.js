import Phaser from 'phaser'
import WebFont from 'webfontloader'
import Minigun from '../engine/weapons/Minigun'
import Railgun from '../engine/weapons/Railgun'
import AssaultRifle from '../engine/weapons/AssaultRifle'
import BlasterPistol from '../engine/weapons/BlasterPistol'
import Uzi from '../engine/weapons/Uzi'


export default class extends Phaser.State {
    init () {
        this.nextButton = null
        this.buttonsConfig = [{
            x: 200, y: 250,
            title: 'MACHINE GUN',
            description: 'HEAVY AND POWERFUL',
            icon: 'machine_gun_icon',
            type: Minigun,
            twoHanded: true
        },
        {
            x: 500, y: 250,
            title: 'SNIPER RIFLE',
            description: 'ULTIMATE SINGLE DAMAGE',
            icon: 'sniper_rifle_icon',
            type: Railgun,
            twoHanded: true
        },
        {
            x: 800, y: 250,
            title: 'ASSAULT RIFLE',
            description: 'ARMYS\'S BEST FRIEND',
            icon: 'assault_rifle_icon',
            type: AssaultRifle,
            twoHanded: true
        },
        {
            x: 200, y: 470,
            title: 'PISTOL',
            description: 'YOUR GIRLFRIEND\'S TOY',
            icon: 'pistol_icon',
            type: BlasterPistol,
            twoHanded: false
        },
        {
            x: 500, y: 470,
            title: 'UZI',
            description: 'TWO-HANDED KILLER',
            icon: 'uzi_icon',
            type: Uzi,
            twoHanded: false
        },
        {
            x: 800, y: 470,
            title: 'TO BE ANNOUNCED',
            description: '',
            icon: 'machine_gun_icon',
            disabled: true
        }]
    }

    create () {
        const game = this.game
        game.chosenWeapon1 = undefined
        game.chosenWeapon2 = undefined
        game.add.text(game.world.centerX - 170, 80, 'CHOOSE THE WEAPON', { font: '42px caveStory', fill: '#ffffff', align: 'center' })
        game.add.text(game.world.centerX - 300, 150, 'YOU CAN USE TWO-HANDED WEAPONS FOR BOTH HANDS \n OR ONE TWO-HANDED WEAPON', { font: '32px caveStory', fill: '#F7931E', align: 'center' })

        const nextButton = game.add.button(game.width / 2 - 135, game.height - 80, 'button_next', function () {
            game.state.start('Battle')
        }, this, 2, 1, 2, 2)

        nextButton.visible = false

        function chooseButton (btn, cfg) {
            console.log(btn)

            if (!cfg.disabled) {
                if (!game.chosenWeapon1) {
                    game.chosenWeapon1 = {
                        type: cfg.type,
                        icon: cfg.icon
                    }
                    btn.setFrames(2, 2)
                    game.chosenWeapon1.twoHanded = cfg.twoHanded
                    nextButton.visible = true
                } else if (game.chosenWeapon1 && !game.chosenWeapon2 && !cfg.twoHanded && !game.chosenWeapon1.twoHanded) {
                    game.chosenWeapon2 = {
                        type: cfg.type,
                        icon: cfg.icon
                    }
                    btn.setFrames(3, 3)
                    nextButton.visible = true
                }
            }
        }

        this.buttonsConfig.forEach((cfg) => {
            // game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
            const button = game.add.button(cfg.x, cfg.y, 'box_button', null, this, 1, 0)
            button.events.onInputDown.add(() => {
                chooseButton(button, cfg)
            })
            this.game.texturesManager.createSpriteByName(cfg.x + 30, cfg.y + 30, cfg.icon)
            game.add.text(cfg.x + 5, cfg.y + 120, cfg.title, { font: '38px caveStory', fill: '#ffffff', align: 'center' })
            if (cfg.description) game.add.text(cfg.x + 5, cfg.y + 155, cfg.description, { font: '26px caveStory', fill: '#D3D3D3', align: 'center' })
        })
    }

}
