const fs = require('fs');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// Our function that generates our html plugins
function generateHtmlPlugins (templateDir) {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir), { withFileTypes: true })

    return templateFiles
        .filter(file => path.extname(file.name) === '.pug')
        .map(file => {
            // Split names and extension
            const parts = file.name.split('.')
            const name = parts[0]
            const extension = parts[1]

            return new HTMLWebpackPlugin({
                filename: `${name}.html`,
                template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
                inject: false
            })
        })
}

module.exports = generateHtmlPlugins('./src/dev/pages')

