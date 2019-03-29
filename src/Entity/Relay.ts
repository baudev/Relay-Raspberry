import {BinaryValue} from "onoff";
import {Promise} from 'es6-promise'
import Log from "../LogUtil";

const Gpio = require('onoff').Gpio;

/**
 * Handles the entire behavior of the Relay.
 * @author Baudev
 * @since 1.0
 */
export default class Relay extends Gpio {

    private _disableAfterXSeconds: number;

    /**
     * Defines a Relay by his GPIO Pin.
     * @param gpioPin
     * @param disableAfterXSeconds
     * @see Gpio
     */
    constructor(gpioPin: number, disableAfterXSeconds : number = 5000) {
        super(gpioPin, 'out');
        Log.info('Relay instantiated');
        this.disable(); // we disable on start the relay
        Log.info('The relay will be disabled automatically after ' + disableAfterXSeconds + ' seconds');
        this.disableAfterXSeconds = disableAfterXSeconds;
    }

    /**
     * Enables the relay.
     */
    public enable() : Promise<void> {
        let that: Relay = this;
        // we disable the relay after 5 minutes automatically
        setTimeout(function () {
            Log.info('Disabling automatically the relay...');
            that.disable();
        }, this.disableAfterXSeconds * 1000);
        Log.info('Enabling the relay...');
        return this.write(1);
    }

    /**
     * Disables the relay.
     */
    public disable() : Promise<void> {
        Log.info('Disabling the relay...');
        return this.write(0);
    }

    /**
     * Returns the current state of the Relay.
     * @see BinaryValue
     */
    public getState() : Promise<number> {
        Log.info('Getting current state of the relay');
        return this.read();
    }


    get disableAfterXSeconds(): number {
        return this._disableAfterXSeconds;
    }

    set disableAfterXSeconds(value: number) {
        this._disableAfterXSeconds = value;
    }
}