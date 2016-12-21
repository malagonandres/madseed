var webpack = require('webpack');

module.exports = {
    output : {
        filename : 'app.bundle.js'
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    resolve : {
        extensions : ['','.js','.ts']
    },
    devtool : 'eval'
};