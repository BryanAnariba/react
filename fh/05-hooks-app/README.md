### Necesary Packages for testing in jest!
- ```npm i --save-dev @babel/preset-typescript```
- ```npm i --save-dev ts-jest```
- ```npm i --save-dev babel-jest```
- ```npm i --save-dev @types/jest```
- ```npm i --save-dev @jest/globals```
- ```npm i --save-dev @types/jest whatwg-fetch```
- ```npm i --save-dev @babel/core```
- ```npm i --save-dev @babel/preset-env```
- ```npm install --save-dev @babel/preset-react```

### Packages for testing library!
- ```npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom```

### Settings
- Create __babel.config.js__ and copy the content of this one
- Copy the override script and paste on file __eslint.config.js__
- For node -18 create __jest.config.js__ and copy the content of this file in the other one 
- In __package.lock.json__ scrips zone copy this: ```"test": "jest --watchAll"```
- Copy this in __tsconfig.json__: ```"compilerOptions": {"allowSyntheticDefaultImports": true, "esModuleInterop": true, "jsx": "react-jsx"},```
- Run: ```npm run test```