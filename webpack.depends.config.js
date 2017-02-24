var webpack = require('webpack')

module.exports = {
	entry: {
		depends: ['react', 'react-dom', 'react-router']
	},

	output: {
		filename: '[name].bundle.js',
		path: 'build/',

		// The name of the global variable which the library's
		// require() function will be assigned to
		library: '[name]_lib',
	},

	plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings    : false,
                drop_console: true,
                unsafe      : true
            },
            output  : {
                comments: false
            }
        }),
		new webpack.DllPlugin({
			// The path to the manifest file which maps between
			// modules included in a bundle and the internal IDs
			// within that bundle
			path: 'build_tmp/[name]-manifest.json',
			// The name of the global variable which the library's
			// require function has been assigned to. This must match the
			// output.library option above
			name: '[name]_lib'
		}),
	],
}