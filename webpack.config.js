const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'images/[name].webp',
    },
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'postcss-loader',
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'src/template.html',
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tapPromise('ConvertImagesToWebP', async () => {
                    const { default: imagemin } = await import('imagemin');
                    const { default: imageminWebp } = await import('imagemin-webp');

                    const imagesPath = path.resolve(__dirname, 'src/images');
                    const outputOptions = {
                        destination: imagesPath,
                        plugins: [imageminWebp({ quality: 60 })],
                    };
                        await imagemin(['src/images/*.{jpg,png}'], outputOptions);
                });
            },
        },
    ]
};
