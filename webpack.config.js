module.exports = {
    mode: "development", // Set the mode to development for webpack optimizations
    entry: "./frontend/src/index.js", // Specify the entry point of your application
    output: {
        filename: "./frontend/static/frontend/main.js" // Specify the output file name and location
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // Corrected the spelling of "node_modules"
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        minimize: false // Disable minification for faster builds during development
    }
};
