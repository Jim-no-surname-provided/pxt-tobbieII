// tests go here; this will not be compiled when this package is used as a library
basic.forever(function () {
    TobbieII.walkTime(TobbieII.MoveDirection.Forward, 2)
    TobbieII.walkTime(TobbieII.MoveDirection.Backward, 2)

    TobbieII.rotateTime(TobbieII.RotateDirection.Right, 2)
    TobbieII.rotateTime(TobbieII.RotateDirection.Left, 2)
})
