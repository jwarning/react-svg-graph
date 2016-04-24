var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');

gulp.task('build', function (callback) {
    webpack({
        context: path.resolve(__dirname, './'),
        entry: ['./index'],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index.js',
            library: 'react-svg-graph',
            libraryTarget: 'umd'
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    include: path.resolve(__dirname, './'),
                    exclude: path.resolve(__dirname, './node_modules'),
                    query: { presets: ['react', 'es2015'] }
                }
            ]
        },
        resolve: {
            root: path.resolve(__dirname, './')
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ],
        externals: ['react']
    }, (err, stats) => {
        if (err) {
            throw new Error('webpack: ' + (err.message || err));
        }
        callback();
    });
});

gulp.task('example', ['build'], function (callback) {
    webpack({
        context: path.resolve(__dirname, './'),
        entry: ['./example/app'],
        output: {
            path: path.resolve(__dirname, './example'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    include: path.resolve(__dirname, './'),
                    exclude: path.resolve(__dirname, './node_modules'),
                    query: { presets: ['react', 'es2015'] }
                }
            ]
        },
        resolve: {
            root: path.resolve(__dirname, './')
        }
    }, (err, stats) => {
        if (err) {
            throw new Error('webpack: ' + (err.message || err));
        }
        callback();
    });
});

gulp.task('default', ['build', 'example']);
