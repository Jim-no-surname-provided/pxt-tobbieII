    //% weight=0 color=#C85208 icon="\uf1b9" block="Tobbie II"
    //% groups=['others', 'Infrared sensors', 'Walking', 'Rotating', 'Buzzer']

    //uf1b9
    namespace tobbieIIv2 {
        const IR_LED_PIN = DigitalPin.P12;

        const IR_LEFT_PIN = AnalogPin.P2;
        const IR_RIGHT_PIN = AnalogPin.P1;

        const BUZZER = DigitalPin.P0;

        // These are positive and negative sides for the same motor, and sending 1 to one, you have to send 0 to the other.
        const FORWARD_PIN = DigitalPin.P13;
        const BACKWARD_PIN = DigitalPin.P14;

        // These are positive and negative sides for the same motor, and sending 1 to one, you have to send 0 to the other.
        const TURN_LEFT_PIN = DigitalPin.P15;
        const TURN_RIGHT_PIN = DigitalPin.P16;

        // This pin is undocumented, I don't know what it is, and so I tried not to touch it
        // If you do, please tell me, as I suspect it's redundant. I took an educated guess -Jim no surname provided
        const inTobbie = () => pins.digitalReadPin(DigitalPin.P8) == 1;

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
         *Tobbie-II stamps his foot for a certain number of times.
        *@param times the amount of times to stamp; eg. 5
        */
        //% blockId="tobbieIIv2-stamp"
        //% block="stamp %time| times"
        //% time.min=1 time.max=100
        //% blockGap=3 weight=2
        //% advanced=false
        export function stamp(times: number): void {
            for (let i = 0; i < times; i++) {
                forward();
                basic.pause(300);
                backward();
                basic.pause(150);
            }
            stopWalk();
        }


        /**
         *Tobbie-II shakes his head for a certain number of times.
        *@param times the amount of times to shake the head; eg. 5
        */
        //% blockId="tobbieIIv2-shakeHead"
        //% block="shake head %time| times"
        //% time.min=1 time.max=100
        //% blockGap=3 weight=1
        //% advanced=false
        export function shakeHead(times: number): void {
            for (let i = 0; i < times; i++) {
                leftward();
                basic.pause(250);
                rightward();
                basic.pause(250);
            }
            stopRotation();
        }
        /**
            *Tobbie-II repeats the dance for for a certain number of times.
            *@param times the amount of times to dance; eg. 5
            */
        //% blockId="tobbieIIv2-dance"
        //% block="dance %time| times"
        //% time.min=1 time.max=100
        //% blockGap=3 weight=1
        //% advanced=true
        export function dance(times: number): void {
            for (let i = 0; i < times; i++) {
                backward();
                rightward();
                basic.pause(500);
                forward();
                leftward();
                basic.pause(500);
            }
            stopRotation();
            stopWalk();
        }





        /** 
         * Read the value sensed by the right side of the infrared sensor.
        */
        //% blockId="tobbieIIv2-infraredValue"
        //% block="%sensor IR sensor value "
        //% group="Infrared Sensor"
        //% blockGap=3 weight=1 
        //% advanced=true
        export function infraredValue(side: IRSide): number {
            if (!inTobbie()) {
                return 0
            }

            // Get correct pin based on the side
            let IR_PIN;
            if (side == IRSide.Left) {
                IR_PIN = IR_LEFT_PIN
            } else {
                IR_PIN = IR_RIGHT_PIN
            }

            basic.pause(100)

            const ambient = pins.analogReadPin(IR_PIN)

            // Turn IR LED on
            pins.digitalWritePin(IR_LED_PIN, 1)
            control.waitMicros(250)

            const illuminated = pins.analogReadPin(IR_PIN)

            // Turn IR LED off
            pins.digitalWritePin(IR_LED_PIN, 0)

            return illuminated - ambient
        }

        /**
            *Determine if there are obstacles on the right side.
            *@param side Left or right infrared sensor
            *@param sensitivity This controls the threshold between a true and false
            */
        //% blockId="tobbieIIv2-isObstacle"
        //% block="is there an obstacle on the $side|| with $sensitivity sensitivity"
        //% group="Infrared Sensor"
        //% sensitivity.defl=tobbieIIv2.Sensitivity.Medium
        //% blockGap=3 weight=0
        //% advanced=true
        export function isObstacle(side: IRSide, sensitivity: Sensitivity = Sensitivity.Medium): boolean {
            return infraredValue(side) > sensitivity && inTobbie()
        }

        /**
        *   Make TobbieII start walking.
        *   @param direction forward or backward
        */
        //% blockId="tobbieIIv2-walk"
        //% block="walk %direction"
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
        //% blockId="tobbieIIv2-walkTime"
        //% block="walk %direction for %seconds seconds"
        //% group="Walking"
        //% blockGap=3 weight=2
        //% seconds.defl=1.5
        export function walkTime(direction: MoveDirection, seconds: number) {
            walk(direction);
            basic.pause(seconds * 1000);
            stopWalk();
        }

        /**
        *   Tobbie-II walks forward.
        */
        function forward() {
            if (inTobbie()) {
                pins.digitalWritePin(FORWARD_PIN, 1)
                pins.digitalWritePin(BACKWARD_PIN, 0)
            }
        }
        /**
         *   Tobbie-II walks backward.
         *   I have no idea what Force does. -Jim no surname provided
        */
        function backward() {
            if (inTobbie()) {
                pins.digitalWritePin(FORWARD_PIN, 0)
                pins.digitalWritePin(BACKWARD_PIN, 1)
            }
        }
        /** 
        *   Tobbie-II stops walking.
        */
        //% blockId="tobbieIIv2-stopwalk"
        //% block="stop moving"
        //% group="Walking"
        //% blockGap=3 weight=1
        export function stopWalk() {
            pins.digitalWritePin(FORWARD_PIN, 0);
            pins.digitalWritePin(BACKWARD_PIN, 0);
        }

        /**
         * Start rotating to the right or to the left
         * @param direction Right or Left
         */
        //% blockId="tobbieIIv2-rotate"
        //% block="rotate to the %direction"
        //% group="Rotating"
        //% blockGap=3 weight=3
        export function rotate(direction: RotateDirection) {
            if (direction == RotateDirection.Right) {
                rightward();
            } else {
                leftward();
            }
        }
        /**
         * Start rotating to the right or to the left
         * @param direction Right or Left
         * @param [seconds=1.5] Time in seconds Tobbie should Rotate for
         */
        //% blockId="tobbieIIv2-rotateTime"
        //% block="rotate to the %direction for %seconds seconds"
        //% group="Rotating"
        //% blockGap=3 weight=2
        //% seconds.defl=1.5
        export function rotateTime(direction: RotateDirection, seconds: number = 1.5) {
            rotate(direction);
            basic.pause(seconds * 1000);
            stopRotation();
        }

        function rightward() {
            pins.digitalWritePin(TURN_LEFT_PIN, 0);
            pins.digitalWritePin(TURN_RIGHT_PIN, 1);
        }
        function leftward() {
            pins.digitalWritePin(TURN_LEFT_PIN, 1);
            pins.digitalWritePin(TURN_RIGHT_PIN, 0);
        }
        /**
        *Tobbie-II stops rotating.
        */
        //% blockId="tobbieIIv2-stopRotation"
        //% block="stop rotating"
        //% group="Rotating"
        //% blockGap=3 weight=1
        export function stopRotation() {
            pins.digitalWritePin(TURN_LEFT_PIN, 0);
            pins.digitalWritePin(TURN_RIGHT_PIN, 0);
        }

        
        /**
         * Set the buzzer inside the helmet on and then off to produce a short buzz.
         */
        //% blockId="tobbieIIv2-buzz"
        //% block="buzz"
        //% blockGap=3 weight=2
        //% advanced=true
        //% group="Buzzer"
        export function buzz(): void {
            pins.digitalWritePin(BUZZER, 1);
            basic.pause(100);
            pins.digitalWritePin(BUZZER, 0);
        }

        /**
         * Set the buzzer to 1 or 0, to produce the starting of a buzz, or the end.
         * @param on whether to set the buzzer on or off
         */
        //% blockId="tobbieIIv2-setBuzzer"
        //% block="set buzzer %on"
        //% blockGap=3 weight=1
        //% advanced=true
        //% group="Buzzer"
        export function setBuzzer(on: boolean = true): void {
            pins.digitalWritePin(BUZZER, on ? 1 : 0);
        }

    }