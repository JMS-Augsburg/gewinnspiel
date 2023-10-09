'use strict'

const path = require('path');

module.exports = {
	mode: 'production',
	entry: './scss/styles.scss',
	output: {
		path: path.join(__dirname, './dist/'),
		clean: true,
	},
	module: {
		rules: [{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'file-loader',
					options: {name: '[name].css'},
				},
				'sass-loader',
			]
		}],
	},
};
