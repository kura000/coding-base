const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name]';

module.exports = () => webpackMerge(commonConf({ outputFile }), {
    mode: 'production'
});