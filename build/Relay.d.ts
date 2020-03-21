import { Promise } from 'es6-promise';
declare const Gpio: any;
/**
 * Handles the entire behavior of the Relay.
 * @author Baudev
 * @since 1.0
 */
export declare class Relay extends Gpio {
    private _disableAfterXSeconds;
    /**
     * Defines a Relay by his GPIO Pin.
     * @param gpioPin
     * @param disableAfterXSeconds
     * @see Gpio
     */
    constructor(gpioPin: number, disableAfterXSeconds?: number);
    /**
     * Enables the relay.
     */
    enable(): Promise<void>;
    /**
     * Disables the relay.
     */
    disable(): Promise<void>;
    /**
     * Returns the current state of the Relay.
     * @see BinaryValue
     */
    getState(): Promise<number>;
    disableAfterXSeconds: number;
}
export {};
