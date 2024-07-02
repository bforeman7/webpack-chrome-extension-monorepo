const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const APPS_PATH = path.join(__dirname, './apps');
const PACKAGES_PATH = path.join(__dirname, './packages');
const APP1_PATH = path.join(APPS_PATH, './app1');
const APP2_PATH = path.join(APPS_PATH, './app2');
const PACKAGE1_PATH = path.join(PACKAGES_PATH, './package1');
const PACKAGE2_PATH = path.join(PACKAGES_PATH, './package2');


module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        app1Index: { import: path.join(APP1_PATH, "./src/index.ts"), filename: "app1/js/index.js" },
        app1OnLoad: { import: path.join(APP1_PATH, "./src/onLoad.ts"), filename: "app1/js/onLoad.js" },
        app2Index: { import: path.join(APP2_PATH, "./src/index.ts"), filename: "app2/js/index.js" },
        app2OnLoad: { import: path.join(APP2_PATH, "./src/onLoad.ts"), filename: "app2/js/onLoad.js" },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.join(APP1_PATH, "./static"), to: "app1/static" },
                { from: path.join(APP1_PATH, "./manifest.json"), to: "app1/manifest.json" },
                { from: path.join(APP1_PATH, "./lib"), to: "app1/lib" },
                { from: path.join(APP2_PATH, "./static"), to: "app2/static" },
                { from: path.join(APP2_PATH, "./manifest.json"), to: "app2/manifest.json" },
                { from: path.join(APP2_PATH, "./lib"), to: "app2/lib" },
            ],
        }),
    ],
    resolve: {
        alias: {
            "@name/package1": path.resolve(__dirname, "packages/package1/src"),
            "@name/package2": path.resolve(__dirname, "packages/package2/src")
        },
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/, loader: "ts-loader",
                loader: 'ts-loader',
            },
        ],
    }
};