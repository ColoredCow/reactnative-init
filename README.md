# ColoredCow ReactNative
Boilerplate code for your next ReactNative app! :rocket:

## Pre-requisites
1. [Node && NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/coloredcow/reactnative-boilerplate project-name
   ```
2. Set up the build config files:
    ```sh
    cp src/env/debug.example.js src/env/debug.js
    cp src/env/release.example.js src/env/release.js
    ```
3. Update the files `src/env/debug.js` and `src/env/release.js` to set up environment variables.
4. Install the dependencies:
    ```sh
    yarn install
    ```
5. Build the app and launch the Android emulator:
    ```sh
    npx react-native run-android --verbose
    ```
