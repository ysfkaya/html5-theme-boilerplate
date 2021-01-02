const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = path.resolve(__dirname, 'src/dev');
const prod = path.resolve(__dirname, 'src/prod');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: prod,
        filename: 'assets/js/[name].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css',
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'src/dev/pages/index.pug',
        //     inject: false
        // })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: ["html-loader?attributes=false", "pug-html-loader"]
            }
        ],
    },
}
