namespace SpriteKind {
    export const Box = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    try_move(0, -1)
    win()
})
function try_move (dx: number, dy: number) {
    music.pewPew.play()
    x2 = x + dx
    y2 = y + dy
    x3 = x2 + dx
    y3 = y2 + dy
    // 没有箱子
    flag = 0
    for (let 值 of sprites.allOfKind(SpriteKind.Box)) {
        if (Math.idiv(值.x, 16) == x2 && Math.idiv(值.y, 16) == y2) {
            // 有一个箱子
            flag = 1
            box = 值
            break;
        }
    }
    for (let 值 of sprites.allOfKind(SpriteKind.Box)) {
        if (Math.idiv(值.x, 16) == x3 && Math.idiv(值.y, 16) == y3) {
            if (flag == 0) {
            	
            } else {
                // 有两个箱子
                flag = 2
            }
            break;
        }
    }
    if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(x3, y3), assets.tile`myTile`)) && flag == 1) {
        tiles.placeOnTile(box, tiles.getTileLocation(x3, y3))
        x = x + dx
        y = y + dy
        tiles.placeOnTile(hero, tiles.getTileLocation(x, y))
    } else if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(x2, y2), assets.tile`myTile`)) && flag == 0) {
        x = x + dx
        y = y + dy
        tiles.placeOnTile(hero, tiles.getTileLocation(x, y))
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    try_move(0, 1)
    win()
})
function Destroy () {
    for (let 值 of sprites.allOfKind(SpriteKind.Player)) {
        值.destroy()
    }
    for (let 值 of sprites.allOfKind(SpriteKind.Box)) {
        值.destroy()
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Refresh()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    try_move(1, 0)
    win()
})
function Refresh () {
    Destroy()
    Choose_map()
    hero = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    tiles.placeOnRandomTile(hero, assets.tile`myTile1`)
    x = Math.idiv(hero.x, 16)
    y = Math.idiv(hero.y, 16)
    tiles.setTileAt(tiles.getTileLocation(x, y), assets.tile`transparency16`)
    scene.cameraFollowSprite(hero)
    for (let 值 of tiles.getTilesByType(assets.tile`myTile2`)) {
        box = sprites.create(img`
            . . b b b b b b b b b b b b . . 
            . b e 4 4 4 4 4 4 4 4 4 4 e b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b b b b b b b d d b b b b b b b 
            c b b b b b b c c b b b b b b c 
            c c c c c c b c c b c c c c c c 
            b e e e e e c b b c e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `, SpriteKind.Box)
        tiles.placeOnTile(box, 值)
        tiles.setTileAt(值, assets.tile`transparency16`)
    }
}
function Choose_map () {
    if (LEVEL == 1) {
        tiles.setTilemap(tilemap`级别2`)
    } else if (LEVEL == 2) {
        tiles.setTilemap(tilemap`级别1`)
    } else if (LEVEL == 3) {
        tiles.setTilemap(tilemap`级别3`)
    } else if (LEVEL == 4) {
        tiles.setTilemap(tilemap`级别4`)
    } else if (LEVEL == 5) {
        tiles.setTilemap(tilemap`级别6`)
    } else if (LEVEL == 6) {
        tiles.setTilemap(tilemap`级别7`)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    LEVEL += 1
    if (LEVEL <= MAX_LEVEL) {
        Refresh()
    } else {
        LEVEL = randint(1, MAX_LEVEL)
        Refresh()
    }
})
function win () {
    if (testing == 1) {
        return
    }
    testing = 1
    wingame = true
    for (let 值 of sprites.allOfKind(SpriteKind.Box)) {
        bx = Math.idiv(值.x, 16)
        by = Math.idiv(值.y, 16)
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(bx, by), assets.tile`myTile0`)) {
            console.log("在?上了")
        } else {
            console.log("没有成功")
            wingame = false
            break;
        }
    }
    if (wingame) {
        pause(100)
        music.powerUp.playUntilDone()
        LEVEL += 1
        if (LEVEL <= MAX_LEVEL) {
            Refresh()
        } else {
            game.over(true)
        }
    }
    testing = 0
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    try_move(-1, 0)
    win()
})
let by = 0
let bx = 0
let wingame = false
let testing = 0
let hero: Sprite = null
let box: Sprite = null
let flag = 0
let y3 = 0
let x3 = 0
let y = 0
let y2 = 0
let x = 0
let x2 = 0
let MAX_LEVEL = 0
let LEVEL = 0
scene.setBackgroundColor(9)
LEVEL = 1
MAX_LEVEL = 6
Refresh()
