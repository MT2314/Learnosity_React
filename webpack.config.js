const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath:
      // argv.mode === "development"
      "http://localhost:3001/",
    // : "https://content-solutions.s3.ca-central-1.amazonaws.com/courseware/wip/el-mf-component-library/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mf_component_library",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./TextEditable": "./src/components/TextEditable/TextEditable.js",
        "./QuoteBox": "./src/components/QuoteBox/QuoteBox.js",
        "./Callout": "./src/components/Callout/Callout.js",
        "./Header": "./src/components/Header.jsx",
        "./Image": "./src/components/Image/Image.js",
        "./ImageConfig": "./src/components/Image/ImageConfig.js",
        "./ImageProvider": "./src/components/Image/ImageProvider.js",
        "./FormattedText": "./src/components/FormattedText/FormattedText.js",
        "./componentIndex": "./src/components/componentIndex.js",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
