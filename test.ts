// tests go here; this will not be compiled when this package is used as a library
basic.forever(function () {
    // Rotate for 3 seconds to the left
    TobbieII.rotateTime(TobbieII.RotateDirection.Left, 3);
    // Walk
    TobbieII.walk(TobbieII.MoveDirection.Forward);
    basic.pause(5000)
    // Stop if there is an obstacle
    if (TobbieII.isObstacle(TobbieII.IRSide.Right, TobbieII.Sensitivity.Medium)) {
        TobbieII.stopWalk();
    }

    TobbieII.shake_head(3);
})