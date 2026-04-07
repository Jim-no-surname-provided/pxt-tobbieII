//% weight=0 color=#FF8B27 icon="\uf1b9" block="TobbieII"
//% groups=['Infrared sensors', 'Walking', 'Rotating']

//uf1b9
namespace TobbieII {
    let reflectedIRValue: number = 0;

    let Motor_R: boolean = false;
    let Motor_L: boolean = false;
    let Force: number = 10;

    const IR_LED_PIN = DigitalPin.P12;

    const IR_LEFT_PIN = AnalogPin.P2;
    const IR_RIGHT_PIN = AnalogPin.P1;

    // These are positive and negative sides for the same motor, and sending 1 to one, you have to send 0 to the other.
    const FORWARD_PIN = DigitalPin.P13;
    const BACKWARD_PIN = DigitalPin.P14;

    // These are positive and negative sides for the same motor, and sending 1 to one, you have to send 0 to the other.
    const TURN_LEFT_PIN = DigitalPin.P15;
    const TURN_RIGHT_PIN = DigitalPin.P16;

    // This pin is undocumented, I don't know what it is, and so I tried not to touch it
    // If you do, please tell me. I took an educated guess -Jim no surname provided
    const isValid = () => pins.digitalReadPin(DigitalPin.P8) == 1;

    export enum MoveDirection {
        //% block="forward"
        Forward,
        //% block="backward"
        Backward
    }

    export enum RotateDirection {
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    // I could reuse TurnDirection, but I thought this is cleaner
    export enum IRSide {
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    export enum Sensitivity {
        //% block="low"
        Low = 300,
        //% block="medium"
        Medium = 500,
        //% block="high"
        High = 700
    }

    /** 
     * Read the value sensed by the right side of the infrared sensor.
    */
    //% blockId="getIR"
    //% block="%sensor IR sensor value "
    //% group="Infrared Sensor"
    //% blockGap=3 weight=1 
    export function getIR(side: IRSide): number {
        // Get correct pin based on the side
        let IR_PIN;
        if (side == IRSide.Left) {
            IR_PIN = IR_LEFT_PIN
        } else {
            IR_PIN = IR_RIGHT_PIN
        }

        basic.pause(100)

        let ambient = pins.analogReadPin(IR_PIN)

        // Turn IR LED on
        pins.digitalWritePin(IR_LED_PIN, 1)
        control.waitMicros(250)

        let illuminated = pins.analogReadPin(IR_PIN)

        // Turn IR LED off
        pins.digitalWritePin(IR_LED_PIN, 0)

        if (isValid()) {
            reflectedIRValue = illuminated - ambient
        }

        return reflectedIRValue
    }

    /**
        *Determine if there are obstacles on the right side.
        *@param side Left or right infrared sensor
        *@param sensitivity This controls the threshold between a true and false
        */
    //% blockId="isObstacle"
    //% block="Is there an obstacle on the $side|| with $sensitivity sensitivity"
    //% group="Infrared Sensor"
    //% sensitivity.defl=Sensitivity.Medium
    //% blockGap=3 weight=0
    export function isObstacle(side: IRSide, sensitivity: Sensitivity): boolean {
        return getIR(side) > sensitivity && isValid()
    }

    /**
    *   Make TobbieII start walking.
    *   @param direction forward or backward
    */
    //% blockId="walk"
    //% block="Walk %direction"
    //% group="Walking"
    //% blockGap=3 weight=3
    export function walk(direction: MoveDirection) {
        if (direction == MoveDirection.Forward) {
            forward();
        } else {
            backward();
        }
    }

    /**
    *   Make TobbieII for an amount of seconds.
    *   @param direction forward or backward
    *   @param seconds The time in seconds Tobbie should walk for
    */
    //% blockId="walk_seconds"
    //% block="Walk %direction for %seconds seconds"
    //% group="Walking"
    //% blockGap=3 weight=2
    //% seconds.defl=1.5
    export function walkTime(direction: MoveDirection, seconds: number) {
        walk(direction);
        basic.pause(seconds / 1000);
        stopWalk();
    }


    /**
    *   Tobbie-II walks forward.
    */
    function forward() {
        if (isValid()) {
            pins.digitalWritePin(FORWARD_PIN, 1)
            pins.digitalWritePin(BACKWARD_PIN, 0)
        }
    }
    /**
    *   Tobbie-II walks backward.
    *   I have no idea what Force does. -Jim no surname provided
    */
    function backward() {
        if (Force != 0) {
            pins.digitalWritePin(FORWARD_PIN, 0)
            pins.digitalWritePin(BACKWARD_PIN, 1)
            Force = Force - 1;
        }
        if (isValid()) {
            Force = 10
        }

    }
    /** 
    *   Tobbie-II stops walking.
    */
    //% blockId="stopwalk"
    //% block="Stop moving"
    //% group="Walking"
    //% blockGap=3 weight=1
    export function stopWalk() {
        pins.digitalWritePin(FORWARD_PIN, 0)
        pins.digitalWritePin(BACKWARD_PIN, 0)
    }

    /**
     * Start rotating to the right or to the left
     * @param direction Right or Left
     */
    //% blockId="rotate"
    //% block="Rotate to the %direction"
    //% group="Rotating"
    //% blockGap=3 weight=3
    export function rotate(direction: RotateDirection) {
        if (direction == RotateDirection.Right) {
            rightward()
        } else {
            leftward()
        }
    }
    /**
     * Start rotating to the right or to the left
     * @param direction Right or Left
     * @param [seconds=1.5] Time in seconds Tobbie should Rotate for
     */
    //% blockId="rotate_time"
    //% block="Rotate to the %direction for %seconds seconds"
    //% group="Rotating"
    //% blockGap=3 weight=2
    //% seconds.defl=1.5
    export function rotateTime(direction: RotateDirection, seconds: number = 1.5) {
        rotate(direction);
        basic.pause(seconds);
        stopRotation();
    }

    function rightward() {
        pins.digitalWritePin(TURN_LEFT_PIN, 0)
        pins.digitalWritePin(TURN_RIGHT_PIN, 1)
        Motor_L = false
        Motor_R = true
    }
    function leftward() {
        pins.digitalWritePin(TURN_LEFT_PIN, 1)
        pins.digitalWritePin(TURN_RIGHT_PIN, 0)
        Motor_L = true
        Motor_R = false
    }
    /**
    *Tobbie-II stops rotating.
    */
    //% blockId="stopRotation"
    //% block="Stop rotating"
    //% group="Rotating"
    //% blockGap=3 weight=1
    export function stopRotation() {
        if (Motor_L || Motor_R) {
            if (Motor_R) {
                leftward()
            } else {
                rightward()
            }
            basic.pause(50)
        }
        if (isValid()) {
            pins.digitalWritePin(TURN_LEFT_PIN, 0)
            pins.digitalWritePin(TURN_RIGHT_PIN, 0)
            Motor_L = false
            Motor_R = false
        }
    }

    /**
       *Tobbie-II stamps his foot for a certain number of times.
       *@param times the amount of times to stamp; eg. 5
       */
    //% blockId="stamp"
    //% block="Stamp %time| times"
    //% time.min=1 time.max=100
    //% blockGap=3 weight=4
    //% advanced=true
    export function stamp(times: number): void {
        for (let i = 0; i < times; i++) {
            pins.digitalWritePin(FORWARD_PIN, 1)  //向前
            pins.digitalWritePin(BACKWARD_PIN, 0)
            basic.pause(150)
            pins.digitalWritePin(FORWARD_PIN, 0)  //向後
            pins.digitalWritePin(BACKWARD_PIN, 1)
            basic.pause(150)
        }
        pins.digitalWritePin(FORWARD_PIN, 0)      //停止
        pins.digitalWritePin(BACKWARD_PIN, 0)
    }
    /**
       *Tobbie-II shakes his head for a certain number of times.
       *@param times the amount of times to shake the head; eg. 5
       */
    //% blockId="shake_head"
    //% block="Shake head %time| times"
    //% time.min=1 time.max=100
    //% blockGap=3 weight=3
    //% advanced=true
    export function shake_head(times: number): void {
        for (let i = 0; i < times; i++) {
            pins.digitalWritePin(TURN_LEFT_PIN, 1)  //左轉
            pins.digitalWritePin(TURN_RIGHT_PIN, 0)
            basic.pause(250)
            pins.digitalWritePin(TURN_LEFT_PIN, 0)  //右轉
            pins.digitalWritePin(TURN_RIGHT_PIN, 1)
            basic.pause(250)
        }
        pins.digitalWritePin(TURN_LEFT_PIN, 0)      //停止行走
        pins.digitalWritePin(TURN_RIGHT_PIN, 0)
    }
    /**
        *Tobbie-II repeats the dance for for a certain number of times.
        *@param times the amount of times to dance; eg. 5
        */
    //% blockId="dance"
    //% block="Dance %time| times"
    //% time.min=1 time.max=100
    //% blockGap=3 weight=2
    //% advanced=true
    export function dance(times: number): void {
        for (let i = 0; i < times; i++) {
            pins.digitalWritePin(FORWARD_PIN, 0)  //向後
            pins.digitalWritePin(BACKWARD_PIN, 1)
            pins.digitalWritePin(TURN_LEFT_PIN, 0)  //右轉
            pins.digitalWritePin(TURN_RIGHT_PIN, 1)
            basic.pause(250)
            pins.digitalWritePin(FORWARD_PIN, 1)  //向前
            pins.digitalWritePin(BACKWARD_PIN, 0)
            pins.digitalWritePin(TURN_LEFT_PIN, 1)  //左轉
            pins.digitalWritePin(TURN_RIGHT_PIN, 0)
            basic.pause(250)
        }
        pins.digitalWritePin(FORWARD_PIN, 0)
        pins.digitalWritePin(BACKWARD_PIN, 0)
        pins.digitalWritePin(TURN_LEFT_PIN, 0)
        pins.digitalWritePin(TURN_RIGHT_PIN, 0)
    }
}

