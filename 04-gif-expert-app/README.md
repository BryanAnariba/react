# Gif Expert App

1. Clone repository and select this folder
2. Install Dependencies
3. Create Giphy Account and set credentials in the app
4. start app using: ```npm run start:dev```

# Gif Expert App Testing

1. Install Dependencies
    ```npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react```
    ```npm install --save-dev @testing-library/react @types/jest jest-environment-jsdom```
    If we are using: ```npm install --save-dev whatwg-fetch```
    In package.json scrips => "test": "jest --watchAll"
    Babel Config File, jest.config.cjs and jest.setup.cjs: see that file in this app

# Sugerencias

1. Empezar por el componente que menos dependencias tenga o mas pequenio sea, en este caso seria el GifGridItem.jsx o gifs.service.ts
