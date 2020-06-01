const path = require('path');
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');
const webpackConfigSingleSpa = require('webpack-config-single-spa');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PUB_PATH = path.join(__dirname, '/../server/dist/wwwroot');

module.exports = (webpackConfigEnv) => {
    const opts = {
        orgName: 'spot-mgs',
        projectName: 'client',
        webpackConfigEnv,
    };
    let defaultConfig = singleSpaDefaults(opts);

    // defaultConfig.externals.push(/^prime$/);

    const wp = webpackMerge.smart(defaultConfig, {
        output: {
            path: PUB_PATH,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash].css',
            }),

            // Compress CSS files
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                    },
                },
            }),
        ],
        externals: [
            /^lodash$/,
            /^single-spa$/,
            /^react$/,
            /^react\/lib.*/,
            /^react-dom$/,
            /.*react-dom.*/,
            /^rxjs\/?.*$/,
            /^prime$/,
        ],
    });
    // console.log(wp);
    return wp;
};
