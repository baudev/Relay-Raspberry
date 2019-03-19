import {BinaryValue} from "onoff";

const Gpio = require('onoff').Gpio;

/**
 * Handles the entire behavior of the Relay.
 * @author Baudev
 * @since 1.0
 */
export class Relay extends Gpio {

    static ENABLED = 1;
    static DISABLED = 0;
    static STATE = Relay.ENABLED | Relay.DISABLED;

    /**
     * Defines a Relay by his GPIO Pin.
     * @param gpioPin
     * @see Gpio
     */
    constructor(gpioPin: number) {
        super(gpioPin, 'out');
    }

    /**
     * Enables the relay.
     */
    public enable() : Promise<void> {
        return this.write(1);
    }

    /**
     * Disables the relay.
     */
    public disable() : Promise<void> {
        return this.write(0);
    }

    /**
     * Returns the current state of the Relay.
     * @see Relay.STATE
     */
    public getState() : Promise<number> {
        return new Promise<number>(((resolve, reject) => {
            this.read()
                .then((value: BinaryValue) => {
                    // depending of the GPIO state
                    if(value == Gpio.HIGH) {
                        return resolve(Relay.ENABLED);
                    } else {
                        return resolve(Relay.DISABLED);
                    }
                })
                .catch((reason => reject(reason)));
        }))
    }

}