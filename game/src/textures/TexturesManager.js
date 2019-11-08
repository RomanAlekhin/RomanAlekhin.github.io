export default class TexturesManager {
    constructor (game, texturesPaths, texturesConfig) {
        this.game = game
        this.paths = texturesPaths
        this.config = texturesConfig
    }

    loadAssets () {
        for (let name in this.paths) {
            let texture = this.paths[name]
            if (!texture.spritesheet) {
                this.game.load.image(name, texture.path)
            } else {
                this.game.load.spritesheet(name, texture.path, texture.spritesheet.width, texture.spritesheet.height, texture.spritesheet.max)
            }
        }
    }

    createSpriteByName (x, y, assetName) {
        let sprite = this.game.add.sprite(x, y, assetName)
        let asset = this.config[assetName]
        sprite.scale.setTo(asset.scale.x, asset.scale.y)
        sprite.anchor.setTo(asset.anchor.x, asset.anchor.y)

        if (asset.animations) {
            asset.animations.forEach((info) => {
                sprite.animations.add(info.name, info.frames)
            })
        }
        return sprite
    }

    getBoundaryBox (assetName) {
        let asset = this.config[assetName]
        return asset.boundaryBox
    }

    getAttackPointsByAssetName (assetName) {
        let asset = this.config[assetName]
        return asset.attackPoints
    }

    spriteIsDynamic (assetName) {
        return this.config[assetName].dynamic !== undefined
    }

    createDynamicSprite (x, y, bodyName, weapon1Name, weapon2Name) {
        const weapon1 = this.createSpriteByName(x, y, weapon1Name)
        const weapon2 = this.createSpriteByName(x, y, weapon2Name)
        const body = this.createSpriteByName(x, y, bodyName)
        return [weapon1, weapon2, body]
    }

    getDynamicWeaponAssetByKey (assetName, weaponType, rightHand) {
        if (rightHand === undefined) rightHand = false
        const asset = this.config[assetName].dynamic
        const sprite = rightHand ? asset.right : asset.left
        return sprite[weaponType]
    }

    getDynamicBodyAsset (assetName) {
        const asset = this.config[assetName].dynamic
        return asset.body
    }

}
