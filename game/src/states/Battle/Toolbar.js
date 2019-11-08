export default class Toolbar {
    constructor (game) {
        this.game = game

        this.toolBarBg = game.texturesManager.createSpriteByName(0, 0, 'toolbar_bg')

        this.toolBarBg.width = this.game.canvasWidth // width
        this.toolBarBg.height = this.game.canvasHeight // height
        this.toolBarBg.fixedToCamera = true

        const style = { font: '34px caveStory', fill: '#ffffff', align: 'center' }

        // engine.length = 0
        // if ((game.hits>0)&& (game.shots > 0)){
        //     engine.scores = (100000000/engine.length * (game.hits/game.shots).toFixed(4)).toFixed(0);
        // } else {
        //     engine.scores = 0;
        // }

        this.leftWeaponText = game.add.text(40, game.height - 70, '', style)
        this.leftWeaponText.fixedToCamera = true

        this.rightWeaponText = game.add.text(game.width - 220, game.height - 70, '', style)
        this.rightWeaponText.fixedToCamera = true

        this.scoreText = game.add.text(game.width / 2 - 60, game.height - 70, '', style)
        this.scoreText.fixedToCamera = true

        this.firstWeaponIcon = game.texturesManager.createSpriteByName(40, game.height - 130, game.chosenWeapon1.icon)
        this.firstWeaponIcon.fixedToCamera = true

        if (game.chosenWeapon2) {
            this.secondWeaponIcon = game.texturesManager.createSpriteByName(game.width - 230, game.height - 130, game.chosenWeapon2.icon)
            this.secondWeaponIcon.fixedToCamera = true
        }
    }


    renderWeaponsInfo (unit) {
        if (unit.weapon1 !== undefined) {
            if (!unit.weapon1.twoHanded) {
                this.leftWeaponText.text = this.getWeaponsInfo(unit.weapon1)
            } else {
                this.leftWeaponText.text = this.getWeaponsInfo(unit.weapon1)
            }
        }
        if (unit.weapon2 !== undefined) {
            this.rightWeaponText.text = this.getWeaponsInfo(unit.weapon2)
        }
    }

    getWeaponsInfo (weapon) {
        let weaponInfo = 'Ammo: '
        if (weapon.state === 'RELOAD') {
            weaponInfo = 'RELOADING: '
            weaponInfo += Math.round((1 - weapon.frame / weapon.delayReload) * 100) + '%'
        } else {
            weaponInfo += weapon.requiresAmmo ? ' ' + weapon.ammo + ' / ' + weapon.maxAmmo : ''
        }
        return weaponInfo
    }

    render () {
        this.renderWeaponsInfo(this.game.engine.hero)
        this.scoreText.text = this.game.engine.score ? parseFloat(this.game.engine.score) : 0
    }
}
