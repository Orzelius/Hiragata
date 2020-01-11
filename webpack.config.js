const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'disr'),
        historyApiFallback: true,
        compress: true,
        port: 8080
    },
    optimization: {
        // minimizer: [new UglifyJsPlugin({
        //     uglifyOptions: {
        //         arrows: false,
        //         booleans: false,
        //         cascade: false,
        //         collapse_vars: false,
        //         comparisons: false,
        //         computed_props: false,
        //         hoist_funs: false,
        //         hoist_props: false,
        //         hoist_vars: false,
        //         if_return: false,
        //         inline: false,
        //         join_vars: false,
        //         keep_infinity: true,
        //         loops: false,
        //         negate_iife: false,
        //         properties: false,
        //         reduce_funcs: false,
        //         reduce_vars: false,
        //         sequences: false,
        //         side_effects: false,
        //         switches: false,
        //         top_retain: false,
        //         toplevel: false,
        //         typeofs: false,
        //         unused: false,

        //         // Switch off all types of compression except those needed to convince
        //         // react-devtools that we're using a production build
        //         conditionals: true,
        //         dead_code: true,
        //         evaluate: true,

        //         mangle: true,
        //     },
        // }),],
    },
    entry: {
        app: ['./src/app/index.tsx'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ]
}