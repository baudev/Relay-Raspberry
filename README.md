# Relay Raspberry Pi

This repository allows to enable and disable a relay in TypeScript.

## Installation

```
npm i relay-raspberry
```

## Usage

An example enabling the relay on the GPIO 4 and printing its current state.

```typescript
let relay = new Relay(4, 7000); // 4 is the PIN number, 7000 is the number of seconds after which the relay will be deactivated.
relay.enable(); // enables the relay

// Gets the current state of the relay
relay.getState().then((value) => {
    switch (value) {
        case 1:
            console.log("Enabled !");
            break;
        case 0:
            console.log("Disabled !");
            break;
    }
});
```

## API

### Class Relay

**Relay(gpioPin [, disableAfterXSeconds])**

+ gpioPin - (_number_) The pin of the relay to be controlled.
+ [disableAfterXSeconds] - (*number*) An optional number specifying the number of seconds after which the relay will be automatically deactivated.

**enable(): Promise<void>**

Enables the relay.

**disable(): Promise<void>**

Disables the relay.

**getState(): Promise<number>**

Returns the current state of the relay. `1` means enabled. `0` means disabled.

## Electronic Notes

<p align="center">
  <img src="https://github.com/baudev/Relay-Raspberry-Server/blob/master/doc/schema.png?raw=true">
</p>

This project uses:

- 5V Relay Module
- Raspberry PI

## CREDITS

- [onoff](https://github.com/fivdi/onoff)

## LICENSE

```
MIT License

Copyright (c) 2019

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
