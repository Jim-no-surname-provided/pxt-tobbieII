//% weight=0 color=#FF8B27 icon="\uf1b9" block="TobbieII"

//uf1b9
namespace TobbieII {
    let ADL_R: number = 0;
    let ADH_R: number = 0;
    let ADL_L: number = 0;
    let ADH_L: number = 0;
    let Read_LIR: number = 0;
    let Read_RIR: number = 0;
    let event_src_ir = 12;
    let event_ir_sensor = 1;
    let Motor_R: boolean = false;
    let Motor_L: boolean = false;
    let PX: number = 0;
    let PY: number = 0;
    let Force: number = 10;

    const IR_LED_PIN = DigitalPin.P12;

    const IR_RIGHT_PIN = AnalogPin.P1
    const IR_LEFT_PIN = AnalogPin.P2

    // These are positive and negative sides for the same motor, and sending 1 to one, you have to send 0 to the other.
    const FORWARD_PIN = DigitalPin.P13;
    const BACKWARD_PIN = DigitalPin.P14;

    // These are positive and negative sides for the same motor, and sending 1 to one, you have to send 0 to the other.
    const TURN_LEFT_PIN = DigitalPin.P15;
    const TURN_RIGHT_PIN = DigitalPin.P16;

    // This pin is undocumented, I have no idea what it is -Jim no surname provided
    const P8 = DigitalPin.P8;


    /** Read the value sensed by the right side of the infrared sensor.
    */
    //% blockId="Read_RBlock"
    //% blockGap=5 weight=65                 //與下一個方塊的間隙及排重
    export function Read_RBlock(): number {
        basic.pause(100)
        ADL_R = pins.analogReadPin(IR_LEFT_PIN)
        pins.digitalWritePin(IR_LED_PIN, 1)
        control.waitMicros(250)
        ADH_R = pins.analogReadPin(IR_LEFT_PIN)
        pins.digitalWritePin(IR_LED_PIN, 0)
        if (pins.digitalReadPin(P8) == 1) Read_RIR = ADH_R - ADL_R;
        return (Read_RIR)
    }
    /** Read the value sensed by the left side of the infrared sensor.
    */
    //% blockId="Read_LBlock"
    //% blockGap=15 weight=60                 //與下一個方塊的間隙及排重
    export function Read_LBlock(): number {
        basic.pause(100)
        ADL_L = pins.analogReadPin(IR_RIGHT_PIN)
        pins.digitalWritePin(IR_LED_PIN, 1)
        control.waitMicros(250)
        ADH_L = pins.analogReadPin(IR_RIGHT_PIN)
        pins.digitalWritePin(IR_LED_PIN, 0)

        Read_LIR = ADH_L - ADL_L;
        return (Read_LIR)
    }
    /**
        *Determine if there are obstacles on the right side.
        *@param thresholdR ; eg: 512
        */
    //% blockId="RBlock"
    //% thresholdR.min=0 thresholdR.max=1023
    //% blockGap=5 weight=58
    export function RBlock(thresholdR: number = 512): boolean {
        basic.pause(100)
        ADL_R = pins.analogReadPin(IR_LEFT_PIN)
        pins.digitalWritePin(IR_LED_PIN, 1)
        control.waitMicros(250)
        ADH_R = pins.analogReadPin(IR_LEFT_PIN)
        pins.digitalWritePin(IR_LED_PIN, 0)

        if (((ADH_R - ADL_R) > thresholdR) && (pins.digitalReadPin(P8) == 1)) {
            //basic.showIcon(IconNames.House)
            return (true)
        } else {
            //basic.showIcon(IconNames.Cow)
            return (false)
        }
    }
    /**
    *Determine if there are obstacles on the left side.
    *@param thresholdL ; eg: 512
    */
    //% blockId="LBlock"
    //% thresholdL.min=0 thresholdL.max=1023
    //% blockGap=10 weight=57
    export function LBlock(thresholdL: number = 512): boolean {
        basic.pause(100)
        ADL_L = pins.analogReadPin(IR_RIGHT_PIN)
        pins.digitalWritePin(IR_LED_PIN, 1)
        control.waitMicros(250)
        ADH_L = 0
        if (pins.digitalReadPin(P8) == 1) {
            ADH_L = pins.analogReadPin(IR_RIGHT_PIN)
            pins.digitalWritePin(IR_LED_PIN, 0)
        }
        if ((ADH_L - ADL_L) > thresholdL) {//512) { 
            //basic.showIcon(IconNames.House)
            return (true)
        } else {
            //basic.showIcon(IconNames.Cow)
            return (false)
        }
    }

    /**
    *Tobbie-II walks forward.
    */
    //% blockId="forward"
    //% blockGap=3 weight=35
    export function forward() {
        if (pins.digitalReadPin(P8) == 1) {
            pins.digitalWritePin(FORWARD_PIN, 1)
            pins.digitalWritePin(BACKWARD_PIN, 0)
        }
    }
    /**
    *Tobbie-II walks backward.
    */
    //% blockId="backward"
    //% blockGap=3  weight=34
    export function backward() {
        if (Force != 0) {
            pins.digitalWritePin(FORWARD_PIN, 0)
            pins.digitalWritePin(BACKWARD_PIN, 1)
            Force = Force - 1;
        }
        if (pins.digitalReadPin(P8) == 1) {
            Force = 10
        }

    }
    /**
    *Tobbie-II stops walking.
    */
    //% blockId="stopwalk"
    //% blockGap=10 weight=33
    export function stopwalk() {
        pins.digitalWritePin(FORWARD_PIN, 0)
        pins.digitalWritePin(BACKWARD_PIN, 0)
    }
    /**
    *Tobbie-II rotates to the right.
    */
    //% blockId="rightward"
    //% blockGap=3  weight=32
    export function rightward() {
        pins.digitalWritePin(TURN_LEFT_PIN, 0)
        pins.digitalWritePin(TURN_RIGHT_PIN, 1)
        Motor_L = false
        Motor_R = true
    }
    /**
    *Tobbie-II rotates to the left.
    */
    //% blockId="leftward"
    //% blockGap=3  weight=31
    export function leftward() {
        pins.digitalWritePin(TURN_LEFT_PIN, 1)
        pins.digitalWritePin(TURN_RIGHT_PIN, 0)
        Motor_L = true
        Motor_R = false
    }
    /**
    *Tobbie-II stops rotating.
    */
    //% blockId="stopturn"
    //% blockGap=10 weight=30
    export function stopturn() {
        if (Motor_L || Motor_R) {
            if (Motor_R) {
                pins.digitalWritePin(TURN_LEFT_PIN, 1)
                pins.digitalWritePin(TURN_RIGHT_PIN, 0)
            } else {
                pins.digitalWritePin(TURN_LEFT_PIN, 0)
                pins.digitalWritePin(TURN_RIGHT_PIN, 1)
            }
            basic.pause(50)
        }
        if (pins.digitalReadPin(P8) == 1) {
            pins.digitalWritePin(TURN_LEFT_PIN, 0)
            pins.digitalWritePin(TURN_RIGHT_PIN, 0)
            Motor_L = false
            Motor_R = false
        }
    }

    /**
       *Tobbie-II stamps his foot for a certain number of times.
       *@param time describe parameter here, eg:5
       */
    //% blockId="vibrate"
    //% time.min=1 time.max=100
    //% blockGap=5 weight=25
    //% advanced=true
    export function vibrate(time: number): void {
        for (let i = 0; i < time; i++) {
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
       *@param time describe parameter here, eg:5
       */
    //% blockId="shake_head"
    //% time.min=1 time.max=100
    //% blockGap=5 weight=26
    //% advanced=true
    export function shake_head(time: number): void {
        for (let i = 0; i < time; i++) {
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
        *@param time describe parameter here, eg:5
        */
    //% blockId="dance"
    //% time.min=1 time.max=100
    //% blockGap=5 weight=24
    //% advanced=true
    export function dance(time: number): void {
        for (let i = 0; i < time; i++) {
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
    /**
        *Tobbie II shows his mood on the face (APP only).
        *@param RX_Data A string of binary data where a 1 turns a led on, and a 0 off.
        */
    //% blockId="drawface"
    //% blockGap=5 weight=23
    //% advanced=true
    export function drawface(RX_Data: string): void {
        basic.clearScreen()
        for (let PY = 0; PY <= 4; PY++) {
            let PLOT_DATA: number = parseInt(RX_Data.substr(PY * 2 + 1, 2))
            for (let PX = 0; PX <= 4; PX++) {
                if (PLOT_DATA % 2 == 1) {
                    led.plot(PX, PY)
                    PLOT_DATA = PLOT_DATA - 1
                }
                PLOT_DATA = PLOT_DATA / 2
            }
        }
    }
}

