# For testing but in react in vanila JS

#### Jest Documentation: ```https://jestjs.io/docs/getting-started```
- 1. Install jest package: ```npm install --save-dev jest```
- 2. Install types for intellisence: ```npm install @types/jest```
- 3. In package.lock.json copy this: ```{"scripts": {"test": "jest"}} or {"scripts": {"test": "jest --watchAll"}}```
- 4. Install babel: ```npm install --save-dev babel-jest @babel/core @babel/preset-env```
- 5. Create babel.config.cjs and set the content: ```module.exports = {presets: [['@babel/preset-env', {targets: {node: 'current'}}]],};```
- 6. Create __test__ folder and set the tests there

## Run test
```npm run test```
