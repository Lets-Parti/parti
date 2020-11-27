# Getting Started with Parti!

The project is built in React.js. It will use MaterialUI framework for front-end and Firebase for back-end

- [React Tutorial](https://www.youtube.com/watch?v=DLX62G4lc44&t=13506s&ab_channel=freeCodeCamp.org)
- Material UI [documentation](https://material-ui.com/getting-started/installation/)

## Installation

First step is to clone the GitHub repository

### Run `npm install`

Running `npm install` will install all of the `node_module` dependencies required to start the project

### Run `npm start`

Running an `npm start` will begin your local application in a local server. This is your development environment. The server address is at [http://localhost:3000/](http://localhost:3000/)

## Project Structure

The /parti folder contains 2 folders (public & src), package.json, and a README.md

### /parti/public

This folder contains `index.html`. Because React is a One-Page web application, you won't be touching the `/parti/public` at all

### package.json

package.json is the project configuration. This is a list of all the `node_module` dependencies. Running an `npm install` will scan through your `package.json` and install all dependencies

### /parti/src

The source folder is where you will be doing all of your work as a developer. See section below for details

## src folder

You will be doing all of your development in src folder

- App.js controls the route switching. Specify the path and component. ex.`<Route exact path="/create-event" component={CreateEvent}></Route>`
- index.js contains the ReactDOM, which sends the App component to index.html
- common folder contains all of the common access pages such as home page, about page, etc
- components folder contains all reusable components.
- resources folder contains all resources such as images, logo, background art
- static folder will contain all static data such as constant variables and project configuration

## GitHub Workflow

**Do not merge things into master **

\*change\*\*
