const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const marked = require('marked');
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
    var link = marked.Renderer.prototype.link.call(this, href, title, text);
    return link.replace('<a', "<a target='_blank' ");
};

module.exports = {
    entry: {
        // Polyfill needed only in production
        // index: ['babel-polyfill', './src/js/index.tsx'],
        index: ['./src/js/index.tsx'],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.scss', '.md'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            /**
             * Internal import aliases for convenience.
             */
            '@src': path.resolve(__dirname, 'src/js/'),
            '@config': path.resolve(__dirname, 'src/config/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@public': path.resolve(__dirname, 'public/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@thirdparty': path.resolve(__dirname, 'src/thirdparty'),
            '@data': path.resolve(__dirname, 'src/data'),
        },
    },
    module: {
        rules: [
            // AWESOME TYPESCRIPT LOADER IS IN THE PROCESS OF
            // BEING DROPPED, SEE BABEL 7 TYPESCRIPT SUPPORT
            // BELOW. SECTION KEPT IN CASE WE FACE ISSUES
            // NOTE THAT BUILD SIZE IS DIFFERENT, BABEL WILL
            // GIVE HEAVIER BUILDS BUT ADDS SUPPORT FOR OLDER BROWSERS,
            // ACCORDING TO ENV IN .babelrc

            // We still use because of
            // - https://github.com/babel/babel/issues/7074
            //
            // NEED CAREFUL TESTS, BABEL 7.rc.1 TYPESCRIPT SUPPORT IS
            // NOT YET USABLE
            /*
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    // For polyfilling

                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFilename: 'tsconfig.json',
                            // Use babel to ensure polyfill
                            // DOES NOT WORK YET
                            useBabel: false,
                            useCache: true,
                            silent: false,
                        },
                    },
                ],
            },*/

            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader', // For polyfilling
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            // IMPORTANT! use transpileOnly mode to speed-up compilation
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                // Whenever babel is ready to fully handle typescript
                // you can use the following rule
                //test: /\.[tj]sx?$/,
                test: /\.(jsx|js|mjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            /* your options here */
                            renderer,
                        },
                    },
                ],
            },
            {
                test: /\.mdx$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'mdx-loader',
                        options: {
                            //mdPlugins: [images]
                        },
                    },
                ],
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
            },
            {
                test: /\.(mp4|m4v|ogv|webm)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/videos/[name].[ext]',
                },
            },
            {
                test: /\.(mp3)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/audios/[name].[ext]',
                },
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?',
                options: {
                    name: '[name].[ext]', // <-- retain original file name
                },
            },
        ],
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],
};
