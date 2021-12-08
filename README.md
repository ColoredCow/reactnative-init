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
2. Rename the files and foler for your project
   To find out the files and directory that needs to be renamed, refer to the changes in this [PR](https://github.com/ColoredCow/reactnative-init/pull/1/files) (here app "HUGE" is renamed to "AwesomeProject").

3. Set up the build config files:
    ```sh
    cp src/env/debug.example.js src/env/debug.js
    cp src/env/release.example.js src/env/release.js
    ```
4. Update the files `src/env/debug.js` and `src/env/release.js` to set up environment variables.
5. Install the dependencies:
    ```sh
    yarn install
    ```
6. Build the app and launch the Android emulator:
    ```sh
    npx react-native run-android --verbose
    ```
