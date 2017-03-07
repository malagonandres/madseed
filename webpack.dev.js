var webpack = require('webpack');

module.exports = {
    entry: {
        'polyfills': './src/app/polyfills.ts',
        'vendor': './src/app/vendor.ts',
        'app': './src/app/main.ts'
    },
    output : {
        filename : '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    resolve : {
        extensions: ['.ts', '.tsx', '.js', '.jsx','']
    },
    // devtool: 'source-map',
    debug: false
};