let CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
let UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
let m = {
    loaders: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: [
                'react',
                'env'
            ],
            plugins: [
                'transform-class-properties'
            ]
        }
    }]
}
module.exports = [{
    entry: {
        signIn: './cli/signIn.jsx',
    },
    output: {
        filename: 'public-no-auth/[name].js'
    },
    module: m,
    plugins: [
        new UglifyJSWebpackPlugin()
    ]
}, {
    entry: {
        assignments: './cli/assignments.jsx',
        common_: './cli/common_.jsx',
        courses: './cli/courses.jsx',
        users: './cli/users.jsx',
    },
    output: {
        filename: 'public/[name].js'
    },
    module: m,
    plugins: [
        new CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new UglifyJSWebpackPlugin()
    ]
}]

