var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output : {
        filename : 'app.bundle.min.js'
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    resolve : {
        extensions : ['','.js','.ts']
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};