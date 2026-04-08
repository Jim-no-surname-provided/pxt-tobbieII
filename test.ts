// tests go here; this will not be compiled when this package is used as a library
basic.forever(function () {
    // Rotate for 3 seconds to the left
    tobbieIIv2.rotateTime(tobbieIIv2.RotateDirection.Left, 3);
    // Walk
    tobbieIIv2.walk(tobbieIIv2.MoveDirection.Forward);
    basic.pause(5000)
    // Stop if there is an obstacle
    if (tobbieIIv2.isObstacle(tobbieIIv2.IRSide.Right, tobbieIIv2.Sensitivity.Medium)) {
        tobbieIIv2.stopWalk();
    }

    tobbieIIv2.shakeHead(3);
})