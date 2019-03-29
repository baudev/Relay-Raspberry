# Relay Raspberry Pi Activation Server

This repository allows to enable and disable a relay through a web server (with authentication).

## Installation

```
git clone https://github.com/baudev/Relay-Raspberry-Server.git
cd Relay-Raspberry-Server/
npm install // install dependencies
npm run tsc // Compile TypeScript files into JavaScript
sudo node index.js // run the server!
```

## Configuration

- Global settings are defined in the `settings.json` file:
 
    - `PanelName` The title of the panel page (by default `PANEL`)
    - `RelayName` The title of the card (by default `RELAY NAME`)
    - `DisableAfterXSeconds` After how many seconds the relay would be disabled (by default `300`)
    - `DebugMode` If debug logs must be saved (by default `true`)
    - `GPIONumber` The GPIO pin which controls the relay
    
- User settings are defined in `users.json`

## Preview

<p align="center">
  <img src="/doc/preview.png">
</p>

## Electronic Notes

![Electronic Schema](/doc/schema.png)

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
