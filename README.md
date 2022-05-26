virginatlntic_assignmemt2

##	Installation process

Requires [Node.js](https://nodejs.org/) v14+ and [yarn](https://yarnpkg.com/).

To verify that you have these applications installed.

```sh
node -v
yarn -v
```

Download the package to your computer and navigate to the application files.

```sh
git clone https://github.com/arunlingdev/virginatlntic_assignmemt2
cd virginatlntic_assignment2
```

Download and install all the dependent packages.

```sh
yarn install
```

Start development server.

```sh
yarn start
```

### Software dependencies

The applications and modules used for this application are: 

1. React
2. Prettier

We will update the list in the following versions

### Latest releases

This is the first version, which includes the application structure and some lines of code just for example

### API references

Here we used proxing API request by using http-proxy-middleware

Create a production build.

```sh
yarn build
```

## Contribute

The application is structured in 4 main folders

### api

Here we will place all the endpoints and scripts related to the API

### components

Each component will have a separate folder and each folder will have 3 other files, for JS, SCSS and Test

1. nameComponent.js
2. namecomponent.scss


### styles

Here we will place all the SCSS code ex: Constant, Mixin, Breakpoints, Base, Resets. Not SCSS about inside Component, for component styles put inside component file

# Configuration Values
All configuration values (like API endpoints) are in .env file. 
Developers will create a .env.local file during development. Please note .env.local is added to .gitignore. So this will not go in to source control
