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

