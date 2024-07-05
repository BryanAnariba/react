module.exports = {
    presets: [
        ["@babel/preset-env", {targets: {esmodule: true}}],
        ["@babel/preset-react", {runtime: 'automatic'}],
    ],
};