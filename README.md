# electron-quick-start

**Clone and run for a quick way to see an Electron in action.**

A basic Electron application needs just these files:

- `index.html` - A web page to render.
- `main.js` - Starts the app and creates a browser window to render HTML.
- `package.json` - Points to the app's main file and lists its details and dependencies.

To run the application once setup run...
```bash
$ npm start
# or
$ electron .
```

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
£ git clone git@github.com:JamesTimms/MobileFetcher.git
# or
$ git clone https://github.com/JamesTimms/MobileFetcher.git
# Go into the repository
$ cd MobileFetcher
# Install dependencies and run the app
$ npm install && npm start
# Then compile the frontend.
# The front end needs compiling like this so that it can be modular (e.g. require('my-js-module'))
$ npm run-script browserify
# can get browserify to auto complile on changes too with
$ npm run-script watchify
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

#### License [All rights reserved](LICENSE.md)