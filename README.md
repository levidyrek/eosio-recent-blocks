# EOSIO Recent Blocks App

A React app that displays information about the most recent blocks from the EOSIO blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Install Node.js](https://nodejs.org/)
  * Last tested with Node verson 11.15.0, npm version 6.7.0

### Development Setup

Clone this repository

```
git clone git@github.com:levidyrek/eosio-recent-blocks.git
```

Change to the project directory

```
cd eosio-recent-blocks
```

Install the application dependencies

```
npm install
```

Run the application

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Usage

Click the "Load" button to load the most recent blocks from the EOSIO blockchain. Click on blocks to expand/collapse them to show/hide the raw block content. Keyboard users can focus blocks with tab/shift-tab and expand/collapse the focused block by pressing the space bar.

## Built With

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The language used
* [Node.js](https://nodejs.org/) - The JavaScript runtime
* [React.js](https://reactjs.org/) - The Node.js UI framework
* [Redux](https://redux.js.org/) - State management for JavaScript apps
* [eosjs](https://github.com/EOSIO/eosjs) - The JavaScript EOSIO API
