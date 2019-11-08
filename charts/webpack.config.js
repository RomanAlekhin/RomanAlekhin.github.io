const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: NODE_ENV,

    entry: './src/index.js',
    output: {
        filename: 'build.js'
    },

    watch: NODE_ENV === 'development',

    module: {
        rules: [{
            test: /\.js$/,
            loaders: ['babel-loader']
        }]
    }
};
