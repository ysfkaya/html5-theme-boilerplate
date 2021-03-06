const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');

const prod = path.resolve(__dirname, 'src/prod');

const pages = require('./pages');

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
        new BeautifyHtmlWebpackPlugin()
    ].concat(pages),
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
    devServer: {
        contentBase: path.join(__dirname, 'src/dev'),
        hot: true,
        inline: true,
        port: 9090
    }
}
