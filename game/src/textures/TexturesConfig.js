export const texturesPaths = {
    'sky': { path: 'assets/sky.png' },
    'marine': { path: 'assets/demo-marine.png' },
    'marine2': { path: 'assets/demo-marine2.png' },

    'marine_body': { path: 'assets/Marine/marine_body_only.png' },
    'marine_left_hand_pistol': { path: 'assets/Marine/marine_pistol_left_hand.png' },
    'marine_right_hand_pistol': { path: 'assets/Marine/marine_pistol_right_hand.png' },
    'marine_left_hand_uzi': { path: 'assets/Marine/marine_hands_uzi_left.png' },
    'marine_right_hand_uzi': { path: 'assets/Marine/marine_hands_uzi_right.png' },
    'marine_auto_rifle': { path: 'assets/Marine/marine_auto_rifle.png' },
    'marine_sniper_rifle': { path: 'assets/Marine/marine_hands_sniper_rifle.png' },
    'marine_machinegun': { path: 'assets/Marine/marine_hands_machinegun.png' },

    'roach': { path: 'assets/roach.png', spritesheet: { width: 128, height: 128, max: 7 } },
    'zombie': { path: 'assets/zombie-new.png', spritesheet: { width: 128, height: 128, max: 2 } },
    'scorpio': { path: 'assets/scorpio.png', spritesheet: { width: 140, height: 128, max: 2 } },

    'spider_boss': { path: 'assets/spider-boss.png', spritesheet: { width: 512, height: 512, max: 2 } },

    'troll': { path: 'assets/troll.png' },
    'spider': { path: 'assets/demo_spider.gif' },
    'spider_pixel': { path: 'assets/spider_pixel.png' },

    'death_green': { path: 'assets/deaths/green.png', spritesheet: { width: 128, height: 128, max: 3 } },
    'death_red': { path: 'assets/deaths/red.png', spritesheet: { width: 128, height: 128, max: 3 } },
    'death_yellow': { path: 'assets/deaths/yellow.png', spritesheet: { width: 128, height: 128, max: 3 } },

    'loading_bg': { path: 'assets/loading_bg.jpg' },

    // Projectiles.
    'red_plasma': { path: 'assets/red_plasma.png' },
    'blue_plasma': { path: 'assets/blue_plasma.png' },
    'green_plasma': { path: 'assets/green_plasma.png' },
    'yellow_plasma': { path: 'assets/yellow_plasma.png' },

    // Icon for projectiles on ammo bar.
    'bullet': { path: 'assets/bullet.png' },
    'intro-first': { path: 'assets/level-1-intro.png' },
    'intro-second': { path: 'assets/level-2-intro.png' },
    'intro-third': { path: 'assets/level-3-intro.png' },
    'intro-boss': { path: 'assets/boss-intro.png' },

    'death-speech': { path: 'assets/death-speech.png' },

    // Tiles.
    // 'rockyGrass1': { path: 'assets/CircleTextures/TEXTURES/G0G0A800.BMP' },
    // 'rockyGrass2': { path: 'assets/CircleTextures/TEXTURES/G0G0A801.BMP' },
    // 'graySand': { path: 'assets/CircleTextures/TEXTURES/D000M801.BMP' },
    // 'grass': { path: 'assets/CircleTextures/TEXTURES/G100M800.BMP' },
    // 'orangeRocks': { path: 'assets/CircleTextures/TEXTURES/B1B0I800.BMP' },
    // 'grayRocks': { path: 'assets/CircleTextures/TEXTURES/S300M802.BMP' },
    // 'bricks': { path: 'assets/CircleTextures/TEXTURES/S4S0I811.BMP' },
    'bricks': { path: 'assets/texture.BMP' },

    // Special effects.
    'meleeEffect': { path: 'assets/melee.png' },

    // Logos.
    'logo_skull': { path: 'assets/logo_skull.png' },
    'text_logo': { path: 'assets/text_logo.png' },

    'mute_icon': { path: 'assets/mute_icon.png' },
    'mute_icon_active': { path: 'assets/icons_audio-vol_active_48px.png' },
    'toolbar_bg': { path: 'assets/gameplay_interface.png' },

    'pistol_icon': { path: 'assets/pistol_icon.png' },
    'machine_gun_icon': { path: 'assets/machine_gun_icon.png' },
    'sniper_rifle_icon': { path: 'assets/sniper_rifle_icon.png' },
    'assault_rifle_icon': { path: 'assets/assault_rifle_icon.png' },
    'uzi_icon': { path: 'assets/uzi_icon.png' },

    'game_over': { path: 'assets/death_screen.png' },
    'black_screen': { path: 'assets/black_screen.png' },

    'tangram_active': { path: 'assets/tangram_active.png' },
    'tangram_inactive': { path: 'assets/tangram_inactive.png' },

    'tangram_discl': { path: 'assets/tangram_discl.png' },
    'unactive_box': { path: 'assets/unactive_box.png' },
    'unactive_box_hover': { path: 'assets/unactive_box_hover.png' },
    'active_box': { path: 'assets/active_box.png' },
    'disabled_box': { path: 'assets/disabled_box.png' },

    'box_button': { path: 'assets/box_button.png', spritesheet: { width: 254, height: 130 } },
    'button_next': { path: 'assets/next_button.png', spritesheet: { width: 246, height: 50 } }

}

export const texturesConfig = {
    // Units.
    'marine': { scale: { x: 0.4, y: 0.4 }, anchor: { x: 0.358, y: 0.472 }, boundaryBox: { width: 50, height: 50 } },
    'marine2': {
        scale: { x: 0.4, y: 0.4 },
        anchor: { x: 0.270, y: 0.500 },
        boundaryBox: { width: 50, height: 50 },
        // Offsets of attack points must be multiplied by -1 due to reversion of Y axis of canvas.
        attackPoints: {
            left: { offset: -18, distance: 50 },
            right: { offset: 18, distance: 50 },
            middle: { offset: 0, distance: 50 }

            // Maybe better to implement it with coordinates like in anchor?
            // left: { x: 0.855, y: 0.220 },
            // right: { x: 0.855, y: 0.220 },
            // middle: { x: 0.461, y: 0.500 },
        },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'zombie': {
        scale: { x: 0.7, y: 0.7 },
        anchor: { x: 0.5, y: 0.5 },
        boundaryBox: { width: 40, height: 40 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'scorpio': {
        scale: { x: 0.3, y: 0.3 },
        anchor: { x: 0.5, y: 0.5 },
        boundaryBox: { width: 60, height: 40 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'roach': {
        scale: { x: 0.3, y: 0.3 },
        anchor: { x: 0.5, y: 0.5 },
        boundaryBox: { width: 27, height: 27 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }, {
            name: 'death',
            frames: [2, 3, 4, 5, 6]
        }]
    },
    'troll': { scale: { x: 0.2, y: 0.2 }, anchor: { x: 0.418, y: 0.443 }, boundaryBox: { width: 40, height: 40 } },
    'spider': {
        scale: { x: 0.25, y: 0.25 },
        anchor: { x: 0.389, y: 0.533 },
        boundaryBox: { width: 40, height: 40 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }]
    },
    'spider_pixel': { scale: { x: 0.5, y: 0.5 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 40, height: 40 } },
    'spider_boss': {
        scale: { x: 0.5, y: 0.5 },
        anchor: { x: 0.5, y: 0.5 },
        boundaryBox: { width: 256, height: 256 },
        animations: [{
            name: 'idle',
            frames: [0]
        }, {
            name: 'move',
            frames: [0, 1]
        }],
        attackPoints: {
            left: { offset: 0, distance: 100 },
            right: { offset: 0, distance: 125 },
            middle: { offset: 0, distance: 100 }

        }
    },

    'intro-first': { scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 }, boundaryBox: { width: 40, height: 40 } },
    'intro-second': { scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 }, boundaryBox: { width: 40, height: 40 } },
    'intro-third': { scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 }, boundaryBox: { width: 40, height: 40 } },
    'intro-boss': { scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 }, boundaryBox: { width: 40, height: 40 } },

    'death-speech': { scale: { x: 0.3, y: 0.3 }, anchor: { x: 0.25, y: 0.5 }, boundaryBox: { width: 40, height: 40 } },

    // Dynamic body parts.
    'marine_body': { scale: { x: 0.6, y: 0.6 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 }, },
    'marine_left_hand_pistol': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 } },
    'marine_left_hand_uzi': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 } },
    'marine_right_hand_pistol': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 } },
    'marine_right_hand_uzi': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 } },
    'marine_auto_rifle': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 } },
    'marine_sniper_rifle': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 } },
    'marine_machinegun': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 50, height: 50 } },

    'marine_new': {
        dynamic: {
            body: 'marine_body',
            left: {
                'pistol': 'marine_left_hand_pistol',
                'uzi': 'marine_left_hand_uzi',
                'rifle': 'marine_auto_rifle',
                'sniper': 'marine_sniper_rifle',
                'machinegun': 'marine_machinegun'
            },
            right: {
                'pistol': 'marine_right_hand_pistol',
                'uzi': 'marine_right_hand_uzi'
            }
        },
        attackPoints: {
            left: { offset: -18, distance: 60 },
            right: { offset: 18, distance: 60 },
            middle: { offset: 0, distance: 60 }

            // Maybe better to implement it with coordinates like in anchor?
            // left: { x: 0.855, y: 0.220 },
            // right: { x: 0.855, y: 0.220 },
            // middle: { x: 0.461, y: 0.500 },
        }
    },

    // Projectiles.
    'red_plasma': { scale: { x: 0.75, y: 0.75 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 1, height: 1 } },
    'blue_plasma': { scale: { x: 0.75, y: 0.75 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 1, height: 1 } },
    'bullet': { scale: { x: 0.25, y: 0.25 }, anchor: { x: 0.5, y: 0.5 }, boundaryBox: { width: 1, height: 1 } },

    // Special effects.
    'meleeEffect': { scale: { x: 0.5, y: 1.5 }, anchor: { x: 0, y: 0.5 } },
    'loading_bg': { scale: { x: 1.5, y: 1.5 }, anchor: { x: 0, y: -0.3 } },

    'logo_skull': { scale: { x: 1, y: 1 }, anchor: { x: 0, y: 0 } },
    'text_logo': { scale: { x: 0.8, y: 0.8 }, anchor: { x: 0, y: 0 } },
    'toolbar_bg': { scale: { x: 0.8, y: 0.8 }, anchor: { x: 0, y: 0 } },

    'death_green': { scale: { x: 0.5, y: 0.5 }, anchor: { x: 0.5, y: 0.5 }, animations: [{ name: 'death', frames: [0, 1, 2] }] },
    'death_red': { scale: { x: 0.5, y: 0.5 }, anchor: { x: 0.5, y: 0.5 }, animations: [{ name: 'death', frames: [0, 1, 2] }] },
    'death_yellow': { scale: { x: 0.5, y: 0.5 }, anchor: { x: 0.5, y: 0.5 }, animations: [{ name: 'death', frames: [0, 1, 2] }] },
    'mute_icon': { scale: { x: 1, y: 1 }, anchor: { x: 0, y: 0 } },

    'pistol_icon': { scale: { x: 0.8, y: 0.8 }, anchor: { x: 0, y: 0 } },
    'machine_gun_icon': { scale: { x: 0.8, y: 0.8 }, anchor: { x: 0, y: 0 } },
    'sniper_rifle_icon': { scale: { x: 0.8, y: 0.8 }, anchor: { x: 0, y: 0 } },
    'assault_rifle_icon': { scale: { x: 0.8, y: 0.8 }, anchor: { x: 0, y: 0 } },
    'uzi_icon': { scale: { x: 0.8, y: 0.8 }, anchor: { x: 0, y: 0 } },
    'game_over': { scale: { x: 1, y: 1 }, anchor: { x: 0, y: 0 } },

    'tangram_active': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 } },
    'tangram_inactive': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 } },
    'tangram_discl': { scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0 } }
}
