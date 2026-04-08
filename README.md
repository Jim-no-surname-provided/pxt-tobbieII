# Tobbie-II (Translated)

Extension for Tobbie-II

The Tobbie-II robot is a STEAMP DIY kit for BBC micro:bit. The Tobbie-II extends the micro:bit's several GPIO ports for motor driver and IR sensors. The extension includes forward walking, backward walking, left turn and right turn, and reads the infrared sensing states on the left and right sides. In addition, it also provides functions such as shaking the head, shaking and dancing.

This is a fork from the original which seems to have been abandoned since 2020. It adds translations to every language supported by makeCode, using OpenAI's llm GPT-5.0, which still allows to an MIT license given their terms of use; as well as several refactorings aimed to help with the goal of education. It has also been updated to meet good coding practices, like removing magic numbers, having descriptive names and descriptions, and using enums, which are particularly good for Block coding.

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

## More information

Product information-->https://www.prokits.com.tw/Product/GE-894/

Downloads and manuals-->https://elenco.com/teachtech-tobbieii-downloads/