# Tobbie-II (Translated)

Extension for Tobbie-II
The Tobbie-II robot is a STEAMP DIY kit for BBC micro:bit. The Tobbie-II extends the micro:bit's several GPIO ports for motor driver and IR sensors. The extension includes forward walking, backward walking, left turn and right turn, and reads the infrared sensing states on the left and right sides. In addition, it also provides functions such as shaking the head, shaking and dancing.

## Code Example
```TypeScript
basic.forever(function () {
    // Rotate for 3 seconds to the left
    TobbieII.rotateTime(TobbieII.RotateDirection.Left, 3);
    // Walk indefinitely
    TobbieII.walk(TobbieII.MoveDirection.Forward);
    basic.pause(5000)
    // Stop if there is an obstacle
    if (TobbieII.isObstacle(TobbieII.IRSide.Right, TobbieII.Sensitivity.Medium)) {
        TobbieII.stopWalk();
    }

    TobbieII.shake_head(3);
})
```
## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


Product information-->https://www.prokits.com.tw/Product/GE-894/