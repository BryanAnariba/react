# For testing but in react in vanila JS

#### Jest Documentation: ```https://jestjs.io/docs/getting-started```
#### Testing library ```https://testing-library.com/docs/react-testing-library/intro```

- 1. Install jest package: ```npm install --save-dev jest jest-environment-jsdom```
- 2. Install types for intellisence: ```npm install @types/jest```
- 3. Install testing library for frontend components: ```npm install --save-dev @testing-library/react @testing-library/dom @babel/preset-react```
- 4. In package.lock.json copy this: ```{"scripts": {"test": "jest"}} or {"scripts": {"test": "jest --watchAll"}}```
- 4. OPTIONAL: for async with fetch in node -18 create jest.config.cjs and jest.setup.js  
- 5. Install babel: ```npm install --save-dev babel-jest @babel/core @babel/preset-env```
- 6. Create babel.config.cjs and set the content: ```module.exports = {presets: [['@babel/preset-env', {targets: {node: 'current'}}]],};```
- 7. Create __test__ folder and set the tests there

## Run test
```npm run test```
