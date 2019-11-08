import Unit from '.'

import BlasterPistol from '../weapons/BlasterPistol'
import Uzi from '../weapons/Uzi'
import Railgun from '../weapons/Railgun'


export default class Marine extends Unit {
    constructor (engine, x, y) {
        super(engine, x, y,
            'marine_new',
            {
                speed: 300,
                hpRegen: 0.5 / 60,
                weapon1: engine.game.chosenWeapon1.type,
                weapon2: engine.game.chosenWeapon2 ? engine.game.chosenWeapon2.type : undefined
            })
        // this.sprite.animations.play('idle', 10, true);
    }
}
