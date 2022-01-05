
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name]';
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = () => webpackMerge(commonConf({ outputFile }), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        open: true,
        publicPath: '/',
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        overlay: {
            warnings: true,
            errors: true
        },
    },
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: '3000',
			server: { baseDir: ['public']}
		})
	]
});