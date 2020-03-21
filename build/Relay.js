"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log = require("./LogUtil");
const Gpio = require('onoff').Gpio;
/**
 * Handles the entire behavior of the Relay.
 * @author Baudev
 * @since 1.0
 */
class Relay extends Gpio {
    /**
     * Defines a Relay by his GPIO Pin.
     * @param gpioPin
     * @param disableAfterXSeconds
     * @see Gpio
     */
    constructor(gpioPin, disableAfterXSeconds = 5000) {
        super(gpioPin, 'out');
        Log.debug('Relay instantiated');
        this.disable(); // we disable on start the relay
        Log.info('The relay will be disabled automatically after ' + disableAfterXSeconds + ' seconds');
        this.disableAfterXSeconds = disableAfterXSeconds;
    }
    /**
     * Enables the relay.
     */
    enable() {
        let that = this;
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
    disable() {
        Log.info('Disabling the relay...');
        return this.write(0);
    }
    /**
     * Returns the current state of the Relay.
     * @see BinaryValue
     */
    getState() {
        Log.info('Getting current state of the relay');
        return this.read();
    }
    get disableAfterXSeconds() {
        return this._disableAfterXSeconds;
    }
    set disableAfterXSeconds(value) {
        this._disableAfterXSeconds = value;
    }
}
exports.Relay = Relay;
